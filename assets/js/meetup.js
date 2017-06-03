$(document).ready(function() {

    var apiKey = "key=1364252010781583c4d761ee4f7e1b"
    var queryURL = "https://crossorigin.me/https://api.meetup.com/2/open_events?"+apiKey+"&zip=92105&and_text=False&offset=0&format=json&limited_events=False&photo-host=public&radius=25.0&category=26&desc=False&status=upcoming";

    $.ajax({
        	url: queryURL,
            method: "GET"
    }).done(function(response) {

            var results = response.results;

        for (var i = 0; i < results.length; i++) {

            var muName = results[i].name; //meetup's name
            var muURL = results[i].event_url;
            var locName = results[i].venue.name; //location's name
            var locSAdd = results[i].venue.address_1; //street address
            var locCAdd = results[i].venue.city; //city
            var locStAdd = results[i].venue.state; //state

            $("#tableResults").append($("<tr id=meetup"+i+">"))
                $("#meetup"+i).append("<td><i class=material-icons>place</i></td>");
                $("#meetup"+i).append("<td><img class=img-results href=#></td>");
                $("#meetup"+i).append("<td><a id=muURL"+i+" href="+muURL+"></a></td>");
                $("#muURL"+i).text(muName)
                $("#meetup"+i).append("<td>"+
                    "<p>"+locName+"</p>"+
                    "<p>"+locSAdd+"</p>"+
                    "<p>"+locCAdd+", "+locStAdd+"</p></td>");
                $("#meetup"+i).append("<td></td>");
                $("#meetup"+i).append("<td><button class=btn waves-effect waves-light id=dirBtn>lead the way</button></td>");
        }//end of for create table loop

    });//end of AJAX
});//end of document ready