/*************************************************
*	INDEX MODULE
*	18.10.2022
*	Gianluca Farinaccio
*************************************************/


// import {Repository} from './repository.js';
//import {clusteringBySubsystems, clusteringBySubsystem, openCluster} from './clustering.js';
import {repository} from './repository-module.js';
import {clustering} from './clustering-module.js';
import {ui} from './ui-module.js'

// const 	REPOSITORY = new Repository();
const	NETWORK_DIV = "network";
const STATUS_DIV = "status";
// let		network = null;


async function init(entryPoint){
	// REPOSITORY = new Repository();

	status(STATUS_DIV, "fetching data for entry point: " + entryPoint);
	ui.debug("fetching data for entry point: " + entryPoint);
	await repository.fetchData(entryPoint);
	
	status(STATUS_DIV, "fetched data for entry point: " + entryPoint);
	ui.debug("fetched data for entry point: " + entryPoint);
	let container = document.getElementById(NETWORK_DIV);

	ui.debug("network creation...");
	network = new vis.Network(container, repository.getNetworkData(), repository.getOptions());
	status(STATUS_DIV, "network created from entry point: " + entryPoint);
	ui.debug("network created from entry point: " + entryPoint);	


	ui.debug("clustering subsystems...");	
	clustering.clusteringBySubsystems(repository.getSubsystems(), network);
	status(STATUS_DIV, "subsystems clustered...");	


	// 	CANVAS EVENTS
    network.on("doubleClick", function(params) {
    	if(params.nodes[0] == null) return;
    	let node = repository.nodes.get(params.nodes[0]);
    	if(node != null)
    		clustering.clusteringBySubsystem(node.group, network);
	});

    network.on("hold", (params) => clustering.openCluster(params.nodes[0], network)); 
    network.on("click", (params) => ui.debug(params));   

    // repository.setEdgeSubsystem(repository.getEdges(), repository.getNodes());
    // repository.generateArrowsData(repository.getEdges(), repository.getNodes());
}



/********************************
*	EVENTS
********************************/
 window.onload = () => {
	let entryPoint = document.getElementById('symname').textContent;
	init(entryPoint);
 };

document.getElementById("stop").onclick = function() { network.stopSimulation() };
document.getElementById("start").onclick = function() { network.startSimulation() };



/********************************
*	FUNCTIONS
* 
********************************/

function status(elementID, text){
	document.getElementById(elementID).innerText = "STATUS => [ " + text + " ]";
}

