const express = require('express');
const path = require('path');
const port = 8080;

const db = require('./config/mongoose');
const todo = require('./models/Todo');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));



app.get('/', function (req, res) {


    todo.find({}, function (err, tasks) {
        if (err) {
            console.log("error in fetching from db");
            return;
        }
        return res.render('home', {
            title: "TODO List",
            todo_list: tasks
        });

    })

})


//create list
app.post('/create-task', function (req, res) {


    todo.create({
        name: req.body.name,
        date: req.body.date
    }, function (err, newTask) {
        if (err) {
            console.log('Error in creating a task!')
            return;
        }

        return res.redirect('back');
    })


});


//delete list
app.get('/delete-task/', function (req, res) {
    console.log(req.query);
    let id = req.query.id

    todo.findOneAndDelete(id, function (err) {
        if (err) {
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })
});

//server running
app.listen(port, function (err) {
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log(`The Server is running on Port: ${port}`);
})