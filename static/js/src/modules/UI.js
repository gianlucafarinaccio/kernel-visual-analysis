/**
 * In this module are declared functions for handling the UI events.
 *
 * @name 		UI.js
 * @author		Gianluca Farinaccio <gianluca.farinaccio@gmail.com>
 * @date		03.12.2022 
 * 
 */
import {NetworkExtension} from './NetworkExtension.js'

export function UI(context){

    this.context = context;

    this.components = {
        search: document.getElementById("search"),
        searchField: document.getElementById("search-field"),
        reset: document.getElementById("reset-filter"),
    };
	
    this.components.search.onclick = function(){
        this.search();
    }.bind(this);

    this.components.reset.onclick = function(){ 
        this.resetFilter();
    }.bind(this);

    console.log("** UI: module initialized");  

};


UI.prototype.status = function(message){
    
    document.getElementById("status").innerText = "STATUS => [ " + message + " ]";
};



UI.prototype.showLoadingPanel = function(){

    const loading = document.getElementById("loading");
    loading.classList.add("d-block");
    loading.classList.remove("d-none");
    
    const visualizer = document.getElementById("visualizer");
    visualizer.classList.add("d-none");
    visualizer.classList.remove("d-block");     
};


UI.prototype.hideLoadingPanel = function(){

    const loading = document.getElementById("loading");
    loading.classList.remove("d-block");
    loading.classList.add("d-none");
    
    const visualizer = document.getElementById("visualizer");
    visualizer.classList.remove("d-none");
    visualizer.classList.add("d-block");
};


UI.prototype.search = function(){
    console.log(this);
    console.log(NetworkExtension);
    let word = this.components.searchField.value;
    let clusters = new Set();

    console.log(word);
    if(word != "" && word != undefined){

        let nodes = Object.entries(this.context.network.body.nodes);
        console.log(nodes);
        
        // li oscuro prima tutti
        nodes.forEach(function(node){
            let options = node[1].options;
            let newOptions = { opacity: 0.1, font:{color: 'rgba(0,0,0,0.1)'} };
            NetworkExtension.updateNode(this.context.network, options.id, newOptions);                
        },this);

        // accendo solo i nodi che contengono 'word' nel proprio id
        // se il subsystem del relativo nodo trovato è chiuso, allora
        // accendo anche il nodo cluster del relativo subsystem
        nodes.forEach(function(node){
            let options = node[1].options;

            if(options.id.includes(word)){
                let newOptions = {
                    opacity: 1.0, 
                    font:{color: 'rgba(0,0,0,1)'},
                    label: options.label + "\n[ " + options.group + " ]", 
                };
                NetworkExtension.updateNode(this.context.network, options.id, newOptions);

                let cluster = "CLUSTER_" + options.group;
                if(this.context.network.body.nodeIndices.includes(cluster)){ // se il subsystem è chiuso, allora focus anche sul nodo cluster
                    let newOptions = { opacity: 1.0, font:{color: 'rgba(0,0,0,1)'}};
                    NetworkExtension.updateNode(this.context.network, cluster, newOptions);
                }
            } 

        },this);
    } 
    this.context.network.redraw();
};



UI.prototype.resetFilter = function(){
    let nodes = Object.entries(this.context.network.body.nodes);
    
    nodes.forEach(function(node){
        let options = node[1].options;
        let newOptions = { opacity: 1.0, font:{color: 'rgba(0,0,0,1)'}, label: options.id};
        NetworkExtension.updateNode(this.context.network, options.id, newOptions);                
    }, this);   

    this.context.network.redraw(); 
};
