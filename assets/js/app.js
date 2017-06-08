$(document).ready(function() {
    var restaurantResults = [];
    var hotelResults = [];
    var parkResults = [];
    var meetupResults = [];
    $(".results-page").hide(0);

    //------------transition from search view to results view-------------------------------
    $(".init").on("click", function(event) {
    	
        console.log($(this).attr("id"))
        event.preventDefault();

        if ($("#icon_prefix").val().length > 0) {

        }
        // $("body").css("background-image", "none");
        // $(".search-page").css("display", "none");
        // $(".results-page").removeClass("hidden");
        
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

        $("#searchPageContainer").css("opacity", "0");
        $("#mainContainer").css("visibility", "visible");

        var showHeader = setTimeout (function(){
        	$("#searchContainer").css("visibility", "hidden");
        	$(".search-page").css("display", "none");
        }, 500);

        var showResultsPage = setTimeout(function() {

            $(".results-page").show(0);
            $(".results-page").css("opacity", "1");
            $("#mainContainer").css("opacity", "1");
            $("body").css("background-image", "none");
        }, 750);
    });

    $("#logo").on("click", function() {
        window.location.href = "index.html";
    });

    $(".dropdown-item-radius").on("click", function() {
        $("#radiusBtn").text($(this).attr("data-display"));
    });

    //---------------------------------------modal---------------------------------------

    $("#addLoc").on("click", $(".modal").modal());

    console.log($("#venueTypeBtn").text())

    $(".dropdown-item-venue").on("click", function() {
        $("#venueTypeBtn").text($(this).attr("data-type"));
        $("#venueTypeBtn").removeClass("red");
        $("#venueTypeBtn").css("background-color", $(this).attr("data-color"));
        console.log($("#venueTypeBtn").text())
        enableShake();
    });

    $("#new-name").keyup(enableShake)
    $("#new-address").keyup(enableShake)

    function enableShake(){
	    if($("#new-name").val().length > 0 && $("#new-address").val().length > 0 && $("#venueTypeBtn").text() != "type") {
	    	$("#shakeBtn").removeClass("disabled");
	    } else {
	    	if (!$("#shakeBtn").hasClass("disabled")){
	    		$("#shakeBtn").addClass("disabled")
	    	}
	    }
	};
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
            	if (venue.type == "restaurants") {
            		$("#venue-row-" + i).append("<div class=result-icon><i class='fa fa-cutlery' aria-hidden=true></i></div>");
            		$("#venue-row-" + i).addClass("eatVenue");
            	}
            	if (venue.type == "hotels") {
            		$("#venue-row-" + i).append("<div class=result-icon><i class='fa fa-bed' aria-hidden=true></i></div>");
            		$("#venue-row-" + i).addClass("stayVenue");
            	}
            	if (venue.type == "parks") {
            		$("#venue-row-" + i).append("<div class=result-icon><i class='fa fa-futbol-o' aria-hidden=true></i></div>");
            		$("#venue-row-" + i).addClass("playVenue");
            	}
            $("#venue-row-" + i).append("<div class=result-image><img class=img-results src="+venue.imgURL+"></div>");
            $("#venue-row-" + i).append("<div class=result-name>" + venue.name + "</div>");
            $("#venue-row-" + i).append("<div class=result-address>" + venue.address + "</p></div>");
            $("#venue-row-" + i).append("<div class=result-phone>" + venue.phone + "</p></div>");
            // $("#venue-row-" + i).append("<div class=result-btn><button class=btn waves-effect waves-light id=dirBtn>lead the way" +
                // "<i class=material-icons right>chevron_right</i></button></div>");
        }
    }

    //-----------------------filter functions------------------------------

    $(".lever").on("click", function(){
    	console.log($(this).attr("class"));
    	if ($(this).attr("data-check") == "checked"){
    		$(this).attr("data-check", "unchecked");
    	} else {
    		$(this).attr("data-check", "checked");
    	}

    	if ($(".meetup").attr("data-check") == "unchecked"){
    		$(".meetup-result-table").hide(0)
    	} else {
    		$(".meetup-result-table").show(0)
    	}

    	if ($(".eat").attr("data-check") == "unchecked"){
    		$(".eatVenue").hide(0)
    	} else {
    		$(".eatVenue").show(0)
    	}

    	if ($(".stay").attr("data-check") == "unchecked"){
    		$(".stayVenue").hide(0)
    	} else {
    		$(".stayVenue").show(0)
    	}

    	if ($(".play").attr("data-check") == "unchecked"){
    		$(".playVenue").hide(0)
    	} else {
    		$(".playVenue").show(0)
    	}
    })
}); // end of document ready
