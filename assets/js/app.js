$(document).ready(function() {

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
            searchCategory(myLoc, "restaurants", 1, function(results) {
                // $("body").css("background-image", "none");
                displayMapOfLocations(results);
            });
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

    // Search button click handler
    // $("#searchBtn").on("click", function(event) {
    //     event.preventDefault();
    //     // Don't trigger unless input field is populated
    //     if ($("#icon_prefix").val().length > 0) {
    //         console.log("Searching...");
    //         let myLoc = $("#icon_prefix").val();
    //         searchCategory(myLoc, "restaurants", 1, function(results) {
    //             // $("body").css("background-image", "none");
    //             displayMapOfLocations(results);
    //         });
    //     }
    // });

    //---------------------------------------modal---------------------------------------

    $("#addLoc").on("click", $(".modal").modal());

    $(".dropdown-item-venue").on("click", function() {
        $("#venueTypeBtn").text($(this).attr("data-type"));
    });

    //------------------------------------end of modal-----------------------------------

}); // end of document ready
