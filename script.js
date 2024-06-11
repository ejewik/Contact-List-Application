let addButton = document.getElementById("add");
let firstNameInput = document.getElementById("fname");
let lastNameInput = document.getElementById("lname");
let phoneNumberInput = document.getElementById("pnumber");
let contactTable = document.getElementById("contact_table");
let searchInput = document.getElementById("search_input");

// Validates that the input fields are not empty
function validateFields() {

  if (!firstNameInput.value || !lastNameInput.value || !phoneNumberInput.value) {
    alert("Field(s) are missing. Please enter a value.");
    return false;
  } else {
    return true;
  }
}

// Dynamically creates new table row from input text
function createTableRow(firstName, lastName, phoneNum) {

  var row = contactTable.insertRow(contactTable.length);
  firstNameCell = row.insertCell(0);
  firstNameCell.innerHTML = firstName;
  lastNameCell = row.insertCell(1);
  lastNameCell.innerHTML = lastName;
  phoneNumCell = row.insertCell(2);
  phoneNumCell.innerHTML = phoneNum;
  deleteBtnCell = row.insertCell(3);
  deleteBtnCell.innerHTML = `<button id="delete_button" onClick="deleteTableRow(this)">Delete</button>`;
}

// Deletes the current table row
function deleteTableRow(tr) {
  if (confirm('Are you sure that you want to delete this contact?')) {
    row = tr.parentElement.parentElement;
    contactTable.deleteRow(row.rowIndex);
    clearForm();
  }
}

// Clears the form values
function clearForm() {
  firstNameInput.value = "";
  lastNameInput.value = "";
  phoneNumberInput.value = "";
}

// Displays only the table rows where the search text matches part of the first or last name of the row
function searchTable() {
  inputToSearchFor = searchInput.value.toUpperCase();
  tableRows = contactTable.getElementsByTagName("tr");

  for (i = 0; i < tableRows.length; i++) {
    firstNameCell = tableRows[i].getElementsByTagName("td")[0];
    lastNameCell = tableRows[i].getElementsByTagName("td")[1];

    if (firstNameCell && lastNameCell) {
      firstNameText = firstNameCell.textContent;
      lastNameText = lastNameCell.textContent;
      if (firstNameText.toUpperCase().indexOf(inputToSearchFor) > -1 || lastNameText.toUpperCase().indexOf(inputToSearchFor) > -1) {
        tableRows[i].style.display = "";
      } else {
        tableRows[i].style.display = "none";
      }
    }
  }
}

// Validate input fields and create new table row upon adding new contact
addButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Add Contact: {" + firstNameInput.value + ", " + lastNameInput.value + ", " + phoneNumberInput.value + " }");
  if (validateFields() == true) {
    console.log("Fields are valid");
    createTableRow(firstNameInput.value, lastNameInput.value, phoneNumberInput.value);
    clearForm();
  }
});