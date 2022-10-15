import {Repository} from './repository.js';

const 	REPOSITORY = new Repository();
const	NETWORK_DIV = "network";
const	STATUS_DIV = "status";

let		network;

/*
*	EVENTS
*/
window.onload = () => {
	let entryPoint = document.getElementById('symname').textContent;
	init(entryPoint);
};

async function init(entryPoint){

	document.getElementById(STATUS_DIV).innerText = "fetching data for entry point: " + entryPoint;
	await REPOSITORY.fetchData(entryPoint);
	document.getElementById(STATUS_DIV).innerText = "fetched data for entry point: " + entryPoint;
	let networkData = REPOSITORY.getNetworkData();
	let container = document.getElementById(NETWORK_DIV);
	let options = REPOSITORY.getDefaultOptions();

	document.getElementById(STATUS_DIV).innerText = "network creation...";
	network = new vis.Network(container, networkData, options);
	document.getElementById(STATUS_DIV).innerText = "network created from entry point: " + entryPoint;
	network.stopSimulation();


}






