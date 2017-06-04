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
function saveDataInFirebase(filename) {
$.getJSON(filename, function(json) {
  console.log(json); // this will show the info it in firebug console
  for (var i = 0; i < json.hotels.length; i++) {
    database.ref(Object.keys(json)[0] + "/" + i).set(json.hotels[0]);
  }
});
}