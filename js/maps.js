"use strict";

var api_key = "AIzaSyD99SvEg7_YttMSU01CO10mR_kZefYZnKA";

(function(){
	var user_location,travelMode;
	// http://www.gps-coordinates.net/
	const myLocation = {lat: 19.4248097, lng: -99.19492559999998};
	google.maps.event.addDomListener(window,"load",()=>{
		init_maps();
		user_location = new UserLocation(calculateDistance);
	});

	function init_maps(){
		travelMode = "DRIVING";
		const mapOptions = {
			center: myLocation,
			zoom:15
		};

		// Set variables 
		const map = new google.maps.Map(document.getElementById('map'),mapOptions);

    // Instantiate marker
    const marker = new google.maps.Marker({
	    map: map,
	    position: myLocation,
			title: "Restaurante Facilito",
			visible: true
	  });

	  
	  
	}
	function calculateDistance(){
  	var origin = new google.maps.LatLng(user_location.latitude,user_location.longitude);
  	var destination = new google.maps.LatLng(myLocation.lat,myLocation.lng);

  	var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		  {
		    origins: [origin],
		    destinations: [destination],
		    travelMode: google.maps.TravelMode[travelMode]
		  },(response,status)=>{
		  	if (status == google.maps.DistanceMatrixStatus.OK) {
		  		var origin = response.rows[0];
	  			const element = origin.elements[0];
	  			const duration = element.duration.text;

	  			writeMessage(`
	  				Estás a ${duration} de una noche inolvidable en 
	  				<span class='medium lobster'>Restaurante Facilito</span>
	  			`);
		  	}
		  });
  }
	function writeMessage(message){
		document.getElementById("messages").innerHTML = message;
	}
	

})();