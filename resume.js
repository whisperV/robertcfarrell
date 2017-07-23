
// Toggle Job duties description

var expander = document.getElementsByTagName("button");
var isOpen = true;


//RESUME

// expander[1].addEventListener("click", function toggleButton(){
// 	if (isOpen){
// 			expander[1].classList.add('closed');
// 			expander[2].classList.remove('closed');
// 	} else {
// 			expander[2].classList.add('closed');
// 			expander[1].classList.remove('closed');
// 			}
// 		isOpen = !isOpen;
// 	})	

// expander[2].addEventListener("click", function toggleButton2(){
// 	if (isOpen){
// 			expander[1].classList.add('closed');
// 			expander[2].classList.remove('closed');
// 	} else {
// 			expander[2].classList.add('closed');
// 			expander[1].classList.remove('closed');
// 			}
// 		isOpen = !isOpen;
// 	})	


$("#openAll").on("click", function(){
	$(this).toggleClass("collapse");
	$("#closeAll").toggleClass("collapse");
	$(".workDesc").addClass("in");
	$(".btn-custom").removeClass("collapsed");
	
});

$("#closeAll").on("click", function(){
	$(this).toggleClass("collapse");
	$("#openAll").toggleClass("collapse");
	$(".workDesc").removeClass("in");
	$(".btn-custom").addClass("collapsed");


});

