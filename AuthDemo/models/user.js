const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be left blank.']
    },
    //hashed password is stored here not actual one
    password: {
        type: String,
        required: [true, 'Password cannot be left blank']
    }
});

module.exports = mongoose.model('User', userSchema);