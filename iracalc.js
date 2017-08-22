//"Constants" change to update
var ROTH_MIN_MFJ = 186000;
var ROTH_MAX_MFJ = 196000;
var ROTH_MIN_S = 118000;
var ROTH_MAX_S = 133000;
var ROTH_MAX_MFSLW = 10000;
// end "Constants"

var genLimit = 5500;
var taxPayer = {name: '', iraType: '', filingStatus: '', workPlan: '', agi: 0, magi: 0, adjustments: 0, age: 0};
var allDeductions = document.getElementsByClassName(".deductionHide");
var add = []; // array for addbacks to AGI to get MAGI


//var magiCalc; //more like mystery calc, idk what this is for

	
///rounding to 3 decimals

function roundIt(number, precision) {
    console.log("Rounding Function:");
    var factor = Math.pow(10, precision);
    console.log(factor);
    var tempNumber = number * factor;
    console.log(tempNumber);
    var roundedTempNumber = Math.round(tempNumber);
    console.log(roundedTempNumber);
    return roundedTempNumber / factor;
}


//calculate the max contribution


// prior contributions made entry window, different approach than the deduction entries

function priorContribs(){

	var priorCont = $("input[type=radio][name=priorContribs]:checked").val();

	if(priorCont == "yes"){
		$('span.priorAmounts').removeClass('deductionHide');
	} else if (priorCont == "no"){
		$('span.priorAmounts').addClass('deductionHide');

	}
};



function over50(){
	
	overUnder = $("input[type=radio][class=age]:checked").val();
			
	if (overUnder === "over" && taxPayer.filingStatus === "Married, filing jointly"){
		genLimit = 11000;
		genLimit += 1000;
		console.log(genLimit);
		console.log(overUnder);
		$("input[type=radio][class=age][value=over]").prop('disabled', true);	
		$("input[type=radio][class=age][value=under]").prop('disabled', false);	
		return(genLimit);	
	} 

	else if (overUnder === "under" && taxPayer.filingStatus === "Married, filing jointly"){
		genLimit = 11000;
		console.log(genLimit);
		console.log(overUnder);
		$("input[type=radio][class=age][value=under]").prop('disabled', true);		
		$("input[type=radio][class=age][value=over]").prop('disabled', false);	
		return(genLimit);		
	}

	else if (overUnder === "under" && taxPayer.filingStatus !== "Married, filing jointly"){
		genLimit = 5500;
		console.log(genLimit);
		console.log(overUnder);
		$("input[type=radio][class=age][value=under]").prop('disabled', true);		
		$("input[type=radio][class=age][value=over]").prop('disabled', false);	
		return(genLimit);	
	}

	else if (overUnder === "over" && taxPayer.filingStatus !== "Married, filing jointly"){
		genLimit = 6500;
		console.log(genLimit);
		console.log(overUnder);
		$("input[type=radio][class=age][value=over]").prop('disabled', true);		
		$("input[type=radio][class=age][value=under]").prop('disabled', false);	
		return(genLimit);	
	}
}

function spouseToo(){

	if (taxPayer.filingStatus !== "Married, filing jointly"){
		genLimit = 5500;
	}

	if($("input[type=checkbox][name=mfjOnly]").is(':checked')){
			genLimit += 1000;
			console.log(genLimit);
			console.log("Spouse2 checked");
	} else {
			genLimit -= 1000;
			console.log(genLimit);
			console.log("Spouse2 Unchecked");
			console.log();
	}

}



function disableAllInputs(){
	$("#target input").prop("disabled", true);
}

function disableInput(field){
	$(this).prop('disabled', true);
}



//check for excess contributions
function excessContribCheck(made, limit){ 
	
	if (taxPayer.agi < limit){   //If AGI is less than the general limit, the new limit is the AGI
		limit = taxPayer.agi;
	}

	if (!made || ($("input[type=radio][name=priorContribs]").val() === "no")){ 
			made = 0;
			console.log("Checked madeContribs");
			console.log(made);
	}	
	
	var excess = limit - made;

	Math.round(excess);
	console.log("Excess Rounding Check");
	console.log(Math.round(excess));
	
	if (excess >= 0){		
		return("You can contribute up to " + Math.round(excess) + " this year.");			
	} else {
		return("You cannot contribute anything to an IRA, and you actually have excess contributions of " + -1*excess + " ");
	}
}



function contributionCalculation(obj, objName){

	
	var contributionAmt = genLimit; 
	var reduction = 0; 
	var rothM = 0; // fractional multiplier
	var madeContribs = parseFloat($("input[name=iraContribsMade]").val()); //contributions that have already been made
	

	if (taxPayer.age == true){ contributionAmt = 6500 }

	//Age > 50 +1000 to limit, MFJ +1000 per TP > 50
	
	switch(obj.iraType){
			case('Roth'):

//MARRIED FILING SEPARATELY 
				var livedWith = $("input[type=checkbox][name=mfsLiveWith]");

				if(taxPayer.filingStatus === "Married, filing separately" && livedWith.is(":checked") && (taxPayer.magi >= ROTH_MAX_MFSLW || taxPayer.magi === 0)){
					$(".output").append("<li> " + excessContribCheck(madeContribs, contributionAmt) + " </li>");
					$(".output").append("<li> Your AGI is above the limit for a Roth IRA. Your max contribution is 0.</li>");

				} else if((taxPayer.filingStatus === "Married, filing separately") && livedWith.is(":checked") && (taxPayer.magi < ROTH_MAX_MFSLW)){
					rothM = parseFloat((obj.magi)/10000);
					roundIt(rothM, 3);
					reduction = rothM*genLimit;
					contributionAmt = genLimit-reduction;
					console.log("lived with = " + livedWith.val());

					$(".output").append("<li> " + excessContribCheck(madeContribs, contributionAmt) + " </li>");
				
				}  else if (taxPayer.filingStatus === "Married, filing separately" && !livedWith.is(":checked")){
					taxPayer.filingStatus = "Single";
				}


//SINGLE HEAD OF HOUSEHOLD
				if((obj.filingStatus === "Single" || obj.filingStatus === "Head of Household") && obj.magi >= ROTH_MAX_S)
				{
					// excessContribCheck();

					$(".output").append("<li> Your AGI is above the limit for a Roth IRA. Your max contribution is 0.</li>"); 
				}
				else if((obj.filingStatus === "Single" || obj.filingStatus === "Head of Household") && obj.magi < ROTH_MIN_S)
				{
					$(".output").append("<li> " + excessContribCheck(madeContribs, contributionAmt) + " </li>"); 

					 //Your maximum contribution for a " + taxPayer['iraType'] + " 

				}
				else if((obj.filingStatus === "Single" || obj.filingStatus === "Head of Household") && (obj.magi >= ROTH_MIN_S && obj.magi < ROTH_MAX_S))
				{
					rothM = parseFloat((obj.magi-ROTH_MIN_S)/15000);
					roundIt(rothM, 3);
					reduction = rothM*genLimit;
					contributionAmt = genLimit-reduction;
					$(".output").append("<li> " + excessContribCheck(madeContribs, contributionAmt) + " </li>");
				}

//MARRIED FILING JOINTLY QUALIFIED WIDOW
				if((taxPayer.filingStatus === "Married, filing jointly" || taxPayer.filingStatus === "a Qualified Widow or Widower") && (taxPayer.magi >= ROTH_MAX_MFJ || taxPayer.magi === 0)){
					$(".output").append("<li> Your AGI is above the limit for a Roth IRA. Your max contribution is 0.</li>");
				} else if((taxPayer.filingStatus === "Married, filing jointly" || taxPayer.filingStatus === "a Qualified Widow or Widower") && (taxPayer.magi < ROTH_MIN_MFJ)){
					$(".output").append("<li> " + excessContribCheck(madeContribs, genLimit) + " </li>");
				} 
				else if((taxPayer.filingStatus === "Married, filing jointly" || taxPayer.filingStatus === "a Qualified Widow or Widower") && (taxPayer.magi >= ROTH_MIN_MFJ && taxPayer.magi < ROTH_MAX_MFJ)){
				    
				    rothM = parseFloat((obj.magi-ROTH_MIN_MFJ)/10000);
					roundIt(rothM, 3);
					reduction = rothM*genLimit;
					contributionAmt = genLimit-reduction;
					$(".output").append("<li> " + excessContribCheck(madeContribs, contributionAmt) + " </li>" + "<li> This is " + (excessContribCheck(madeContribs, contributionAmt)/2) + " for each taxpayer </li>"); // check CP laws

				//Single, (Married, filing jointly), Head of Household, Married, filing separate returns, qualified widower
				}
				
					   
			break;		    									

				//Single, (Married, filing jointly), Head of Household, Married, filing separate returns, qualified widower
				
			case('Traditional'):
				if ($(".workPlan").val() === "yes"){

					console.log("yes for covered at work");
					//calculations

					//MFJ figure each contribution amount separately? pub 509a
					//also trustee fees are deductible



				} else {
					$(".output").append("<li>" + taxPayer['name'] + ", you can contribute the maximum amount for the year. For you this would be 11,000 dollars. </li>");}
					disableAllInputs();
				break;
	}




}; //end of contributionCalculation



// BEGIN: Uncheck all boxes, hide all list inputs, clear all amounts

function uncheckAll(){
	var boxes = $('input[name=deduction]');
	
	for( var i = 0; i < (boxes.length-1); i++){
		boxes.each(function(){
			if( $(this).val() < 8)
				{this.checked = false;}
			});
	
		$('span.deductionHider').eq(i).addClass('deductionHide');
		$('input[type=number]').eq(i+2).val(0);
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


// BEGIN: Obtain and add deductions taken

//GOAL to store the new deduction amounts in an array, then add all array elements to determine MAGI



function addUpDeductions(check){

if (check == 1){
	//var totalDeductions = 0;

	$("input[type=number][name=addBack1]").on("keyup change", function() {
		  
		  var i = $(".deduction").eq(0).val();
		  add[i] = parseInt(this.value);	
		    
	});

	$("input[type=number][name=addBack2]").on("keyup change", function() {
		  
		  var i = $(".deduction").eq(1).val();
		  add[i] = parseInt(this.value);
		  
	});

	$("input[type=number][name=addBack3]").on("keyup change", function() {
		  
		  var i = $(".deduction").eq(2).val();
		  add[i] = parseInt(this.value);
		  
	});

	$("input[type=number][name=addBack4]").on("keyup change", function() {
		  
		  var i = $(".deduction").eq(3).val();
		  add[i] = parseInt(this.value);
		  
	});

	$("input[type=number][name=addBack5]").on("keyup change", function() {
		  
		  var i = $(".deduction").eq(4).val();
		  add[i] = parseInt(this.value);
		  
	});

	$("input[type=number][name=addBack6]").on("keyup change", function() {
		  
		  var i = $(".deduction").eq(5).val();
		  add[i] = parseInt(this.value);
		  
	});	  

	$("input[type=number][name=addBack7]").on("keyup change", function() {
		  
		  var i = $(".deduction").eq(6).val();
		  add[i] = parseInt(this.value);
		  
	});

	$("input[type=number][name=addBack8]").on("keyup change", function() {
		  
		  var i = $(".deduction").eq(7).val();
		  add[i] = parseInt(this.value);
		  
	});}

else {
	return (0);
	}
}


//END: Obtain and add deductions taken



// TESTING ONLY 
function showProps(obj, objName) {
  var result = '';
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      result += objName + '.' + i + ' = ' + obj[i] + '\n';
    }
  }
  

  return result;
}
// TESTING ONLY 



//IRA question in js not html for testing
$("#rothOrTrad").text("Contributing to a Roth or Traditional IRA?");


//get user name


$("input[type='text']").on("keyup change", function(){
	taxPayer.name = $(this).val();
	
});

$(".age").on("click", function (){
		taxPayer.age = $("input[type=radio][name=age]:checked").val();
		parseInt(taxPayer.age);
		if (taxPayer.age === 1 ){
			contributionAmt+= 1000; 

			console.log(contributionAmt)
		}
}); 							//50 or over

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
	
	if ($("#mfj").is(':checked')){
		$(".spouseCheck").removeClass("deductionHide");
		genLimit *= 2;
	} else if (!$("#mfj").is(':checked')){
		$(".spouseCheck").addClass("deductionHide");
	}
});

//Check is MFS lived with spouse
$(".status").on("click", function (){
	if ($("#mfs").is(':checked')){
		$(".spouseLiveWith").removeClass("deductionHide");
	} else if (!$("#mfs").is(':checked')){
		$(".spouseLiveWith").addClass("deductionHide");
	}
});

$(".workPlan").on("click", function (){
	taxPayer.workPlan = $("input[type=radio][name=covered]:checked").val();					//yes or no
	if(taxPayer.workPlan !== null){
		if(taxPayer.workPlan == "yes"){
			$(".output").append("<li> You <strong>are</strong> covered by a retirement plan at work.</li>");		
		} else if(taxPayer.workPlan == "no"){
			$(".output").append("<li> You <strong>are not</strong> covered by a retirement plan at work.</li>");		
		}	
	}
});

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


$('input[type="checkbox"][class=deduction]').on("click", function() {
	
	var a = $(this).val()

	if(this.checked){
		$('span.deductionHider').eq(a).removeClass('deductionHide');
		addUpDeductions(1);
	}
	else {
		$('span.deductionHider').eq(a).addClass('deductionHide');
		addUpDeductions(0);	
	}
});

/** END: Get individual deduction type amounts: **/		



// BEGIN: Do some things when clicking the calculate button
	

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