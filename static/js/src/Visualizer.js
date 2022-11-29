/**
 * This module ....
 * 
 * @name        Visualizer.js
 * @author      Gianluca Farinaccio < gianluca.farinaccio@gmail.com >
 * @date        24.11.2022  
 * 
 */

import {options} from './options.js';
import {Clustering} from './modules/Clustering.js';

/**
 * Visualizer module constructor.
 * 
 * @privacy public
 * @param {Object} contextData
 * @param {String} container
 * @returns A Visualizer object
 * 
 */
export function Visualizer(contextData, container){

	this.context = {
		network: 	null,
		data: 		null,
	};

	this.context.data = contextData;
	

	const nodesAndEdges = {
		nodes: this.context.data.nodes, 
		edges: this.context.data.edges
	};

	this.context.network = new vis.Network(container, nodesAndEdges, options);
    console.log("network created");
    
    /**
     * Initizialize the Clustering module 
     *  
     * > At startup, the network appears already clustered by groups.
     * > Each color defined a different Linux Kernel Subsystem
     * 
     * For more information about the handling of groups and cluster, plase see 
     * > ./modules/Clustering.js
     * > ./modules/Repository.js
     * 
    */

    this.clustering = new Clustering(this.context);
    this.clustering.clusterByGroups();

    
    /**
     * Initizialize the network's events 
     * 
     * > doubleClick: on a non-clustered node, this action cluster the node of same group
     * > hold: on a clustered-node, this action open the cluster
     * 
     * For more information about the handling of groups and cluster, plase see 
     * > ./modules/Clustering.js
     * > ./modules/Repository.js
     * 
     * For more information about Vis.js and its events please visit
     * > https://visjs.github.io/vis-network/docs/network/#Events
     * 
    */
    this.context.network.on("doubleClick", (params) => this.doubleClickCallback(params));
    this.context.network.on("hold", (params) => this.holdCallback(params)); 
};


/**
 * Callback for handling "doubleClick" network's event.
 * 
 * 
 * @privacy private
 * @returns {Object} params
 * 
 */
Visualizer.prototype.doubleClickCallback = function(params){
    if(params.nodes[0] == null) 
        return;
    let node = this.context.data.nodes.get(params.nodes[0]);
    if(node.id != null)
        this.clustering.clusterByGroup(node.group);    
};


/**
 * Callback for handling "hold" network's event.
 * 
 * 
 * @privacy private
 * @returns {Object} params
 * 
 */
Visualizer.prototype.holdCallback = function(params){
    const nodeID = params.nodes[0];

    if(nodeID == undefined)
        return;

    else if(nodeID.startsWith('CLUSTER_')){
        this.context.network.clustering.openCluster(nodeID);
        console.log("** CLUSTERING: openCluster() => opening " + nodeID);  
    } 
    else
        console.log("** CLUSTERING: openCluster() => impossibile to open this cluster");     
};



/**
 * Get the context of Visualizer.
 * 
 * @privacy public
 * @returns {Object} context
 * 
 */
Visualizer.prototype.getContext = function(){
	return this.context;
}

