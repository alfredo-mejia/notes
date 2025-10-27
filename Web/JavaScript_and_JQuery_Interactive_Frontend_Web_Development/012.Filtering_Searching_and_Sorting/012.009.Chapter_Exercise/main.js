import DataController from "./src/DataController.js";
import {isEmptyString} from "./src/utils.js";

const dataController = new DataController(false);
main()

function main() {
    const data = dataController.fetchData();
    document.addEventListener("DOMContentLoaded", () => {
       start();
       data.then(data => fillTable(data)).catch(error => console.error("Error fetching data:", error));
       updateOptions();
       updatePageNumbers();
    });
}

function start() {
    addSortButtonEventListeners();
    addFilterButtonEventListeners();
    addPopUpXButtonEventListeners();
    addSubmitFilterEventListeners();
    addVisibilityButtonEventListeners();
    addPageNavEventListeners();
}

function addPageNavEventListeners() {
    const rowsPerPageElem = document.getElementById("rows-per-page-input");
    rowsPerPageElem.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            dataController.setPageNumber(1).setPageSizeFetch(Number(rowsPerPageElem.value))
                .then(data => fillTable(data))
                .catch(error => console.error("Error fetching data:", error));

            updatePageNumbers();
        }
    });

    const pageNumberElem = document.getElementById("current-page-input");
    document.getElementById("current-page-input").addEventListener("keydown", (event) => {
       if (event.key === "Enter") {
           const value = Number(pageNumberElem.value);

           dataController.getPageNumbers().then(pageNumbers => {
               if (value < pageNumbers[0] || value > pageNumbers[2]) {
                   console.error("Invalid page number:", value);
                   document.getElementById("current-page-input").value = pageNumbers[1];
                   return;
               }

               dataController.setPageNumberFetch(Number(pageNumberElem.value))
                   .then(data => fillTable(data))
                   .catch(error => console.error("Error fetching data:", error));

               updatePageNumbers();
           });
       }
    });

    const pageSelectContainer = document.getElementById("page-selector");
    const arrows = pageSelectContainer.querySelectorAll(".arrow");
    const numbers = pageSelectContainer.querySelectorAll(".number");

    arrows.forEach(arrow => {
        arrow.addEventListener("click", () => {
            if (arrow.firstElementChild.classList.contains("fa-arrow-left")) {
                dataController.setPageNumberFetch(Number(pageNumberElem.value) - 1)
                    .then(data => fillTable(data))
                    .catch(error => console.error("Error fetching data:", error));

                updatePageNumbers();
            }

            else if (arrow.firstElementChild.classList.contains("fa-arrow-right")) {
                dataController.setPageNumberFetch(Number(pageNumberElem.value) + 1)
                    .then(data => fillTable(data))
                    .catch(error => console.error("Error fetching data:", error));

                updatePageNumbers();
            }
        });
    });

    numbers.forEach(number => {
        number.addEventListener("click", () => {
            const value = Number(number.textContent);
            dataController.setPageNumberFetch(value)
                .then(data => fillTable(data))
                .catch(error => console.error("Error fetching data:", error));

            updatePageNumbers();
        })
    })

}

function updatePageNumbers() {
    dataController.getPageNumbers().then(pageNumbers => {
        // console.log(pageNumbers);
        const minPageNumber = pageNumbers[0];
        const currentPageNumber = pageNumbers[1];
        const maxPageNumber = pageNumbers[2];
        const totalCount = pageNumbers[3];
        const pageCount = pageNumbers[4];

        if (minPageNumber <= 0 || maxPageNumber <= 0) {
            document.getElementById("page-selector").style.display = "none";
            return;
        }

        if (currentPageNumber === minPageNumber) {
            const leftArrow = document.getElementById("left-arrow");
            leftArrow.firstElementChild.classList.remove("fa-arrow-left");
            leftArrow.firstElementChild.classList.add("fa-ban");
            leftArrow.disabled = true;

            const leftNumber = document.getElementById("left-number");
            leftNumber.style.display = "none";

            // const leftEllipsis = document.getElementById("left-ellipsis");
            // leftEllipsis.style.display = "none";
        }

        else {
            const leftArrow = document.getElementById("left-arrow");
            leftArrow.firstElementChild.classList.remove("fa-ban");
            leftArrow.firstElementChild.classList.add("fa-arrow-left");
            leftArrow.disabled = false;
            const leftNumber = document.getElementById("left-number");
            leftNumber.style.display = "";
        }

        if (currentPageNumber === maxPageNumber) {
            const rightArrow = document.getElementById("right-arrow");
            rightArrow.firstElementChild.classList.remove("fa-arrow-right");
            rightArrow.firstElementChild.classList.add("fa-ban");
            rightArrow.disabled = true;

            const rightNumber = document.getElementById("right-number");
            rightNumber.style.display = "none";

            // const rightEllipsis = document.getElementById("left-ellipsis");
            // rightEllipsis.style.display = "none";
        }

        else {
            const rightArrow = document.getElementById("right-arrow");
            rightArrow.firstElementChild.classList.remove("fa-ban");
            rightArrow.firstElementChild.classList.add("fa-arrow-right");
            rightArrow.disabled = false;
            const rightNumber = document.getElementById("right-number");
            rightNumber.style.display = "";
        }

        document.getElementById("left-number").textContent = minPageNumber;
        document.getElementById("right-number").textContent = maxPageNumber;
        document.getElementById("current-page-input").value = currentPageNumber;
        document.getElementById("page-selector").style.display = "";

        document.getElementById("total-number").textContent = totalCount;
        const startNumber = (dataController.getPageNumber() - 1) * dataController.getPageSize() + 1;
        const endNumber = startNumber + pageCount - 1;

        document.getElementById("start-number").textContent = startNumber.toString();
        document.getElementById("end-number").textContent = endNumber.toString();

    }).catch(error => console.error("Error fetching data:", error));
}

function addSubmitFilterEventListeners() {
    document.querySelectorAll(".input-popup").forEach((popup) => {
        popup.addEventListener("submit", (event) => {
            event.preventDefault();

            const fieldName = popup.id.replace("-input-popup", "");
            let inputValue = popup.querySelector(".input-container").querySelector("input").value;
            const operatorValue = popup.querySelector(".input-operator-container").querySelector("select").value;

            if (isEmptyString(inputValue) || isEmptyString(operatorValue)) {
                return;
            }

            if (operatorValue === "in") {
                inputValue = inputValue.split(",");
            }

            else if (inputValue.includes(",")) {
                inputValue = inputValue.replace(",", " ");
            }

            if (popup.querySelector(".input-container").querySelector("input").type === "number") {
                inputValue = Number(inputValue);
            }

            dataController.setPageNumber(1).addFilter(fieldName, operatorValue, inputValue)
                .then(data => fillTable(data))
                .catch(error => console.error("Error fetching data:", error));

            console.log(dataController.getFilterArray());

            popup.querySelector(".input-container").querySelector("input").value = "";
            popup.querySelector(".input-operator-container").querySelector("select").value = "eq";

            updateIcons();
            updateOptions();
            closeAllPopUps();
            updatePageNumbers();
        });

        popup.addEventListener("keydown", (event) => {
           if (event.key === "Enter") {
               event.preventDefault();
           }
        });
    });
}

function addFilterButtonEventListeners() {
    document.querySelectorAll(".filter-button").forEach((button) => {
        button.setAttribute("filter", "off");
        button.addEventListener("click", () => {
            const titleHeader = button.parentElement.previousElementSibling;
            const fieldName = titleHeader.id.replace("-header", "");

            if (button.getAttribute("filter") === "off") {
                closeAllPopUps();

                const rect = titleHeader.getBoundingClientRect();
                const popUp = document.getElementById(`${fieldName}-input-popup`);
                popUp.style.top = `${rect.bottom + window.scrollY}px`;  // below icon
                popUp.style.left = `${rect.left + window.scrollX}px`;    // align left edge
                popUp.style.display = 'block';
                button.setAttribute("filter", "on");
            }
            else
            {
                button.setAttribute("filter", "off");
                const popUp = document.getElementById(`${fieldName}-input-popup`);
                popUp.style.display = 'none';
            }
        })
    });
}

function addPopUpXButtonEventListeners() {
    document.querySelectorAll(".pop-up-x-button").forEach((button) => {
        button.addEventListener("click", () => {
            const popUp = button.parentElement.parentElement;
            popUp.style.display = 'none';

            const fieldHeaderTitle = document.getElementById(button.parentElement
                                                .id.replace("-input-x-container", "-header"))
            const filterButton = fieldHeaderTitle.nextElementSibling.querySelector(".filter-button");
            filterButton.setAttribute("filter", "off");
        });
    });
}

function addSortButtonEventListeners() {
    document.querySelectorAll(".sort-button").forEach((button) => {
        button.setAttribute("order", "none");
        button.addEventListener("click", () => {
            // Get field name
            const fieldName = button.parentElement.previousElementSibling.id.replace("-header", "");
            let order = "";

            if (button.getAttribute("order") === "none") {
                button.setAttribute("order", "asc");
                order = "asc";
            }

            else if (button.getAttribute("order") === "asc") {
                button.setAttribute("order", "desc");
                order = "desc";
            }

            else if (button.getAttribute("order") === "desc") {
                button.setAttribute("order", "none");
                order = "delete";
            }

            // Update sorting in data controller
            dataController.addSorting(fieldName, order).then(data => fillTable(data))
                .catch(error => console.error("Error fetching data:", error));

            updateIcons();
            updateOptions();
            closeAllPopUps();
            updatePageNumbers();
        });
    });
}

function closeAllPopUps() {
    const popUps = document.querySelectorAll(".input-popup");
    popUps.forEach(popUp => {
        popUp.style.display = 'none';
        const fieldHeaderTitle = document.getElementById(popUp.id
            .replace("-input-popup", "-header"))
        const filterButton = fieldHeaderTitle.nextElementSibling.querySelector(".filter-button");
        filterButton.setAttribute("filter", "off");
    });
}

function addVisibilityButtonEventListeners() {
    document.querySelectorAll(".visibility-button").forEach((button) => {
        button.addEventListener("click", () => {
            const fieldName = button.parentElement.previousElementSibling.id.replace("-header", "");
            const tableBodyCells = document.querySelectorAll(`.${fieldName}-tableBodyCell`);
            const displayOptionCell = document.getElementById("display-option-cell");

            if (displayOptionCell.colSpan <= 2) {
                return;
            }

            for (const cell of tableBodyCells) {
                cell.style.display = "none";
            }

            const parentHeader = button.parentElement.parentElement;
            parentHeader.style.display = "none";
            displayOptionCell.colSpan--;

            updateOptions();
            closeAllPopUps();
        })
    })
}

function updateIcons() {
    const tableTitles = document.querySelectorAll(".header-title");
    const sortingMap = dataController.getSortingMap();

    for (const title of tableTitles) {
        const fieldName = title.id.replace("-header", "");
        const iconsWrapper = title.nextElementSibling;

        updateSortIcon(iconsWrapper, fieldName, sortingMap);
    }
}

function updateSortIcon(iconsWrapper, fieldName, sortingMap) {
    const icon = iconsWrapper.querySelector(".sort-button").querySelector("i");

    if (sortingMap.has(fieldName)) {
        const sortOperator = sortingMap.get(fieldName);

        if (sortOperator === "asc") {
            icon.classList.remove("fa-sort");
            icon.classList.remove("fa-sort-down");
            icon.classList.add("fa-sort-up");
        }

        else {
            icon.classList.remove("fa-sort-up");
            icon.classList.remove("fa-sort");
            icon.classList.add("fa-sort-down");
        }
    }

    else {
        icon.classList.remove("fa-sort-up");
        icon.classList.remove("fa-sort-down");
        icon.classList.add("fa-sort");
    }
}

function updateOptions() {
    clearOptions();
    let hasOptions = false;

    for(const header of document.querySelectorAll(".header-title")) {
        if (header.parentElement.style.display === "none") {
            createOptionElement(header.textContent, "visibility", ["fa-solid", "fa-eye-slash"], "rgba(221,255,254,0.8)");
            hasOptions = true;
        }
    }

    for (const filter of dataController.getFilterArray()) {
        if (!isEmptyString(filter)) {
            createOptionElement(filter, "filter", ["fa-solid", "fa-x"], "rgba(251,247,219,0.8)");
            hasOptions = true;
            hasOptions = true;
        }
    }

    for (const sort of dataController.getSortingArray()) {
        if (!isEmptyString(sort)) {
            if (sort.at(0) === "-") {
                const fieldName = sort.substring(1);
                createOptionElement(`${fieldName}:desc`, "sort");
            }
            else {
                createOptionElement(`${sort}:asc`, "sort");
            }

            hasOptions = true;
        }
    }

    if (hasOptions) {
        document.getElementById("display-option-placeHolder").style.display = "none";
    }
}

function clearOptions() {
    document.getElementById("display-option-cell")
            .querySelectorAll(".display-option")
            .forEach(element => element.remove());

    document.getElementById("display-option-placeHolder").style.display = "inline";
}

function createOptionElement(option, type = "", iconClass = ["fa-solid", "fa-x"], backgroundColor = "rgba(216, 228, 253, 0.8)") {
    const displayOptionCell = document.getElementById("display-option-cell");

    const spanElement = document.createElement("span");
    spanElement.classList.add("display-option");
    spanElement.setAttribute("type", type);

    const xButton = document.createElement("button");
    xButton.classList.add("button-icon");
    createOptionButtonEventListener(xButton, type, option);

    const xIcon = document.createElement("i");
    iconClass.forEach(className => xIcon.classList.add(className));

    xButton.appendChild(xIcon);

    const innerSpan = document.createElement("span");
    const iconSpan = document.createElement("span");
    iconSpan.classList.add("button-icon");
    const optionIcon = document.createElement("i");
    iconSpan.appendChild(optionIcon);

    spanElement.appendChild(xButton);
    spanElement.appendChild(innerSpan);
    spanElement.appendChild(iconSpan);

    if (type === "sort") {
        innerSpan.textContent = document.getElementById(`${option.split(":")[0]}-header`).textContent;

        if (option.split(":")[1] === "asc") {
            optionIcon.classList.add("fa-solid", "fa-arrow-up-short-wide");
        }

        else {
            optionIcon.classList.add("fa-solid", "fa-arrow-down-wide-short");
        }
    }

    else if (type === "filter") {
        const fieldName = option.split(":")[0];
        const operator = option.split(":")[1];
        const value = option.split(":")[2];


        innerSpan.textContent = document.getElementById(`${fieldName}-header`).textContent;

        if (operator === "eq") {
            optionIcon.classList.add("fa-solid", "fa-equals");
        }

        else if (operator === "gt") {
            optionIcon.classList.add("fa-solid", "fa-greater-than");
        }

        else if (operator === "gte") {
            optionIcon.classList.add("fa-solid", "fa-greater-than-equal");
        }

        else if (operator === "lt") {
            optionIcon.classList.add("fa-solid", "fa-less-than");
        }

        else if (operator === "lte") {
            optionIcon.classList.add("fa-solid", "fa-less-than-equal");
        }

        else if (operator === "in") {
            optionIcon.classList.add("fa-solid", "fa-list-check");
        }

        const valueSpan = document.createElement("span");
        valueSpan.textContent = value;
        spanElement.appendChild(valueSpan);
    }

    else if (type === "visibility") {
        innerSpan.textContent = option;
    }

    spanElement.style.backgroundColor = backgroundColor;
    displayOptionCell.appendChild(spanElement);
}

function createOptionButtonEventListener(button, type, option) {
    button.addEventListener("click", () => {
        if (type === "sort") {
            const fieldName = option.split(":")[0];
            dataController.deleteSorting(fieldName)
                .then(data => fillTable(data))
                .catch(error => console.error("Error fetching data:", error));

            const sortButton = document.getElementById(`${fieldName}-header`)
                                                .nextElementSibling
                                                .querySelector(".sort-button");
            sortButton.setAttribute("order", "none");
        }

        else if (type === "filter") {
            const fieldName = option.split(":")[0];
            const sortOperator = option.split(":")[1];

            dataController.setPageNumber(1).deleteFilter(fieldName, sortOperator)
                .then(data => fillTable(data))
                .catch(error => console.error("Error fetching data:", error));
        }

        else if (type === "visibility") {
            const header = Array.from(document.querySelectorAll(".header-title"))
                                .filter(header => header.textContent === option);

            const fieldName = header[0].id.replace("-header", "");
            const tableBodyCells = document.querySelectorAll(`.${fieldName}-tableBodyCell`);
            const displayOptionCell = document.getElementById("display-option-cell");

            for (const cell of tableBodyCells) {
                cell.style.display = "";
            }

            if (displayOptionCell.colSpan < 11) {
                displayOptionCell.colSpan++;
            }

            const parentHeader = header[0].parentElement;
            parentHeader.style.display = "";
        }

        else {
            console.error("Invalid type:", type);
        }

        updateIcons();
        updateOptions();
        updatePageNumbers();
    });
}

function clearTableBody() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
}

function fillTable(data) {
    if (!data || !Array.isArray(data)) {
        console.log("Data is null or undefined.");
        return;
    }
    clearTableBody()

    const pageNumber = dataController.getPageNumber();
    const pageSize = dataController.getPageSize();
    const startNumber = (pageNumber - 1) * pageSize + 1;
    // const endNumber = startNumber + pageSize - 1;
    const tableBody = document.getElementById("table-body");
    let rowNumber = startNumber;

    for (const row of data) {
        // Create a table row
        const tableRow = document.createElement("tr");

        // Create cells
        tableRow.appendChild(createTableCell(rowNumber.toString()));
        tableRow.appendChild(createTableCell(row.getRecordDate(), "record_date-tableBodyCell"));
        tableRow.appendChild(createTableCell(row.getSecurityTypeDesc(), "security_type_desc-tableBodyCell"));
        tableRow.appendChild(createTableCell(row.getSecurityDesc(), "security_desc-tableBodyCell"));
        tableRow.appendChild(createTableCell(row.getAvgInterestRateAmt(), "avg_interest_rate_amt-tableBodyCell"));
        tableRow.appendChild(createTableCell(row.getRecordFiscalYear(), "record_fiscal_year-tableBodyCell"));
        tableRow.appendChild(createTableCell(row.getRecordFiscalQuarter(), "record_fiscal_quarter-tableBodyCell"));
        tableRow.appendChild(createTableCell(row.getRecordCalendarYear(), "record_calendar_year-tableBodyCell"));
        tableRow.appendChild(createTableCell(row.getRecordCalendarQuarter(), "record_calendar_quarter-tableBodyCell"));
        tableRow.appendChild(createTableCell(row.getRecordCalendarMonth(), "record_calendar_month-tableBodyCell"));
        tableRow.appendChild(createTableCell(row.getRecordCalendarDay(), "record_calendar_day-tableBodyCell"));

        // Append the row to the table body
        tableBody.appendChild(tableRow);
        rowNumber++;
    }
}

function createTableCell(value, className = "") {
    const cell = document.createElement("td");
    cell.textContent = value;

    if (isEmptyString(className)) {
        return cell;
    }

    cell.classList.add(className);
    if (document.getElementById(className.replace("-tableBodyCell", "-header")).parentElement.style.display === "none") {
        cell.style.display = "none";
    }

    return cell;
}
