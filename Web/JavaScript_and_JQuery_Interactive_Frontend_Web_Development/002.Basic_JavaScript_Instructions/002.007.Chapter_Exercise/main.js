window.onload = main

function main() {
    var formElem = document.getElementById("form");

    const name = document.getElementById("name");
    const sign = document.getElementById("customSign");

    const tableElem = document.getElementById("results");
    const greeting = document.getElementById("greeting");
    const outSign = document.getElementById("outSign");
    const outTiles = document.getElementById("outTiles");
    const outSubtotal = document.getElementById("outSubtotal");
    const outShipping = document.getElementById("outShipping");
    const outTotal = document.getElementById("outTotal");

    const submitBttn = document.getElementById("submitBttn");
    const resetBttn = document.getElementById("resetBttn");

    const costPerTile = 5;
    const shippingFee = 10
    
    formElem.addEventListener("submit", function(event) {
	submitBttn.disabled = true;
	submitBttn.classList.remove("btn-primary");
	submitBttn.classList.add("btn-secondary");

	resetBttn.classList.remove("btn-secondary");
	resetBttn.classList.add("btn-primary");

	greeting.innerHTML = "Hello " + name.value + "!";
	outSign.innerHTML = customSign.value;
	outTiles.innerHTML = customSign.value.length;
	
	const subtotal = customSign.value.length * costPerTile;
	
	outSubtotal.innerHTML = "$ " + subtotal;
	outShipping.innerHTML = "$ " + shippingFee;
	
	const total = subtotal + shippingFee;
	
	outTotal.innerHTML = "$ " + total;
	
	tableElem.hidden = false;

	event.preventDefault();

	fetch(formElem.action, {mode: "no-cors"})
	    .then(response => {formElem.submit(); disableBttns();})
	    .catch(error => {console.log(error); disableBttns();});

    });

    function disableBttns(){
	name.disabled = true;
	sign.disabled = true;
    }

    resetBttn.addEventListener("click", function(){
	resetBttn.classList.remove("btn-primary");
	resetBttn.classList.add("btn-secondary");

	submitBttn.classList.remove("btn-secondary");
	submitBttn.classList.add("btn-primary");
	
	submitBttn.disabled = false;
	name.disabled = false;
	sign.disabled = false;
	
	name.value = "";
	sign.value = "";

	tableElem.hidden = true;
    });
}
