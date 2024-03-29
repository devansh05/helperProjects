const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./model')
const users = require('./model');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'passportHelperSecret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(
//     (username, password, done) => {
//         const user = users.find(u => u.username === username);
//         if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
//         console.log('LOG  users ',users)
//         if (user.password !== password) {
//             return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//     }
// ));

// passport.serializeUser((user, done) => {
//     done(null, user.username);
// });

// passport.deserializeUser((username, done) => {
//     const user = users.find(u => u.username === username);
//     done(null, user);
// });

passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

const landingPageRoute = require('./landingpage');
const dashboardRoute = require('./dashboard');
const loginRoute = require('./login');
const profileRoute = require('./profile');
const register = require('./register');

app.use("/", landingPageRoute);
app.use("/dashboard", dashboardRoute);
app.use("/login", loginRoute);
app.use("/profile", profileRoute);
app.use("/register", register);

mongoose.connect('mongodb://127.0.0.1:27017/admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Failed to connect to MongoDB', err);
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});