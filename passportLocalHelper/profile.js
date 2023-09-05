const express = require("express");
const passport = require('passport');
const { isLoggedIn } = require("./middleware");
// Creating express Router
const router = express.Router()

router.get('/',isLoggedIn, (req, res) => {
    console.log('LOG 1 ',req.isAuthenticated())
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.send(`Profile`);
});

module.exports = router;