/**
 * In this module are declared the options for vis network.
 *
 * @name 		options.js
 * @author		Gianluca Farinaccio <gianluca.farinaccio@gmail.com>
 * @date		21.11.2022 
 * 
 */

export const options = {
	interaction: {
        zoomSpeed: 3,
        hideEdgesOnDrag: true,
        hideEdgesOnZoom: true,
    },
    nodes:{
        shape: 'dot',
        size:50,
        font: { size: 70 } ,
    },
    edges: {
        width: 3,
        selectionWidth: 10,
        smooth: true,
        arrowStrikethrough: false,
        color: {
            inherit: false
        },
    },
    layout: {
        improvedLayout: false,
        clusterThreshold: 150
    },
    physics: {
        barnesHut: {
            gravitationalConstant: -758211,
            centralGravity: 0.6,
            avoidOverlap: 1,
            springLength: 400,
        },
        timestep: 0.3,
        minVelocity: 30,
        stabilization: {
            enabled: true,
            fit: true
      }
    }
};