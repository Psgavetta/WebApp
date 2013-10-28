function GoogleMap(){
 
this.initialize = function(){
var map = showMap();
addMarkersToMap(map);	//Second step
}
 
var addMarkersToMap = function(map){
var mapBounds = new google.maps.LatLngBounds();
DoIt=0;
if ((window.localStorage.getItem("Lat1"))&&(window.localStorage.getItem("Lon1"))) 
{
	var latitudeAndLongitudeOne = new google.maps.LatLng(window.localStorage.getItem("Lat1"),window.localStorage.getItem("Lon1"));
	
	var markerOne = new google.maps.Marker({
	position: latitudeAndLongitudeOne,
	map: map,
	title: 'Posizione Utente'
	});
	mapBounds.extend(latitudeAndLongitudeOne);
	DoIt++;
}
else
	var latitudeAndLongitudeOne = new google.maps.LatLng('-33.890542','151.274856');
  
if ((window.localStorage.getItem("Lat2"))&&(window.localStorage.getItem("Lon2"))) 
{
	var latitudeAndLongitudeTwo = new google.maps.LatLng(window.localStorage.getItem("Lat2"),window.localStorage.getItem("Lon2"));
	
	var markerTwo = new google.maps.Marker({
	position: latitudeAndLongitudeTwo,
	map: map,
	title: 'Posizione Locale 1'
	});
	mapBounds.extend(latitudeAndLongitudeTwo);
	DoIt++;
}
else
	var latitudeAndLongitudeTwo = new google.maps.LatLng('57.77828', '14.17200');
 
 if ((window.localStorage.getItem("Lat3"))&&(window.localStorage.getItem("Lon3"))) 
{
	var latitudeAndLongitudeThree = new google.maps.LatLng(window.localStorage.getItem("Lat3"),window.localStorage.getItem("Lon3"));
	
	var markerThree = new google.maps.Marker({
	position: latitudeAndLongitudeThree,
	map: map,
	title: 'Posizione Locale 2'
	});
	mapBounds.extend(latitudeAndLongitudeThree);
	DoIt++;
}
else
	var latitudeAndLongitudeThree = new google.maps.LatLng('80.77828', '50.17200');
 

 if ((window.localStorage.getItem("Lat4"))&&(window.localStorage.getItem("Lon4"))) 
{
	var latitudeAndLongitudeFour = new google.maps.LatLng(window.localStorage.getItem("Lat4"),window.localStorage.getItem("Lon4"));
	
	var markerFour = new google.maps.Marker({
	position: latitudeAndLongitudeFour,
	map: map,
	title: 'Posizione Locale 3'
	});
	mapBounds.extend(latitudeAndLongitudeFour);
	DoIt++;
	
}
else
	var latitudeAndLongitudeFour = new google.maps.LatLng('10.77828', '100.17200');

 if(DoIt)
	map.fitBounds(mapBounds);
 
}
 
 
	var showMap = function(){
		var mapOptions = {
			zoom: 4,
			center: new google.maps.LatLng(-33, 151),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		 
		var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		 
		return map;
	}
}


