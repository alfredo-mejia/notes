window.addEventListener('resize', checkWindowAndChangeButtonSizes);
window.onload = checkWindowAndChangeButtonSizes;

function changeButtonSizes() {
    let titleElem = window.document.getElementById("title");
    let bttnBlueBuffalo = window.document.getElementById("bttn-blue-buffalo");
    let bttnGreenGecko = window.document.getElementById("bttn-green-gecko");
    let bttnSilverShark = window.document.getElementById("bttn-silver-shark");

    bttnBlueBuffalo.style.width = titleElem.offsetWidth;
    bttnGreenGecko.offsetWidth = titleElem.offsetWidth;
    bttnSilverShark.offsetWidth = titleElem.offsetWidth;
}

function checkWindowAndChangeButtonSizes() {
    if (window.document.readyState === "complete") {
	changeButtonSizes();
    }

    else {
	window.document.addEventListener('DOMContentLoaded', changeButtonSizes);
    } 
}
