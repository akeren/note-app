const fs = require('fs');
const chalk = require('chalk');

const getNote = (title) => {
  const notes = readNotes();
  const singleNote = notes.find((note) => note.title === title);
  if (singleNote) {
    console.log(chalk.inverse(singleNote.title));
    console.log(singleNote.body);
  } else {
    console.log(chalk.red.inverse('Note not found'));
  }
};

const addNote = (title, body) => {
  const notes = readNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNote(notes);
    console.log(chalk.bold.green.inverse('New Note added!'));
  } else {
    console.log(chalk.bold.bgYellowBright.inverse('Note already taken!'));
  }
};

// Remove note
const removeNote = (title) => {
  const notes = readNotes();
  const filteredNotes = notes.filter((note) => {
    return note.title !== title;
  });

  if (notes.length > filteredNotes.length) {
    saveNote(filteredNotes);
    console.log(chalk.green.bold.inverse('Note Removed'));
  } else {
    console.log(chalk.red.bold.inverse('Note not found!'));
  }
};

// list all the notes
const listNotes = () => {
  const notes = readNotes();
  console.log(chalk.inverse('Notes'));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const saveNote = (notes) => {
  const noetsJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', noetsJSON);
};

const readNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNote: getNote,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
};
