const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументувати кожну функцію

async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const data = await fs.readFile(contactsPath);
  // console.log(JSON.parse(data))
  return JSON.parse(data);
}

// console.log(listContacts())

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  // console.log(result)
  return result || null;
}

// getContactById("qdggE76Jtbfd9eWJHrssH1")

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if(index === -1) {
    return null;
  }
const [result] = contacts.splice(index, 1)
await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
return result;
}

// removeContact("cbXZhmGJRedt-PhnaaWS5")

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

// console.log(addContact("XXX", "XX@com", +45237))

module.exports = { listContacts, getContactById, removeContact, addContact };
