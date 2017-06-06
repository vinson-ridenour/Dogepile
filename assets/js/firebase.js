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
        for (var i = 0; i < json[Object.keys(json)[0]].length; i++) {
            if (!json[Object.keys(json)[0]][i].address || json[Object.keys(json)[0]][i].address == "") {
                console.log("Empty address found for " + json[Object.keys(json)[0]][i].name + " (" + Object.keys(json)[0] + "), skip it.");
                continue;
            }
            database.ref(Object.keys(json)[0] + "/" + i).set({
                address: json[Object.keys(json)[0]][i].address,
                imgURL: json[Object.keys(json)[0]][i].imgURL,
                name: json[Object.keys(json)[0]][i].name,
                phone: json[Object.keys(json)[0]][i].phone,
                lat: getCoorFromAddress(json[Object.keys(json)[0]][i].address).lat,
                lng: getCoorFromAddress(json[Object.keys(json)[0]][i].address).lng
            });
        }
    });
}

// Returns an array of locations within the radius (for given category)
function searchCategory(address, category, radius) {
    if (category == "restaurants" || category == "hotels" || category == "parks") {
        console.log("Searching in " + category);
        let categoryRef = database.ref(category);
        let categoryArr = categoryRef.once("value", function(data) {
            console.log("Inside searchCategory...");
            console.log(data.val());
            //let addr = getCoorFromAddress(address);
            let resultArr = filterByDistance({ lat: 32.8604494, lng: -117.2205901 }, radius, data.val());
            return resultArr;
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
