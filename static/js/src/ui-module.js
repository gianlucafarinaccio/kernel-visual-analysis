/**
 * In this are declared all functions for user interface.
 *
 * @author		Gianluca Farinaccio 
 * @date		22.10.2022 
 * 
 */
 
import {networkUtil} from './networkUtil-module.js'

 export const ui = function(){

    /* private */
    const _STATUS_DIV = "status";
    const _SEARCH_BUTTON = "search";
    const _SEARCH_FIELD = "search-field";
    const _RESET_FILTER_BUTTON = "reset-filter";   

    let _network = undefined;
    let _repository = undefined;

    let _unfocusedNodes = [];

    const debug = function(message = "no message"){
        console.log(message);
    };


    const status = function(message = "message", elementID = _STATUS_DIV ){
        document.getElementById(elementID).innerText = "STATUS => [ " + message + " ]";
    };


    // const search = function(){
    //     let word = document.getElementById(_SEARCH_FIELD).value;
    //     let finded = new Set();

    //     console.log(word);
    //     if(word != ""){
    //         let result = _repository.getNodes().get().forEach(function(item){
    //             if(item.id.startsWith(word))
    //                 finded.add("CLUSTER_" + item.group);
    //         }); 

    //         ui.status("** UI: search(" + word + ") => " + [...finded].toString());
    //         if(finded.size < 30 && finded.size > 0){
    //             _repository.getUsedSubsystems().forEach(function(subs){
    //                 if(!finded.has("CLUSTER_" + subs)){
    //                     networkUtil.updateClusteredNode(network,"CLUSTER_" + subs, {opacity: 0.1});
    //                     _unfocusedNodes.push("CLUSTER_"+subs);
    //                 }
    //                 else
    //                     networkUtil.updateClusteredNode(network,"CLUSTER_" + subs, {opacity: 1});
    //             });
    //             network.selectNodes([... finded]);
    //             console.log(finded);
    //         }
    //     } 
    //     network.redraw();
    // };


    const search = function(){
        let word = document.getElementById(_SEARCH_FIELD).value;
        let clusters = new Set();

        status("** UI: search( "+word+" )");
        console.log(word);
        if(word != "" || word != undefined){

            let nodes = Object.entries(network.body.nodes);
            

            // li oscuro prima tutti
            nodes.forEach(function(node){
                let options = node[1].options;
                let newOptions = { opacity: 0.1, font:{color: 'rgba(0,0,0,0.1)'} };
                networkUtil.updateNode(network, options.id, newOptions);                
            });


            // accendo solo i nodi che contengono 'word' nel proprio id
            // se il subsystem del relativo nodo trovato è chiuso, allora
            // accendo anche il nodo cluster del relativo subsystem
            nodes.forEach(function(node){
                let options = node[1].options;

                if(options.id.includes(word)){
                    let newOptions = {opacity: 1.0, font:{color: 'rgba(0,0,0,1)'} };
                    networkUtil.updateNode(network, options.id, newOptions);

                    let cluster = "CLUSTER_" + options.group;
                    if(network.body.nodeIndices.includes(cluster)) // se il subsystem è chiuso, allora focus anche sul nodo cluster
                        networkUtil.updateNode(network, cluster, newOptions);
                } 

            });
        } 
        network.redraw();
    };    


    const resetFilter = function(){       
        // network.unselectAll();
        // _unfocusedNodes.forEach(function(node){
        //     networkUtil.updateClusteredNode(network,node, {opacity: 1});
        // });
        // _unfocusedNodes = [];
        // network.redraw();

        let nodes = Object.entries(network.body.nodes);
        status("** UI: resetFilter()");
        
        nodes.forEach(function(node){
            let options = node[1].options;
            let newOptions = { opacity: 1.0, font:{color: 'rgba(0,0,0,1)'}};
            networkUtil.updateNode(network, options.id, newOptions);                
        });   

        network.redraw();    


    };


    const init = function(){
        document.getElementById(_SEARCH_BUTTON).onclick = search;
        document.getElementById(_RESET_FILTER_BUTTON).onclick = resetFilter;
    };

    const setDefaultNetwork = function(network){
        _network = network;
    };

    const setDefaultRepository = function(repository){
        _repository = repository;
    };

    return{
        debug: debug,
        status : status,
        init: init,
        setDefaultNetwork : setDefaultNetwork,
        setDefaultRepository : setDefaultRepository,
        resetFilter : resetFilter,
    };

 }();