var app = app || {};
app.maps = {};

$(document).ready(function(){
	
	app.maps.initialize();

});

app.maps.initialize = function(){
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644)
  };

  var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
};