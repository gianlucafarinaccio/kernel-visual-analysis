/**
 * In this module are declared functions for fetching, parsing and
 * retrieving data.
 * 
 * @name        Repository.js
 * @author      Gianluca Farinaccio <gianluca.farinaccio@gmail.com>
 * @date        24.11.2022  
 * 
 * In this implementation, all functions for parsing data are based on nav's output 
 * format "JsonOutputPlain".
 * For more information about nav and its output please visit: 
 * github.com/alessandrocarminati/nav
 * 
 */

/**
 * Repository module constructor.
 * 
 * @privacy public
 * @param None
 * @returns A Repository object
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

/**
 * Fetch data from backend.
 * 
 * @privacy public
 * @param {String} entrypoint: entry point to fetch from backend 
 * @returns {Object} JSON response
 * 
 */
Repository.prototype.fetchData = async function(entrypoint){
        
    const response = await fetch('/retrieve/symbol/' + entrypoint, { method: 'GET'});
    
    if (!response.ok) //symbol-id not found in nav, switch to index page
        throw "Exception: entrypoint not found";  

    return await response.json();
};


/**
 * Parse JSON Response.
 * 
 * @privacy public 
 * @param None
 * @returns None
 * 
 */
Repository.prototype.parseData = function(){
    let parsedData = vis.parseDOTNetwork(this.data.responseJSON.graph);
    this.data.nodes.add(parsedData.nodes);
    this.data.edges.add(parsedData.edges);
};


/**
 * Get contextData for an entrypoint.
 * 
 * @privacy public 
 * @param {String} entrypoint
 * @returns {Object} contextData
 * 
 */
Repository.prototype.getContextData = async function(entrypoint){

    try{
        this.data.responseJSON = await this.fetchData(entrypoint);            
    }
    catch(error){
        console.log(error);
        return null;
    }

    this.parseData();
    return this.data;
};


