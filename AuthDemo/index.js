const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');

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

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secretTestingKey', resave: false, saveUninitialized: false }))

const requireLogin = (req, res, next) => {
  if(!req.session.user_id){
    return res.redirect('/login');
  }
  next();
}

app.get('/register', async (req, res) => {
  res.render('register');
})

app.get('/login', async (req, res) => {
  res.render('login');
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      req.session.user_id = user._id;
      res.redirect('/');
    } else {
      res.send('Invalid username or password.');
    }
  } else {
    res.send('Invalid username or password.');
  }

})

app.get('/secret', requireLogin, (req, res) => {
  if (req.session.user_id) {
    res.send('Secret Key')
  } else {
    res.redirect('/login')
  }
});

app.get('/', (req, res) => {
  res.render('home');
})

app.post('/logout', (req, res) => {
  req.session.user_id = null;
  req.session.destroy();
  res.redirect('/login');
})

app.post('/register', async (req, res) => {
  const { password, username } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash
  })
  await user.save();
  req.session.user_id = user._id;
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('Listening on 3000',)
})