$(document).ready(function() {

//------------transition from search view to results view-------------------------------
	$(".init").on("click", function (event){
		
		event.preventDefault();

		if ($("#icon_prefix").val().length > 0) {

		}
		$("body").css("background-image", "none");
		$(".search-page").css("display", "none");
		
		// $("#searchContainer").css("opacity", "0");
		// $("#mainContainer").css("visibility", "visible");

		// var showHeader = setTimeout (function(){
		// 	$("#searchContainer").css("visibility", "hidden");
		// }, 500);

		var showResultsPage = setTimeout (function(){

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
	
	$(".dropdown-item-radius").on("click", function(){
		$("#radiusBtn").text($(this).attr("data-display"));
	});

    // Search button click handler

    $("#searchBtn").on("click", function(event){
        console.log("Searching...");
        let myLoc = $("#icon_prefix").val();
        let results = searchCategory(myLoc, "restaurants", 5);
        console.log("Results for restaurants: "+results);
    });

//---------------------------------------modal---------------------------------------

	$("#addLoc").on("click", $(".modal").modal());

	$(".dropdown-item-venue").on("click", function(){
		$("#venueTypeBtn").text($(this).attr("data-type"));
	});
//------------------------------------end of modal-----------------------------------

}); // end of document ready


