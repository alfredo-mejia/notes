class Hotel {

    #name;
    #baseRate;
    #discountRate;
    #expirationDate;
    #roomsAvailable;
    
    constructor(name, baseRate, discountRate, expirationDate, roomsAvailable) {
	this.#name = name;
	this.#baseRate = baseRate;
	this.#discountRate = discountRate;

	let dateArray = expirationDate.split("-");
	this.#expirationDate = new Date(dateArray[0], parseInt(dateArray[1], 10) - 1, dateArray[2]);
	this.#roomsAvailable = roomsAvailable;
    }

    getName() {
	return this.#name;
    }

    getBaseRate() {
	return this.#baseRate;
    }

    getDiscountRate() {
	return this.#discountRate;
    }

    getExpirationDate() {
	return this.#expirationDate;
    }

    getRoomsAvailable() {
	return this.#roomsAvailable;
    }

    offerExpiresIn() {
	let today = new Date();
	const millisecondsDifference = this.#expirationDate - today;

	const millisecondsInOneSecond = 1000;
	const millisecondsInOneMinute = millisecondsInOneSecond * 60;
	const millisecondsInOneHour = millisecondsInOneMinute * 60;
	const millisecondsInOneDay = millisecondsInOneHour * 24;

	const days = Math.floor(millisecondsDifference / millisecondsInOneDay);
	const hours = Math.floor((millisecondsDifference % millisecondsInOneDay) / millisecondsInOneHour);
	const minutes = Math.floor((millisecondsDifference % millisecondsInOneHour) / millisecondsInOneMinute);
	const seconds = Math.floor((millisecondsDifference % millisecondsInOneMinute) / millisecondsInOneSecond);

	return [days, hours, minutes, seconds];
    }
}

(
    function onStart() {
	const urlParams = new URLSearchParams(window.location.search);
	const hotelName = urlParams.get("hotel");
	const allHotels = ["BlueBuffalo", "GreenGecko", "SilverShark", "TurquoiseTiger"]

	switch(hotelName.toLowerCase()) {
	case allHotels[0].toLowerCase():
	    let blueBuffaloHotel = new Hotel("Blue Buffalo Hotel", 275, 3/8, "2025-12-01", 50);
	    showHotel(blueBuffaloHotel);
	    break;

	case allHotels[1].toLowerCase():
	    let greenGeckoHotel = new Hotel("Green Gecko Hotel", 80, 4/9, "2025-08-30", 200);
	    showHotel(greenGeckoHotel);
	    break;

	case allHotels[2].toLowerCase():
	    let silverSharkHotel = new Hotel("Silver Shark Hotel", 135, 2/9, "2025-03-01", 20);
	    showHotel(silverSharkHotel);
	    break;

	case allHotels[3].toLowerCase():
	    let turquoiseTigerHotel = new Hotel("Turquoise Tiger Hotel", 500, 2/1, "2026-01-05", 500);
	    showHotel(turquoiseTigerHotel);
	    break;
	}
    }()
);

function showHotel(hotel) {
    window.document.title = hotel.getName();

    if (window.document.readyState !== "complete") {
	window.addEventListener('load', () => {showHotel(hotel);});
    }

    else {
	const titleElem = window.document.getElementById("title");
	titleElem.innerHTML = hotel.getName();
	
	const baseRateElem = window.document.getElementById("baseRate");
	const baseRateString = "$" + hotel.getBaseRate().toFixed(2);
	baseRateElem.innerHTML = baseRateString;

	const discountRateElem = window.document.getElementById("discountRate");
	let calculatedDiscountRate = hotel.getBaseRate() - (hotel.getBaseRate() * hotel.getDiscountRate());

	if (calculatedDiscountRate <= 0)
	    discountRateElem.innerHTML = "FREE!";
	else {
	    discountRateString = "$" + calculatedDiscountRate.toFixed(2);
	    discountRateElem.innerHTML = discountRateString;
	}

	const roomsAvailableElem = window.document.getElementById("roomsAvailable");
	roomsAvailableElem.innerHTML = hotel.getRoomsAvailable();

	const expirationDateElem = window.document.getElementById("expirationDate");
	const expirationDate = hotel.getExpirationDate();

	const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const MONTHS = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	const expirationDateStr = DAYS[expirationDate.getDay()] + ", " + MONTHS[expirationDate.getMonth()] + " " + expirationDate.getDate() + ", " + expirationDate.getFullYear();
	expirationDateElem.innerHTML = expirationDateStr;

	const offerExpires = hotel.offerExpiresIn();

	const daysLeftElem = window.document.getElementById("days");
	const hoursLeftElem = window.document.getElementById("hours");
	const minutesLeftElem = window.document.getElementById("minutes");
	const secondsLeftElem = window.document.getElementById("seconds");

	if (offerExpires[0] <= 0 && offerExpires[1] <= 0 && offerExpires[2] <= 0 && offerExpires[3] <= 0) {
	    const expiredElem = window.document.createElement('h4');
	    expiredElem.innerHTML = "EXPIRED! CAN NOT USE!";
	    expiredElem.classList.add("mt-3");
	    expiredElem.classList.add("mb-3");
	    expiredElem.classList.add("flashText");
	    expiredElem.style.color = "red";
	    expirationDateElem.after(expiredElem);

	    daysLeftElem.innerHTML = "00";
	    hoursLeftElem.innerHTML = "00";
	    minutesLeftElem.innerHTML = "00";
	    secondsLeftElem.innerHTML = "00";


	    const bttnBookNowElem = window.document.getElementById("bttn-bookNow");
	    
	    bttnBookNowElem.disabled = true;
	    bttnBookNowElem.classList.remove("btn-primary");
	    bttnBookNowElem.classList.add("btn-secondary");
	    
	    setInterval(() => {
		expiredElem.style.color = (expiredElem.style.color === "red" ? "transparent" : "red");
		daysLeftElem.style.color = (daysLeftElem.style.color === "red" ? "transparent" : "red");
		hoursLeftElem.style.color = (hoursLeftElem.style.color === "red" ? "transparent" : "red");
		minutesLeftElem.style.color = (minutesLeftElem.style.color === "red" ? "transparent" : "red");
		secondsLeftElem.style.color = (secondsLeftElem.style.color === "red" ? "transparent" : "red");
	    }, 500);
	}

	else {
	    setInterval(() => {
		updateClock(daysLeftElem, hoursLeftElem, minutesLeftElem, secondsLeftElem, hotel);
	    }, 500);
	}
    }
}

function updateClock(daysElem, hoursElem, minutesElem, secondsElem, hotel) {
    const timeLeft = hotel.offerExpiresIn();
    daysElem.innerHTML = timeLeft[0];
    hoursElem.innerHTML = timeLeft[1];
    minutesElem.innerHTML = timeLeft[2];
    secondsElem.innerHTML = timeLeft[3];
}
