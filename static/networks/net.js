function myFunction(g) {
    console.log(g);
    var parsedData = vis.parseDOTNetwork(g);

    var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }

    var options = parsedData.options;
    options = parsedData.options =
        {
            physics: {
                enabled: false
            },
            interaction: {
                hideEdgesOnDrag: true,
                hideEdgesOnZoom: true,
            },
            edges: {
                width: 0.2,
                arrows: {
                    to: {scaleFactor: 0.5}
                }
            }
        };

    var container = document.getElementById("mynetwork");

    // create a network
    var network = new vis.Network(container, data, options);
}