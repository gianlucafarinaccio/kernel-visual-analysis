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


/**
 * Clustering the network by a subsystem.
 * 
 * @privacy public
 * @param {String} subsystem -> A subsystem name 
 * @param {Object} network -> Visjs network
 * @returns None
 */
    const clusteringBySubsystem = function(subsystem, network = _network){
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
	};


/**
 * Clustering the network by all subsystems.
 * 
 * @privacy public
 * @param {Array} subsystems -> A subsystem array 
 * @param {Object} network -> Visjs network
 * @returns None
 */
    const clusteringBySubsystems = function(subsystems, network = _network){
		subsystems.forEach(function(subsystem){
		    clusteringBySubsystem(subsystem, network);
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
    	clusteringBySubsystem : clusteringBySubsystem,
    	clusteringBySubsystems : clusteringBySubsystems,
    	openCluster : openCluster,
    };	

}();