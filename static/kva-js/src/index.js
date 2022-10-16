import {Repository} from './repository.js';

const 	REPOSITORY = new Repository();
const	NETWORK_DIV = "network";
const	STATUS_DIV = "status";
let		network;


async function init(entryPoint){
	status(STATUS_DIV, "fetching data for entry point: " + entryPoint);
	await REPOSITORY.fetchData(entryPoint);
	
	status(STATUS_DIV, "fetched data for entry point: " + entryPoint);
	let container = document.getElementById(NETWORK_DIV);

	status(STATUS_DIV, "network creation...");
	network = new vis.Network(container, REPOSITORY.networkData, REPOSITORY.options);
	
	status(STATUS_DIV, "network created from entry point: " + entryPoint);

	status(STATUS_DIV, "importing subsystems...");	
	addSubsystems(REPOSITORY.nodes, REPOSITORY.symbols);
	status(STATUS_DIV, "subsystems imported...");

	// 	CANVAS EVENTs
    network.on("doubleClick", clust);
    network.on("hold", open);    
}

function status(elementID, text){
	document.getElementById(elementID).innerText = "STATUS => [ " + text + " ]";
}


function addSubsystems(nodes, symbols){
	let update = []
    
    symbols.forEach(function(symbol){
		let symbolName = symbol.FuncName;
		let subsystems = symbol.subsystems;
		let node = nodes.get(symbolName);
		
		node.group = subsystems[0];
		update.push(node);
    });
    nodes.updateOnly(update);
}


function clust(params){
	console.log(params);
	let gr = REPOSITORY.nodes.get(params.nodes[0]).group;
    var clusterOptions = {
        joinCondition: function(param){
            console.log(param);
            return param.group === gr;
        },
        clusterNodeProperties:{ id : ("CLUSTER_"+gr), label: ("CLUSTER_"+gr), group: gr, shape: 'box',
        						allowSingleNodeCluster: true},
    }
    network.clustering.cluster(clusterOptions);
    status(STATUS_DIV, "clustered group: " + gr);
    network.stopSimulation();
}

function open(params){
    console.log(params);
    if(params.nodes.length == 1){
        let n = new String(params.nodes[0]);
        try{
            if(n.startsWith('CLUSTER_'))
                network.clustering.openCluster(params.nodes[0]);
        } catch(error){
            console.log(error);
        }

    }                
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
/********************************/

