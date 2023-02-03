/**
 * In this module are declared functions for switching between pages of the app.
 *
 * @name 		Routing.js
 * @author		Gianluca Farinaccio <gianluca.farinaccio@gmail.com>
 * @date		21.11.2022 
 * 
 */
export function Routing(){

};
	

/**
 * Switch from current route to param route
 * 
 * @privacy public
 * @param {String} url -> a backend route url
 * @returns None
 */	
Routing.prototype.route = function(url, method = 'GET'){
		fetch(url, {method: method})
		.then(function(response){
			if(response.ok)
				window.location = url;
			else
				throw new Error(`routing error on ${response.status}`);  			
		})
};

