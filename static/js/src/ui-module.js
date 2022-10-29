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

    let _network = undefined;
    let _repository = undefined;

    const debug = function(message = "no message"){
        console.log(message);
    };


    const status = function(message = "message", elementID = _STATUS_DIV ){
        document.getElementById(elementID).innerText = "STATUS => [ " + message + " ]";
    };


    const search = function(){
        let word = document.getElementById(_SEARCH_FIELD).value;
        let finded = new Set();

        console.log(word);
        if(word != ""){
            let result = _repository.getNodes().get().forEach(function(item){
                if(item.id.startsWith(word))
                    finded.add("CLUSTER_" + item.group);
            }); 

            console.log(finded);
            if(finded.size < 30){
                network.selectNodes([... finded]);
                console.log(finded);
            }
        }
    };

    const init = function(){
        document.getElementById(_SEARCH_BUTTON).onclick = search;
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
    };

 }();