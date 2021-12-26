const fs = require('fs/promises');
const path = require('path'); 
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function getAllContacts() {
    return  fs.readFile(contactsPath, 'utf8').then(contacts => JSON.parse(contacts))
}

// TODO: задокументировать каждую функцию
function listContacts() {
    getAllContacts()
    .then(console.table)
    .catch(err => console.log(err.message));
    
}


function getContactById(contactId) {
    getAllContacts()
    .then()
     fs.readFile(contactsPath, 'utf8')
         .then(contacts => {
             const parseContacts = JSON.parse(contacts)
             parseContacts.map(oneContact => {
                 if (Number(oneContact.id) ===  Number(contactId)) {
                     return console.log(oneContact);
                 }
                 
             })
         })
    .catch(err => console.log(err.message));
}

function removeContact(contactId) {
   fs.readFile(contactsPath, 'utf8')
         .then(contacts => {
           const parseContacts = JSON.parse(contacts)
           const filterContacts = parseContacts.filter(oneContact =>  Number(oneContact.id) !== Number(contactId))
            fs.writeFile(contactsPath, JSON.stringify(filterContacts, null, 2));
             
         console.table(filterContacts)
         })
        
       
    .catch(err => console.log(err.message));
}

function addContact(name, email, phone) {
   fs.readFile(contactsPath, 'utf8')
         .then(contacts => {
           const parseContacts = JSON.parse(contacts)
           const newContact = { id: crypto.randomUUID(), name, email, phone } 
           const newContacts = JSON.stringify([...parseContacts, newContact], null, "\t");
             
             fs.writeFile(contactsPath, newContacts);
             
             return newContact;
         })
        .then(console.log)
       
    .catch(err => console.log(err.message));
}

//addContact('Vlad','yuskiv@gmail.com','+380631800120')
//listContacts()
//getContactById(9)
//removeContact(5)

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}