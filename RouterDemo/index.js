const express = require("express");
const app = express();
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/dashboard', dashboardRoutes);
app.use('/user', dashboardRoutes);
app.use('/admin', adminRoutes);

app.listen(3000, () => {
    console.log('LOG Listening on 3000  ',)
})