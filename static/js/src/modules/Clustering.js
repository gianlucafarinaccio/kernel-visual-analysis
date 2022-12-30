/**
 * This module ....
 * 
 * @name        Clustering.js
 * @author      Gianluca Farinaccio < gianluca.farinaccio@gmail.com >
 * @date        28.11.2022  
 * 
 */


/**
 * Clustering module constructor.
 * 
 * @privacy public
 * @param {Object} context
 * @returns A Clustering object
 * 
 */
export function Clustering(context){
    this.context = context;
    console.log("** CLUSTERING: module initialized");  

};



/**
 * Cluster the network by all groups.
 * In this implementations, groups means Linux Kernel Subsystems.
 * The groups are contained in context data fields.
 * 
 * @privacy private
 * @returns None
 * 
 */
Clustering.prototype.clusterByGroups = function(){
    this.context.data.subsystems.forEach(function(sub){
        console.log("cluster by: " + sub);
        this.clusterByGroup(sub, false);
    }, this);
    this.context.network.body.emitter.emit("_dataChanged");
};


/**
 * Cluster the network by group passed by argument.
 * The optional argument "update" has a default value True.
 * If the value of "update" is False, the network doesn't 
 * update its data and the changes doesn't appear on the canvas.
 * 
 * @privacy private
 * @params {String} group
 * @params {Boolean} [optional] update
 * @returns None
 * 
 */
Clustering.prototype.clusterByGroup = function(group, update = true, weighted = true){

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

   if(weighted){
       let connectedEdges = this.getConnectedEdges("CLUSTER_"+group, network);
        connectedEdges.forEach(function(item){
        let todim = this.context.visualizer.getArrowScaleFactor(item[1], item[2]);
        let fromdim = this.context.visualizer.getArrowScaleFactor(item[2], item[1]);
        this.context.visualizer.setEdgeWeight(item[0], fromdim, todim);
        },this);
      this.context.network.body.emitter.emit("_dataChanged");
    }

};


/**
 * Find all connected edges to a cluster and returns it.
 * 
 * @privacy public
 * @param {String} group
 * @returns Array{Array} items: format of each item [edge, from node, to node]
 */

Clustering.prototype.getConnectedEdges = function(group){

    let connectedEdges = this.context.network.getConnectedEdges(group);        
    if(connectedEdges.length === 0)
        throw new Error("0 connected edges to: " + group);

    let items = [];
    connectedEdges.forEach(function(edge){
        let arr = this.context.network.getConnectedNodes(edge);
        let x = [edge, arr[0], arr[1] ];
        items.push(x);
    },this);
    return items;
};



/**
 * Open a cluster.
 * 
 * @privacy public
 * @param {String} nodeID
 * @returns None
 */
Clustering.prototype.openCluster = function(nodeID){
    this.context.network.clustering.openCluster(nodeID);      
};

