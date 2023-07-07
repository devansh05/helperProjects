const express = require("express");
const app = express();
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cookieParser = require('cookie-parser');

app.use(cookieParser('secretKey'));
app.use('/dashboard', dashboardRoutes);
app.use('/user', dashboardRoutes);
app.use('/admin', adminRoutes);

app.get('/greet', (req, res) => {
    const { name } = req.cookies;
    res.send(` Hi ${name}`)
});

app.get('/checkCookies', (req, res) => {
    res.cookie('name', 'Hi cookie');
    res.send('Cookie Sent with request always')
})

app.get('/signCookies', (req, res) => {
    res.cookie('signedName', 'signedCookieValue', { signed : true});
    res.send('Sign Cookies')
})

app.get('/verifyCookies', (req, res) => {
    const { signed } = req.signedCookies;
    res.send(signed)
})

app.listen(3000, () => {
    console.log('LOG Listening on 3000  ',)
})