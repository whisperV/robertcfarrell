// Namespace creation, although not needed as scope will be limited to file, and app is simple enoughin execution... for now
// var simple_estimate = simple_estimate || {};

//DOM manipulation

var spouseA = document.getElementById("spouseAge");
var spouseS = document.getElementById("spouseSight");

function showItems(showMe){
  if (showMe == 'single' || showMe == 'hOH'){
    console.log("Show it sing: " + showMe);
    spouseA.className = 'hideMe';
    spouseS.className = 'hideMe';
  } else {
    spouseA.className = '';
    spouseS.className = '';
  }
}

// CONSTANTS - UPDATE WITH 2019 CHANGES

    // Child tax credit income limits and medicare surtax income limits
const   ctcLimitM = 400000,
        ctcLimitNm = 200000,
        mediSurTaxM = 250000,
        mediSurTaxS = 200000;

    //Change points for tax rates to apply
const   incomeTiers = {
        sTier: [9700, 39475, 84200, 160725, 204100, 510300],
        mfjTier: [19400, 78950, 168400, 321450, 408200, 612350],
        hOHTier: [13850, 52850, 84200, 160700, 204100, 510300],
        mFSTier: [9700, 39475, 84200, 160725, 204100, 306175]
};

    //Single Standard deduction    
const   stdDeduction = 12000;

    //Standard deductions for !single filing statuses
const   mFJDed = 2*stdDeduction,
        headOHDed = 1.5* stdDeduction,
        mFSDed = stdDeduction;



    //sight and age adjustments based on filing status
const sHoH = 1600;
const mFJS = 1300;


//tax rates
const   taxTables = [.1, .12, .22, .24, .32, .35, .37];

// Global variables to be used for calculations 

let totalDue = 0;
let taxDue, currentDed;
let appTier = []; 



// Main function invoked
function calcIt (info){
    let formInfo = document.info,
        fStatus= formInfo.filingStatus.value,
        tAge= formInfo.age.checked,
        tSAge= formInfo.spAge.checked,
        tSight= formInfo.sight.checked,
        tSSight= formInfo.spSight.chedked,
        tDependents= formInfo.dependents.value,
        tODeps= formInfo.oDeps.value,
        tGrossWages= formInfo.grossWages.value;

    let taxpayer = {
        filingStatus: fStatus,
        age: tAge,
        spAge: tSAge,
        sight: tSight,
        spSight: tSSight,
        dependents: tDependents,
        oDeps: tODeps,
        grossWages: tGrossWages
    }
    
    
    //For sending answer to window
    let taxResult = document.getElementById('taxOwed');
    
    tierSelect(taxpayer);
    totalDue = (taxOwed(taxpayer,(taxpayer.grossWages - (currDed(taxpayer))))) - dependentCredits(taxpayer);
    totalDue = Math.max(0,totalDue);
    totalDue = Math.round(totalDue);
     
    
    taxResult.innerHTML = `<span class="results">&nbsp $${totalDue} &nbsp</span>`;
    
    
}

//tierSelect function for determing what rate to apply 

function tierSelect(tPayer){
      
    if (tPayer.filingStatus == "single"){
      return(appTier = incomeTiers.sTier);
    } else if (tPayer.filingStatus == "mFJ"){
      return(appTier = incomeTiers.mfjTier);
    } else if (tPayer.filingStatus == "hOH"){
      return(appTier = incomeTiers.hOHTier);
    } else if (tPayer.filingStatus == "mFS"){
      return(appTier = incomeTiers.mFSTier);
    };
 };

//determine standard deduction amount
function currDed(tPayer){
    currentDed = 0;
    // let ageBox = $("#age").checked;
  
    //adjustments to deduction for filing status and age/sight
      if (tPayer.filingStatus == "single"){
        currentDed += stdDeduction;
           if(tPayer.age){
            currentDed += sHoH;
          } 
          if(tPayer.sight){
            currentDed += sHoH;
          } 
       } else if (tPayer.filingStatus == "mFJ"){
         currentDed += mFJDed;
           if(tPayer.age){
            currentDed += mFJS;
          } 
          if(tPayer.sight){
            currentDed += mFJS;
          } 
          if(tPayer.spAge){
            currentDed += mFJS;
          } 
          if(tPayer.spSight){
            currentDed += mFJS;
          }
       } else if (tPayer.filingStatus == "hOH"){
        currentDed += headOHDed;
           if(tPayer.age){
            currentDed += sHoH;
          } 
          if(tPayer.sight){
            currentDed += sHoH;
          } 
       } else if (tPayer.filingStatus == "mFS"){
        currentDed += mFSDed;
           if(tPayer.age){
            currentDed += mFJS;
          } 
          if(tPayer.sight){
            currentDed += mFJS;
          }
       } else if (tPayer.filingStatus == "qW"){
        currentDed += mFJDed;
           if(tPayer.age){
            currentDed += mFJS;
          } 
          if(tPayer.sight){
            currentDed += mFJS;
          }
      };
    
      console.log(tPayer.age, tPayer.sight, currentDed);
      return(currentDed);
};

  //calculate tax owed based on income and standard deduction
function taxOwed(tPayer, agi){
    let taxableInc = agi;
    taxDue = 0;
    let i = 0; //while loop counter
    let tierTaxable = 0;
    let surTax = 0;

    while(taxableInc > 0){
      console.log("Iteration: " + i, taxableInc);							
      //Tier 1
      if (i == 0){
        tierTaxable = appTier[i];
      } else if (i == 6){ 	
        //oh lawd he comin - tier 6 taxable income
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

    //Medicate surtax on incomes over the applicable threshold
    if (tPayer.filingStatus == "mFJ" && tPayer.grossWages > mediSurTaxM){
      surTax = (tPayer.grossWages - mediSurTaxM)*.009;
    } else if (tPayer.filingStatus != "mFJ" && tPayer.grossWages > mediSurTaxS){
      surTax = (tPayer.grossWages - mediSurTaxS)*.009;
    }
    
    console.log("surTax: ", surTax);
    return(taxDue + surTax); 
    
}; 

function dependentCredits(tPayer){
    let ctc = 0,
        ctcLimit = 0,
        odc = 0;
    if (tPayer.dependents < 1){
      return(0);
    // Child tax credit threshold calculations
    } else if (tPayer.grossWages < 2500){
       return (ctc = 0);
    } else if (tPayer.filingStatus == "mFJ" && tPayer.grossWages > ctcLimitM){
        ctcLimit = Math.round(((tPayer.grossWages - ctcLimitM)/1000)*1000);
        ctcLimit *= .05; // 5% of the amount over the threshold 
    } else if (tPayer.filingStatus != "mFJ" && tPayer.grossWages > ctcLimitNm){
        ctcLimit = (tPayer.grossWages - ctcLimitNm);
        console.log("ctcLimit pre-rounding: ", ctcLimit);
        //round to the nearest thousands ------- ***** semi-bootlegged, anything over 900,000 won't work
        ctcLimit = roundToThousands(ctcLimit) * .05;
    }
    
    tPayer.dependents -= tPayer.oDeps;
  
    for (let i = 0; i < tPayer.dependents; i++){
      ctc += 2000;
    } 
    for (let j = 0; j < tPayer.oDeps; j++){
      odc += 500;
    }
  
    ctc += odc;
    
    console.log('ctc limit: ', ctcLimit);
  
    if (ctc > ctcLimit && ctcLimit > 0){
      console.log("Returning the ACTC")
      console.log("ctc: ", ctc);
      console.log("Available credit: ", Math.max(0, ctc-ctcLimit));
      return (Math.max(0, ctc-ctcLimit))
    } else if (ctcLimit == 0) {
      console.log("Returning the CTC", ctc);
      return (ctc);
    } else {
      console.log("Not qualified for the CTC or ACTC");
      return(0);
    }
  }
  
  // add the needed amount to get to the next highest thousand
    function roundToThousands(ctcAdj){
      let rounded = 0;
      let remains = 0;
  
      remains = ctcAdj % 1000;
      rounded = 1000-remains;
      ctcAdj += rounded;
  
      return(ctcAdj);
     
};
  