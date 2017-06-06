// firebase config
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


function moveJsonTofirebase(filename) {
  $.getJSON(filename, function(json) {
    for (var i = 0; i < json[Object.keys(json)[0]].length; i++) {
      if (!json[Object.keys(json)[0]][i].address || json[Object.keys(json)[0]][i].address == "") {
        console.log("Empty address found in " + json[Object.keys(json)[0]][i].name + " (" + Object.keys(json)[0] + "), skip it.");
        continue;
      }
      database.ref(Object.keys(json)[0]+ "/" + i).set({
        address: json[Object.keys(json)[0]][i].address,
        imgURL:  json[Object.keys(json)[0]][i].imgURL,
        name:    json[Object.keys(json)[0]][i].name,
        phone:   json[Object.keys(json)[0]][i].phone,
        lat:     getCoorFromAddress(json[Object.keys(json)[0]][i].address).lat,
        lng:     getCoorFromAddress(json[Object.keys(json)[0]][i].address).lng
      });
    }
  });
}

function addUserVenueToFirebase(category, userVenue) {
  if (category != "hotels" || category != "restaurants" || category != "parks") {
    console.log("Invalid category name.");
    return;
  }
  if (!userVenue.address || userVenue.address == "") {
    console.log("Empty address found in user input venue.");
    continue;
  }
  var indexForUserVenue = database.ref(Object.keys(json)[0]).length;
  database.ref(Object.keys(json)[0]+ "/" + indexForUserVenue).set({
    address: userVenue.address,
    imgURL:  userVenue.imgURL,
    name:    userVenue.name,
    phone:   userVenue.phone,
    lat:     getCoorFromAddress(userVenue.address).lat,
    lng:     getCoorFromAddress(userVenue.address).lng
  });
}