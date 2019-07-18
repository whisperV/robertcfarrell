// Namespace creation, although not needed as scope will be limited to file, and app is simple enoughin execution... for now
// var simple_estimate = simple_estimate || {};

//DOM manipulation

let spouseA = document.getElementById("spouseAge");
let spouseS = document.getElementById("spouseSight");

function showItems(showMe){
  if (showMe == 'single' || showMe == 'hOH'){
    spouseA.className = 'hideMe';
    spouseS.className = 'hideMe';
  } else {
    spouseA.className = '';
    spouseS.className = '';
  }
}

let iDeds = document.getElementById("itemDed");

function showDeducts(){
  if(iDeds.checked === true){
    iDed.className='';
  } else {
    document.getElementById('iDeduction').value=0;
    iDed.className='hideMe';
    
  }
  
}

// CONSTANTS - UPDATE WITH 2019 CHANGES

    // Child tax credit income limits and medicare surtax income limits
const   ctcLimitM = 400000,
        ctcLimitNm = 200000,
        mediSurTaxM = 250000,
        mediSurTaxS = 200000;
        mediSurTaxMFS = 125000;
        sSTaxLimit = 132900;


//Progressive tax systm

//2018 for testing purposes
// const   incomeTiers = {
//       sTier: [9525, 38700, 82500, 157500, 200000, 500000],
//       mfjTier: [19050, 77400, 165000, 315000, 400000, 600000],
//       hOHTier: [13600, 51800, 82500, 157500, 200000, 500000 ],
//       mFSTier: [9525, 38700, 82500, 157500, 200000, 300000]
//     };

// Current year values: 2019
const   incomeTiers = {
        sTier: [9700, 39475, 84200, 160725, 204100, 510300],
        mfjTier: [19400, 78950, 168400, 321450, 408200, 612350],
        hOHTier: [13850, 52850, 84200, 160700, 204100, 510300],
        mFSTier: [9700, 39475, 84200, 160725, 204100, 306175]
};

    //Single Standard deduction    
const   stdDeduction = 12200;

    //Standard deductions for !single filing statuses
const   mFJDed = 2*stdDeduction,
        headOHDed = (1.5 * stdDeduction)+50,
        mFSDed = stdDeduction;

    //sight and age adjustments based on filing status
const sHoH = 1600;
const mFJS = 1300;


//tax rates
const taxTables = [.1, .12, .22, .24, .32, .35, .37];
const ficaRate = .062;
const mediLow = .0145;
const mSurT = .09;

// Global variables to be used for calculations 

let totalDue = 0;
let taxDue, currentDed;
let appTier = []; 
let mediDue = [0,0];

// Main function invoked
function calcIt (info){
    let formInfo = document.info,
        fStatus= formInfo.filingStatus.value,
        tAge= formInfo.age.checked,
        tSAge= formInfo.spAge.checked,
        tSight= formInfo.sight.checked,
        tSSight= formInfo.spSight.checked,
        tDependents= formInfo.dependents.value,
        tODeps= formInfo.oDeps.value,
        tGrossWages= formInfo.grossWages.value;
        iDedVal= formInfo.iDeduction.value;

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
    let ficaResult = document.getElementById('fica');
    let mediResult = document.getElementById('medi');
    let mediSurResult = document.getElementById('mediSur');
    let totalResult = document.getElementById('total');
    let allResults = document.getElementById('showResults');

    allResults.className = '';
    
    tierSelect(taxpayer);
    let ficaDue = ficaTax(taxpayer.grossWages);
    let mediDue = mediTax(taxpayer);
    for (let j=0; j< mediDue.length; j++){
      mediDue[j] = Math.max(0, mediDue[j]);
      mediDue[j] = Math.round(mediDue[j]);
    }
    ficaDue = Math.max(0, ficaDue);
    ficaDue = Math.round(ficaDue);
    totalDue = (taxOwed(taxpayer,(taxpayer.grossWages - (currDed(taxpayer))))) - dependentCredits(taxpayer);
    totalDue = Math.max(0,totalDue);
    totalDue = Math.round(totalDue);
     
    taxResult.innerHTML = `<span>&nbsp $${totalDue} &nbsp</span>`;
    ficaResult.innerHTML = `<span>&nbsp $${ficaDue} &nbsp</span>`;
    mediResult.innerHTML = `<span>&nbsp $${mediDue[0]} &nbsp</span>`;
    
    mediSurResult.innerHTML = `&nbsp <span>&nbsp $${mediDue[1]} &nbsp</span>`;
    mediResult.innerHTML = `<span>&nbsp $${mediDue[0]} &nbsp</span>`;
    
    totalResult.innerHTML = `&nbsp <span class="results">&nbsp $${totalDue + ficaDue + mediDue[0] + mediDue[1]} &nbsp</span> `;
    
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
  iDedVal*=1;

  function ageSightCheck(){
    let tpSP = [tPayer.age, tPayer.sight, tPayer.spAge, tPayer.spSight];

    if(tPayer.filingStatus == 'single' || tPayer.filingStatus == 'hOH'){ 
      for(let i=0; i< tpSP.length; i++){
        if(tpSP[i]){
          currentDed += sHoH;
        }
      }
    } else if (tPayer.filingStatus == 'mFJ' || tPayer.filingStatus == 'mFS'){
        for(let j=0; j< tpSP.length; j++){
          if(tpSP[j]){
            currentDed += mFJS;
            console.log(currentDed);
          }
        }
    }
    console.log('AgeEye Check for ' + tPayer.filingStatus + ' with age ' + tPayer.age +' and sight '+ tPayer.sight + ': '+ currentDed);
    return(currentDed);
  }

//adjustments to deduction for filing status and age/sight
  if (tPayer.filingStatus == "single"){
    if(stdDeduction > iDedVal){
      currentDed += stdDeduction;
    } else {
      currentDed += iDedVal;
      console.log('single: ' + currentDed);
    }    
    //Check age and eyeSight
    ageSightCheck();
    console.log(currentDed);
       
  } else if (tPayer.filingStatus == "hOH"){
    if(headOHDed > iDedVal){
      currentDed += headOHDed;
    } else {
      currentDed += iDedVal;
      console.log('HoH: ' + currentDed);
    }
    //Check age and eyeSight
    ageSightCheck();
    console.log(currentDed);

  } else if (tPayer.filingStatus == "mFS"){
    if(mFSDed > iDedVal){
      currentDed += mFSDed;
    } else {
      currentDed += iDedVal;
      console.log('mFS: ' + currentDed);
    }
    //Check age and eyeSight
    ageSightCheck();
    console.log(currentDed);

  } else if (tPayer.filingStatus == "mFJ"){
    if(mFJDed > iDedVal){
      currentDed += mFJDed;
    } else {
      currentDed += iDedVal;
      console.log('mFJ: ' + currentDed);
    }
    //Check age and eyeSight
    ageSightCheck();
    console.log(currentDed);
  }
  // console.log(tPayer.age, tPayer.sight, currentDed);
  return(currentDed);
};

  //calculate tax owed based on income and standard deduction
function taxOwed(tPayer, agi){
    let taxableInc = agi;
    taxDue = 0;
    let i = 0; //while loop counter
    let tierTaxable = 0;
    

    while(taxableInc > 0){
      // console.log("Iteration: " + i, taxableInc);							
      //Tier 1
      if (i == 0){
        tierTaxable = appTier[i];
      } else if (i == 6){ 	
        //tier 6 taxable income
        taxDue += (taxableInc*taxTables[i]);
        return(taxDue);
      } else {
        tierTaxable = appTier[i] - appTier[i-1];
      }
     
      if (taxableInc % tierTaxable == taxableInc || taxableInc % tierTaxable == 0){
        // console.log(taxableInc, taxDue, taxTables[i]);
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
        // console.log("ctcLimit pre-rounding: ", ctcLimit);
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
    
    // console.log('ctc limit: ', ctcLimit);
  
    if (ctc > ctcLimit && ctcLimit > 0){
      // console.log("Returning the ACTC")
      // console.log("ctc: ", ctc);
      // console.log("Available credit: ", Math.max(0, ctc-ctcLimit));
      return (Math.max(0, ctc-ctcLimit))
    } else if (ctcLimit == 0) {
      // console.log("Returning the CTC", ctc);
      return (ctc);
    } else {
      // console.log("Not qualified for the CTC or ACTC");
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

// SSI tax, limited to a specific amount each year
function ficaTax(wages){
  if(wages < sSTaxLimit){
    console.log(wages + ' wages | ' + 'Limit ' + sSTaxLimit);
    return (wages*ficaRate);
  } else {
    return (ficaRate * sSTaxLimit);
  }
}

function mediTax(tPayer){

     //Medicate surtax on incomes over the applicable threshold
  if (tPayer.filingStatus == "mFJ"){
    mediDue[0] = (tPayer.grossWages * mediLow);
    if(tPayer.grossWages > mediSurTaxM){
      mediDue[1] = (tPayer.grossWages - mediSurTaxM)* mSurT;
    } else mediDue[1] = 0;
    // console.log(mediDue[1]);
  } else if (tPayer.filingStatus == "mFS" ){
    mediDue[0] = (tPayer.grossWages * mediLow);
    if(tPayer.grossWages > mediSurTaxMFS){
      mediDue[1] = (tPayer.grossWages - mediSurTaxMFS)* mSurT;
    } else mediDue[1]=0;
    // console.log(mediDue[1]);
  } else { 
    mediDue[0] = tPayer.grossWages * mediLow;
    // console.log(mediDue);
    if (tPayer.grossWages > mediSurTaxS){
      mediDue[1] = (tPayer.grossWages - mediSurTaxS)* mSurT;
    } else mediDue[1]=0;
    // console.log(mediDue);
  }

  return(mediDue);
}