/*!
* Raving Roo - Simple Mortgage Payment Calculator (SMPC) v1.0
* Copyright 2014 by David K. Sutton
*
* You are free to use this script on your website.
* While not required, it would be much appreciated if you could link back to http://ravingroo.com
*/
/*
* Changes done by Natalia Nehring Unitec NZ 2020 20 Jan.
* All validation were moved to validation function for all inputs
* Calculation moved to separate function
*/

function validNumber(fieldinput){
	var unicode=fieldinput.charCode? fieldinput.charCode : fieldinput.keyCode;
	if ((unicode!=8) && (unicode!=46)) { //if the key isn't the backspace key (which we should allow)
	if (unicode<48||unicode>57) //if not a number
	return false; //disable key press
	}
}


function cusPayment()
{
	// Declare variables 
	var loanprincipal = 0;
	var period =0;
	var months = 0;
	var interest = 0;
	var result =0;
	var loan= document.mortgagecalc.loan.value ;
	var loanL=  document.mortgagecalc.loan.value.length ;
	var year = document.mortgagecalc.years.value;
	var yearL = document.mortgagecalc.years.value.length;
	var rate = document.mortgagecalc.rate.value;	
	var rateL = document.mortgagecalc.rate.value.length;
	
	var msgLoan =inputValidateLoan(loan, loanL);
	document.getElementById('loanError').innerHTML = msgLoan;
	
	var msgYear=inputValidateYear (year, yearL );
	document.getElementById('yearsError').innerHTML =  msgYear;
	
	var msgRate=inputValidateRate (rate, rateL ) ;
	document.getElementById('rateError').innerHTML = msgRate;
	
	// Form validation checking
	if ((msgLoan =='')  && (msgYear =='') && (msgRate ==''))
	{
		// Set variables from form data
		loanprincipal = document.mortgagecalc.loan.value;		
		months = document.mortgagecalc.years.value * 12;
		interest = document.mortgagecalc.rate.value / 1200;
		result = cusPaymentCalculate(loanprincipal,  months, interest);
		// Calculate mortgage payment and display result
		document.getElementById('monthlyPayment').innerHTML = result;
		document.getElementById('friendlyReminder').style.display = 'block';
	} 
	else	
	{
		document.getElementById('monthlyPayment').innerHTML = '<br>' ;
	}
}

function cusPaymentCalculate(loanprincipal,  months, interestPerMonth)
{	var res = '';
	// Calculate mortgage payment and display result
	res = 'Your mortgage payment will be ' + ' $' + (loanprincipal * interestPerMonth / (1 - (Math.pow((1 + interestPerMonth), -months)))).toFixed(2)+'.';
	return res;
}



function  inputValidateLoan (inputLoan) {
	var msg='';	
	// Form validation checking
	if ((inputLoan === null) || (isNaN(inputLoan) === true) || (inputLoan.toString().trim() === "") )
	{
		msg = 'Loan - Numeric value required. Example: 165000';
	} else if (inputLoan <= 0) {
		msg = 'Loan - Positive Numeric value required. Example: 165000';
	}
	return msg;
}


function  inputValidateYear (inputYears ) {
	var msg='';	
	// Form validation checking	
	if ((inputYears === null) || (inputYears.toString().trim() === "") || (isNaN(inputYears) === true))
	{
		msg = 'Years - Numeric value required. Example: 20';
	}
    else if (inputYears <= 0)
	{
		msg = 'Years - Positive Numeric value required. Example: 20';
	}
	else if (inputYears>30)
	{
		msg = 'Years - cannot over 30 years';
	}

	return msg;

}

function inputValidateRate (inputRate ) {
	var msg='';	
	if (( inputRate=== null) || (inputRate.toString().trim() === "") || (isNaN(inputRate) === true))
	{
		msg = 'Rate - Numeric value required. Example: 5.25';			
	}
	else if (inputRate <= 0)
	{
		msg = 'Rate - Positive Numeric value required. Example: 5.25';
	}
	return msg;
}


function cusPaymentReset()
{
	// Reset everything to default/null/blank
	document.getElementById('monthlyPayment').innerHTML = 'Values reset';
	document.getElementById('friendlyReminder').style.display = 'none';
	document.getElementById('loanError').innerHTML = '';
	document.getElementById('yearsError').innerHTML = '';
	document.getElementById('rateError').innerHTML = '';
	document.mortgagecalc.loan.value = null;
	document.mortgagecalc.years.value = null;
	document.mortgagecalc.rate.value = null;
}