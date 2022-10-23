
export class Repository {

	constructor(){
		this.options = {
            	interaction: {
                    zoomSpeed: 3
                },
                edges: {
                    smooth: {
                        forceDirection: "none",
                        roundness: 0
                    }
                },
                layout: {
                    improvedLayout: false,
                    clusterThreshold: 150
                },
                physics: {
                    barnesHut: {
                        gravitationalConstant: -758211,
                        centralGravity: 0.6,
                        avoidOverlap: 1,
                        springLength: 400,
                    },
                    timestep: 0.3,
                    minVelocity:0.1,
                    stabilization: false
                }
		};

		this.networkData = "";

	}


	async fetchData(entryPoint){
        const response = await fetch('/retrieve/symbol/' + entryPoint, { method: 'GET'});
		if (!response.ok) 
			throw new Error(`HTTP error! status: ${response.status}`);
		
        //parsing data
        this.jsonResponse = await response.json();
		this.parseResponse(this.jsonResponse);
        this.parseSubsystems(this.nodes, this.symbols);
        this.subsystems = this.generateSubsystemsList(this.symbols);
        this.usedSubsystems = this.generateUsedSubsystemsList(this.nodes);
	}

	parseResponse(response){
		let parsed = vis.parseDOTNetwork(response.graph);
        this.nodes = new vis.DataSet(parsed.nodes);
        this.edges = new vis.DataSet(parsed.edges);
        this.networkData = {nodes: this.nodes, edges: this.edges};
        this.symbols = response.symbols;
	}

    parseSubsystems(nodes, symbols){
        let update = []
        
        symbols.forEach(function(symbol){
            let symbolName = symbol.FuncName;
            let subsystems = symbol.subsystems;
            let node = nodes.get(symbolName);
            
            // assign "NONE" subsystem for nodes which
            // haven't a subsystem
            if(subsystems[0] == undefined) 
                node.group = "NONE"
            else
                node.group = subsystems[0];

            update.push(node);
        });
        nodes.updateOnly(update);
    }

    generateSubsystemsList(symbols){
        const subsystems = ["NONE"];

        symbols.forEach(function(symbol){
            symbol.subsystems.forEach(function(subsystem){
                if(!subsystems.includes(subsystem))
                    subsystems.push(subsystem);
            }); 
        });
        return subsystems;
    }

    generateUsedSubsystemsList(nodes){
        let all = [];

        nodes.forEach(function(node){
            all.push(node.group);
        });
        return Array.from(new Set(all)); //remove duplicates
    }


    setEdgeSubsystem(edges, nodes){
        edges.forEach(function(properties){
            properties.group = nodes.get(properties.from).group;
        });
    }


    generateArrowsData(edges, nodes){
        //this.setEdgeSubsystem(edges,nodes);
        
        let arrowsData = {};
        
        edges.forEach(function(edge){
            let fromSubsystem = edge.group;
            console.log(fromSubsystem);
            
            if(!arrowsData.hasOwnProperty(fromSubsystem))
                arrowsData[fromSubsystem] = {};

            let toSubsystem = nodes.get(edge.to).group;

            if(fromSubsystem === toSubsystem)
                return; //skip to next iteration

            if(!arrowsData[fromSubsystem].hasOwnProperty(toSubsystem))
                arrowsData[fromSubsystem][toSubsystem] = 0;

            arrowsData[fromSubsystem][toSubsystem] +=1;
        });

        this.arrowsData = arrowsData;
    }



    /*
    La soluzione corretta potrebbe essere lavorare con getConnectedNodes(sub, from)
    Prima gli passo un subsystem che sono sicuro abbia archi entranti..
    otterrò l'id dell'arco che collega tot. subsystem a quel sub
    a quel punto tutti quegli archi avranno il campo to che sarà necessariamente sub 
    mentre il from sarà un certo subsystem

    a quel punto itero sulle arrow data che già conosco e dovrebbe essere fatta...

    [a questo punto forse potrebbe essere l'ideale rivedere struttura dell'oggetto arrowsdata]

    */

    testArrow(network){
        let from = "NONE";
        let to = "LOCKING PRIMITIVES";
        let value = this.arrowsData[from][to];
        console.log(value);
        
        let baseEdge = REPOSITORY.edges.getIds({filter: function(e){
          return e.group == from && (REPOSITORY.nodes.get(e.to)).group == to;
        }})[0];

        let[realFrom, realTo] = network.getConnectedNodes(baseEdge);
        if(! realFrom === from) {
            realFrom = to;
            realTo = from;
        }

        network.updateEdge(baseEdge, {
            color: 'red',
            arrows: {
                to: {
                    enabled: true,
                    scaleFactor: value
                }
            }
        });
    }


    getAllClusteredEdges(network, subsystems){
        let set = new Set();
        console.log(subsystems.forEach(function(subsystem){
            let connectedEdges = network.getConnectedEdges("CLUSTER_"+ subsystem);
            connectedEdges.forEach(function(edge){
                let nodes = network.getConnectedNodes(edge);
                if(nodes[0].startsWith("CLUSTER_") && nodes[1].startsWith("CLUSTER_"))
                    set.add(edge);
            });
        }));
        
        let items = []; //pattern [edge, from node, to node]

        [... set].forEach(function(edge){
            let nodes = []; // pattern [from node, to node]
            nodes = network.getConnectedNodes(edge);
            items.push([edge, nodes[0].substring(8), nodes[1].substring(8)]); //[edge, from sub, to sub]
        });
        return items;
    }


    getArrowDimension(fromSubsystem, toSubsystem){
        let dim = this.arrowsData[fromSubsystem];
        if (dim == undefined)
            return 0;
        
        dim = this.arrowsData[fromSubsystem][toSubsystem];
        if(dim == undefined)
            return 0;

        if(dim < 4) return dim;

        return Math.log(dim) / Math.log(2);
    }

    updateClusteredEdges(network, items){
        let arrowsData = this.arrowsData;
        let self = this;
        items.forEach(function([edge, fromsub, tosub]){
            
            let todim = self.getArrowDimension(fromsub, tosub);
            let fromdim = self.getArrowDimension(tosub, fromsub);
            
            console.log(`updateClusteredEdges() || ${fromsub} [${fromdim}] <---> [${todim}] ${tosub} `);                

            network.updateEdge(edge, {
                arrows:{
                    to:{
                        enabled: true,
                        scaleFactor: todim
                    },
                    from:{
                        enabled: true,
                        scaleFactor: fromdim
                    }
                }
            });
        });
    }









}
