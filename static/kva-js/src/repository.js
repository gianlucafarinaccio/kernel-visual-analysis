
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
                        avoidOverlap: 1
                    },
                    timestep: 0.3,
                    minVelocity:10,
                    stabilization: false
                }
		};

		this.networkData = "";

	}


	async fetchData(entryPoint){
        const response = await fetch('/retrieve/symbol/' + entryPoint, { method: 'GET'});
		if (!response.ok) 
			throw new Error(`HTTP error! status: ${response.status}`);
		this.jsonResponse = await response.json();
		this.parseResponse(this.jsonResponse);
	}


	parseResponse(response){
		let parsed = vis.parseDOTNetwork(response.graph);
        this.nodes = new vis.DataSet(parsed.nodes);
        this.edges = new vis.DataSet(parsed.edges);
        this.networkData = {nodes: this.nodes, edges: this.edges};

        this.symbols = response.symbols;

	}


	getDefaultOptions(){
		return this.options;
	}

	getNetworkData(){
		return this.networkData;
	}

	getNodes(){
		return this.networkData.nodes;
	}

	getEdges(){
		return this.networkData.edges;
	}

	getSymbols(){
		return this.symbols;
	}

}