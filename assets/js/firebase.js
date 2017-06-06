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

// Reads a json file and stores venues in Firebase
function saveDataInFirebase(filename) {
    $.getJSON(filename, function(json) {
        if (filename == "hotels.json") {
            for (var i = 0; i < json.hotels.length; i++) {
                database.ref(Object.keys(json)[0] + "/" + i).set({
                    address: json.hotels[i].address,
                    imgURL: json.hotels[i].imgURL,
                    name: json.hotels[i].name,
                    phone: json.hotels[i].phone,
                    lat: getCoorFromAddress(json.hotels[i].address).lat,
                    lng: getCoorFromAddress(json.hotels[i].address).lng
                });
            }
        } else if (filename == "restaurants.json") {
            for (var i = 0; i < json.restaurants.length; i++) {
                database.ref(Object.keys(json)[0] + "/" + i).set({
                    address: json.restaurants[i].address,
                    imgURL: json.restaurants[i].imgURL,
                    name: json.restaurants[i].name,
                    phone: json.restaurants[i].phone,
                    lat: getCoorFromAddress(json.restaurants[i].address).lat,
                    lng: getCoorFromAddress(json.restaurants[i].address).lng
                });
            }
        } else if (filename == "parks.json") {
            /*for (var i = 0; i < json.parks.length; i++) {
              console.log("at #" + i + ", address is     " + json.parks[i].address);
              database.ref(Object.keys(json)[0]+ "/" + i).set({
                address: json.parks[i].address,
                imgURL:  json.parks[i].imgURL,
                name:    json.parks[i].name,
                phone:   json.parks[i].phone,
                lat:     getCoorFromAddress(json.parks[i].address).lat,
                lng:     getCoorFromAddress(json.parks[i].address).lng
              });
            }*/
        }
    });
}

// Returns an array of locations within the radius (for given category)
function searchCategory(address, category, radius) {
    if (category != "restaurants" && category != "hotels" && category != "parks") {
        let resultArr = filterByDistance();
    } else {
        console.log("Invalid category!");
    }
}

// Returns an array of locations within the radius (for all categories) 
function searchAll(address, radius) {

}
