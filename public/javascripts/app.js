var app = app || {};
var globalMarker = "";
var map = "";
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
};

app.maps.geolocationFailCallback= function()
{
     //set deault
     app.maps.createMap(42.345573,-71.098326);
};

app.maps.createMap = function(latitude,longitude){
	var mapOptions = {
    	zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
    	center: new google.maps.LatLng(latitude,longitude)
  	};

	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  google.maps.event.addListener(map, 'click', function(e) {
    if(globalMarker != ""){
      globalMarker.setMap(null);
      globalMarker = "";
    } 
    app.maps.placeMarker(e.latLng, map);
  });
};

app.maps.placeMarker = function(position, map) {
  //Create the marker and set the global variable
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
  globalMarker = marker;
  
  //show the popup
  app.maps.showReportPopup(marker, position);

  //add click event to the marker
  google.maps.event.addListener(marker, 'click', app.maps.deleteMarker);

};

app.maps.deleteMarker = function() {
  globalMarker.setMap(null);
};

app.maps.showReportPopup = function(marker, position) {
  var reportPopup = '<div id="reportPopup" method="POST" action="/">'+
                      '<input type="hidden" id="latitude" name="latitude" value="'+position.ob+'"/>'+
                      '<input type="hidden" id="longitude" name="longitude" value="'+position.nb+'"/>'+
                      '<input id="shortDescription" class="shortDescription" type="text" name="shortDescription" placeholder="What\'s Going On?"><br/>'+
                      '<textarea id="reportDescription" class="userDescription" rows="3" cols="20" name="reportDescription" placeholder="Describe the problem here...">' + 
                      '</textarea><br/>'+
                      '<button id="generalBtn" type="submit" onClick="app.maps.saveReport(this)" class="generalBtn">Send</button>'+
                      '<button type="submit" onClick="app.maps.deleteMarker()" class="generalBtn">Cancel</button>'+
                    '</div>'

  var infowindow = new google.maps.InfoWindow({
    content: reportPopup,
    position: position,
    maxWidth: 400
  });

  infowindow.open(marker.get('map'), marker);
  
  map.setCenter(position);
  
  google.maps.event.addListener(infowindow,'closeclick',function(){
    globalMarker.setMap(null); //removes the marker
  });
};

app.maps.saveReport = function(element){
  var report = {
     "shortDescription" : $(element).parent().find('input[id="shortDescription"]').val(),
      "reportDescription" : $(element).parent().find('textarea[id="reportDescription"]').val(),
      "longitude" : $(element).parent().find('input[id="longitude"]').val(),
      "latitude" : $(element).parent().find('input[id="latitude"]').val()
  };

  $.post("/",report)
    .done(function(data){
      if(data == "true"){
        alert("saved");
        app.maps.deleteMarker();
      }
      else{
        $(element).parent().append('<br/><span style="padding: 5px;font-family:arial;color:red;font-size:15px;">'+data+'</span');
      }
    });
  
};
