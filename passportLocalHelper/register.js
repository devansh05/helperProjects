
const express = require("express");
const passport = require('passport');
const users = require('./model');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("<h1>Register Form</h1><form method='POST'><div><label>Username:</label><input type='text' name='username'/></div><div><label>Password:</label><input type='password' name='password'/></div><div><input type='submit' value='Register'/></div></form>");
});

router.post('/', (req, res) => {
    users.push(req.body);
    res.redirect('/login');
}
);

module.exports = router