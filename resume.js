
// Toggle Job duties description



$("#openAll").on("click", function(){
	$(this).toggleClass("collapse");
	$("#closeAll").toggleClass("collapse");
	$(".btn-custom").removeClass("collapsed");
	if ($(".workDesc").not(".in")){
		$(".workDesc").addClass("in");
		$(".workDesc").css("height", "auto");
	}
});

	
$("#closeAll").on("click", function(){
	$(this).toggleClass("collapse");
	$("#openAll").toggleClass("collapse");
	$(".workDesc").removeClass("show");
	$(".workDesc").removeClass("in");
	$(".btn-custom").addClass("collapsed");


});

