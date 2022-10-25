/**
 * In this module are declared all functions for clustering a network.
 *
 * @author		Gianluca Farinaccio 
 * @date		22.10.2022 
 * 
 */

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
			console.log(x);
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
    const clusteringBySubsystem = function(subsystem, repository, network = _network){
	   const clusterOptions = {
	        joinCondition: function(param){
	            return param.group === subsystem;
	        },

	        clusterNodeProperties:{ 
	        	id : ("CLUSTER_"+subsystem), 
	        	label: ("CLUSTER_"+subsystem), 
	        	group: subsystem, 
	        	mass: 5,
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
	   let connectedEdges = getConnectedEdges("CLUSTER_"+subsystem, network);
	    // [edge,fromnode,tonode]
	    //todim = repo.getArrowScale(from,to); tonode and fromnode could be clusternode or node
	    //fromdim = repo.getArrowScale(to,from); tonode and fromnode could be clusternode or node
	    // update edge with fromdim and to dim
	   connectedEdges.forEach(function(item){
	   	console.log(item);
	   	let todim = repository.getArrowScaleFactor(item[1], item[2]);
	   	let fromdim = repository.getArrowScaleFactor(item[2], item[1]);
	   	network.clustering.updateEdge(item[0], 
	   		{
	   			arrows:{
	   				to:{
	   					enabled: true,
	   					scaleFactor: todim
	   				},
	   				from:{
	   					enabled: true,
	   					scaleFactor: fromdim
	   				}
	   			}
	   		});	    	
	   });

	};


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