/**
 * This module ....
 * 
 * @name        Visualizer.js
 * @author      Gianluca Farinaccio < gianluca.farinaccio@gmail.com >
 * @date        24.11.2022  
 * 
 */

import {options} from './options.js';


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
		data: 		null
	};

	this.context.data = contextData;
	

	const nodesAndEdges = {
		nodes: this.context.data.nodes, 
		edges: this.context.data.edges
	};

	//this.context.network = new vis.Network(container, nodesAndEdges, options);
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