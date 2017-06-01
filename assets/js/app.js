$(document).ready(function() {

//------------transition from search view to main view-------------------------------
	$(".init").on("click", function (event){
		event.preventDefault();

		$("#searchContainer").css("opacity", "0");
		$("#mainContainer").css("visibility", "visible");
		
		var showMain = setTimeout (function(){
			$("header").css("box-shadow", "0 0 5px");
			$("header").css("opacity", "1");
		}, 1000);

		var showMain = setTimeout (function(){
			$("#headerContainer").css("opacity", "1");
			$("#mainContainer").css("opacity", "1");
			$("footer").css("opacity", "1");
			$("#searchContainer").css("position", "absolute");
		}, 2000);
	});

	// $("#logo").on("click", function() {
	// 	window."file:///Users/vinsonridenour/Desktop/UCSD%20Bootcamp/Project1/index.html".reload();
	// });
});