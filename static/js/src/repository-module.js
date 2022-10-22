/**
 * In this module are declared all functions for storing/retrieving data-network.
 *
 * @author		Gianluca Farinaccio 
 * @date		22.10.2022 
 * 
 */

export const repository = function(){
	
/* private */
	let _networkData = {nodes:{}, edges:{}};
	let _nodes = undefined;
	let _edges = undefined;
	let _symbols = undefined;
	let _subsystems = undefined;
	let _usedSubsystems = undefined;
	let _jsonResponse = undefined;

	let _options = {
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

	let getOptions = function(){ return _options; };

	let getNetworkData = function(){ return _networkData; };

	let getNodes = function(){ return _nodes; };

	let getEdges = function(){ return _edges; };

	let getSymbols = function(){ return _symbols; };	

	let getSubsystems = function(){ return _subsystems; };	

	let getUsedSubsystems = function(){ return _usedSubsystems; };	


/**
 * Fetch data from backend.
 * 
 * @privacy public
 * @param {String} entryPoint: entry point to fetch from backend 
 * @returns None
 */
	let fetchData = async function(entryPoint){
        const response = await fetch('/retrieve/symbol/' + entryPoint, { method: 'GET'});
		if (!response.ok) 
			throw new Error(`HTTP error! status: ${response.status}`);
		
        //parsing data
        _jsonResponse = await response.json();
		parseResponse(_jsonResponse);
        parseSubsystems(_nodes, _symbols);
        _subsystems = generateSubsystemsList(_symbols);
        _usedSubsystems = generateUsedSubsystemsList(_nodes);
	};


/**
 * Parse json response 
 * 
 * @privacy public
 * @param {Object} response 
 * @returns None
 */
	let parseResponse = function(response){
		let parsed = vis.parseDOTNetwork(response.graph);
        _nodes = new vis.DataSet(parsed.nodes);
        _edges = new vis.DataSet(parsed.edges);
        _networkData.nodes = _nodes;
        _networkData.edges = _edges;
        _symbols = response.symbols;
	};


/**
 * Parse subsystems from fetched data and add subsystem
 * to all node of the network.
 * 
 * Default symbols format
 * symbols = [{
 * 		FuncName: "symbolName", 
 * 		subsystems: ["s1","s2",...]
 * 	}];
 * 
 * @privacy public
 * @param {Array} nodes: nodes of the network
 * @param {Array} symbols: subsystems of each node
 * @returns None
 */
    let parseSubsystems = function(nodes, symbols){
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
    };


/**
 * Generate an array which contains all subsystems
 * contained in fetched data.
 * 
 * @privacy public
 * @param {Array} symbols 
 * @returns {Array}
 */
    let generateSubsystemsList = function(symbols){
        const subsystems = ["NONE"];

        symbols.forEach(function(symbol){
            symbol.subsystems.forEach(function(subsystem){
                if(!subsystems.includes(subsystem))
                    subsystems.push(subsystem);
            }); 
        });
        return subsystems;
    };


/**
 * Generate an array which contains all subsystems
 * (used) contained in fetched data.
 * 
 * @privacy public
 * @param {Array} nodes 
 * @returns {Array}
 */
    let generateUsedSubsystemsList = function(nodes){
        let all = [];

        nodes.forEach(function(node){
            all.push(node.group);
        });
        return [... new Set(all)]; //remove duplicates
    };


/**
 * Set the group properties of all edges.
 * The group of an edge is the same group of the 
 * 'from' node of the edge.
 * 
 * @privacy public
 * @param {Array} symbols 
 * @returns {Array}
 */
    let setEdgeSubsystem = function(edges, nodes){
        edges.forEach(function(properties){
            properties.group = nodes.get(properties.from).group;
        });
    };



	 return{
	 	getOptions : getOptions,
		getNetworkData : getNetworkData,
		getNodes : getNodes,
		getEdges : getEdges,
		getSymbols : getSymbols,
		getSubsystems : getSubsystems,	
		getUsedSubsystems : getUsedSubsystems, 	
		fetchData : fetchData,
	 };



}();