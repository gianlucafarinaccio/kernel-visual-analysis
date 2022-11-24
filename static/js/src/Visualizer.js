/**
 * This module ....
 * 
 * @name        Visualizer.js
 * @author      Gianluca Farinaccio < gianluca.farinaccio@gmail.com >
 * @date        24.11.2022  
 * 
 */

import {Repository} from './modules/Repository.js';
import {options} from './options.js';

export function Visualizer(entrypoint, container){

	this.context = {
		network: 	null,
		data: 		null
	};
	
	this.repository = new Repository();
	this.context.data = this.repository.getContextData();

	const nodesAndEdges = {
		nodes: this.context.data.nodes, 
		edges: this.context.data.edges
	};

	//this.context.network = new vis.Network(container, nodesAndEdges, options);
};


Visualizer.prototype = function(){

	const getContext = function(){
		return this.context;
	};


	return{
		getContext: getContext
	};

}();




// main.js 

// import {Visualizer} from "./Visualizer.js"

// window.onload = () => {
// 	const ENTRYPOINT = document.getElementById('symname').textContent;
// 	const NETWORK_DIV = "network";

// 	const visualizer = new Visualizer(ENTRYPOINT, NETWORK_DIV);

// }