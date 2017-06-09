// Firebase config
var firebaseConfig = {
    apiKey: "AIzaSyBvUKChGjalgP1YNjJC66vq_tgbRuqa_Oc",
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
    var indexForUserVenue;
    if (database.ref(category).length) {
        indexForUserVenue = database.ref(category).length;
    } else {
        indexForUserVenue = 0;
    }
    database.ref(category + "/" + indexForUserVenue).set({
        address: userVenue.address,
        imgURL: userVenue.imgURL,
        name: userVenue.name,
        phone: userVenue.phone,
        lat: getCoorFromAddress(userVenue.address).lat,
        lng: getCoorFromAddress(userVenue.address).lng
    });
}

// Returns an array of locations within the radius (for given category)
function searchCategory(address, category, radius, callback) {
    if (category == "restaurants" || category == "hotels" || category == "parks") {
        console.log("Searching in " + category);
        let categoryRef = database.ref(category);
        let categoryArr = categoryRef.once("value", function(data) {
            console.log("Inside searchCategory...");
            console.log(data.val());
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

    } else {
        console.log("Invalid category!");
    }
}

// Returns an array of locations within the radius (for all categories) 
function searchAll(address, radius) {

}

// Converts miles to meters
function milesToMeters(miles) {
    return (miles * 1609.34);
}
