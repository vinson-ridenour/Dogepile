// Retrieves meetup results that are close to a given coordinate
function meetupSearch(addr, callback) {
    let lat = addr.lat;
    let lng = addr.lng;
    console.log("lat for meetup: " + lat);
    console.log("lng for meetup: " + lng);
    var radiusPicked = $(".dropdown-item-radius").attr("data-radius")
    var apiKey = "key=1364252010781583c4d761ee4f7e1b"
    var queryURL = "https://crossorigin.me/https://api.meetup.com/2/open_events?" + apiKey + "&lat=" + lat + "&lon=" + lng + "&and_text=False&fields=photo_url,photo_sample&offset=0&format=json&limited_events=False&photo-host=public&radius=" + radiusPicked + "&category=26&desc=False&status=upcoming";
    // var queryURL = "https://crossorigin.me/https://api.meetup.com/2/open_events?"+apiKey+"&zip=92105&and_text=False&fields=photo_url,photo_sample&offset=0&format=json&limited_events=False&photo-host=public&radius="+radiusPicked+"&category=26&desc=False&status=upcoming";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var results = response.results;
        console.log(results);
        for (let i in results) {
            // Create lat/lng properties
            results[i].lat = results[i].group.group_lat;
            results[i].lng = results[i].group.group_lon;
        }
        callback(results);
    });
}

// Prints out meetup results to a table
function displayMeetups(results) {
    let j = markers.length;

    for (var i = 0; i < results.length; i++) {

        var muName = results[i].name; //meetup's name
        var muURL = results[i].event_url; //url link to meetup page

        // Create lat/lng properties
        results[i].lat = results[i].group.group_lat
        results[i].lng = results[i].group.group_lon

        if (results[i].venue != undefined) {
            var locName = results[i].venue.name; //location's name
            var locSAdd = results[i].venue.address_1; //street address
            if (locSAdd.includes("(")) {
                locSAdd = locSAdd.substring(0, locSAdd.indexOf("("))
            }
            if (locSAdd.includes("@")) {
                locSAdd = locSAdd.substring(0, locSAdd.indexOf("@"))
            }
            var locCAdd = results[i].venue.city + ","; //city
            var locStAdd = results[i].venue.state; //state
        } else {
            var locName = "No"; //location's name
            var locSAdd = "Address"; //street address
            var locCAdd = "Found"; //city
            var locStAdd = ":("; //state
        }

        // Generate table
        $(".meetup-result-table").append("<div class='result-row-styling meetupVenue' id=result-row-" + j + "></div>");
        // $("#result-row"+i).append($("<div id=meetup"+i+">"+"</div>"));
        $("#result-row-" + j).append("<div class=result-icon><i class=meetupIcon><img src=assets/images/meetup-icon.png></div>");
        $("#result-row-" + j).append("<div class=result-image><img class=img-results src=assets/images/meetup_logo.jpg></div>");
        $("#result-row-" + j).append("<div class=result-name><a id=muURL" + i + " href=" + muURL + " target=_blank></a></div>");
        $("#muURL" + i).text(muName)
        $("#result-row-" + j).append("<div class=result-address>" +
            "<p>" + locName + "</p>" +
            "<p>" + locSAdd + "</p>" +
            "<p>" + locCAdd + " " + locStAdd + "</p></div>");
        // $("#meetup"+i).append("<td class='col s2'></td>");
        $("#result-row-" + j).append("<div class=result-btn><button class=btn waves-effect waves-light id=dirBtn>lead the way" +
            "<i class=material-icons right>chevron_right</i></button></div>");

        // Generate marker            
        let markerIcon = {};
        markerIcon.url = "./assets/images/meetup-icon.png";
        markerIcon.size = new google.maps.Size(40, 40);
        markers[j++] = new google.maps.Marker({
            position: { lat: results[i].lat, lng: results[i].lng },
            icon: markerIcon,
            animation: google.maps.Animation.DROP,
            map: map
        });
    } //end of for create table loop

} //end of function
