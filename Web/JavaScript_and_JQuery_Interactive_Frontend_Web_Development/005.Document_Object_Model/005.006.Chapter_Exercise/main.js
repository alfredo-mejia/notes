window.onload = main;

function TODO(todo) {
    this.id = id++;
    this.todo = todo;
    
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    this.date = `${month}/${day}/${year}`;
}

let id = 0;
let activeMap = new Map();
activeMap.set(id, new TODO("Test Active"))

let doneMap = new Map();
doneMap.set(++id, new TODO("Test Done"));

let trashMap = new Map();
trashMap.set(++id, new TODO("Test Trash"));

function main() {
    // 1. Create a body
    let bodyElem = document.createElement("body")
    document.body = bodyElem

    // 2. Create Header
    let headerElem = document.createElement("h1");
    let headerText = document.createTextNode("Alfredo's Todo App");
    headerElem.appendChild(headerText);
    headerElem.className = "title"
    bodyElem.appendChild(headerElem);

    // 4. Add navigation
    let tableElem = document.createElement("table");
    tableElem.id = "table-nav"
    let tableRow = document.createElement("tr");
    let activeTabMenu = addTableCell(tableRow, "Active", true, true);
    activeTabMenu.className = "active"
    let doneTabMenu = addTableCell(tableRow, "Done", true, true);
    let trashTabMenu = addTableCell(tableRow, "Trash", true, true);
    tableElem.appendChild(tableRow);
    bodyElem.appendChild(tableElem);

    // 5. Add div with a form inside the form we'll have text box and a check
    let divElem = document.createElement("div");
    divElem.id = "input-container";

    let formElem = document.createElement("form");
    let inputBox = document.createElement("input");
    let buttonSubmit = document.createElement("button");
    buttonSubmit.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z\"/></svg>"
    buttonSubmit.type = "submit";
    inputBox.required = true;
    inputBox.placeholder = "Enter TODO";
    inputBox.type = "text";

    formElem.appendChild(inputBox);
    formElem.appendChild(buttonSubmit);
    divElem.appendChild(formElem);
    bodyElem.appendChild(divElem);

    // 6. Create Table to show to-do
    let todoTable = document.createElement("table");
    todoTable.id = "todo-table";
    let todoTableRow = document.createElement("tr");
    addTableCell(todoTableRow, "ID", true, false);
    addTableCell(todoTableRow, "TODO", true, false);
    addTableCell(todoTableRow, "Date", true, false);
    addTableCell(todoTableRow, "Actions", true, false);
    todoTable.appendChild(todoTableRow);
    bodyElem.appendChild(todoTable);

    // 7. Event listener when menu changes
    activeTabMenu.childNodes[0].addEventListener("click", function(event) {
        event.preventDefault();
        changeActiveTab(activeTabMenu);
        formElem.hidden = false;
        pullData("active");
    });

    doneTabMenu.childNodes[0].addEventListener("click", function(event) {
        event.preventDefault();
        changeActiveTab(doneTabMenu);
        formElem.hidden = true;
        pullData("done");
    });

    trashTabMenu.childNodes[0].addEventListener("click", function(event) {
        event.preventDefault();
        changeActiveTab(trashTabMenu);
        formElem.hidden = true;
        pullData("trash");
    });

    // 8. Pull data
    pullData("active");

    // 9. Event listener when new todo is added
    formElem.addEventListener("submit", function(event) {
        event.preventDefault();

        console.log("submiting " + inputBox.value)
        let newTODO = new TODO(inputBox.value);
        inputBox.value = "";

        activeMap.set(newTODO.id, newTODO);
        pullData("active");
    })
}

function addListItem(list, text) {
    const listItemElem = document.createElement("li");
    const listItemText = document.createTextNode(text);
    listItemElem.appendChild(listItemText);
    list.appendChild(listItemElem);
}

function addTableCell(tableRow, text, isHeader, isLink) {
    let tableCellElem = null;
    let childNode = null;

    if (isHeader)
        tableCellElem = document.createElement("th");
    else
        tableCellElem = document.createElement("td");

    let tableText = document.createTextNode(text);

    if (isLink) {
        let anchorElem = document.createElement("a");
        anchorElem.appendChild(tableText);
        childNode = anchorElem;
    }

    else {
        childNode = tableText
    }

    tableCellElem.appendChild(childNode);
    tableRow.appendChild(tableCellElem);

    return tableCellElem;
}

function addTableCellActions(tableRow, id, option) {
    let tableCellElem = document.createElement("td");
    tableCellElem.id = "actions-cell";
    let checkSpan = document.createElement("span");
    checkSpan.id = "check-todo-icon-" + id;
    let trashSpan = document.createElement("span");
    trashSpan.id = "trash-todo-icon-" + id;

    if (option === "active")
        checkSpan.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z\"/></svg>"
    else
        checkSpan.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z\"/></svg>"
    trashSpan.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z\"/></svg>"
    tableCellElem.appendChild(checkSpan);
    tableCellElem.appendChild(trashSpan);
    tableRow.appendChild(tableCellElem);
    return tableCellElem;
}

function changeActiveTab(activeTab) {
    let tableMenuElem = document.getElementById("table-nav");

    if (tableMenuElem.childNodes.length == 1) {
        let tableRow = tableMenuElem.childNodes[0];
        for(let i = 0; i < tableRow.childNodes.length; i++) {
            tableMenuElem.childNodes[0].childNodes[i].className = ""
        }
    }

    activeTab.className = "active";
}

function pullData(option) {
    let data = null;

    switch (option) {
        case "active":
            data = activeMap;
            break;
        case "done":
            data = doneMap;
            break;
        case "trash":
            data = trashMap;
            break;
        default:
            data = [];
            break;
    }

    let table = document.getElementById("todo-table");
    
    while (table.firstChild != table.lastChild) {
        table.removeChild(table.lastChild);
    }

    for(const [key, value] of data) {
        let tableRow = document.createElement("tr");
        addTableCell(tableRow, value.id, false, false);
        addTableCell(tableRow, value.todo, false, false);
        addTableCell(tableRow, value.date, false, false);
        let tableActionCell = addTableCellActions(tableRow, value.id, option);
        let checkSpan = tableActionCell.childNodes[0];
        let trashSpan = tableActionCell.childNodes[1];

        checkSpan.addEventListener("click", function() {
            if (option === "active") {
                transferTODO(key, "active", "done");
            }

            else {
                transferTODO(key, option, "active");
            }

            pullData(option);
        });

        trashSpan.addEventListener("click", function(){
            if (option === "trash") {
                transferTODO(key, "trash", "delete");
            }

            else {
                transferTODO(key, option, "trash");
            }

            pullData(option);
        });

        table.appendChild(tableRow);
    }
}

function transferTODO(key, source, dest) {
    let objectToTransfer = null;

    switch(source) {
        case "active":
            objectToTransfer = activeMap.get(key);
            activeMap.delete(key);
            break;
        case "done":
            objectToTransfer = doneMap.get(key);
            doneMap.delete(key);
            break;
        case "trash":
            objectToTransfer = trashMap.get(key);
            trashMap.delete(key);
            break;
    }

    switch(dest) {
        case "active":
            activeMap.set(key, objectToTransfer);
            break;
        case "done":
            doneMap.set(key, objectToTransfer);
            break;
        case "trash":
            trashMap.set(key, objectToTransfer);
            break;
    }
}