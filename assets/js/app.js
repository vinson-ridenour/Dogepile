$(document).ready(function() {

//------------transition from search view to main view-------------------------------
<<<<<<< HEAD
	$(".init").on("click", function (event){
		event.preventDefault();

		$("#searchContainer").css("opacity", "0");
		
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
=======
$(".init").on("click", function (event){
	event.preventDefault();

	$("#searchContainer").css("opacity", "0");
	
	var showMain =setTimeout (function(){
		$("header").css("box-shadow", "0 0 5px");
	}, 1000)

	var showMain =setTimeout (function(){
		$("#headerContainer").css("opacity", "1");
		$("#mainContainer").css("opacity", "1");
		$("footer").css("opacity", "1");
		$("#searchContainer").css("position", "absolute");
	}, 2000)
	
	
})
>>>>>>> 973fa71791de9e3e81391011d68117b2ba01c008

});