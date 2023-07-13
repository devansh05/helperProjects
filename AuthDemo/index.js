const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');


//Mongo connection
mongoose
  .connect("mongodb://127.0.0.1:27017/authDemo")
  .then(() => {
    console.log("Mongo Connected!");
  })
  .catch((error) => {
    console.log("Mongo Connection Error ", error);
  });

//Set app's view engine to EJS
app.set('view engine', 'ejs');
//set views directory of ejs to our views directory
app.set('views', 'views');

app.use(express.urlencoded({ extended : true }));

app.get('/register', async(req, res) => {
    res.render('register');
})

app.get('/secret', (req, res) => {
    res.send('Secret Key')
});

app.get('/', (req, res) => {
    res.send('Home Page');
})

app.post('/register', async(req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash( password, 12 );
    const user = new User({
        username,
        password : hash
    })
    await user.save()
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Listening on 3000',)
})