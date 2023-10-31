// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress, physicalAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  // this.emailAddress = emailAddress || [];
  // this.physicalAddress = physicalAddress || [];
  this.emailAddress = { "test": emailAddress};
  this.physicalAddress = { "test": physicalAddress};
}

//NEW JUNK
Contact.prototype.addEmail = function(type, value) {
  // this.emailAddress.push({ type, value });
  if (type && value) {
    this.emailAddress[type] = value;
  }
};

Contact.prototype.addAddress = function(type, value) {
  // this.physicalAddress.push({ type, value });
  if (type && value) {
    this.physicalAddress[type] = value;
  }
};
//END NEW JUNK

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// User Interface Logic ---------
let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText =  null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  document.querySelector(".first-name").innerText = contact.firstName;
  document.querySelector(".last-name").innerText = contact.lastName;
  document.querySelector(".phone-number").innerText = contact.phoneNumber;

  //Loop here for email since it may contain more than one key:val pair
  let emails = "";
  for (let type in contact.emailAddress) {
    emails += type + ": " + contact.emailAddress[type] + "\n";
  }
  document.querySelector(".email").innerText = emails;

  //Same but for address
  let addresses = ""; //init so it doesn't cry
  for (let type in contact.physicalAddress) {
    addresses += type + ": " + contact.physicalAddress[type] + "\n";
  }
  document.querySelector(".address").innerText = addresses;
  //end address loop

  document.querySelector("button.delete").setAttribute("id", contact.id);
  document.querySelector("div#contact-details").removeAttribute("class");
}

function handleDelete(event) {
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#contact-details").setAttribute("class", "hidden");
  listContacts(addressBook);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedEmail = document.querySelector("input#new-email").value;
  const inputtedEmailAlt = document.querySelector("input#new-email-alt").value;
  const inputtedEmailAltType = document.querySelector("input#new-email-type").value;
  const inputtedAddress = document.querySelector("input#new-address").value;
  const inputtedAddressAlt = document.querySelector("input#new-address-alt").value;
  const inputtedAddressAltType = document.querySelector("input#new-address-type").value;

  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedAddress);

  newContact.addEmail(inputtedEmailAltType, inputtedEmailAlt);
  newContact.addAddress(inputtedAddressAltType, inputtedAddressAlt);
  addressBook.addContact(newContact);

  listContacts(addressBook);
  document.querySelector("input#new-first-name").value = null;
  document.querySelector("input#new-last-name").value = null;
  document.querySelector("input#new-phone-number").value = null;
  document.querySelector("input#new-email").value = null;
  document.querySelector("input#new-email-alt").value = null;
  document.querySelector("input#new-email-type").value = null;
  document.querySelector("input#new-address").value = null;
  document.querySelector("input#new-address-alt").value = null;
  document.querySelector("input#new-address-type").value = null;
}

window.addEventListener("load", function (){
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  document.querySelector("button.delete").addEventListener("click", handleDelete);
});

//MORE NEW JUNK
function addEmail() {
  const type = document.getElementById("new-email-type").value;
  const value = document.getElementById("new-email-alt").value;
  contact.addEmail(type, value);
}

function addAddress() {
  const type = document.getElementById("new-address-type").value;
  const value = document.getElementById("new-address-alt").value;
  contact.addAddress(type, value);
}
//END MORE NEW JUNK

