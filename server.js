const express = require('express');

//create express app
const app = express();





// create PORT reference
const PORT = process.env.PORT || 3000;

// express middleware to handle data parsing
// url encoding extended true to parse incoming requests and returns an object
app.use(express.urlencoded({ extended: true }));
//  use json formatting for posting 
app.use(express.json());
// express static to connect to public css js html
app.use(express.static("public"));

// routing
const apiRoutes = require('./routes/apiRoutes');
app.use(apiRoutes);
const htmlRoutes = require('./routes/htmlRoutes');
app.use(htmlRoutes);

// server listener
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));