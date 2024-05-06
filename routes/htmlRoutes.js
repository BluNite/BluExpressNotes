// require dependencies
// express
const express = require('express');
//  path module
const path = require('path');

// create express router to express
const router = express.Router();

// notes route
router.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// html/home route
router.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});


// export router
module.exports = router;