// require dependencies
const express = require('express');
const { v4: uuidv4 } = require('uuid');

// express router
const router = express.Router();
// require data_base file js DataBase constructor
const DataBase = require('../db/data_base.js');

//get route  api notes path async func
router.get("/api/notes", async function (req, res) {
	// await DataBase class constructor readNote()
	const notesFileJson = await DataBase.readNote();
	// return file contents in json format
	return res.json(notesFileJson);
});

//post route api notes path async func
router.post("/api/notes", async function (req, res) {
	// await DataBase class constructor readNote()
	const notes = await DataBase.readNote();
	// object for new note using uuid for id, and req.body for title and text properties
	let newNote = {
		id: uuidv4(),
		title: req.body.title,
		text: req.body.text,
	}
	// await DataBAse class, addNotes constructor spread operator list notes database, join new note data
	await DataBase.addNote([...notes, newNote])
	// returns new note in response
	return res.send(newNote);
});

router.delete("/api/notes/:id", async function (req, res) {
	// id captured from req param
	const noteDelete = req.params.id;
	// await DataBase class constructor deleteNote()
	const readNotesCurrent = await DataBase.readNote();

	// filter notes file to remove id creates new array
	const newNoteArray = readNotesCurrent.filter((note) =>
		note.id !== noteDelete
	);
	// new note array sent to json db file
	await DataBase.deleteNote(newNoteArray);
	// return res send updated notes to front end
	return res.send(newNoteArray);
});




// export router
module.exports = router;