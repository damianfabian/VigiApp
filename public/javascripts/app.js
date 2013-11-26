var app = app || {};
app.maps = {};

$(document).ready(function(){
	
	app.maps.initGeolocation();

});

app.maps.initGeolocation = function()
{
     if( navigator.geolocation )
     {
          // Call getCurrentPosition with success and failure callbacks
          navigator.geolocation.getCurrentPosition( app.maps.geolocationSuccesCallback, app.maps.geolocationFailCallback );
     }
     else
     {
          alert("Sorry, your browser does not support geolocation services.");
     }
};
 
app.maps.geolocationSuccesCallback = function(position)
{
 	app.maps.createMap(position.coords.latitude,position.coords.longitude);
}
app.maps.geolocationFailCallback= function()
{
     //set deault values
     app.maps.createMap(42.345573,-71.098326);
};

app.maps.createMap = function(latitude,longitude){
	var mapOptions = {
    	zoom: 15,
    	center: new google.maps.LatLng(latitude,longitude)
  	};

	var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
};