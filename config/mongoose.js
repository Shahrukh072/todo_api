//require  library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/todo_api');


const db = mongoose.connection;

//error
db.on('error', function(err) { console.log(err.message); });

//up and running then print the message
db.once('open', function() {
  
    console.log("Successfully connected to the database");

});