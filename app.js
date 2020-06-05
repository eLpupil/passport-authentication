const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Database
mongoose.connect(process.env.DATABASEURI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (!err) { console.log('Connected to DataBase') }
});


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));



