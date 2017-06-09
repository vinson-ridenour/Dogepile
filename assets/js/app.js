var resultArray = []
var startLoc = {};

$(document).ready(function() {
    
    // Hide results page on load
    $(".results-page").hide(0);

    //------------transition from search view to results view-------------------------------
    $(".init").on("click", function(event) {
        // Initialize globar vars
        resultArray = [];
        startLoc = {};

        console.log($(this).attr("id"))
        event.preventDefault();

        if ($("#icon_prefix").val().length > 0) {

            // $("body").css("background-image", "none");
            // $(".search-page").css("display", "none");
            // $(".results-page").removeClass("hidden");

            if ($(this).attr("id") == "searchBtn") {
                $("#addressDisplay").text($("#icon_prefix").val());
                console.log("Searching...");
                let myLoc = $("#icon_prefix").val();
                searchAll(myLoc, 2);
            }

            $("#searchPageContainer").css("opacity", "0");
            $("#mainContainer").css("visibility", "visible");

            var showHeader = setTimeout(function() {
                $("#searchContainer").css("visibility", "hidden");
                $(".search-page").css("display", "none");
            }, 500);

            var showResultsPage = setTimeout(function() {

                $(".results-page").show(0);
                $(".results-page").css("opacity", "1");
                $("#mainContainer").css("opacity", "1");
                $("body").css("background-image", "none");
            }, 750);
        }
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

    function enableShake() {
        if ($("#new-name").val().length > 0 && $("#new-address").val().length > 0 && $("#venueTypeBtn").text() != "type") {
            $("#shakeBtn").removeClass("disabled");
        } else {
            if (!$("#shakeBtn").hasClass("disabled")) {
                $("#shakeBtn").addClass("disabled")
            }
        }
    };
    //------------------------------------end of modal-----------------------------------

    //-----------------------filter functions------------------------------

    // Handler for when user flips a filter
    $(".lever").on("click", function() {
        console.log($(this).attr("class"));
        if ($(this).attr("data-check") == "checked") {
            $(this).attr("data-check", "unchecked");            
        } else {
            $(this).attr("data-check", "checked");
        }

        if ($(".meetup").attr("data-check") == "unchecked") {
            $(".meetup-result-table").hide(0);
            toggleMarkerGroup("meetups", false);
        } else {
            $(".meetup-result-table").show(0);
            toggleMarkerGroup("meetups", true);
        }

        if ($(".eat").attr("data-check") == "unchecked") {
            $(".eatVenue").hide(0);
            toggleMarkerGroup("restaurants", false);
        } else {
            $(".eatVenue").show(0);
            toggleMarkerGroup("restaurants", true);
        }

        if ($(".stay").attr("data-check") == "unchecked") {
            $(".stayVenue").hide(0);
            toggleMarkerGroup("hotels", false);
        } else {
            $(".stayVenue").show(0);
            toggleMarkerGroup("hotels", true);
        }

        if ($(".play").attr("data-check") == "unchecked") {
            $(".playVenue").hide(0);
            toggleMarkerGroup("parks", false);   
        } else {
            $(".playVenue").show(0);
            toggleMarkerGroup("parks", true);
        }
    })
}); // end of document ready
