// Simple Calc - Filing status, dependents, ordinary income

//let and const aren't working for some reason - ES6 syntax is a no go :(
var stdDeduction = 12000;

//Are these even needed?
var mFJDed = 2*stdDeduction;
var headOHDed = 1.5* stdDeduction;
var mFSDed = stdDeduction;


// Taxpayer Object 

var taxPayer = {
	filingStatus: String,
	grossWages: Number,
	dependents: Number,
	age: String,
	spAge: String,
	sight: String,
	spSight: String
};

// Income tiers Object

var incomeTiers = {

		sTier: [9525, 38700, 82500, 157500, 200000, 500000],
		mfjTier: [19050, 77400, 165000, 315000, 400000, 600000],
		hOHTier: [13600, 51800, 82500, 157500, 200000, 500000 ],
		mFSTier: [9525, 38700, 82500, 157500, 200000, 300000]
};

var taxTables = [.1, .12, .22, .24, .32, .35, .37];

var appTier = [];

function tierSelect(filingStatus, incomeTiers, err){
 		if (taxPayer.filingStatus == "single"){
 			return(appTier = incomeTiers.sTier);
 		} else if (taxPayer.filingStatus == "mFJ"){
 			return(appTier = incomeTiers.mfjTier);
 		} else if (taxPayer.filingStatus == "hOH"){
 			return(appTier = incomeTiers.hOHTier);
 		} else if (taxPayer.filingStatus == "mFS"){
 			return(appTier = incomeTiers.mFSTier);
 		} else if (err){
 			console.log (err);
 		};
 };


function buildATaxpayer(){
	let agi = 0;

	taxPayer.filingStatus = $("#filingStatus option:selected").val();
	taxPayer.grossWages = $("#grossIncome").val();
	taxPayer.dependents = $("#dependents").val();
	taxPayer.age = $("#age").val();
	taxPayer.spAge = $("#spAge").val();
	taxPayer.sight = $("#sight").val();
	taxPayer.spSight = $("#spSight").val();
		
	
	agi = taxPayer.grossWages - currDed(taxPayer);
	


	tierSelect(taxPayer.filingStatus, incomeTiers);
	console.log(appTier);
	$("#taxOwed").html(taxOwed(agi, appTier));
};


function currDed(filingStatus){
	let currDed = 0;
	let ageBox = $("#age").checked;


//adjustments to deduction
	if (taxPayer.filingStatus == "single"){
 		currDed += stdDeduction;
	 		if($("#age").prop('checked')){
				currDed += 1600;
			} 
			if($("#sight").prop('checked')){
				currDed += 1600;
			} 
 	} else if (taxPayer.filingStatus == "mFJ"){
 		currDed += mFJDed;
	 		if($("#age").prop('checked')){
				currDed += 1300;
			} 
			if($("#sight").prop('checked')){
				currDed += 1300;
			} 
			if($("#spAge").prop('checked')){
				currDed += 1300;
			} 
			if($("#spSight").prop('checked')){
				currDed += 1300;
			}
 	} else if (taxPayer.filingStatus == "hOH"){
 		currDed += headOHDed;
	 		if($("#age").prop('checked')){
				currDed += 1600;
			} 
			if($("#sight").prop('checked')){
				currDed += 1600;
			} 
 	} else if (taxPayer.filingStatus == "mFS"){
 		currDed += mFSDed;
 			if($("#age").prop('checked')){
				currDed += 1300;
			} 
			if($("#sight").prop('checked')){
				currDed += 1300;
			}
 	} else if (taxPayer.filingStatus == "qW"){
 		currDed += mFJDed;
 			if($("#age").prop('checked')){
				currDed += 1300;
			} 
			if($("#sight").prop('checked')){
				currDed += 1300;
			}
	};

//adjustments for age and sight
	console.log(currDed);
	return(currDed);
	//return(ageAndSight(currDed));
};


function taxOwed(agi){
	let taxableInc = agi;
	let taxDue = 0;
	let i = 0; //while loop counter
	let tierTaxable = 0;


// array of arrays - for each filing status - 4 of them
// or object with arrays?

	while(taxableInc > 0){
		console.log("Iteration: " + i, taxableInc);							
		//Tier 1
		if (i == 0){
			tierTaxable = appTier[i];
		} else if (i == 6){ 	
			//oh lawd he comin
			console.log(taxableInc, taxDue);
			taxDue += (taxableInc*taxTables[i]);
			return(taxDue);
		} else {
			tierTaxable = appTier[i] - appTier[i-1];
		}
		
		if (taxableInc % tierTaxable == taxableInc || taxableInc % tierTaxable == 0){
			console.log(taxableInc, taxDue, taxTables[i]);
			taxDue = taxDue + (taxableInc * taxTables[i]);
			taxableInc -= tierTaxable;
		} else {
			taxDue = taxDue + (tierTaxable * taxTables[i]);
			taxableInc -= tierTaxable;
		}
		console.log(taxDue, taxableInc);
		i += 1;
	}
	return(taxDue);
};
	
function otherOps(spouse){
	if(spouse == "mFJ"){
		$("div").removeClass("unspoused");	
	} else {
		$(".spouse").addClass("unspoused");
	}
};


/*

17816


9525, 38700, 82500, 157500, 200000, 500000

110000 - 12000 = 98000 taxable income

98000 - 9525 = 88475 	taxableIncAtTier[0] = 9525 	tax = 952.5 
88475 - 38700 = 49775	taxableIncAtTier[1] = 38700	tax = 4644  
49775 - 82500 = QUIT    taxableIncAtTier[2] = 49775 tax = 10950.5

16547

98000
9525+38700+82500

taxTables length = 7
0, 1, 2, 3, 4, 5, 6

agi1 50000
agi2 78000

let taxableInc = ag1 - currDed;
let taxDue = 0;

while( taxableInc > 0 && counter > 0){
	taxDue += tTier[0]*.1;
	taxableInc -= tTier[0]; 
	taxableInc = taxableInc mod tTier[1];
	taxDue += taxableInc * .12;
	taxableInc -= tTier[1];
}


(value: 38000) (tax = 19050 *.1 = 1905)
taxableInc - 19050 = afterTen (value: 18950) (tax = if ((afterTen - 77400) <= 0) afterTen * .12 = tier2Tax)
	

}

655.05+952.5+4644


77400

MFJ: 19050, 77400, 165000, 315000, 400000, 600000 
Single: 9525, 38700, 82500, 157500, 200000, 500000
HoH: 13600, 51800, 82500, 157500, 200000, 500000 
MFS:  9525, 38700, 82500, 157500, 200000, 300000

for 50000 (38000) answer should be 4373
for 78000 (66000) answer should be 10,465




%	MFJ 		HOH 		Unmarried 	MFS
10	$0 			$0 			$ 0 		$ 0
12	$19,050		$13,600 	$ 9,525	 	$ 9,525
22	$ 77,400 	$ 51,800 	$ 38,700 	$ 38,700
24	$165,000 	$ 82,500 	$ 82,500 	$ 82,500
32	$315,000 	$157,500 	$157,500 	$157,500
35	$400,000 	$200,000 	$200,000 	$200,000
37	$600,000 	$500,000 	$500,000 	$300,000

*/




//Filing status selection

//What is your filing status: DROP DOWN: Single, Married Filing Joint, Head of Household, Qualifying Widow/er





