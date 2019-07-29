//TY 2019
//ROTH 
const   ROTH_MIN_MFJ = 193000;
        ROTH_MAX_MFJ = 203000,
        ROTH_MIN_S = 122000,
        ROTH_MAX_S = 137000,
        ROTH_MAX_MFSLW = 10000; //same for Roth and Trad - change constant name

//TY 2018
//TRAD 
const   TRAD_MIN_MFJ = 101000,
        TRAD_MAX_MFJ = 121000,
        TRAD_MIN_S = 63000,
        TRAD_MAX_S = 73000;
        TRAD_MAX_MFJsWP = 199000;
        TRAD_MIN_MFJsWP = 189000;

//Phase out and other adjustments
const ageUP = 1000;
const sReducer = 15000;
const mReducer = 10000;

//2019
let genLimit = 6000;

//to display results
let output = document.getElementById("results");

//taxpayer object declaration
let taxPayer = {};

//single tier statuses
let fStatusGroup = ['single', 'hOH', 'mFS', 'mFSlw'];

// DOM manip
let married = document.getElementById("filingStatus"),
    showSpouseItems = document.getElementsByName("spouseItem");

function showMarried(married){
    let check = fStatusGroup.filter(status => status == married);
    
//if no spouse
    if(check.length > 0){
        document.getElementById("spAge").checked = false;
        check.forEach(()=>{
            for(let i=0; i < showSpouseItems.length; i++){
                showSpouseItems[i].classList.add('hideMe');
            }
        })
    }
    

//if spouse
    if(check.length == 0){    
        for(let i=0; i < showSpouseItems.length; i++){
            showSpouseItems[i].classList.remove('hideMe');
        }
    } 
}

function clearOutput(){
    document.info.reset();
    showMarried(married.value);
    showTitems();
    pContribs();
}

// Work provided retirement plan 
function showTitems(iraT){
    if(iraT == "trad"){
        document.getElementById("spRetPlan").className = '';
    } else {
        document.getElementById("spRetPlan").className = 'hideMe';
    }
}

//prior contributions amount field
function pContribs(){
    let alreadyMade = document.getElementById("priorContribs"),
        madeCheck = document.getElementById("showContribs");
        deductMade = document.getElementById("showDedContrib");

    if(alreadyMade.checked){
        madeCheck.className = "";
        deductMade.className = "";

    } else {
        madeCheck.className = "hideMe";
        deductMade.className = "hideMe";
    }    
}

// Show addback items for determining MAGI
function showAddbacks(){
    let showABs = document.getElementsByName("addBackAmt");
    let checkABs = document.getElementsByName("addBackCheck");
    let addBackAmount = document.getElementsByName("addBack");
    let i=0;

    for(let ab of checkABs){
        if(ab.checked){
            showABs[i].classList.remove('hideMe');
        } else if(!ab.checked){
            showABs[i].classList.add('hideMe');
            addBackAmount[i].value = 0;
        }
        i++;
    }

    return((addBackAmount[0].value)*1 || 0);
}

function itemizedAmount(){
    let iDedsTaken = document.getElementById("itemizedDeds"),
        iDedSelected = document.getElementById("itemD"),
        iDedAmount = document.getElementById("itemizedDeductions");

    if(iDedSelected.checked){
        iDedsTaken.className = "";
    } else if (!iDedSelected.checked){
        iDedAmount.value = 0;
        iDedsTaken.className ="hideMe";
    }
}

//Build an object for the current taxpayer (current user information)

function buildCurrentTP(tPayer){
    let tempTPObj = {};

    for(let [key,value] of Object.entries(tPayer)){
        if(value || value == true){
            tempTPObj[key]=value;
        }
    }

    tempTPObj.addbacks = tempTPObj.addbacks ? tempTPObj.addbacks:0;
    tempTPObj.madeContribs = tempTPObj.madeContribs ? tempTPObj.madeContribs:0;
    tempTPObj.agi = tempTPObj.agi ? tempTPObj.agi:0;
    tempTPObj.addbacks *=1;
    tempTPObj.madeContribs *=1;
    tempTPObj.agi *=1;

    return(tempTPObj);    
}


// Initial function call for determining amount

function initCalc(info){
    let formInfo = document.info,
        fIpriorContribs = formInfo.priorContribs.checked,
        fImadeContribs = formInfo.madeContribs.value,
        fIfilingStatus = formInfo.filingStatus.value,
        fIiraType = formInfo.iraType.value,
        fIage = formInfo.age.checked,
        fIspAge = formInfo.spAge.checked,
        fIworkPlan = formInfo.workPlan.checked,
        fIspWP = formInfo.spWP.checked,
        fIagi = formInfo.agi.value,  
        fIdeductionS = formInfo.itemS.checked,
        fIdeductionI = formInfo.itemD.checked,
        fIdeductionAmount = formInfo.itemizedDeductions.value,      
        fIaddbacks = [
            formInfo.addBack1.value, 
            formInfo.addBack2.value, 
            formInfo.addBack3.value, 
            formInfo.addBack4.value, 
            formInfo.addBack5.value, 
            formInfo.addBack6.value, 
            formInfo.addBack7.value, 
            formInfo.addBack8.value
        ];

    let taxpayer = {
        filingStatus: fIfilingStatus,
        priorContribs: fIpriorContribs,
        madeContribs: fImadeContribs*1,
        iraType: fIiraType,
        age: fIage,
        spAge: fIspAge,
        workPlan: fIworkPlan,
        spWP: fIspWP,
        agi: fIagi*1,
        sID: fIdeductionS,
        iID: fIdeductionI*1,
        iDedAmt: fIdeductionAmount*1,
        //acc -> accumulator, the eventual output value when function completes. curr -> current value to add to acc. 0 is default value if array is empty
        addbacks: fIaddbacks.reduce((acc, curr) => acc*1 + curr*1, 0) 
    }

    let currTPayer = buildCurrentTP(taxpayer);
    // console.log(currTPayer.addbacks);
    // console.log(taxpayer.addbacks + " taxpayer addbacks");

    //Check deductions taken against contributions already made 
    let deducted = document.getElementById("addBack1").value;
    deducted *=1;
    if(deducted > currTPayer.madeContribs){
        currTPayer.madeContribs = deducted;
    }

    if(currTPayer.iraType){
        if(currTPayer.iraType == "roth"){
            output.innerHTML = `<h1></h1>`;
            beginRothCalc(currTPayer);
        } else if (currTPayer.iraType == "trad"){
            output.innerHTML = `<h1></h1>`;
            beginTradCalc(currTPayer);
        } 
    }   else {
            output.innerHTML = `Please pick an IRA type`;
    }
}

function getTaxableInc(tPayer){
    let standard = {
        single: 12200, mFS: 12200, mFSlw: 12200,
        hOH: 18350,
        mFJ: 24400
    };
    let tInc = 0;
    let appTier = Object.keys(standard).filter(currStat => currStat == tPayer.filingStatus);

    //tInc = tPayer.sID ? tPayer.agi - standard[''] : tPayer.agi - tPayer.iDedAmt
    console.log(tPayer.iDedAmt);

    if(tPayer.sID || tPayer.iDedAmt == 0 || !tPayer.iDedAmt){
        
        tInc = tPayer.agi - standard[appTier];
        tInc = Math.max(0, tInc);
    } else {
        tInc = tPayer.agi - tPayer.iDedAmt;
        tInc = Math.max(0, tInc);
    } 
    return(tInc);
}

function adjustLimit(tPayer){
    let userAllowedContrib = genLimit;
    let statusCheck = fStatusGroup.filter(status => status == tPayer.filingStatus);
    
    let taxIncome = getTaxableInc(tPayer);

       
    //check filing status, adjust limit accordingly
    if(statusCheck.length > 0){
        userAllowedContrib = genLimit;
    } else {
        userAllowedContrib *=2;
    }

    if(tPayer.age){
        userAllowedContrib += ageUP;
    } 
    if(tPayer.spAge){
        userAllowedContrib += ageUP;
    }
    if(userAllowedContrib > taxIncome){
        console.log(taxIncome);
        userAllowedContrib = taxIncome;
        return(userAllowedContrib);
    } else {
        return(userAllowedContrib);
    }
}

function excessCheck(contribsMade, contribLimit){
    let contribsLeft = contribLimit - contribsMade;
        if(contribsLeft < 0){
            contribsLeft *= -1;
            output.innerHTML = `You cannot contribute anymore for the year. Your limit is $${contribLimit} and you currently have excess contributions of $${contribsLeft}`;
        } else if (contribsLeft > 0){
            output.innerHTML = `You can contribute up to $${contribsLeft} this year`;
        } else if (contribsLeft == 0){
            output.innerHTML = `You have reached your contribution limit for the year, or your taxable income is $0.`;
        }
}

// ROTH IRA CALCULATION 
function beginRothCalc(tPayer){
    let magi = tPayer.addbacks + tPayer.agi;
    let reduction, reducedRContrib; 
    let userRContrib = adjustLimit(tPayer);
    
    //Married filing separately, but lived together 
    if (tPayer.filingStatus == "mFSlw" && magi > ROTH_MAX_MFSLW){
        output.innerHTML = `Your modified adjusted gross income was above the limit for contributing to a Roth IRA`; 
    } else {
        // agi reduced by 0 if separate but lived together
        reduction = (magi)/mReducer;
        reducedRContrib = userRContrib*reduction;
        reducedRContrib = Math.max(0, reducedRContrib);
        reducedRContrib = Math.round(reducedRContrib);
        excessCheck(tPayer.madeContribs, userRContrib);
    }
    
    //Single, Head of Household and Married filing separate, lived apart
    if (userRContrib < genLimit*2 && tPayer.filingStatus != "mFSlw"){
        if(magi < ROTH_MIN_S){
            excessCheck(tPayer.madeContribs, userRContrib);
        } else if (magi >= ROTH_MAX_S){
            output.innerHTML = `Your modified adjusted gross income was above the limit for contributing to a Roth IRA`;   
        } else if (magi >= ROTH_MIN_S && magi < ROTH_MAX_S){
            reduction = (magi - ROTH_MIN_S)/sReducer;
            reducedRContrib = userRContrib*reduction;
            reducedRContrib = Math.max(0, reducedRContrib);
            reducedRContrib = Math.round(reducedRContrib);
            excessCheck(tPayer.madeContribs, reducedRContrib);
        }
    //Married Filing Joint or Qualifying Widow/er
    } else if (userRContrib >= genLimit*2){
        if(magi < ROTH_MIN_MFJ){
            excessCheck(tPayer.madeContribs, userRContrib);
        } else if (magi >= ROTH_MAX_MFJ) {
            output.innerHTML = `Your modified adjusted gross income was above the limit for contributing to a Roth IRA`;
            if(tPayer.madeContribs){
                output.innerHTML += ` \n You have excess contributions of $${tPayer.madeContribs}`;
            }
        } else if (magi >=ROTH_MIN_MFJ && magi < ROTH_MAX_MFJ){
            reduction = (magi - ROTH_MIN_MFJ)/mReducer;
            reducedRContrib = userRContrib*reduction;
            reducedRContrib = Math.max(0, reducedRContrib);
            reducedRContrib = Math.round(reducedRContrib);
            excessCheck(tPayer.madeContribs, reducedRContrib);
        }
    }
}    

function checkDeducted(tPayer, contribLimit, contribsDeducted){
    let deductible = contribLimit;
    //gloablize this?
    let magi = tPayer.addbacks + tPayer.agi;
    let singles = fStatusGroup.filter(status => status == tPayer.filingStatus)
    if(contribsDeducted > tPayer.contribsMade){
        tPayer.contribsMade = contribsDeducted;
    }
    //let fStatusGroup = ['single', 'hOH', 'mFS', 'mFSlw'];
    //returns filingstat or empty
    
    console.log(contribsDeducted);

    if(tPayer.workPlan){
        if (tPayer.filingStatus == "mFSlw"){
            if(magi < ROTH_MAX_MFSLW){
            // deductible = ROTH_MAX_MFSLW;
            output.innerHTML=`You can deduct part of your contribution of $${tPayer.madeContribs} and have already deducted $${contribsDeducted}`;
            } else if (magi > ROTH_MAX_MFSLW) {
            output.innerHTML=`Your modified adjusted gross income is too high`;
            }
        } else if(singles.length > 0){
            console.log("single");
            if(magi < TRAD_MIN_S){
                deductible = contribLimit;
            } else if(magi >= TRAD_MAX_S){
                deductible = 0;
            } else if (magi > TRAD_MIN_S && magi < TRAD_MAX_S){
                output.innerHTML=`You can deduct part of your contribution of $${tPayer.madeContribs} and have already deducted $${contribsDeducted}`;
            }
        } else {
            if(magi < TRAD_MIN_MFJ){
                deductible = contribLimit;
            } else if(magi > TRAD_MAX_MFJ){
                deductible = 0;
            } else if(magi > TRAD_MIN_MFJ && magi < TRAD_MAX_MFJ){
                output.innerHTML=`You can deduct part of your contribution of $${tPayer.madeContribs} and have already deducted $${contribsDeducted}`;
            }
        } 
    } else if (tPayer.spWP && !tPayer.workPlan){
        if(magi < TRAD_MIN_MFJ){
            deductible = contribLimit;
        } else if(magi > TRAD_MAX_MFJ){
            deductible = 0;
        } else if(magi > TRAD_MIN_MFJ && magi < TRAD_MAX_MFJ){
            output.innerHTML=`You can deduct part of your contribution of $${tPayer.madeContribs} and have already deducted $${contribsDeducted}`;
        }

    }
    return (deductible);
}


    //Limits on deductibility depend on filing status and workplan coverage
        //IRA owner is Covered by plan
            // Single and hOH and MFS -> min= 63000, max = 73000
            // MFJ/QW - spouse coverage not important -> min=101000, max=121000
            // MFSlw - spouse coverage not important -> max=10000
        //IRA owner not covered and spouse is
            //MFJ -> min=189000, max=199000
            



function beginTradCalc(tPayer){
    let userTContrib = adjustLimit(tPayer);
    let tradContributions = document.getElementById("addBack1").value*1;
   
    let deductAmountCheck = checkDeducted(tPayer, userTContrib, tradContributions);

    console.log(deductAmountCheck, tradContributions);

    if(deductAmountCheck < tradContributions){
        //$${tradContributions-deductAmountCheck} once the partial amount is figured out
        output.innerHTML=`Your contribution limit is $${userTContrib}, but you've deducted more than allowed.`;
    } else {
        excessCheck(tPayer.madeContribs, userTContrib);
    }
        
} 
    

function clearAddbacks(){
    let uncheck = document.getElementsByName("addBackCheck");
    let zeroIt = document.getElementsByName("addBackAmt");
    let addAmtField = document.getElementsByName("addBack");
    let clear = document.getElementById("clearIt");

    if(clear.checked){
        uncheck.forEach((check) => {
            check.checked = false;
            check.disabled = true;;
        });
        
        zeroIt.forEach((amount) => {
            amount.value *= 0;
            amount.className = "hideMe";
        });
    
        // addAmtField.forEach((field) => {
        //     field.placeholder = 0;
        // });
    } else {
        uncheck.forEach((check) => {
            check.disabled = false;
        });
    }
}