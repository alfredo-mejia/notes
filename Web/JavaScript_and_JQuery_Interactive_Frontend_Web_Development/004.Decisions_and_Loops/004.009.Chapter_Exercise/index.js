window.onload = main;

function main() {
    let formElem = window.document.getElementById("form");

    formElem.addEventListener("submit", (e) => {
        e.preventDefault();
        toggleForm();
        generateTable(window.document.getElementById("num-rows").value, 
                      window.document.getElementById("num-cols").value);
    });

    let clearButton = window.document.getElementById("clear-button")
    clearButton.addEventListener("click", () => {
        let tableHeader = window.document.getElementById("times-table-header");
        let tableBody = window.document.getElementById("times-table-body");

        tableHeader.innerHTML = "";
        tableBody.innerHTML ="";

        window.document.getElementById("num-rows").value = "";
        window.document.getElementById("num-cols").value = "";
        toggleForm();
    });
}

function toggleForm() {
    let numOfRowsElem = window.document.getElementById("num-rows");
    numOfRowsElem.disabled = !numOfRowsElem.disabled;

    let numOfColsElem = window.document.getElementById("num-cols");
    numOfColsElem.disabled = !numOfColsElem.disabled;

    let generateButton = window.document.getElementById("generate-button");
    generateButton.disabled = !generateButton.disabled;
    toggleButton(generateButton, generateButton.disabled);

    let clearButton = window.document.getElementById("clear-button");
    clearButton.disabled = !clearButton.disabled;
    toggleButton(clearButton, clearButton.disabled);
}

function toggleButton(bttn, disabled) {
    if (disabled) {
        bttn.classList.remove("btn-primary");
        bttn.classList.add("btn-secondary");
    }

    else {
        bttn.classList.remove("btn-secondary");
        bttn.classList.add("btn-primary");
    }
}

function generateTable(numOfRows, numOfCols) {
    let table = window.document.getElementById("times-table");
    let tableHeader = window.document.getElementById("times-table-header");
    let tableBody = window.document.getElementById("times-table-body");

    table.classList.add("table-striped");
    table.classList.add("table-hover");
    
    const headerRow = tableHeader.insertRow();

    for(let i = -1; i < numOfCols; i++) {
        const cell = headerRow.insertCell();
        cell.tagName = "th";
        cell.setAttribute("scope", "col");
        if (i < 0)
            continue;

        cell.textContent = i + 1;
    }

    for(let i = 0; i < numOfRows; i++) {
        const row = tableBody.insertRow();

        for(let j = -1; j < numOfCols; j++) {
            const cell = row.insertCell();

            if (j < 0) {
                cell.tagName = "th";
                cell.textContent = i + 1;
                cell.setAttribute("scope", "row");
            }
            else
                cell.textContent = (i + 1) * (j + 1);
        }
    }
}