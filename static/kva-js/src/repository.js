
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
                arrowsData.fromSubsystem = {};

            let toSubsystem = nodes.get(edge.to).group;

            arrowsData.fromSubsystem.toSubsystem +=1;
        });

        return arrowsData;
    }










}
