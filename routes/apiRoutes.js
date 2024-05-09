// require dependencies
const express = require('express');
// express router
const router = express.Router();
const DB = require('../db/data_base.js');

router.get("/api/notes", async function (req, res) {
	const notes = await DB.readNotes();
	return res.json(notes);
});




// export router
module.exports = router;