/**
 * In this module are declared functions for fetching, parsing and
 * retrieving data.
 * 
 * @name        Repository.js
 * @author      Gianluca Farinaccio < gianluca.farinaccio@gmail.com >
 * @date        24.11.2022  
 * 
 * 
 * In this implementation, all functions for parsing data are based on Nav's output 
 * format "JsonOutputPlain".
 * The "JsonOutputPlain" is a JSON Object like this:
 *       
 * {
 *    "graph": "DOT format String",
 *    "graphType": "JsonOutputPlain",
 *    "symbols":
 *    [
 *        {
 *            "FuncName": "__kmalloc",
 *            "subsystems":
 *            [
 *                "MEMORY MANAGEMENT",
 *                "MEMORY MANAGEMENT"
 *            ]
 *        }
 *    ]
 * }
 * 
 * 
 * For more information about Nav and its output please visit: 
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
        nodes: null,
        edges: null,
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

    // parsing DOT String 
    let graphData = this.parseDOTString(this.data.responseJSON.graph);
    this.data.nodes = graphData.nodes;
    this.data.edges = graphData.edges;

    // parsing subsystems
    this.parseSubsystems();
};


/**
 * Parse DOT string to retrieve nodes and edges DataSet.
 * 
 * @privacy public 
 * @param {String} DOTString
 * @returns {Object} An object which contains nodes and edges DataSet
 * 
 */
Repository.prototype.parseDOTString = function(DOTString){
    let parsedData = vis.parseDOTNetwork(DOTString); 

    return{
        nodes: new vis.DataSet(parsedData.nodes),
        edges: new vis.DataSet(parsedData.edges)
    };
};


/**
 * Parse JSON Response.
 * 
 * @privacy public 
 * @param None
 * @returns None
 * 
 */
Repository.prototype.parseSubsystems = function(){

/**
 * Adding the group property to all nodes:
 * In this implementation we use the 'group' property
 * for identify the subsystem of a nodes/edges.
 * 
 * The 'group' property of vis.DataSet is used because 
 * the library assigns the color in automatic for each
 * nodes/edges.
 * 
 *  > For all symbols without subsystems we assign the 'NONE'
 *  > For all symbols with 2 or more subystems we assign the 
 *  > 1st subsystems of the array.
 *
 * This function function also generate an array which contains 
 * only the subsystem used ( assigned to a nodes )
 * 
 */
    let changes = []; //changes applied to original nodes DataSet
    let subsystems = new Set(["NONE"]); // a set of all used-subsystem for this call

    this.data.responseJSON.symbols.forEach(function(symbol){
        let nodesID = symbol.FuncName;
        let subsystem = symbol.subsystems[0];
        let change = {id: nodesID, group: subsystem};

        subsystems.add(subsystem); // no duplicate subsystems
        changes.push(change);
    });

    this.data.nodes.updateOnly(changes); // apply all changes to original nodes DataSet in one instruction

 
/**
 * Adding the group properties to all edges: 
 * The group of an edge is the same of the node
 * contained in the 'from' property.
 * 
 */

    this.data.edges.get().forEach(function(edge){
        edge.group = this.data.nodes.get(edge.from).group;
    }, this);

    this.data.subsystems = [...subsystems]; // an array of all used-subsystem for this call

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


