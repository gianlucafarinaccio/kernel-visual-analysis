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
    
    const clustering = new Clustering(this.context);
    clustering.clusterByGroups();


    this.context.network.on("doubleClick", this.doubleClickCallback);

    this.context.network.on("hold", this.holdCallback); 
};


Visualizer.prototype.doubleClickCallback = function(params){
    
    if(params.nodes[0] == null) return;
        let node = this.context.data.nodes.get(params.nodes[0]);
        if(node.id != null)
            clustering.clusterByGroup(node.group);    
};



Visualizer.prototype.holdCallback = function(params){
    const nodeID = params.nodes[0];

    if(nodeID.startsWith('CLUSTER_')){
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