$(document).ready(function() {

//------------transition from search view to main view-------------------------------
	$(".init").on("click", function (event){
		event.preventDefault();

		$("#searchContainer").css("opacity", "0");
		$("#mainContainer").css("visibility", "visible")

		
		var showHeader = setTimeout (function(){
			$("header").css("box-shadow", "0 0 5px");
			$("header").css("opacity", "1");
			$("#searchContainer").css("visibility", "hidden");
		}, 1000);

		var showMain = setTimeout (function(){
			$("#headerContainer").css("opacity", "1");
			$("#mainContainer").css("opacity", "1");
			$("footer").css("opacity", "1");
		}, 2000);
	});

	$("#addLoc").on("click", $(".modal").modal())

	$(".dropdown-item").on("click", function(){
		console.log($(this).attr("data-type"))
		$(".dropdown-button").text($(this).attr("data-type"))
	})
	$("#logo").on("click", function() {
		location.reload();
	});
});