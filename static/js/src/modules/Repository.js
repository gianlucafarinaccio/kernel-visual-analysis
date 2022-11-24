/**
 * In this module are declared functions for fetching, parsing and
 * retrieving data.
 * 
 * @name        repository-module.js
 * @author      Gianluca Farinaccio <gianluca.farinaccio@gmail.com>
 * @date        24.11.2022  
 * 
 * In this implementation, all functions for parsing data are based on nav's output 
 * format "JsonOutputPlain".
 * For more information about nav and its output please visit: 
 * github.com/alessandrocarminati/nav
 * 
 */


export function Repository(){
    
    this.data = {
        responseJSON: null,
        nodes: new vis.DataSet(),
        edges: new vis.DataSet(),
        subsys: null,
        arrowsScaleFactor:{
            subsys: null,
            nodes: null
        }

    };
};


Repository.prototype = function(){


/**
 * Fetch data from backend.
 * 
 * @privacy public
 * @param {String} entryooint: entry point to fetch from backend 
 * @returns JSON response
 */
    const fetchData = function(entrypoint){
        
        const response = await fetch('/retrieve/symbol/' + entrypoint, { method: 'GET'});
        
        if (!response.ok) //symbol-id not found in nav, switch to index page
            throw "Exception: entrypoint not found";  
 
        return await response.json();
    };


/**
 * Parse JSON Response.
 * 
 * @privacy public 
 * @returns None
 */
    const parseData = function(){
        let parsedData = vis.parseDOTNetwork(this.data.responseJSON.graph);
        this.data.nodes.add(parseData.nodes);
        this.data.edges.add(parseData.edges);
    };



    const getContextData = function(entrypoint){

        try{
            this.data.responseJSON = fetchData(entrypoint);            
        }
        catch(error){
            console.log(error);
            return null;
        }

        parseData();
        return this.data;
    };

    return{
        getContextData: getContextData,

    };

}();