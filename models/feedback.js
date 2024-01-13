const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    name: {
        type: String,
        reuired: [true, 'Name is Required']
    },

    feedback: {
        type: String,
        reuired: [true, 'Password is Required']
    }
})

module.exports = mongoose.model('Feedback', feedbackSchema);