$(document).ready(function(){

//------------transition from search view to main view-------------------------------
$(".init").on("click", function (event){
	event.preventDefault();

	$("#searchContainer").css("visibility", "hidden");
	$("header").css("visibility", "visible");
	$("#mainContainer").css("visibility", "visible");
})

});