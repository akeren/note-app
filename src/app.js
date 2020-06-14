const yargs = require('yargs');

const notesUtil = require('./notes');

yargs.version('1.2.0');

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    notesUtil.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    notesUtil.removeNote(argv.title);
  },
});

// create list of notes command
yargs.command({
  command: 'list',
  describe: 'List of all the notes',
  handler: () => {
    notesUtil.listNotes();
  },
});

// create read command
yargs.command({
  command: 'read',
  describe: 'Get a single note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    notesUtil.getNote(argv.title);
  },
});

yargs.parse();
