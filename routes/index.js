const express = require('express');
const router = express.Router();

// User model
const todo = require('../models/Todo');


router.get('/', function (req, res) {


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
router.post('/create-todo', function (req, res) {
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

// patch todo
router.patch('/update-todo/:id', function (req, res) {
    let d = req.query.date;
    let id = req.query.id;
    todo.findById(id, function (err, tasks) {
        if (err) {
            console.log("Error updating status!")
        }
        else {
            let dates = tasks.dates;
            let found = false;
            dates.find(function (item, index) {
                if (item.date === d) {
                    if (item.complete === 'yes') {
                        item.complete = 'no';
                    }
                    else if (item.complete === 'no') {
                        item.complete = 'none'
                    }
                    else if (item.complete === 'none') {
                        item.complete = 'yes'
                    }
                    found = true;
                }
            })
            if (!found) {
                dates.push({ date: d, complete: 'yes' })
            }
            tasks.dates = dates;
            tasks.save()
                .then(tasks => {
                    console.log(tasks);
                    res.redirect('back');
                })
                .catch(err => console.log(err));
        }
    })  
            
});

// get  list
router.get('/todo', function (req, res) {
    console.log(req.query);
    let id = req.query.id
    todo.findById(id, function (err) {

    })

});  


//delete list
router.get('/delete-todo/:id', function (req, res) {
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

module.exports = router;