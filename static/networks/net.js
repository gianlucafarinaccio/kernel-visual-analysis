function myFunction(g) {
    console.log(g);
    var parsedData = vis.parseDOTNetwork(g);

    var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }

    var options = parsedData.options;
    options = parsedData.options =
        {physics: {
            stabilization: false,
            barnesHut: {
                theta: 1,
                gravitationalConstant: -40000,
                centralGravity: 0.1,
                springLength: 95,
                springConstant: 0.04,
                damping: 0.09,
                avoidOverlap: 0
            }
        },
        interaction:{
            hideEdgesOnDrag: true,
            hideEdgesOnZoom: true,
        },
        edges: {
            smooth:{
                type: 'continuous'
            },
            width: 0.2,
            arrows:{
                to: {scaleFactor: 0.5}
            }
        },
        };

    var container = document.getElementById("mynetwork");

    // create a network
    var network = new vis.Network(container, data, options);
}