
var FVAmount, PVInterest, PVTime;


function presentValueSolAmt(){ // Does the math using PV = FV[(1+i)^-n)]
	var PVActual; //The present value of the inputted amount based on the inputted time and interest

	var x = $("[name='userFV']").val();
	var y = $("[name='userRate']").val();
	var z = $("[name='userPeriods']").val();
	
	//js does math weird, trying alternate formula which doesn't include a negative exponent 
	var stepVar1 = 1+y;						// 1 plus the rate (y)											***************************************************************** Convert to percentage! it's concatenating the #s
	console.log(stepVar1)					
	var stepVar2 = Math.pow(stepVar1, z);	// The above calculation raised to the power of periods (lol)
	console.log(stepVar2)
	var stepVar3 = 1/stepVar2;				// 1 divided by the above
	console.log(stepVar3)
	PVActual = x/stepVar3;					// The user entered future value multiplied by the above
	console.log(PVActual);

	$(".output").append("<li> The Present Value of " + x + " earning interest at " + y + " for " + z + " periods is </li>" + PVActual );
	
	//return ("The Present Value of " + x + " earning interest at " + y + " for " + z + " periods is " + PVActual);
}

function returnOnCommonStockholdersEquity(){

	var userPeriodsROCSE = $("[name=returnOnCSEq]").val();
	var returnOnCSEquity = [];

	console.log(userPeriodsROCSE);

	for(var x = userPeriodsROCSE; x > 0; x--){
		
		returnOnCSEquity[x] = x;
		
	}

}


function dropEm(){
	$(".PVQ").removeClass("hideMe");
	$(".PVQ").addClass("showMe");
}



