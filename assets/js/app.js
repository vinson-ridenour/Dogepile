$(document).ready(function() {
    var restaurantResults = [];
    var hotelResults = [];
    var parkResults = [];
    var meetupResults = [];

    //------------transition from search view to results view-------------------------------
    $(".init").on("click", function(event) {
    	
        console.log($(this).attr("id"))
        event.preventDefault();

        if ($("#icon_prefix").val().length > 0) {

        }
        $("body").css("background-image", "none");
        $(".search-page").css("display", "none");
        
        if ($(this).attr("id") == "searchBtn") {
            $("#addressDisplay").text($("#icon_prefix").val());
            console.log("Searching...");
            let myLoc = $("#icon_prefix").val();
            searchCategory(myLoc, "restaurants", 5, function(results) {
                // $("body").css("background-image", "none");
                displayMapOfLocations(results);
                displayVenue(results);
            });
            meetupSearch();
        }
        // $("#searchContainer").css("opacity", "0");
        // $("#mainContainer").css("visibility", "visible");

        // var showHeader = setTimeout (function(){
        //  $("#searchContainer").css("visibility", "hidden");
        // }, 500);

        var showResultsPage = setTimeout(function() {

            // $(".results-page.hidden").css("visibility", "visible");
            $(".results-page").removeClass("hidden");
            // $("header").css("box-shadow", "0 0 5px");
            // $("header").css("opacity", "1");
            // $("#headerContainer").css("opacity", "1");
            // $("#mainContainer").css("opacity", "1");
            // $(".page-footer").css("opacity", "1");
        }, 1000);
    });

    $("#logo").on("click", function() {
        window.location.href = "index.html";
    });

    $(".dropdown-item-radius").on("click", function() {
        $("#radiusBtn").text($(this).attr("data-display"));
    });

    //---------------------------------------modal---------------------------------------

    $("#addLoc").on("click", $(".modal").modal());

    $(".dropdown-item-venue").on("click", function() {
        $("#venueTypeBtn").text($(this).attr("data-type"));
    });

    //------------------------------------end of modal-----------------------------------

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
        for (let i in venueArr) {
            let venue = venueArr[i];
            //console.log("Printing "+venue.name);
            $(".yelp-result-table").append("<div class='result-row-styling venue-row' id=venue-row-" + i + "></div>");
            $("#venue-row-" + i).append("<div class=result-icon><i class=material-icons>place</i></div>");
            $("#venue-row-" + i).append("<div class=result-image><img class=img-results src=assets/images/meetup_logo.jpg></div>");
            $("#venue-row-" + i).append("<div class=result-name>" + venue.name + "</div>");
            $("#venue-row-" + i).append("<div class=result-address>" + venue.address + "</p></div>");
            $("#venue-row-" + i).append("<div class=result-btn><button class=btn waves-effect waves-light id=dirBtn>lead the way" +
                "<i class=material-icons right>chevron_right</i></button></div>");
        }
    }
}); // end of document ready
