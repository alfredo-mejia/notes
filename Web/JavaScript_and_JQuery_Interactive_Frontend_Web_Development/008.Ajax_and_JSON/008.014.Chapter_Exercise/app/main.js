document.addEventListener('DOMContentLoaded', (event) => {
    let nav = document.querySelector('nav > ul');

    switch (nav.querySelector('.activeLink').textContent) {
        case "Home":
            // do-nothing
            break;
        case "Events":
            startEventPage();
            break;
        case "Cats":
            startCatPage();
            break;
        case "Contact":
            startContactPage();
            break;
        default:
            break;
    }
});

function startEventPage() {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            let locationsDiv = document.getElementById('locations');
            let scheduleDiv = document.getElementById('schedule');
            let sessionDiv = document.getElementById('session');

            locationsDiv.classList.remove('hide');
            scheduleDiv.classList.remove('hide');
            sessionDiv.classList.remove('hide');

            let xmlResponse = xhr.responseXML;
            let events = xmlResponse.getElementsByTagName('event');
            let listDiv = locationsDiv.querySelector('.list');
            let listSessions = scheduleDiv.querySelector('.list-sessions');
            let descriptionDiv = sessionDiv.querySelector('.description');

            for (let i = 0; i < events.length; i++) {
                let event = events[i];

                let itemDiv = document.createElement('div');
                itemDiv.classList.add('item');

                let googleMapDiv = document.createElement('div');
                googleMapDiv.classList.add('google-map');

                let iframe = document.createElement('iframe');
                iframe.src = event.getElementsByTagName('map_url')[0].textContent;
                iframe.loading = "lazy";
                iframe.referrerPolicy = "no-referrer-when-downgrade";
                iframe.allowFullscreen = true;

                googleMapDiv.appendChild(iframe);
                itemDiv.appendChild(googleMapDiv);

                let locationInfoDiv = document.createElement('div');
                locationInfoDiv.classList.add('location-info');

                let locationText = document.createElement('h3');
                locationText.textContent = event.getElementsByTagName('city')[0].textContent + ", " +
                    event.getElementsByTagName('state')[0].textContent + ", " +
                    event.getElementsByTagName('country')[0].textContent;

                let dateText = document.createElement('h4');
                dateText.textContent = event.getElementsByTagName('date')[0].textContent;

                locationInfoDiv.appendChild(locationText);
                locationInfoDiv.appendChild(dateText);

                itemDiv.appendChild(locationInfoDiv);
                listDiv.appendChild(itemDiv);

                locationInfoDiv.addEventListener('click', (e) => {
                    e.preventDefault();
                    listSessions.textContent = '';
                    descriptionDiv.textContent = '';

                    let eventId = event.getElementsByTagName('id')[0].textContent;
                    console.log(`${eventId}`);
                    showSchedule(eventId, listSessions, descriptionDiv);
                });

                locationInfoDiv.addEventListener('mouseover', (event) => {
                    iframe.classList.add('hover-map');
                });

                locationInfoDiv.addEventListener('mouseout', (event) => {
                    iframe.classList.remove('hover-map');
                });
            }


        }

        else {
            showErrorMessage();
        }
    });

    xhr.addEventListener('error', () => {
        showErrorMessage();
    });

    xhr.open('GET', 'http://127.0.0.1:8000/events', true);
    xhr.send(null);
}

function showSchedule(eventId, scheduleDiv, descriptionDiv) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText).sessions;

            for (let i = 0; i < data.length; i++) {
                let newDiv = document.createElement('div');
                let newHeader = document.createElement('h3');

                newHeader.textContent = data[i].title + " - " + data[i].start_time;
                newHeader.classList.add('single-session');
                newHeader.addEventListener('click', (e) => {
                   e.preventDefault();
                   descriptionDiv.textContent = '';
                   showSessionDescription(data[i].id, descriptionDiv)
                });

                newDiv.appendChild(newHeader);
                scheduleDiv.appendChild(newDiv);
            }
        }

        else {
            showErrorMessage();
        }
    });
    xhr.addEventListener('error', () => {
        showErrorMessage();
    });

    xhr.open('GET', 'http://127.0.0.1:8000/events/schedule?' +
        new URLSearchParams({id: eventId}).toString(), true);
    xhr.send(null);
}

function showErrorMessage() {
    document.getElementById('locations').classList.add('hide');
    document.getElementById('schedule').classList.add('hide');
    document.getElementById('session').classList.add('hide');
    document.getElementById('error-message').classList.remove('hide');
}

function showSessionDescription(sessionId, descriptionDiv) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            descriptionDiv.innerHTML = xhr.responseText;
        }

        else
            showErrorMessage();
    });

    xhr.addEventListener('error', () => {
        showErrorMessage();
    });

    xhr.open('GET', 'http://127.0.0.1:8000/events/session?' +
        new URLSearchParams({id: sessionId}).toString(), true);
    xhr.send(null);
}

function startCatPage() {
    document.getElementById('cat-button').addEventListener('click', (e) => {
        e.preventDefault();
        let error = document.getElementById('error-message');
        error.classList.add('hide');
        document.getElementById('cat-img').classList.add('hide');

        fetch('https://cataas.com/cat?json=true', {
            method: 'GET',
            mode: 'cors',
        })
            .then(res => res.json())
            .then(data => {
                document.getElementById('cat-img').src = data.url;
                document.getElementById('cat-img').style.width = '40%';
                document.getElementById('cat-img').classList.remove('hide');
            })
            .catch(error => {
                error.classList.remove('hide');
            });
    });
}

function startContactPage() {
    let form = document.getElementById('contact-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        document.getElementById('name').disabled = true;
        document.getElementById('message').disabled = true;

        fetch('http://localhost:8000/forms/', {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 200) {
                document.getElementById('form-success').classList.remove('hide');
            }

            else {
                document.getElementById('form-error').classList.remove('hide');
            }

            document.getElementById('name').value = '';
            document.getElementById('message').value = '';

            document.getElementById('name').disabled = false;
            document.getElementById('message').disabled = false;
        })
        .catch(error => {
            console.log(error);
            document.getElementById('name').value = '';
            document.getElementById('message').value = '';

            document.getElementById('name').disabled = false;
            document.getElementById('message').disabled = false;

            document.getElementById('form-error').classList.remove('hide');
        })
    });

    document.getElementById('name').addEventListener('focus', (e) => {
        document.getElementById('form-error').classList.add('hide');
        document.getElementById('form-success').classList.add('hide');
    });

    document.getElementById('message').addEventListener('focus', (e) => {
        document.getElementById('form-error').classList.add('hide');
        document.getElementById('form-success').classList.add('hide');
    });
}
