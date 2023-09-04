module.exports.isLoggedIn = (req, res, next) => {
    // req && req.isAuthenticated && console.log('LOG MIDDLEWARE req.isAuthenticated()  ',req.isAuthenticated())
    console.log('LOG MIDDLEWARE   ', req.isAuthenticated());
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}