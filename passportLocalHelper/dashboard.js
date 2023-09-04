// Importing express module
const express=require("express");
const { isLoggedIn } = require("./middleware");
const router=express.Router();
  
// Handling request using router
router.get("/home",(req,res,next)=>{
    res.send("This is the homepage request")
})

router.get('/profile', isLoggedIn, (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.send(`Hello, ${req.user.username}! <a href="/profile">Profile</a>`);
});
  
// Importing the router
module.exports=router