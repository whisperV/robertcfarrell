//"Constants" change to update
var ROTH_MIN_MFJ = 186000;
var ROTH_MAX_MFJ = 196000;
var ROTH_MIN_S = 118000;
var ROTH_MAX_S = 133000;
// end "Constants"

var taxPayer = {name: '', iraType: '', filingStatus: '', workPlan: '', agi: 0, magi: 0, adjustments: 0};
var allDeductions = document.getElementsByClassName(".deductionHide");


var magiCalc; //more like mystery calc, idk what this is for

	
///rounding to 3 decimals

function roundIt(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
}


//calculate the max contribution


function contributionCalculation(obj, objName){

	var contributionAmt = 5500; 
	var reduction; 
	var rothM; // fractional multiplier
	var madeContribs = parseFloat($("input[name=iraContribsMade]").val()); //contributions that have already been made


	if(taxPayer.magi === 0){
		$(".output").append("<li> You cannot contribute to an IRA because you did not have any income.</li>");}


	

	switch(obj.iraType){
			case('Roth'):
				if((obj.filingStatus === "Single" || obj.filingStatus === "Head of Household") && obj.magi >= 133000){
					$(".output").append("<li> Your AGI is above the limit for a Roth IRA. Your max contribution is 0.</li>");
				} else if((obj.filingStatus === "Single" || obj.filingStatus === "Head of Household") && obj.magi < 118000){
					if (madeContribs !== null){
						$(".output").append("<li> You maximum amount you can contribute in for 2017 is " + (contributionAmt - madeContribs) + " dollars.</li>");
					} else {
						$(".output").append("<li> You can contribute the maximum amount for the year. For 2017 this is 5,500 dollars.</li>");
					}
				} else if((obj.filingStatus === "Single" || obj.filingStatus === "Head of Household") && (obj.magi >= 118000 && obj.magi <133000)){
				
					rothM = parseFloat((obj.magi-ROTH_MIN_S)/15000);
					roundIt(rothM);
					reduction = rothM*5500;
					contributionAmt = 5500-reduction;
					contributionAmt = contributionAmt - madeContribs;

					if (contributionAmt <= 0){
						$(".output").append("<li> Your maximum contribution amount is 0, since you've already contributed " + madeContribs + ". You have excess contributions of " + contributionAmt);		
					} else {
						$(".output").append("<li> Your maximum contribution amount is " + Math.round(contributionAmt) + " dollars for 2017. </li>");}
				
					console.log((obj.magi - ROTH_MIN_S)/15000);
					var temp = (((obj.magi)-ROTH_MIN_S)/15000);
					var d = roundIt(temp, 3);
					console.log(d);
					console.log(roundIt(reduction, 2));
					console.log(madeContribs);


					return(contributionAmt);
				}

				if((taxPayer.filingStatus === "Married, filing jointly" || taxPayer.filingStatus === "a Qualified Widow or Widower") && (taxPayer.magi >= ROTH_MAX_MFJ || taxPayer.magi === 0)){
					$(".output").append("<li> Your AGI is above the limit for a Roth IRA. Your max contribution is 0.</li>");
				} else if((taxPayer.filingStatus === "Married, filing jointly" || taxPayer.filingStatus === "a Qualified Widow or Widower") && (taxPayer.magi < ROTH_MIN_MFJ)){
					$(".output").append("<li> You can contribute the maximum amount for the year. For 2017 this is 11,000 dollars.</li>");
				} 
				else if((taxPayer.filingStatus === "Married, filing jointly" || taxPayer.filingStatus === "a Qualified Widow or Widower") && (taxPayer.magi >= ROTH_MIN_MFJ && taxPayer.magi < ROTH_MAX_MFJ)){
				    
				    rothM = parseFloat((obj.magi-ROTH_MIN_MFJ)/10000);
					roundIt(rothM);
					reduction = rothM*11000;
					contributionAmt = 11000-reduction;
				
					$(".output").append("<li> Your maximum contribution amount is " + Math.round(contributionAmt) + " dollars for 2017. This is " + Math.round(contributionAmt/2) + " for each taxpayer.</li>"); // check CP laws
					return(contributionAmt);

				//Single, (Married, filing jointly), Head of Household, Married, filing separate returns, qualified widower

				}	
				break;
		
			case('Traditional'):
				if ($(".workPlan").val() === "yes"){

					console.log("yes for covered at work");
					//calculations

					//MFJ figure each contribution amount separately? pub 509a
					//also trustee fees are deductible



				} else {
					$(".output").append("<li>" + taxPayer['name'] + ", you can contribute the maximum amount for the year. For you this would be 11,000 dollars. </li>");}
				break;
	}


}; //end of contributionCalculation



// prior contributions made entry window, different approach than the deduction entries

function priorContribs(){

	var priorCont = $("input[type=radio][name=priorContribs]:checked").val();

	if(priorCont == "yes"){
		$('span.priorAmounts').removeClass('deductionHide');
	} else if (priorCont == "no"){
		$('span.priorAmounts').addClass('deductionHide');
	}
};



// function disableInputs(){

// 	$("input").each(

// }


//IRA question in js not html for testing
$("#rothOrTrad").text("Contributing to a Roth or Traditional IRA?");


//get user name


$("input[type='text']").on("keyup change", function(){
	taxPayer.name = $(this).val();
	
});


$("input[type='text']").blur(function(){
	$(".output").append("<li> Hello, " + taxPayer['name'] + " !</li>");						//display info in output window	 
});


//get and report type of IRA contributions
$(".IRAtype").on("click", function (){
		taxPayer.iraType = $("input[type=radio][name=IRAtype]:checked").val(); 							//Roth or Traditional
	if(taxPayer.iraType !== null){
		$(".output").append("<li> You're contributing to a " + taxPayer['iraType'] + " IRA.</li>");	
		$(".contribAmount").text("How much can I contribute to a " + taxPayer['iraType'] + " IRA?");
	}
	})

//get and report filing status
$(".status").on("click", function (){
		taxPayer.filingStatus = $("input[type=radio][name=status]:checked").val();						//Single, (Married, filing jointly), Head of Household, Married, filing separate returns, qualified widower
	if(taxPayer.filingStatus !== null){
		$(".output").append("<li> You're filing as " + taxPayer['filingStatus'] + " </li>");	
	}
	})


$(".workPlan").on("click", function (){
	taxPayer.workPlan = $("input[type=radio][name=covered]:checked").val();					//yes or no
	if(taxPayer.workPlan !== null){
		if(taxPayer.workPlan == "yes"){
			$(".output").append("<li> You <strong>are</strong> covered by a retirement plan at work.</li>");		
		} else if(taxPayer.workPlan == "no"){
			$(".output").append("<li> You <strong>are not</strong> covered by a retirement plan at work.</li>");		
		}	
	}
	})

$("input[type=number][name=AGI]").on("keyup change", function(){							//get AGI
	taxPayer.agi = $(this).val();
});


$("input[type=number][name=AGI]").blur(function(){
	taxPayer.agi = $("input[type=number][name=AGI]").val();
	if (taxPayer.agi < 0){
		$("input[type=number][name=AGI]").val(0);
		taxPayer.agi = 0;
		$(".output").append("<li>Your adjusted gross income (AGI) was " + taxPayer['agi'] + ".</li>");
	} else {
		$(".output").append("<li>Your adjusted gross income (AGI) was " + taxPayer['agi'] + ".</li>");
	}
});


/** BEGIN: Get individual deduction type amounts: **/


$('input[type="checkbox"]').on("click", function() {
	
	var a = $(this).val()
	//var addUps = [];

	if(this.checked){
		$('span.deductionHider').eq(a).removeClass('deductionHide');
	}
	else {
		$('span.deductionHider').eq(a).addClass('deductionHide');
	}
});

/** END: Get individual deduction type amounts: **/		



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

	totalDeductions = 0;
}

function checkNone(){
	var x = $(".deduction").eq(8).prop('checked');
	
	if(x === true){
		$(".deduction").eq(8).prop('checked', false);
	}
}
	
// END: Uncheck all boxes, hide all list inputs


// BEGIN: Do some things when clicking the calculate button




function showProps(obj, objName) {
  var result = '';
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      result += objName + '.' + i + ' = ' + obj[i] + '\n';
    }
  }
  

  return result;
}// -- for testing only
	

$(".contribAmount").on("click", function(){
 	
 	taxPayer.adjustments = 0;
	//add up total deductions

	

 	for(var j = 0; j < add.length; j++){
		taxPayer.adjustments += add[j];
	}	
	
	var x = parseInt(taxPayer.agi);
	var z = parseInt(taxPayer.adjustments);
	taxPayer.magi = x + z;
  	console.log("Total of Deductions: " + taxPayer['adjustments'] + " MAGI: " + taxPayer['magi']);

  	// var contributionAmount = contributionCalculation(taxPayer);

  	console.log("Your max contribution amount is: " + contributionCalculation(taxPayer, "taxPayer"));
  	console.log(showProps(taxPayer, "taxPayer"));
 
	
 });
 		



// END: Do some things when clicking the calculate button