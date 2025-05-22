document.addEventListener("DOMContentLoaded", main, false);

audio = new Set(["my-test"])

function addAudio(audioURL) {
    let tableBody = document.getElementById("table-body");

    let tableRow = document.createElement("tr");

    let tableCell = document.createElement("td");
    tableCell.textContent = document.getElementById("note-name").value;
    tableCell.className = "note-name";
    audio.add(document.getElementById("note-name").value);
    tableRow.appendChild(tableCell);

    tableCell = document.createElement("td");
    let audioElem = document.createElement("audio");

    audioElem.controls = true;
    console.log(audioURL);
    audioElem.src = audioURL;
    tableCell.appendChild(audioElem);

    let span = document.createElement("span");
    span.innerHTML = "<svg class=\"x\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z\"/></svg>"
    tableCell.appendChild(span);
    span.className = "span"
    span.style.display = "none";

    tableRow.appendChild(tableCell);
    tableBody.appendChild(tableRow)
}

function validateNoteName(inputElem, messageNote) {
    if (inputElem.value.length < 5) {
        messageNote.textContent = "Must be at least 5 characters long";
        messageNote.dataset.error = "on";
        inputElem.classList.add("error");
        return false;
    }

    else if (audio.has(inputElem.value)) {
        messageNote.textContent = "Name already exists";
        messageNote.dataset.error = "on";
        inputElem.classList.add("error");
        return false;
    }

    else {
        messageNote.dataset.error = "off";
        inputElem.classList.remove("error");
        return true;
    }
}

function main() {
    document.getElementById("form").addEventListener("submit", (e) => e.preventDefault(), false);
    let inputElem = document.getElementById("note-name");
    inputElem.addEventListener("keyup", (e) => {
        validateNoteName(inputElem, document.getElementById("error-message"));
    }, false);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                const mediaRecorder = new MediaRecorder(stream);

                let microphoneIcon = document.getElementById("microphone-icon");
                let stopIcon = document.getElementById("stop-icon");

                let chunks = [];

                microphoneIcon.addEventListener("click", (e) => {
                    e.preventDefault();

                    if (validateNoteName(inputElem, document.getElementById("error-message"))) {
                        mediaRecorder.start();
                        microphoneIcon.dataset.state = "inactive";
                        stopIcon.dataset.state = "active";
                    }
                }, false);

                mediaRecorder.addEventListener("dataavailable", (event) => { chunks.push(event.data) }, false);

                stopIcon.addEventListener("click", (e) => {
                    e.preventDefault();

                    if (validateNoteName(inputElem, document.getElementById("error-message"))) {
                        mediaRecorder.stop();
                        stopIcon.dataset.state = "inactive";
                        microphoneIcon.dataset.state = "active";
                    }
                }, false);

                mediaRecorder.addEventListener("stop", (event) => {
                    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                    chunks = [];
                    const audioURL = window.URL.createObjectURL(blob);
                    console.log("ending");
                    addAudio(audioURL)
                    inputElem.value = "";
                }, false);
            })
            .catch((err) => {
                alert(err);
            });
    } else alert("getUserMedia not supported on your browser");

    let tableBody = document.getElementById("table-body");
    tableBody.addEventListener("dblclick", (event) => {
        let tableCell = event.target;
        audio.delete(tableCell.textContent);
        let input = document.createElement("input");
        input.type = "text";
        input.value = tableCell.textContent;
        tableCell.textContent = "";
        tableCell.appendChild(input);

        let span = document.createElement("span");
        span.innerHTML = "<svg class=\"check\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z\"/></svg>"

        tableCell.appendChild(span);

        let div = document.createElement("div");
        let p = document.createElement("p");
        p.setAttribute("data-error", "off");
        div.appendChild(p);
        tableCell.appendChild(div);

        input.addEventListener("keyup", (e) => {
            validateNoteName(input, p);
        }, false);

        span.addEventListener("click", (event) => {
            if (validateNoteName(input, p)) {
                tableCell.textContent = input.value;
                audio.add(tableCell.textContent)
            }

        });
    });

    tableBody.addEventListener("mouseover", (event) => {
        let tableRow = null;
        console.log(event.target.parentElement.tagName.toLowerCase());
        if (event.target.parentElement.tagName.toLowerCase() === "span")
            tableRow = event.target.parentElement.parentElement.parentElement;
        else if (event.target.parentElement.tagName.toLowerCase() === "svg")
            tableRow = event.target.parentElement.parentElement.parentElement.parentElement;
        else
            tableRow = event.target.parentElement;

        console.log(tableRow);
        let xIcon = tableRow.querySelector(".span");
        xIcon.style.display = "";
        xIcon.addEventListener("click", (event) => {
            audio.delete(tableRow.querySelector(".note-name").textContent);
            tableRow.parentElement.removeChild(tableRow);
        });
    }, true);

    tableBody.addEventListener("mouseout", (event) => {
        console.log(event.target.parentElement.tagName.toLowerCase());
        if (event.target.parentElement.tagName.toLowerCase() === "span")
            tableRow = event.target.parentElement.parentElement.parentElement;
        else if (event.target.parentElement.tagName.toLowerCase() === "svg")
            tableRow = event.target.parentElement.parentElement.parentElement.parentElement;
        else
            tableRow = event.target.parentElement;

        let xIcon = tableRow.querySelector(".span");
        xIcon.style.display = "none";
    });

}
