document.getElementById("save-btn").addEventListener("click", saveContact);
document.getElementById("recover-btn").addEventListener("click", recoverContacts);

function saveContact() {
    let name = document.getElementById("name-input").value;
    let mobileNumber = document.getElementById("mobile-number-input").value;
    let email = document.getElementById("email-input").value;

    let contact = {
        name: name,
        mobileNumber: mobileNumber,
        email: email
    };

    let contactsList = JSON.parse(localStorage.getItem("contacts")) || [];
    if(!userExists(contactsList, contact)){
        contactsList.push(contact);
        localStorage.setItem("contacts", JSON.stringify(contactsList));
    }
}

function recoverContacts(){
    let contactsList = JSON.parse(localStorage.getItem("contacts"));
    showContactsInView(contactsList);
}

function showContactsInView(contactsList){
    var contactsElement = document.getElementById("contacts-list");
    var contactsMarkup = "";

    if(contactsList){
        contactsMarkup = `
            ${contactsList.map((contact, i) => replaceNullData `
                <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center flex-wrap">
                    <div class="mr-3 d-flex flex-wrap">
                        <img class="mr-3" src="http://placekitten.com/100/100">
                        <div>
                            <p>${contact.name}</p>
                            <div>
                                <i class="fas fa-mobile-alt"></i>
                                <span>${contact.mobileNumber}</span>
                            </div>
                            <div>
                                <i class="far fa-envelope"></i>
                                <span>${contact.email}</span>
                            </div>
                        </div>
                    </div>
                    <i class="far fa-trash-alt"></i>
                </div>
            `).join('')}
        `;
    }

    contactsElement.innerHTML = contactsMarkup;
}

function userExists(contactsList, contact) {
    return contactsList.find(existingContact => {
        return existingContact.name === contact.name;
    });
}

function replaceNullData(strings, ...parts) {
    var checkedMarkup = "";
    parts.forEach((part, index) => {
        if (!part) {
            part = "data not available";
        }

        checkedMarkup += strings[index] + part;
    });

    return checkedMarkup + strings[strings.length - 1];
}
