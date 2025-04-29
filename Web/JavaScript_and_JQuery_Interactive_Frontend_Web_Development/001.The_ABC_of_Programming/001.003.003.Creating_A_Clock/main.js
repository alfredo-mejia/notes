window.onload = main

function main() {
    const SIXTY = 60;

    const PSTHourDiffFromUTC = -8;
    const PSTMinDiffFromUTC = 0;
    const MSTHourDiffFromUTC = -7;
    const MSTMinDiffFromUTC = 0;
    const CSTHourDiffFromUTC = -6;
    const CSTMinDiffFromUTC = 0;
    const ESTHourDiffFromUTC = -5;
    const ESTMinDiffFromUTC = 0;

    const GOODMORNING = "GOOD MORNING!";
    const GOODAFTERNOON = "GOOD AFTERNOON!";
    const GOODEVENING = "GOOD EVENING!";

    const PSTHourElem = document.getElementById("pst-hour");
    const PSTMinElem = document.getElementById("pst-min");
    const PSTSecElem = document.getElementById("pst-sec");

    const MSTHourElem = document.getElementById("mst-hour");
    const MSTMinElem = document.getElementById("mst-min");
    const MSTSecElem = document.getElementById("mst-sec");
    
    const CSTHourElem = document.getElementById("cst-hour");
    const CSTMinElem = document.getElementById("cst-min");
    const CSTSecElem = document.getElementById("cst-sec");

    const ESTHourElem = document.getElementById("est-hour");
    const ESTMinElem = document.getElementById("est-min");
    const ESTSecElem = document.getElementById("est-sec");

    const PSTGreet = document.getElementById("pst-greet");
    const MSTGreet = document.getElementById("mst-greet");
    const CSTGreet = document.getElementById("cst-greet");
    const ESTGreet = document.getElementById("est-greet");

    const timePicker = document.getElementById("time-picker");
    const submitBttn = document.getElementById("submitBttn");
    const form = document.getElementById("form");
    const personalGreet = document.getElementById("personal-greet");
    
    function getTime() {
	var today = new Date();
	var totalMinDiff = today.getTimezoneOffset();

	var hourDiff = Math.floor (totalMinDiff / SIXTY);
	var minDiff = totalMinDiff % SIXTY

	var UTCHour = today.getHours() + hourDiff;
	var UTCMin = today.getMinutes() + minDiff;

	var PSTHour = UTCHour + PSTHourDiffFromUTC;
	var PSTMin = UTCMin + PSTMinDiffFromUTC;

	var MSTHour = UTCHour + MSTHourDiffFromUTC;
	var MSTMin = UTCMin + MSTMinDiffFromUTC;

	var CSTHour = UTCHour + CSTHourDiffFromUTC;
	var CSTMin = UTCMin + CSTMinDiffFromUTC;

	var ESTHour = UTCHour + ESTHourDiffFromUTC;
	var ESTMin = UTCMin + ESTMinDiffFromUTC;

	var secStr = today.getSeconds().toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false});

	PSTHourElem.innerHTML = PSTHour.toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false});
	PSTMinElem.innerHTML = PSTMin.toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false});
	PSTSecElem.innerHTML = secStr;

	MSTHourElem.innerHTML = MSTHour.toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false});
	MSTMinElem.innerHTML = MSTMin.toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false});
	MSTSecElem.innerHTML = secStr;

	CSTHourElem.innerHTML = CSTHour.toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false});
	CSTMinElem.innerHTML = CSTMin.toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false});
	CSTSecElem.innerHTML = secStr;

	ESTHourElem.innerHTML = ESTHour.toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false});
	ESTMinElem.innerHTML = ESTMin.toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false});
	ESTSecElem.innerHTML = secStr;

	var PSTmsg = GOODEVENING;
	var MSTmsg = GOODEVENING;
	var CSTmsg = GOODEVENING;
	var ESTmsg = GOODEVENING;

	if (PSTHour < 5 || PSTHour >= 18)
	    PSTmsg = GOODEVENING;
	else if (PSTHour < 12)
	    PSTmsg = GOODMORNING;
	else if (PSTHour < 18)
	    PSTmsg = GOODAFTERNOON;

	PSTGreet.innerHTML = PSTmsg;
	PSTGreet.hidden = false;

	if (MSTHour < 5 || MSTHour >= 18)
	    MSTmsg = GOODEVENING;
	else if (MSTHour < 12)
	    MSTmsg = GOODMORNING;
	else if (MSTHour < 18)
	    MSTmsg = GOODAFTERNOON;

	MSTGreet.innerHTML = MSTmsg;
	MSTGreet.hidden = false;

	if (CSTHour < 5 || CSTHour >= 18)
	    CSTmsg = GOODEVENING;
	else if (CSTHour < 12)
	    CSTmsg = GOODMORNING;
	else if (CSTHour < 18)
	    CSTmsg = GOODAFTERNOON;

	CSTGreet.innerHTML = CSTmsg;
	CSTGreet.hidden = false;

	if (ESTHour < 5 || ESTHour >= 18)
	    ESTmsg = GOODEVENING;
	else if (ESTHour < 12)
	    ESTmsg = GOODMORNING;
	else if (ESTHour < 18)
	    ESTmsg = GOODAFTERNOON;

	ESTGreet.innerHTML = ESTmsg;
	ESTGreet.hidden = false;
    }

    setInterval(getTime, 1000);

    form.addEventListener('submit', function(event){
	const value = timePicker.value;
	const[hourStr, minStr] = value.split(":");
	const hour = Number(hourStr);
	
	var personalMsg = GOODEVENING;
	    
	if (hour < 5 || hour >= 18)
	    personalMsg = GOODEVENING;
	else if (hour < 12)
	    personalMsg = GOODMORNING;
	else if (hour < 18)
	    personalMsg = GOODAFTERNOON;

	console.log(personalMsg);

	personalGreet.innerHTML = personalMsg;
	personalGreet.hidden = false;
	    
	event.preventDefault();

	fetch(form.action, {mode: "no-cors"})
		.then(response => form.submit())
		.catch(error => console.log(error));
    });

}
