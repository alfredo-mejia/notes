window.onload = main;

function main() {
    // Links
    let homeLink = document.getElementById("homeLink");
    let chaptersLinks = document.getElementById("chaptersLink");
    let ch1Link = document.getElementById("ch1Link");
    let ch2Link = document.getElementById("ch2Link");
    let ch3Link = document.getElementById("ch3Link");
    let ch4Link = document.getElementById("ch4Link");
    let ch5Link = document.getElementById("ch5Link");
    let ch6Link = document.getElementById("ch6Link");
    let ch7Link = document.getElementById("ch7Link");
    let ch8Link = document.getElementById("ch8Link");
    let ch9Link = document.getElementById("ch9Link");
    let ch10Link = document.getElementById("ch10Link");
    let ch11Link = document.getElementById("ch11Link");
    let ch12Link = document.getElementById("ch12Link");
    let ch13Link = document.getElementById("ch13Link");

    // Divs
    let homeDiv = document.getElementById("homeDiv");
    let ch1Div = document.getElementById("ch1Div");
    let ch2Div = document.getElementById("ch2Div");
    let ch3Div = document.getElementById("ch3Div");
    let ch4Div = document.getElementById("ch4Div");
    let ch5Div = document.getElementById("ch5Div");
    let ch6Div = document.getElementById("ch6Div");
    let ch7Div = document.getElementById("ch7Div");
    let ch8Div = document.getElementById("ch8Div");
    let ch9Div = document.getElementById("ch9Div");
    let ch10Div = document.getElementById("ch10Div");
    let ch11Div = document.getElementById("ch11Div");
    let ch12Div = document.getElementById("ch12Div");
    let ch13Div = document.getElementById("ch13Div");

    function hideAll() {
        homeDiv.hidden = true;
        ch1Div.hidden = true;
        ch2Div.hidden = true;
        ch3Div.hidden = true;
        ch4Div.hidden = true;
        ch5Div.hidden = true;
        ch6Div.hidden = true;
        ch7Div.hidden = true;
        ch8Div.hidden = true;
        ch9Div.hidden = true;
        ch10Div.hidden = true;
        ch11Div.hidden = true;
        ch12Div.hidden = true;
        ch13Div.hidden = true;
    }

    function enableChaptersLink() {
        homeLink.classList.remove("active");
        chaptersLinks.classList.add("active");
    }

    function enableHomeLink(){
        homeLink.classList.add("active");
        chaptersLinks.classList.remove("active");
    }


    homeLink.addEventListener("click", function () {
        enableHomeLink();
        hideAll();
        homeDiv.hidden = false;
    });

    ch1Link.addEventListener("click", function () {
        enableChaptersLink();
        hideAll();
        ch1Div.hidden = false;
    });

    ch2Link.addEventListener("click", function () {
        enableChaptersLink();
        hideAll();
        ch2Div.hidden = false;
    });

    ch3Link.addEventListener("click", function () {
        enableChaptersLink();
        hideAll();
        ch3Div.hidden = false;
    });

    ch4Link.addEventListener("click", function () {
        enableChaptersLink();
        hideAll();
        ch4Div.hidden = false;
    });

    ch5Link.addEventListener("click", function () {
        enableChaptersLink();
        hideAll();
        ch5Div.hidden = false;
    });

    ch6Link.addEventListener("click", function () {
        enableChaptersLink();
        hideAll();
        ch6Div.hidden = false;
    });

    ch7Link.addEventListener("click", function () {
        enableChaptersLink();
        hideAll();
        ch7Div.hidden = false;
    });

    ch8Link.addEventListener("click", function () {
        enableChaptersLink();
        hideAll();
        ch8Div.hidden = false;
    });

    ch9Link.addEventListener("click", function () {
        enableChaptersLink();
        hideAll();
        ch9Div.hidden = false;
    });

    ch10Link.addEventListener("click", function () {
        enableChaptersLink();
        hideAll();
        ch10Div.hidden = false;
    });

    ch11Link.addEventListener("click", function () {
        enableChaptersLink();
        hideAll();
        ch11Div.hidden = false;
    });

    ch12Link.addEventListener("click", function () {
        enableChaptersLink();
        hideAll();
        ch12Div.hidden = false;
    });

    ch13Link.addEventListener("click", function () {
        enableChaptersLink();
        hideAll();
        ch13Div.hidden = false;
    });
}