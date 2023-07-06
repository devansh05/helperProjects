const express = require("express");
const app = express();
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/dashboard', dashboardRoutes);
app.use('/user', dashboardRoutes);

app.listen(3000, () => {
    console.log('LOG Listening on 3000  ',)
})