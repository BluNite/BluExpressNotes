// require dependencies
// express
const express = require('express');


// create express router to express
const router = express.Router();
const path = require('path');


// html/index route
router.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});
//html/ notes route
router.get('/notes', function (req, res) {
	res.sendFile(path.join(__dirname, "../public/notes.html"));
});







// export router
module.exports = router;