
export const clustering = function(){

	/* private */
    let _network = undefined;


    const setDefaultNetwork = function(network){
    	_network = network;
    }


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


    const clusteringBySubsystems = function(subsystems, network = _network){
		subsystems.forEach(function(subsystem){
		    clusteringBySubsystem(subsystem, network);
		});
	};


	const openCluster = function(clusterID, network = _network){
		try{
		    if(cluster.startsWith('CLUSTER_')){
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
    	setDefaultNetwork		: setDefaultNetwork,
    	clusteringBySubsystem 	: clusteringBySubsystem,
    	clusteringBySubsystems	: clusteringBySubsystems,
    	openCluster				: openCluster,
    };	

}();