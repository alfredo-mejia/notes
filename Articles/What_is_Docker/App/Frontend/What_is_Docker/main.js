window.onload = main

let totalRows = 0
fetchData().then(response => {
    if (document.readyState === 'complete') {
        addDataToPage(response)
    }

    else {
        document.addEventListener('DOMContentLoaded', () => {
            addDataToPage(response)
        })
    }
})

function main() {
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    if (day < 10) {day = '0' + day;}
    if (month < 10) {month = '0' + month;}

    const today_date = year + '-' + month + '-' + day;
    const dobInputElem = document.getElementById("dob");
    dobInputElem.setAttribute("max", today_date);

    const formElem = document.getElementById("form");

    formElem.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nameFormElem = document.getElementById("name")
        const dobFormElem = document.getElementById("dob")

        nameFormElem.disabled = true;
        dobFormElem.disabled = true;

        const buttonElem = document.createElement("submitButton");
        buttonElem.disabled = true;

        const spinnerSpanElem = document.getElementById("spinner");
        spinnerSpanElem.classList.add("icon");
        spinnerSpanElem.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

        const encodedData = new URLSearchParams({
            name: nameFormElem.value,
            dob: dobFormElem.value,
        });
        await fetch(formElem.action, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodedData
        }).then(response => {
            nameFormElem.value = "";
            dobFormElem.value = "";
            nameFormElem.disabled = false;
            dobFormElem.disabled = false;

            buttonElem.disabled = false;
            spinnerSpanElem.classList.remove("icon");
            spinnerSpanElem.innerHTML = "";

            if (response.ok) {
                alert("Name was added successfully.");
                fetchData().then(response => {addDataToPage(response)})
            } else {
                alert("Name was not added successfully.");
            }
        }).catch(error => {
            alert("An error occurred.");
        })
    });
}

function setupIconButtons(){
    for (let i = 0;i < totalRows; i++) {
        let rowId = document.getElementById("rowId" + i);
        let rowName = document.getElementById("rowName" + i);
        let editIcon = document.getElementById("editIcon" + i);
        let deleteIcon = document.getElementById("deleteIcon" + i);

        editIcon.addEventListener("click", async () => {
            let oldName = rowName.innerText;

            rowName.innerHTML = "<input class=\"input is-small\" type=\"text\" id=\"editableName" + i + "\"' value=\"" + rowName.innerText + "\"/>"
            let editTableName = document.getElementById("editableName" + i);
            editTableName.addEventListener("keydown", async () => {
                if (event.key === "Enter") {
                    fetch("http://localhost:8000/What_is_Docker/modify/" + rowId.innerText + "/", {
                        method: "PUT",
                        body: JSON.stringify({name: editTableName.value})
                    }).then(response => {
                        if (response.ok) {
                            alert("Updated successfully.");
                            rowName.innerHTML = editTableName.value;
                        }

                        else {
                            alert("Failed to update the database.");
                            rowName.innerHTML = oldName;
                        }
                    }).catch(error => {
                        alert("An error occurred.");
                        rowName.innerHTML = oldName;
                    })
                }
            })
        });

        deleteIcon.addEventListener("click", async () => {
            await fetch("http://localhost:8000/What_is_Docker/delete/" + rowId.innerText + "/", {
                method: "DELETE"
            }).then(response => {
                if (response.ok) {
                    alert("Deleted successfully.");
                    fetchData().then(response => {addDataToPage(response)})
                }
                else {
                    alert("Could not delete data to the database.");
                }
            }).catch(error => {
                alert("An error occurred.");
            })
        });
    }
}

async function fetchData(){
    const response = await fetch("http://localhost:8000/What_is_Docker/get_all/", {
        method: "GET",
        mode: "cors",
    });

    return await response.json();
}

function addDataToPage(response){
    const openTRTag = "<tr>\n";
    const closeTRTag = "</tr>\n";

    let tableBodyElem = document.getElementById("tableBody");
    let data = response["data"];

    let innerHTML = "";
    for (let index in data) {
        innerHTML += openTRTag;

        innerHTML += getTDElem(data[index]["id"], "rowId", index);
        innerHTML += getTDElem(data[index]["timestamp"], "rowTimestamp", index);
        innerHTML += getTDElem(data[index]["name"], "rowName", index);
        innerHTML += getTDElem(getAge(data[index]["dob"]), "rowAge", index);
        innerHTML += ("<td><span>" + data[index]["dob"] + "</span>");
        innerHTML += '<span class="icon" id="deleteIcon' + index + '"><i class="fa-solid fa-trash"></i></span>\n'
        innerHTML += '<span class="icon" id="editIcon' + index + '"><i class="fa-solid fa-pen"></i></span>\n'
        innerHTML += "</td>"
        innerHTML += closeTRTag;
    }

    tableBodyElem.innerHTML = innerHTML;
    totalRows = data.length
    setupIconButtons()
}

function getTDElem(data, name, index){
    return "<td" + " id=\"" + name + index + "\">" + data + "</td>\n";
}

function getAge(dob) {
    let today = new Date();
    let birthday = new Date(dob);
    let age = today.getFullYear() - birthday.getFullYear();
    let month = today.getMonth() - birthday.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())){
        age--;
    }

    return age
}