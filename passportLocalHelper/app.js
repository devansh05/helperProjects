const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = [{username: 'test', password: 'test'}];

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'passportHelperSecret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    (username, password, done) => {
        const user = users.find(u => u.username === username);
        if (!user) { return done(null, false, { message: 'Incorrect username.' }); }

        if (user.password !== password) { // Simple string comparison, as we aren't using bcrypt
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    const user = users.find(u => u.username === username);
    done(null, user);
});

const landingPageRoute = require('./landingpage');
const dashboardRoute = require('./dashboard');
const loginRoute = require('./login');
const profileRoute = require('./profile');

app.use("/", landingPageRoute);
app.use("/dashboard", dashboardRoute);
app.use("/login", loginRoute);
app.use("/profile", profileRoute)


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});