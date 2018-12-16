// Simple Calc - Filing status, dependents, ordinary income

//let and const aren't working for some reason - ES6 syntax is a no go :(
var stdDeduction = 12000;

var mFJ = 2*stdDeduction;
var headOH = 1.5* stdDeduction;
var mFS = stdDeduction;
var qWidow = mFJ;


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

var sTier = [9525, 38700, 82500, 157500, 200000, 500000],
	mfjTier = [19050, 77400, 165000, 315000, 400000, 600000];
var taxTables = [.1, .12, .22, .24, .32, .35, .37];




function buildATaxpayer(){
	let currDed = stdDeduction;
	let agi = 0;

	taxPayer.filingStatus = $("#filingStatus option:selected").val();
	taxPayer.grossWages = $("#grossIncome").val();
	taxPayer.dependents = $("#dependents").val();
		
	//currDed
		//eyesAndAges();
		//taxPayer.dependents;


	agi = taxPayer.grossWages - currDed;
	console.log(currDed, agi, taxPayer.grossWages);
	console.log(taxPayer);
	$("#taxOwed").html(taxOwed(agi));
};



function taxOwed(agi){
	let taxableInc = agi;
	let taxDue = 0;
	let i = 0; //while loop counter
	let tierTaxable = 0;


// array of arrays - for each filing status - 4 of them
// or object with arrays?

	while(taxableInc > 0){
		console.log("Iteration: " + i);							
		//Tier 1
		if (i == 0){
			tierTaxable = sTier[i];
		} else if (i == 6){ 	
			//oh lawd he comin
			console.log(taxableInc, taxDue);
			taxDue += (taxableInc*taxTables[i]);
			return(taxDue);
		} else {
			tierTaxable = sTier[i] - sTier[i-1];
		}
		
		console.log(tierTaxable);
		if (taxableInc % tierTaxable == taxableInc){
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
		

function eyesAndAges(){
	if($("age") == "on"){
			currDed += 1300;
		}

		if($("#spAge").checked){
			currDed += 1300;
		}
		if($("sight").checked){
			currDed += 1300;
		}

		if($("#spSight").checked){
			currDed += 1300;
		}
}

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





