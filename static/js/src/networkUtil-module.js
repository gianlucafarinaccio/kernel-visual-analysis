export const networkUtil = function(){

  /**
   * Using a clustered nodeId, update with the new options
   *
   * @param {Node.id} clusteredNodeId
   * @param {object} newOptions
   */
  const updateClusteredNode = function(network, clusteredNodeId, newOptions) {
    if (clusteredNodeId === undefined) {
      throw new Error("No clusteredNodeId supplied to updateClusteredNode.");
    }
    if (newOptions === undefined) {
      throw new Error("No newOptions supplied to updateClusteredNode.");
    }
    if (network.body.nodes[clusteredNodeId] === undefined) {
      throw new Error(
        "The clusteredNodeId supplied to updateClusteredNode does not exist."
      );
    }

    network.body.nodes[clusteredNodeId].setOptions(newOptions);
    // this.body.emitter.emit("_dataChanged");
  };


  /**
   * Using a clustered nodeId, update with the new options
   *
   * @param {Node.id} nodeId
   * @param {object} newOptions
   */
  const updateNode = function(network, nodeId, newOptions) {
    if (nodeId === undefined) {
      throw new Error("No nodeId supplied to updateClusteredNode.");
    }
    if (newOptions === undefined) {
      throw new Error("No newOptions supplied to updateClusteredNode.");
    }
    if (network.body.nodes[nodeId] === undefined) {
      throw new Error(
        "The nodeId supplied to updateClusteredNode does not exist."
      );
    }

    network.body.nodes[nodeId].setOptions(newOptions);
    // this.body.emitter.emit("_dataChanged");
  };



	return{
		updateClusteredNode: updateClusteredNode,
		updateNode: updateNode,
	};

}();