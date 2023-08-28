const contactsFunctions = require("./contacts.js");

const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action <type>')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.table(await contactsFunctions.listContacts())
      break;

    case 'get':
      console.log(await contactsFunctions.getContactById(id))
      break;

    case 'add':
      console.log(await contactsFunctions.addContact(name, email, phone))
      break;

    case 'remove':
      console.log(await contactsFunctions.removeContact(id))
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);