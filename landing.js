


// $("h1").click(function(){
// 	alert("button clicked");
// 	});

var sec = window.location.href+'';
if (sec.indexOf('http://')==0){
    window.location.href = sec.replace('http://','https://');
}
