
var taxPayer = {name: '', iraType: '', filingStatus: '', workPlan: '', magi: 0, adjustments: 0};
var magiCalc;
var allDeductions = document.getElementsByClassName(".deductionHide");


//calculate the max contribution

function contributionAmount(taxPayer){

	switch(taxPayer.iraType){
		case('Roth'):
			if((taxPayer.filingStatus === "Single" || taxPayer.filingStatus === "Head of Household") && taxPayer.agi >= 133000){
				console.log(taxPayer['agi']);
				$(".output").append("<li> Your AGI is above the limit for a Roth IRA. Your max contribution is 0.</li>");
					} else if((taxPayer.filingStatus === "Single" || taxPayer.filingStatus === "Head of Household") && taxPayer.agi < 118000){
						$(".output").append("<li> You can contribute the maximum amount for the year. For 2017 this is 5500 dollars.</li>");
					} else if((taxPayer.filingStatus === "Single" || taxPayer.filingStatus === "Head of Household") && (taxPayer.agi >= 118000 && taxPayer.agi <133000)){
							var phaseOut = taxPayer['agi'];
							var contributionAmt = (5500-((taxPayer.agi-118000)/15000)*5500);
							$(".output").append("<li> Your maximum contribution amount is " + contributionAmt + " dollars for 2017.</li>");
					}
			break;
		case('Traditional'):
			$(".output").append("<li>" + taxPayer['name'] + ", you can contribute the maximum amount for the year. For 2017 this is 5500 dollars.</li>");	
			break;
		}
	}
	


//IRA question in js not html for testing
$("#rothOrTrad").text("Contributing to a Roth or Traditional IRA?");


//get user name
$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		taxPayer.name = $(this).val();
	//display info in output window
	$(".output").append("<li> Hello, " + taxPayer['name'] + " !</li>");
	}
})


//get and report type of IRA contributions
$(".IRAtype").on("click", function (){
		taxPayer.iraType = $("input[type=radio][name=IRAtype]:checked").val();
	if(taxPayer.iraType !== null){
		$(".output").append("<li> You're contributing to a " + taxPayer['iraType'] + " IRA.</li>");	
		$(".contribAmount").text("How much can I contribute to a " + taxPayer['iraType'] + " IRA?");
	}
	})

//get and report filing status
$(".status").on("click", function (){
		taxPayer.filingStatus = $("input[type=radio][name=status]:checked").val();
	if(taxPayer.filingStatus !== null){
		$(".output").append("<li> You're filing as " + taxPayer['filingStatus'] + " </li>");	
	}
	})

$(".workPlan").on("click", function (){
	taxPayer.workPlan = $("input[type=radio][name=covered]:checked").val();
	if(taxPayer.workPlan !== null){
		if(taxPayer.workPlan == "yes"){
			$(".output").append("<li> You <strong>are</strong> covered by a retirement plan at work.</li>");		
		} else if(taxPayer.workPlan == "no"){
			$(".output").append("<li> You <strong>are not</strong> covered by a retirement plan at work.</li>");		
		}	
	}
	})

$("input[type=number][name=AGI]").keypress(function(event){
	taxPayer.magi = $("input[type='number']").val();
	if(event.which === 13){
		$(".output").append("<li>Your adjusted gross income (AGI) was " + taxPayer['magi'] + ".</li>");
	}})


/** BEGIN: Get individual deduction type amounts: **/


$('input[type="checkbox"]').on("click", function() {
	
	var a = $(this).val()
	var addUps = [];

	if(this.checked){
		$('span.deductionHider').eq(a).removeClass('deductionHide');
	}
	else {
		$('span.deductionHider').eq(a).addClass('deductionHide');
	}
});

/** END: Get individual deduction type amounts: **/		


// var array = [];
// $('input[type="checkbox"][name="deduction"]').change(function(){
// 	if(this.checked){
// 		if (array.indexOf($(this).val()) < 0){
// 			array.push($(this).val());
// 		} else{
// 			if(array.indexOf($(this).val()) >= 0){
// 				array.splice(array.indexOf($(this).val()), 1);
// 			}
// 		}
// 	console.log(array);
// 	console.log("test");
// 	}

// });



// BEGIN: Obtain and add deductions taken

//GOAL to store the new deduction amounts in an array, then add all array elements to determine MAGI


var add = [];
var totalDeductions = 0;

$("input[type=number][name=addBack1]").on("keyup change", function() {
	  
	  var i = $(".deduction").eq(0).val();	  

	  add[i] = parseInt(this.value);
	  console.log(add[i] + " checkbox value " + i );
	  
});

$("input[type=number][name=addBack2]").on("keyup change", function() {
	  
	  var i = $(".deduction").eq(1).val();
	  
	  add[i] = parseInt(this.value);
	  console.log(add[i] + " checkbox value " + i );
});

$("input[type=number][name=addBack3]").on("keyup change", function() {
	  
	  var i = $(".deduction").eq(2).val();
	  
	  add[i] = parseInt(this.value);
	  console.log(add[i] + " checkbox value " + i );
});

$("input[type=number][name=addBack4]").on("keyup change", function() {
	  
	  var i = $(".deduction").eq(3).val();
	  
	  add[i] = parseInt(this.value);
	  console.log(add[i] + " checkbox value " + i );
});

$("input[type=number][name=addBack5]").on("keyup change", function() {
	  
	  var i = $(".deduction").eq(4).val();

	  add[i] = parseInt(this.value);
	  console.log(add[i] + " checkbox value " + i );
});

$("input[type=number][name=addBack6]").on("keyup change", function() {
	  
	  var i = $(".deduction").eq(5).val();

	  add[i] = parseInt(this.value);
	  console.log(add[i] + " checkbox value " + i );
});	  

$("input[type=number][name=addBack7]").on("keyup change", function() {
	  
	  var i = $(".deduction").eq(6).val();

	  add[i] = parseInt(this.value);
	  console.log(add[i] + " checkbox value " + i );
});

$("input[type=number][name=addBack8]").on("keyup change", function() {
	  
	  var i = $(".deduction").eq(7).val();

	  add[i] = parseInt(this.value);
	  console.log(add[i] + " checkbox value " + i );
});


//END: Obtain and add deductions taken



// BEGIN: Uncheck all boxes, hide all list inputs, clear all amounts

function uncheckAll(){
	var boxes = $('input[name=deduction]');
	
	for( var i = 0; i < (boxes.length-1); i++){
		boxes.each(function(){
			if( $(this).val() < 8)
				{this.checked = false;}
			});
	
		$('span.deductionHider').eq(i).addClass('deductionHide');
		$('input[type=number]').eq(i+1).val(0);
		add[i] = 0;
	}
}

function checkNone(){
	var x = $(".deduction").eq(8).prop('checked');
	
	if(x === true){
		$(".deduction").eq(8).prop('checked', false);
		}
}
	
// END: Uncheck all boxes, hide all list inputs


// BEGIN: Do some things when clicking the calculate button
 
 $(".contribAmount").on("click", function(){
 
	//add up total deductions

 	for(var j = 0; j < add.length; j++){
		totalDeductions += add[j];
	}	
  	var y = taxPayer.magi + totalDeductions;
  	console.log("Total of Deductions: " + totalDeductions + " MAGI: " + y);
 });
 	

 	

	



// END: Do some things when clicking the calculate button