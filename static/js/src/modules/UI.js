/**
 * In this module are declared functions for handling the UI events.
 *
 * @name 		UI.js
 * @author		Gianluca Farinaccio <gianluca.farinaccio@gmail.com>
 * @date		03.12.2022 
 * 
 */
export function UI(context){

    this.context = context;

    this.components = {
        simulation:{
            buttons:{
                start:  document.getElementById("start"),
                stop:   document.getElementById("stop"),
                fit:    document.getElementById("fit"),
            }
        },

        search:{
            buttons:{
                search: "id",
                reset:  "id", 
            },
            input:{
                input1: "id",
            }
        },
    };

    this.setEventListeners();

	
};


UI.prototype.setEventListeners = function(){
    
    this.components.simulation.buttons.start.addEventListener("click", this.context.network.startSimulation();

    this.components.simulation.buttons.stop.addEventListener("click",this.context.network.stopSimulation());

};