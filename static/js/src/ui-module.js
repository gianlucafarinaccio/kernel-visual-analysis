/**
 * In this are declared all functions for user interface.
 *
 * @author		Gianluca Farinaccio 
 * @date		22.10.2022 
 * 
 */
 
 export const ui = function(){

    /* private */



    const debug = function(message = "no message"){
        console.log(message);
    };



    return{
        debug: debug
    }

 }();