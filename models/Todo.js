const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }

})


const todo = mongoose.model('Todo', TodoSchema);
// export db
module.exports = todo;