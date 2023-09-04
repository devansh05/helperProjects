const express = require("express");
const passport = require('passport');
const { isLoggedIn } = require('./middleware');
const login = require('./login');


// Creating express Router
const router = express.Router()



module.exports = router;