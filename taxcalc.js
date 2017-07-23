//S, MFJ, HoH, MFS, QW
var filingStatus;

//number of dependents
var dependents;

/*qualifying depenedent tests:
	qualifying child-
		relationship, age, living with TP, support, joint return
	qualifying relative-
		!qualifying child, member of household/relationship, gross income, support 

	Disabled? In college?*/

//date or over 62 y/n?
var birthDay = newDate();


// grossIncome is all income, ordinary = W-2 or 1099-MISC, investment income is 1099- R, B, DIV, etc and other is all else ie cash from sch C work
var grossIncome, ordinaryIncome, investmentIncome, otherIncome; 

