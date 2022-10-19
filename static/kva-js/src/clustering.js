/*************************************************
*	CLUSTERING MODULE
*	18.10.2022
*	Gianluca Farinaccio
*************************************************/



export function clusteringBySubsystems(network, subsystems){
	
	subsystems.forEach(function(subsystem){
	    clusteringBySubsystem(network, subsystem);
	});
};



export function clusteringBySubsystem(network, subsystem){

    var clusterOptions = {
        joinCondition: function(param){
            return param.group === subsystem;
        },

        clusterNodeProperties:{ 
        	id : ("CLUSTER_"+subsystem), 
        	label: ("CLUSTER_"+subsystem), 
        	group: subsystem, 
        	shape: 'square', size:50,
			font: { bold: { size: 24 } },
			allowSingleNodeCluster: true },

        clusterEdgeProperties :{
            label:"EDGE_CLUSTER_"+subsystem,
            id: "EDGE_CLUSTER_"+subsystem,          
        },
    }
    network.clustering.cluster(clusterOptions);
    console.log("** CLUSTERING: clusteringBySubsystem() => " + subsystem);

};


export function openCluster(network, cluster){

	try{
	    if(cluster.startsWith('CLUSTER_')){
	        network.clustering.openCluster(cluster);
	    	console.log("** CLUSTERING: openCluster() => opening " + cluster);   
	    }
	} 
	catch(error){
	    console.log("** CLUSTERING: openCluster() => impossibile to open this cluster");     
	}
}



/*
	PROBLEMA CREAZIONE FRECCE DINAMICHE IN FUNZIONE 
	DEL NUMERO DI ARCHI ENTRANTI E USCENTI IN UN CLUSTER.

	1. Non posso impostare un id a mio piacimento per il 
	   clusteredEdge... potrebbe essere 1 o anche 1000
	   --> non posso decidere io gli ID

	2. Il vecchio metodo non teneva conto che potrebbero 
	   verificarsi dei casi in cui il clustering di un 
	   subsystem non contiene archi
	   (perchè li hanno già trasformati gli altri cluster)
	   --> non riesco a risalire ad un arco di partenza per 
	   	   poi ritrovare il clusteredEdge associato a quel 
	   	   "cluster senza archi" 

	Possibili soluzioni...

	1. Potrei 'pre-calcolare' queste quantità di to e from
	   per ogni subsystem con i subsystem collegati...
	   Partendo dagli edges del network e combinando i subsystems(?)

	2. Potrei Verificare se c'è qualche struttura dati nascosta
*/



// function startClustering(subsystems){
	
// 	let fromDim = 1;
// 	let toDim = 1;
// 	let containedEdge = "";
// 	let containedNodesIds = 0;

// 	subsystems.forEach(function(subsystem){
// 	    var clusterOptions = {
// 	        joinCondition: function(param){
// 	            return param.group === subsystem;
// 	        },

//             processProperties: function(clusterNodeProperties,containedNodes,containedEdges){
//             	console.log(containedNodes);
//             	console.log(containedEdges);
//                 containedEdge = containedEdges[0].id; // si blocca qua, c'è un subsystem che risulta con 0 archi ???
//                 containedNodesIds = new vis.DataSet(containedNodes).getIds();
//                 var f = 0, t = 0;
//                 for(let i = 0; i < containedEdges.length; i++){
//                     if(containedNodesIds.includes(containedEdges[i].to))
//                         f++;
//                     else 
//                         t++;
//                 }
//                 fromDim = f;
//                 toDim = t;
//                 return clusterNodeProperties;
//             },

// 	        clusterNodeProperties:{ 
// 	        	id : ("CLUSTER_"+subsystem), 
// 	        	label: ("CLUSTER_"+subsystem), 
// 	        	group: subsystem, 
// 	        	shape: 'square', size:50,
// 				font:{ bold:{size:24} },
// 	        	allowSingleNodeCluster: true},

//             clusterEdgeProperties :{
//                 label:"EDGE_CLUSTER_"+subsystem,
//                 id: "EDGE_CLUSTER_"+subsystem,          
//             },
// 	    }
// 	    network.clustering.cluster(clusterOptions);
// 	    let e = network.getClusteredEdges(containedEdge)[0];
//         network.clustering.updateEdge(e, 
//             {                         
//             arrows:{
//                     to:{
//                         enabled: true,
//                         scaleFactor: toDim*0.5
//                     },
//                     from:{
//                         enabled: true,
//                         scaleFactor: fromDim*0.5
//                     }
//             } });

// 	    status(STATUS_DIV, "clustered group: " + subsystem);
// 	    // network.stopSimulation();		
// 	});
// }


// function closeCluster(params){
//     //console.log(params.nodes);
//     var fromDim;
//     var toDim;
//     var containedEdge;
	
//     if(params.nodes.length == 1){
//         selected = nodes.get(params.nodes[0]);

//         if(selected == null) return;

//         var clusterNodeId = "NODE_" + selected.cid;
//         var clusterEdgeId = "EDGE_" + selected.cid;

//         var clusterOptions = {
//             joinCondition: function(nodeOptions){
//             	return param.group === gr;
//             }, 
//             processProperties: function(clusterNodeProperties,containedNodes,containedEdges){
//                 containedEdge = containedEdges[0].id;
//                 containedNodesIds = new vis.DataSet(containedNodes).getIds();
//                 var f = 0, t = 0;
//                 for(let i = 0; i < containedEdges.length; i++){
//                     if(containedNodesIds.includes(containedEdges[i].to)){
//                         console.log('from');
//                         f++;
//                     }
//                     else {
//                         console.log('to');
//                         t++;
//                     }
//                 }
//                 fromDim = f;
//                 toDim = t;
//                 return clusterNodeProperties;
//             },
//             clusterNodeProperties: {
//                 label:"CLUSTER_1",
//                 id: clusterNodeId,
//                 fixed: {x: true, y: true}, 
//                 color:{
//                     background:'rgba(0,0,0,1)', 
//                     border:'rgba(0,0,0,0.5)',
//                     highlight: {
//                         background: 'rgba(0,0,0,0.8)',
//                         border: 'rgba(0,0,0,1)'
//                     },
//                 }, 
//                 size: 40,
//                 shape:'square'                       
//             },
//             clusterEdgeProperties :{
//                 label:"EDGE_CLUSTER_1",
//                 id: "EDGE_CLUSTER_1",          
//             },
//         };

//         network.clustering.cluster(clusterOptions);
//         e = network.getClusteredEdges(containedEdge)[0];
//         console.log(toDim, fromDim);
//         network.clustering.updateEdge(e, 
//             {                         
//             arrows:{
//                     to:{
//                         enabled: true,
//                         scaleFactor: toDim
//                     },
//                     from:{
//                         enabled: true,
//                         scaleFactor: fromDim
//                     }
//             } });

//     }
// }