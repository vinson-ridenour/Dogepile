var googleMapApiKey = "AIzaSyBvUKChGjalgP1YNjJC66vq_tgbRuqa_Oc";

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
var markers = [];

function displayMapOfLocations(locationArray) {
    markers = []; // clean markers
    console.log("Displaying map...");
    // console.log(locationArray);
    if (locationArray.length > 0) {
        // console.log("Map center: (" + locationArray[0].lat + ", " + locationArray[0].lng + ")");
        var myOptions = {
            zoom: 13,
            center: new google.maps.LatLng(locationArray[0].lat, locationArray[0].lng)
        };

        var map = new google.maps.Map(document.getElementById('map'), myOptions);

        google.maps.event.addListenerOnce(map, 'idle', function() {
            google.maps.event.trigger(map, 'resize');
        });

        for (var i = 0; i < locationArray.length; i++) {
            //console.log("New marker @ (" + locationArray[i].lat + ", " + locationArray[i].lng + ", " + locationArray[i].type + ")");

            var markerIcon = {};
            switch (locationArray[i].type) {
                case "restaurants":
                    console.log("use restaurant icon");
                    markerIcon.url = "./assets/images/restaurant-icon.png";
                    break;
                case "parks":
                    console.log("use park icon");
                    markerIcon.url = "./assets/images/park-icon.png";
                    break;
                case "hotels":
                    console.log("use hotel icon");
                    markerIcon.url = "./assets/images/hotel-icon.png";
                    break;
                case "meetups":
                    console.log("use meetups icon");
                    markerIcon.url = "./assets/images/meetups-icon.jpg";
                    break;
                default:
                    console.log("use hotel icon");
                    markerIcon.url = "./assets/images/hotel-icon.png";
                    break;
            }
            markerIcon.size = new google.maps.Size(30, 30);
            markers[i] = new google.maps.Marker({
                position: locationArray[i],
                icon: markerIcon,
                animation: null,
                map: map
            });
            markers[i].addListener('mouseover', function() {
                console.log("mouseover called for marker!");
                // change css of the result list
            });
            markers[i].addListener('mouseout', function() {
                console.log("mouseout called for marker!");
                // change css of the result list
            });
        }
    } else {
        console.log("No locations in range!");
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
function getCoorCurrentLocation() {
    var userPosition = {};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        // this location will immediately get updated if user position is feteched successfully
        center: { lat: 32.7157, lng: -117.1611 }
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
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        return null;
    }
}

/*
INPUT
A string of user input address

OUTPUT
a single object which has data fields "lat" and "lng"

REFERENCE
https://developers.google.com/maps/documentation/geocoding/intro
*/
function getCoorFromAddress(address, callback) {
    if (address == null || address.length == 0) {
        console.log("Please enter a valid address.");
        return null;
    }
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address) + "&key=" + googleMapApiKey;
    var convertedCoor = {};
    $.ajax({
        url: queryURL,
        method: "GET",
        success: function(response) {
            // deal with the case that user enters an address like "dioqjweoqweq"
            if (response.status == "ZERO_RESULTS") {
                console.log("Please enter a valid address.");
                return null;
            } else {
                console.log("Converting to coordinates!");
                convertedCoor.lat = response.results[0].geometry.location.lat;
                convertedCoor.lng = response.results[0].geometry.location.lng;

                console.log(convertedCoor);
                callback(convertedCoor);
                return convertedCoor;
            }
        }
    });
}

/*
INPUT
an array of objects which have at least data fields "lat" and "lng"

OUTPUT
an array of objects which have data fields "lat" and "lng" (subset of input)

REFERENCE
https://developers.google.com/maps/documentation/distance-matrix/intro
*/
function filterByDistance(myLocation, distance, places) {
    var newLocationArray = [];
    console.log("Filtering");
    for (var i = 0; i < places.length; i++) {
        // console.log("Distance: " + getDistanceFromLatLonInM(places[i], myLocation));
        if (getDistanceFromLatLonInM(places[i], myLocation) <= distance) {
            newLocationArray.push(places[i]);
        } else {
            // console.log(i + ": Out of range");
        }
    }
    console.log(newLocationArray);
    return newLocationArray;
}

function getDistanceFromLatLonInM(pointA, pointB) {
    var R = 6371000; // Radius of the earth in m
    var dLat = deg2rad(pointA.lat - pointB.lat); // deg2rad below
    var dLng = deg2rad(pointA.lng - pointB.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(pointA.lat)) * Math.cos(deg2rad(pointB.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in m
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// Handler when hovering over row
$("body").on("mouseenter", ".venue-row", function(event) {
    console.log("Mouse enter");
    // change icon size of marker[?] according to id of the hovered venue
    let id = $(this).attr('id');
    let i = parseInt(id.split("-")[2]);
    // console.log("i: " + i);
    toggleBounce(markers[i]);
});

// Handler when leaving row
$("body").on("mouseleave", ".venue-row", function(event) {
    console.log("Mouse leave")
    // change icon size of marker[?] according to id of the hovered venue
    let id = $(this).attr('id');
    let i = parseInt(id.split("-")[2]);
    // console.log("i: " + i);
    toggleBounce(markers[i]);
});

// Toggle marker bounce
function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}
