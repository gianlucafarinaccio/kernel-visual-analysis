/**
 * In this module are declared all functions for storing/retrieving data-network.
 *
 * @author		Gianluca Farinaccio 
 * @date		22.10.2022 
 * 
 */

import {ui} from './ui-module.js' 

export const repository = function(){
	
/* private */
	let _networkData = {nodes:{}, edges:{}};
	let _nodes = undefined;
	let _edges = undefined;
	let _symbols = undefined;
	let _subsystems = undefined;
	let _usedSubsystems = undefined;
	let _jsonResponse = undefined;
    let _arrowsData = {};

	let _options = {
		interaction: {
	        zoomSpeed: 3,
            hideEdgesOnDrag: true,
            hideEdgesOnZoom: true,
            hover: true,
	    },
        nodes:{
            shape: 'circle'
        },
	    edges: {
            width: 3,
            selectionWidth: 10,
	        smooth: {
	            forceDirection: "none",
	            roundness: 0,
	        },
            arrowStrikethrough: false,
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
 * @privacy private
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
 * @privacy private
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
 * @privacy private
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
 * @privacy private
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


/**
 * Generate an object which contains info about arrows 
 * dimension for every subsystem used in the network.
 * 
 * @privacy public
 * @param {Array} edges : all edges in the network
 * @param {Array} nodes : all nodes in the network
 * @return {Object} arrowsData : info about 'to' arrow
 *         dimension for all subsystems used in the network
 * 
 * default format for arrowsData {
 *      sub1 : { sub2: 10, sub3:30, ...},
 *      sub2 : { sub1: 5, sub5:20, ...},
 * };
 * 
 */
    let generateArrowsData = function(edges, nodes){      
        
        edges.forEach(function(edge){
            let fromSubsystem = edge.group;
            console.log(fromSubsystem);
            
            if(!_arrowsData.hasOwnProperty(fromSubsystem))
                _arrowsData[fromSubsystem] = {};

            let toSubsystem = nodes.get(edge.to).group;

            if(fromSubsystem === toSubsystem)
                return; //skip to next iteration

            if(!_arrowsData[fromSubsystem].hasOwnProperty(toSubsystem))
                _arrowsData[fromSubsystem][toSubsystem] = 0;

            _arrowsData[fromSubsystem][toSubsystem] +=1;
        });
        return _arrowsData;
    };


    const isSubsystem = function (nodeID){
        return nodeID.startsWith('CLUSTER_');
    };

    const getSubsystemID = function(nodeID){
        if(isSubsystem(nodeID))
            return nodeID.substring(8);
        else 
            return undefined;
    }


    const containsNode = function(nodeID){
        return _nodes.get(nodeID) != undefined;
    }


    // a function which return an array [fromdim, to dim]
    // where todim and fromdim are the scale factors of the arrow
    // between this two nodes
    // from and to could be nodes or cluster-nodes
    // remember... cluster-nodes are identified with id 'CLUSTER_[subsname]'
    // if one of two params is a normal-node, the scale factor can be 
    // retrieved from the network data 
    const getArrowScaleFactor = function(fromnode, tonode){
        let scaleFactor = 0;
        
        // @case1 [CLUSTER --> CLUSTER]
        if(isSubsystem(fromnode) && isSubsystem(tonode)){

            fromnode = getSubsystemID(fromnode);
            tonode = getSubsystemID(tonode);
            scaleFactor = _arrowsData[fromnode];
            if (scaleFactor == undefined)
                return 0;
            
            scaleFactor = _arrowsData[fromnode][tonode];
            if(scaleFactor == undefined)
                return 0;          
        }

        // @case2 [CLUSTER --> NODE] 
        else if(isSubsystem(fromnode) && containsNode(tonode)){
            fromnode = getSubsystemID(fromnode);   
            let x = _edges.get({filter: function(item){
                return (item.to === tonode) && (item.group === fromnode);
            }});
            scaleFactor = x.length;
        }


        // @case3 [NODE --> CLUSTER]
        else if(containsNode(fromnode) && isSubsystem(tonode)){
            tonode = getSubsystemID(tonode);
            let x = _edges.get({filter: function(item){
                if(item.from === fromnode){
                    return (_nodes.get(item.to).group === tonode)
                }
                else
                    return false;
            }});
            scaleFactor = x.length;
        }

        else
            return 0;

        if(scaleFactor < 3) return scaleFactor;
        return Math.log(scaleFactor) / Math.log(2);
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
        setEdgeSubsystem : setEdgeSubsystem,
        generateArrowsData : generateArrowsData,
        getArrowScaleFactor : getArrowScaleFactor,
	 };

}();