// Firebase config
var firebaseConfig = {
    apiKey: "AIzaSyCEETOTkoBmwuv6cfGcdZs7lkXilrX1Nok",
//     apiKey: "AIzaSyBvUKChGjalgP1YNjJC66vq_tgbRuqa_Oc",
    authDomain: "ah829-9c19e.firebaseapp.com",
    databaseURL: "https://ah829-9c19e.firebaseio.com",
    projectId: "ah829-9c19e",
    storageBucket: "ah829-9c19e.appspot.com",
    messagingSenderId: "608911603931"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

/*
INPUT
filename (note the file has to be in assets/js/)

OUTPUT
N/A

FUNCTIONALITY
Reads a json file and stores venues in Firebase
store venues from pre-stored json file to firebase

SAMPLE USAGE
moveJsonToFirebase("hotels.json")
*/
function moveJsonToFirebase(filename) {
    $.getJSON(filename, function(json) {
        var index = 0;
        for (var i = 0; i < json[Object.keys(json)[0]].length; i++) {
            if (!json[Object.keys(json)[0]][i].address || json[Object.keys(json)[0]][i].address == "") {
                console.log("Invalid address found for " + json[Object.keys(json)[0]][i].name + " (" + Object.keys(json)[0] + ")");
            } else {
                database.ref(Object.keys(json)[0] + "/" + index).set({
                    address: json[Object.keys(json)[0]][i].address,
                    imgURL: json[Object.keys(json)[0]][i].imgURL,
                    name: json[Object.keys(json)[0]][i].name,
                    phone: json[Object.keys(json)[0]][i].phone,
                    lat: getCoorFromAddress(json[Object.keys(json)[0]][i].address).lat,
                    lng: getCoorFromAddress(json[Object.keys(json)[0]][i].address).lng
                });
                index++;
            }
        }
    });
}

/*
INPUT
category, can be either "hotels", "restaurants" or "parks"
userVenue, an object that has fields "name", "phone", "imgURL", "address", "lat", "lng"

OUTPUT
N/A

FUNCTIONALITY
store user input venue to firebase

SAMPLE USAGE
addUserVenueToFirebase("hotels", {
    "imgURL": "https://s3-media2.fl.yelpcdn.com/bphoto/J9-tW19u2xD8hVvrjxm4Ig/90s.jpg",
    "address": "199 N El Camino Real Encinitas, CA 92024",
    "phone": "(760) 487-5429",
    "name": "Hammeru2019s NY Pizza"
    "lat":
    "lng":
  });
*/
function addUserVenueToFirebase(category, userVenue) {
    //console.log(category);
    if (category != "hotels" && category != "restaurants" && category != "parks") {
        console.log("Invalid category name.");
        return;
    }
    if (!userVenue.address || userVenue.address == "") {
        console.log("Empty address found in user input venue.");
        return;
    }

    // Insert into category list in firebase
    database.ref(category).once("value", function(data) {
        // Get length of current list
        let indexForUserVenue = data.val().length;

        console.log("Inserting new venue to '" + category + "' at index " + indexForUserVenue);
        database.ref(category + "/" + indexForUserVenue).set({
            address: userVenue.address,
            imgURL: userVenue.imgURL || "",
            name: userVenue.name,
            phone: userVenue.phone || "",
            lat: userVenue.lat,
            lng: userVenue.lng
        });
    });
}

var meetupResults = [];

// Returns an array of locations within the radius (for given category)
function searchCategory(address, category, radius, callback) {
    if (category == "restaurants" || category == "hotels" || category == "parks") {
        console.log("Searching in " + category);
        let categoryRef = database.ref(category);
        let categoryArr = categoryRef.once("value", function(data) {
            //console.log("Inside searchCategory...");
            //console.log(data.val());
            getCoorFromAddress(address, function(addr) {
                // Set the start location
                startLoc = addr;
                let resultArr = filterByDistance(addr, milesToMeters(radius), data.val());
                // Set category type of results
                for (let i in resultArr) {
                    resultArr[i].type = category;
                }
                callback(resultArr);
                return resultArr;
            });
        });
    }
    // Query meetup for locations
    else if (category == "meetups") {
        // Check if we already have a meetups array from a previous query
        // and reuse it if it exists
        if (meetupResults.length === 0) {
            console.log("Getting new meetup results");
            getCoorFromAddress(address, function(addr) {
                meetupSearch(addr, function(results) {
                    // Copy results to meetupResults to be used later without having to query meetup API again
                    meetupResults = results.slice();
                    let resultArr = filterByDistance(addr, milesToMeters(radius), results);

                    // Sort meetups
                    resultArr.sort(function(a, b) {
                        return (parseFloat(a.distance) - parseFloat(b.distance));
                    });
                    displayMeetups(resultArr);
                });
            });
        }

        // Reuse meetupResults if already exists
        else {
            console.log("Reusing meetup results");
            getCoorFromAddress(address, function(addr) {
                let resultArr = filterByDistance(addr, milesToMeters(radius), meetupResults);
                // Sort meetups
                resultArr.sort(function(a, b) {
                    return (parseFloat(a.distance) - parseFloat(b.distance));
                });
                displayMeetups(resultArr);
            });
        }

    } else {
        console.log("Invalid category!");
    }
}

// Returns an array of locations within the radius (for all categories) 
function searchAll(address, radius) {
    // Clear results array
    resultArray = [];

    searchCategory(address, "restaurants", radius, function(results) {
        resultArray = resultArray.concat(results);

        searchCategory(address, "parks", radius, function(results) {
            resultArray = resultArray.concat(results);

            searchCategory(address, "hotels", radius, function(results) {
                // console.log("Prepare to display MAP!");
                resultArray = resultArray.concat(results);

                // Sort array by distance
                resultArray.sort(function(a, b) {
                    return (parseFloat(a.distance) - parseFloat(b.distance));
                });

                displayMapOfLocations(resultArray);
                displayVenue(resultArray);
                searchCategory(address, "meetups", radius);
            });
        });

    });
}

// Converts miles to meters
function milesToMeters(miles) {
    return (miles * 1609.34);
}

// Displays an array of venue objects in the table
// The objects have the following properties
// {
//      name: String,
//      address: String,
//      phone: String
//      imgURL: String
//      type: "restaurants"|"hotels"|"parks"
// }
function displayVenue(venueArr) {
    console.log("Printing " + venueArr.length + " venues in table");
    // Clear div
    $(".yelp-result-table").empty();

    for (let i in venueArr) {
        let venue = venueArr[i];
        //console.log("Printing "+venue.name);
        $(".yelp-result-table").append("<div class='result-row-styling venue-row' id=venue-row-" + i + "></div>");
        if (venue.type == "restaurants") {
            $("#venue-row-" + i).append("<div class=result-icon><i class=cutlery><img src=assets/images/restaurant-icon.png></i></div>");
            $("#venue-row-" + i).addClass("eatVenue");
        }
        if (venue.type == "hotels") {
            $("#venue-row-" + i).append("<div class=result-icon><i class=bed><img src=assets/images/hotel-icon.png></i></div>");
            $("#venue-row-" + i).addClass("stayVenue");
        }
        if (venue.type == "parks") {
            $("#venue-row-" + i).append("<div class=result-icon><i class=tree><img src=assets/images/park-icon.png></i></div>");
            $("#venue-row-" + i).addClass("playVenue");
        }
        $("#venue-row-" + i).append("<div class=result-image><img class=img-results src=" + venue.imgURL + "></div>");
        $("#venue-row-" + i).append("<div class=result-name><a href='" + venue.URL + "'>" + venue.name + "</a></div>");
        $("#venue-row-" + i).append("<div class=result-address>" + venue.address + "</p></div>");
        $("#venue-row-" + i).append("<div class=result-phone>" + venue.phone + "</p></div>");
        $("#venue-row-" + i).append("<div class=result-btn><button class=\"btn waves-effect waves-light yelpDirBtn\" id=\"" +
            venue.address + "\">Go!</button></div>");
    }

    // Hide results if filter switches are flipped
    if (!showVenues.restaurants) {
        // console.log("Eat venues hidden");
        $(".eatVenue").hide();
    }
    if (!showVenues.parks) {
        // console.log("Play venues hidden");
        $(".playVenue").hide();
    }
    if (!showVenues.hotels) {
        // console.log("Stay venues hidden");
        $(".stayVenue").hide();
    }
}

// Handler when user clicks on Go! button
$(document.body).on("click", "#dirBtn, .yelpDirBtn", function() {
    let addr;

    if ($(this).attr("id") === "dirBtn") {
        addr = $(this).attr("addr");
    } else {
        addr = $(this)[0].id;
    }

    sourceCoor = startLoc;
    var googleDirectionUrl = "https://maps.google.com/?saddr=" + sourceCoor.lat + "," + sourceCoor.lng + "&daddr=" + addr;
    // console.log("Google direction url: " + googleDirectionUrl);
    //window.open(googleDirectionUrl);
    window.location.href = googleDirectionUrl;
});
