/**
 * In this are declared all functions for user interface.
 *
 * @author		Gianluca Farinaccio 
 * @date		22.10.2022 
 * 
 */
 
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


    const search = function(){
        const OPACITY_MAX = 1.0;
        const OPACITY_MIN = 0.1;

        let substring = document.getElementById(_SEARCH_FIELD).value;
        let finded = new Set();

        let toHighlightSubs = new Set();
        let clusters = new Set();

        console.log(substring);
        if(substring == "" || substring == undefined)
            return;
        else{

            let nodes = Object.entries(network.body.nodes);
            nodes.forEach(function([id, properties]){
                if(!id.startsWith("CLUSTER_")){
                    if(id.includes(substring)){
                        properties.options.opacity = OPACITY_MAX;
                        properties.options.font.color = "rgba(0,0,0,1)"  

                        let subs = properties.options.group;
                        toHighlightSubs.add("CLUSTER_" + subs);                     
                    } else{
                        properties.options.opacity = OPACITY_MIN;   
                        properties.options.font.color = "rgba(0,0,0,0.1)"  
                    }           
                } else{
                    clusters.add(id);
                }   
            });

            [...clusters].forEach(function(cluster){
                if(toHighlightSubs.has(cluster)){
                    network.body.nodes[cluster].options.opacity = OPACITY_MAX;
                    network.body.nodes[cluster].options.font.color = "rgba(0,0,0,1)"                      
                }

                else {
                    network.body.nodes[cluster].options.opacity = OPACITY_MIN;
                    network.body.nodes[cluster].options.font.color = "rgba(0,0,0,0.1)"                     
                }
                   
            });

            network.redraw();
        }



        // console.log(word);
        // if(word != ""){
        //     let result = _repository.getNodes().get().forEach(function(item){
        //         if(item.id.includes(word))
        //             finded.add("CLUSTER_" + item.group);
        //     }); 

        //     ui.status("** UI: search(" + word + ") => " + [...finded].toString());
        //     if(finded.size < 30 && finded.size > 0){
        //         _repository.getUsedSubsystems().forEach(function(subs){
        //             if(!finded.has("CLUSTER_" + subs)){
        //                 //network.updateClusteredNode("CLUSTER_" + subs, {opacity: 0.1});
        //                 network.body.nodes["CLUSTER_"+subs].options.opacity = 0.1;
        //                 _unfocusedNodes.push("CLUSTER_"+subs);
        //             }
        //             else{
        //                 network.body.nodes["CLUSTER_"+subs].options.opacity = 1;
        //                 //network.updateClusteredNode("CLUSTER_" + subs, {opacity: 1});
        //             }
        //         });
        //         network.selectNodes([... finded]);
        //         console.log(finded);
        //         network.redraw();
        //     }
        // } 

    };

    const resetFilter = function(){
        // network.unselectAll();
        // _unfocusedNodes.forEach(function(node){
        //     network.body.nodes[node].options.opacity = 1;
        // });
        // _unfocusedNodes = [];

        let nodes = Object.entries(network.body.nodes);
        nodes.forEach(function([id, properties]){
            properties.options.opacity = 1.0;
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