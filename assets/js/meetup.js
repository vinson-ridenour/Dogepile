

function meetupSearch (lat, lng){
    var apiKey = "key=1364252010781583c4d761ee4f7e1b"
    var queryURL = "https://crossorigin.me/https://api.meetup.com/2/open_events?"+apiKey+"&"+lat+"&"+lng+"&and_text=False&fields=photo_url,photo_sample&offset=0&format=json&limited_events=False&photo-host=public&radius=5&category=26&desc=False&status=upcoming";

    $.ajax({
        	url: queryURL,
            method: "GET"
    }).done(function(response) {

            var results = response.results;
            console.log(results)

        for (var i = 0; i < results.length; i++) {

            var muName = results[i].name; //meetup's name
            var muURL = results[i].event_url; //url link to meetup page

            // Create lat/lng properties
            results[i].lat = results[i].group.group_lat
            results[i].lng = results[i].group.group_lon

            if (results[i].venue != undefined){
                var locName = results[i].venue.name; //location's name
                var locSAdd = results[i].venue.address_1; //street address
                if (locSAdd.includes("(")){
                    locSAdd = locSAdd.substring(0, locSAdd.indexOf("("))
                }
                if (locSAdd.includes("@")){
                    locSAdd = locSAdd.substring(0, locSAdd.indexOf("@"))
                }
                var locCAdd = results[i].venue.city+","; //city
                var locStAdd = results[i].venue.state; //state
            } else {
                var locName = "No"; //location's name
                var locSAdd = "Address"; //street address
                var locCAdd = "Found"; //city
                var locStAdd = ": ("; //state 
            }

            $("#tableResults").append($("<tr id=meetup"+i+">"))
                $("#meetup"+i).append("<td class='col s1'><i class=material-icons>place</i></td>");
                $("#meetup"+i).append("<td class='col s1'><img class=img-results src=assets/images/meetup_logo.jpg></td>");
                $("#meetup"+i).append("<td class='col s3'><a id=muURL"+i+" href="+muURL+" target=_blank></a></td>");
                $("#muURL"+i).text(muName)
                $("#meetup"+i).append("<td class='col s3'>"+
                    "<p>"+locName+"</p>"+
                    "<p>"+locSAdd+"</p>"+
                    "<p>"+locCAdd+" "+locStAdd+"</p></td>");
                $("#meetup"+i).append("<td class='col s2'></td>");
                $("#meetup"+i).append("<td class='col s2'><button class=btn waves-effect waves-light id=dirBtn>lead the way</button></td>");
        }//end of for create table loop

    });//end of AJAX
}//end of function
