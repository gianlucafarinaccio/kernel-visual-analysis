/**
 * This module ....
 * 
 * @name        Visualizer.js
 * @author      Gianluca Farinaccio < gianluca.farinaccio@gmail.com >
 * @date        24.11.2022  
 * 
 */

import {options} from './NetworkOptions.js';
import {NetworkExtension} from './modules/NetworkExtension.js'
import {Clustering} from './modules/Clustering.js';
import {UI} from "./modules/UI.js";

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
        visualizer: this,
	};



	this.context.data = contextData;

	

	const nodesAndEdges = {
		nodes: this.context.data.nodes, 
		edges: this.context.data.edges
	};


    // initialize the UI module
    this.ui = new UI(this.context);

	this.context.network = new vis.Network(container, nodesAndEdges, options);
    console.log("** VISUALIZER: network created"); 
    this.ui.status("** VISUALIZER: network created");
    
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
    
    this.context.network.on("stabilizationIterationsDone", function(){
        this.ui.hideLoadingPanel();
        this.context.network.fit();
    }.bind(this));

    this.context.network.once("stabilized", function(params){
        this.fit();
    });


    /**
     * Initizialize the UI's events 
     * 
     * > stop: Stop the physics simulation
     * > play: Play the physics simulation
     * > start: Restart the physics simulation from iteration 0
     * > fit: Fit the network in canvas' window
     * 
    */

    document.getElementById("stop").onclick = function(){
        this.context.network.stopSimulation()
    }.bind(this);

    document.getElementById("play").onclick = function(){
        this.context.network.startSimulation();
    }.bind(this);

    document.getElementById("start").onclick = function(){
        this.ui.showLoadingPanel();
        this.context.network.stabilize();
    }.bind(this);

    document.getElementById("fit").onclick = function() { 
        this.context.network.fit();
    }.bind(this);

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
 * Function for set the edge weight
 * 
 * 
 * @privacy public
 * @parameter {Object} edge: edge to edit
 * @parameter {Integer} fromWeight: weight of from arrow
 * @parameter {Integer} toWeight: weight of to arrow
 * @returns None
 * 
 */
Visualizer.prototype.setEdgeWeight = function(edge, fromWeight, toWeight){
    
    const options = {
        width: (fromWeight + toWeight),
        arrows:{
            to:{
                enabled: true,
                scaleFactor: toWeight
            },
            from:{
                enabled: true,
                scaleFactor: fromWeight
            }
        }
    };

    NetworkExtension.updateEdge(edge, options);
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

