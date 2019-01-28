document.getElementById("save-btn").addEventListener("click", saveContact);

function saveContact() {
    let name = document.getElementById("name-input").value;
    let mobileNumber = document.getElementById("mobile-number-input").value;

    let contact = {
        name: name,
        mobileNumber: mobileNumber
    };

    let contactsList = JSON.parse(localStorage.getItem("contacts")) || [];
    if(!userExists(contactsList, contact)){
        contactsList.push(contact);
        localStorage.setItem("contacts", JSON.stringify(contactsList));
    }
}

function userExists(contactsList, contact) {
    return contactsList.find(existingContact => {
        return existingContact.name === contact.name;
    });
}
