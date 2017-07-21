var navbutton = document.getElementsByClassName("navbutton");

navbutton[0].addEventListener("click", function(){
	
});	

$('.testy').on('click', function(){
	$("body:first-of-type").addClass("hideMe");
	console.log("Ok, the click was heard");
	//$(".resume").removeClass("hideMe");
})