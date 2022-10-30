/**
 * In this module are declared all functions for clustering a network.
 *
 * @author		Gianluca Farinaccio 
 * @date		22.10.2022 
 * 
 */

import {ui} from './ui-module.js' 

export const clustering = function(){

	/* private */
    let _network = undefined;


/**
 * Set the default network for all functions.
 * 
 * @privacy public
 * @param {Object} network -> Visjs network
 * @returns None
 */
    const setDefaultNetwork = function(network){
    	_network = network;
    }


	const getConnectedEdges = function(cluster, network = _network){
		let connectedEdges = network.getConnectedEdges(cluster);		
		if(connectedEdges.length === 0)
			throw new Error("0 connected edges to: " + cluster);

		let items = [];
		connectedEdges.forEach(function(edge){
			let arr = network.getConnectedNodes(edge);
			let x = [edge, arr[0], arr[1] ];
			items.push(x);
		});
		return items;
	};


/**
 * Clustering the network by a subsystem.
 * 
 * @privacy public
 * @param {String} subsystem -> A subsystem name 
 * @param {Object} network -> Visjs network
 * @returns None
 */
   const clusteringBySubsystem = async function(subsystem, repository, network = _network, scale = false){
	   const clusterOptions = {
	        joinCondition: function(param){
	            return param.group === subsystem;
	        },

	        clusterNodeProperties:{ 
	        	id : ("CLUSTER_"+subsystem), 
	        	label: subsystem, 
	        	group: subsystem, 
	        	mass: 5,
	        	shape: 'square', size:100,
						font: { size: 70 } ,
						allowSingleNodeCluster: true 
			 		},
	   };

	   network.clustering.cluster(clusterOptions);
	   console.log("** CLUSTERING: clusteringBySubsystem() => " + subsystem);
	   ui.status("** CLUSTERING: clusteringBySubsystem() => " + subsystem);
	   
	   if(scale){
		   let connectedEdges = getConnectedEdges("CLUSTER_"+subsystem, network);
		   connectedEdges.forEach(function(item){
		   	let todim = repository.getArrowScaleFactor(item[1], item[2]);
		   	let fromdim = repository.getArrowScaleFactor(item[2], item[1]);
		   	dynamicArrow([item[0], fromdim, todim] ,network);
			});
		}
	};


	const dynamicArrow = function(item, network = _network){
			console.log("** CLUSTERING: dynamicArrow() => " + item);
			ui.status("** CLUSTERING: dynamicArrow() => " + item);
      network.updateEdge(item[0], {
      		width: (item[1] + item[2]),
          arrows:{
              to:{
                  enabled: true,
                  scaleFactor: item[2]
              },
              from:{
                  enabled: true,
                  scaleFactor: item[1]
              }
          }
      });
	}


/**
 * Clustering the network by all subsystems.
 * 
 * @privacy public
 * @param {Array} subsystems -> A subsystem array 
 * @param {Object} network -> Visjs network
 * @returns None
 */
	const clusteringBySubsystems = function(subsystems, repository, network = _network){
			subsystems.forEach(function(subsystem){
			    clusteringBySubsystem(subsystem, repository, network);
			});

		let items = getEdges(repository.getUsedSubsystems(), network);
		items.forEach(function(item){
			setTimeout(function(){
		   	let todim = repository.getArrowScaleFactor("CLUSTER_"+item[1], "CLUSTER_"+item[2]);
		   	let fromdim = repository.getArrowScaleFactor("CLUSTER_"+item[2], "CLUSTER_"+item[1]);
		   	dynamicArrow([item[0],fromdim,todim], network);
			},100);

		});   	
	};


	const getEdges = function(subsystems, network = _network){
	  let set = new Set();
	  subsystems.forEach(function(subsystem){
	      let connectedEdges = network.getConnectedEdges("CLUSTER_"+ subsystem);
	      connectedEdges.forEach(function(edge){
          	let nodes = network.getConnectedNodes(edge);
          	if(nodes[0].startsWith("CLUSTER_") && nodes[1].startsWith("CLUSTER_"))
					set.add(edge);
	      });
	  });
	  
	  let items = []; //pattern [edge, from node, to node]

	  [... set].forEach(function(edge){
	      let nodes = []; // pattern [from node, to node]
	      nodes = network.getConnectedNodes(edge);
	      items.push([edge, nodes[0].substring(8), nodes[1].substring(8)]); //[edge, from sub, to sub]
	  });
	  return items;
	};

/**
 * Open a cluster.
 * 
 * @privacy public
 * @param {String} clusterID -> cluster ID
 * @param {Object} network -> Visjs network
 * @returns None
 */
	const openCluster = function(clusterID, network = _network){
		try{
		    if(clusterID.startsWith('CLUSTER_')){
		      network.clustering.openCluster(clusterID);
		    	console.log("** CLUSTERING: openCluster() => opening " + clusterID);   
		    }
		} 
		catch(error){
		    console.log("** CLUSTERING: openCluster() => impossibile to open this cluster");     
		}		
	};


    /* public */
    return {
    	setDefaultNetwork	: setDefaultNetwork,
    	getConnectedEdges : getConnectedEdges,
    	clusteringBySubsystem : clusteringBySubsystem,
    	clusteringBySubsystems : clusteringBySubsystems,
    	openCluster : openCluster,
    };	

}();