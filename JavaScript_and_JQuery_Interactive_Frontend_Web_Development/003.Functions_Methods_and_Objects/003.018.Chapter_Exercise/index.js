window.addEventListener('resize', checkWindowAndChangeButtonSizes);
window.onload = onLoadWindow;

function changeButtonSizes() {
    let titleElem = window.document.getElementById("title");
    let bttnBlueBuffalo = window.document.getElementById("bttn-blue-buffalo");
    let bttnGreenGecko = window.document.getElementById("bttn-green-gecko");
    let bttnSilverShark = window.document.getElementById("bttn-silver-shark");
    let bttnTurquoiseTiger = window.document.getElementById("bttn-turquoise-tiger");
    let computedStyle = window.getComputedStyle(bttnBlueBuffalo);
    
    const titleWidth = titleElem.offsetWidth;
    const bttnMargin = parseFloat(computedStyle.marginLeft) * 2;
    const totalWidth = titleWidth - bttnMargin;
    
    bttnBlueBuffalo.style.width = totalWidth.toString() + "px";
    bttnGreenGecko.style.width = totalWidth.toString() + "px";
    bttnSilverShark.style.width = totalWidth.toString() + "px";
    bttnTurquoiseTiger.style.width = totalWidth.toString() + "px";
}

function checkWindowAndChangeButtonSizes() {
    if (window.document.readyState === "complete") {
	changeButtonSizes();
    }

    else {
	window.document.addEventListener('DOMContentLoaded', changeButtonSizes);
    } 
}


function onLoadWindow() {
    changeButtonSizes();

    let bttnBlueBuffalo = window.document.getElementById("bttn-blue-buffalo");
    let bttnGreenGecko = window.document.getElementById("bttn-green-gecko");
    let bttnSilverShark = window.document.getElementById("bttn-silver-shark");
    let bttnTurquoiseTiger = window.document.getElementById("bttn-turquoise-tiger");
    
    bttnBlueBuffalo.addEventListener("click", function(){window.location.href = "hotel.html?hotel=BlueBuffalo"});
    bttnGreenGecko.addEventListener("click", function(){window.location.href = "hotel.html?hotel=GreenGecko"});
    bttnSilverShark.addEventListener("click", function(){window.location.href = "hotel.html?hotel=SilverShark"});
    bttnTurquoiseTiger.addEventListener("click", function(){window.location.href = "hotel.html?hotel=TurquoiseTiger"});
}
