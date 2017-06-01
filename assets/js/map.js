/*
INPUT
an array of objects which have at least data fields "lat" and "lng"

OUTPUT
N/A

FUNCTIONALITY
displayMap changes element "map" in index.html

SAMPLE USAGE
searchReslt = [
{lat: 32.7157, lng: -117.1611, type: "restaurant"},
{lat: 34.0522, lng: -118.2437, type: "park"},
{lat: 37.7749, lng: -122.4194, type: "park"}
];
displayMap(searchReslt);
*/
function displayMap(locationArray) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: locationArray[0]
  });

  for (var i = 0; i < locationArray.length; i++) {
    /*var markerIcon = "";
    switch (locationArray[i].type) {
      case "restaurant":
      markerIcon = "1.png";
      break;
      case "park":
      markerIcon = "2.png";
      break;
    }*/
    var marker = new google.maps.Marker({
      position: locationArray[i],
      //icon: markerIcon,
      map: map
    });
  }
}


/*
INPUT
N/A

OUTPUT
a single object which has data fields "lat" and "lng"

REFERENCE
https://developers.google.com/maps/documentation/distance-matrix/intro
*/
function getUserPosition() {
  var userPosition = {};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    // this location will immediately get updated if user position is feteched sucessfully
    center: {lat: 32.7157, lng: -117.1611}
  });

  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    return userPosition;
  }
  else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
    return null;
  }
}

/*
INPUT
an array of objects which have at least data fields "lat" and "lng"

OUTPUT
an array of objects which have at least data fields "lat" and "lng" (subset of input)

REFERENCE
https://developers.google.com/maps/documentation/distance-matrix/intro
*/
function filterLocationObjectArray(locationArray) {
  //
  // TODO
  //
}