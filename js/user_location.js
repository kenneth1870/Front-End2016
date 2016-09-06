class UserLocation{
	
	constructor(callback){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition((location)=>{
				this.latitude = location.coords.latitude;
				this.longitude = location.coords.longitude;
				callback();
			});
		}
	}
}