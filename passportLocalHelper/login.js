
const express = require("express");
const passport = require('passport');

// Creating express Router
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<form method="POST" ><div><label>Username:</label><input type="text" name="username"/></div><div><label>Password:</label><input type="password" name="password"/></div><div><input type="submit" value="Login"/></div><a href="/register">Register</a></form>');
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/dashboard/profile',
        failureRedirect: '/login'
    }), (req, res) => {
        console.log('LOG LOGIN ', req.isAuthenticated());
    }
);

module.exports = router;