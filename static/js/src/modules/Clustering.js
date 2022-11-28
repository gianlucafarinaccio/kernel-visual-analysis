/**
 * This module ....
 * 
 * @name        Clustering.js
 * @author      Gianluca Farinaccio < gianluca.farinaccio@gmail.com >
 * @date        28.11.2022  
 * 
 */


export function Clustering(context){
    this.context = context;

};


Clustering.prototype.clusterByGroups = function(){
    this.context.data.subsystems.forEach(function(sub){
        console.log("cluster by: " + sub);
        this.clusterByGroup(sub, false);
    }, this);
    this.context.network.body.emitter.emit("_dataChanged");
};


Clustering.prototype.clusterByGroup = function(group, update = true){

    const clusterOptions = {
        joinCondition: function(param){
            return param.group === group;
        },

        clusterNodeProperties:{ 
            id : ("CLUSTER_"+group), 
            label: group, 
            group: group, 
            mass: 5,
            shape: 'square', size:100,
                    font: { size: 70 } ,
                    allowSingleNodeCluster: true 
        },
    };

    this.context.network.clustering.cluster(clusterOptions, update);
};


/**
 * Open a cluster.
 * 
 * @privacy public
 * @param {String} clusterID -> cluster ID
 * @param {Object} network -> Visjs network
 * @returns None
 */
Clustering.prototype.openCluster = function(nodeID){
    this.context.network.clustering.openCluster(nodeID);      
};

