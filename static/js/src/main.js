/**
 * Main module.
 *
 * @author		Gianluca Farinaccio 
 * @date		18.10.2022 
 * 
 */

import {Repository} from "./modules/Repository.js";
import {Routing} from "./modules/Routing.js";
import {Visualizer} from "./Visualizer.js";



window.onload = async function(){
	const ENTRYPOINT = document.getElementById('symname').textContent;
	const NETWORK_DIV = document.getElementById('network');

	const routing = new Routing();

	const repository = new Repository();
	let contextData = await repository.getContextData(ENTRYPOINT);
	if(contextData == null)
		routing.route("/symbol-not-found");

	console.log("data retrieved");
	const visualizer = new Visualizer(contextData, NETWORK_DIV);

}();



// import {options} from './options.js'
// import {repository} from './repository-module.js';
// import {clustering} from './clustering-module.js';
// import {ui} from './ui-module.js'
// import {routing} from './routing-module.js'

// const	NETWORK_DIV = "network";


// async function init(entryPoint){

// 	ui.status("fetching data for entry point: " + entryPoint);
// 	ui.debug("fetching data for entry point: " + entryPoint);
	
// 	if(!await repository.fetchData(entryPoint)){
// 		routing.route("/symbol-not-found")
// 	}
	
// 	ui.status("fetched data for entry point: " + entryPoint);
// 	ui.debug("fetched data for entry point: " + entryPoint);
// 	let container = document.getElementById(NETWORK_DIV);

// 	ui.debug("network creation...");
// 	network = new vis.Network(container, repository.getNetworkData(), options);
// 	ui.status("network created from entry point: " + entryPoint);
// 	ui.debug("network created from entry point: " + entryPoint);	


// 	// 	CANVAS EVENTS
//     network.on("doubleClick", function(params) {
//     	if(params.nodes[0] == null) return;
//     	let node = repository.getNodes().get(params.nodes[0]);
//     	if(node != null)
//     		clustering.clusteringBySubsystem(node.group, repository, network, true);
// 	});

//     network.on("hold", (params) => clustering.openCluster(params.nodes[0], network)); 
//     network.on("click", (params) => ui.debug(params));   
//     network.on("hoverEdge", (params) => console.log(params));
//     network.on("initRedraw", () => console.log('initRedraw'));

//     repository.setEdgeSubsystem(repository.getEdges(), repository.getNodes());
//     repository.generateArrowsData(repository.getEdges(), repository.getNodes());
    
//     clustering.clusteringBySubsystems(repository.getUsedSubsystems(), repository, network)

// }


// /********************************
// *	EVENTS
// ********************************/
//  window.onload = () => {
// 	let entryPoint = document.getElementById('symname').textContent;
// 	REPOSITORY = repository;
// 	ui.init();
// 	init(entryPoint);
// 	ui.setDefaultNetwork(network);
// 	ui.setDefaultRepository(repository);
//  };

// document.getElementById("stop").onclick = function() { network.stopSimulation() };
// document.getElementById("start").onclick = function() { network.startSimulation() };
// document.getElementById("fit").onclick = function() { network.fit() };


