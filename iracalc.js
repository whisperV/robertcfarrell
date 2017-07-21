
var taxPayer = {name: '', iraType: '', filingStatus: '', workPlan: '', agi: 0};


//calculate the max contribution

function contributionAmount(taxPayer){

	switch(taxPayer.iraType){
		case('Roth'):
			//if(taxPayer.iraType === "Roth"){
			if(taxPayer.filingStatus === "Single" && taxPayer.agi >= 133000){
				$(".output").append("<li> Your AGI is above the limit for a Roth IRA. Your max contribution is 0.</li>");
					} else if(taxPayer.filingStatus === "Single" && taxPayer.agi < 118000){
						$(".output").append("<li> You can contribute the maximum amount, or 5500.</li>");
					}
			break;
		case('Traditional'):
			$(".output").append("<li>" + taxPayer['name'] + ", you can contribute the maximum amount, or 5500.</li>");	
			break;
		}
	}
	


//IRA question in js not html 
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

$("input[type='number']").keypress(function(event){
	taxPayer.agi = $("input[type='number']").val();
	if(event.which === 13){
		$(".output").append("<li>Your adjusted gross income (AGI) was " + taxPayer['agi'] + ".</li>");
		contributionAmount(taxPayer);
	}
	})

