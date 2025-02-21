window.onload = main;

function main() {
    
    const textbox = document.getElementById("name");
    const output = document.getElementById("price");
    const msg = document.getElementById("error-message");
    const button = document.getElementById("button");
    const form = document.getElementById("form");
    const plaque = document.getElementById("plaque");
    const plaqueName = document.getElementById("plaque-name");

    textbox.addEventListener("input", function(){
	msg.hidden = true;
	textbox.style.border = "";
	const textLength = textbox.value.length;
	const price = 5;
	const totalPrice = textLength * 5;
	output.textContent = "Price: $" + totalPrice;
    });
    
    form.addEventListener("submit", function(){
	if (textbox.value.length <= 0)
	{
	    textbox.style.border = "2px solid red";
	    msg.hidden = false;
	    msg.style.color = "red";
	    plaque.hidden = true;
	    event.preventDefault();
	}

	else {
	    plaque.hidden = false;
	    plaqueName.innerHTML = textbox.value;
	    event.preventDefault();
	}
    });
}

