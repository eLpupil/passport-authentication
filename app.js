const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

const app = express();

// Database
mongoose.connect(process.env.DATABASEURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Database'))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: true })); //bodyparser is now part of express

// Express Session Middleware
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60
    }
}))

// Session Store
const store = new MongoDBStore({
    uri: process.env.DATABASEURI,
    collection: 'sessions'
})

// Connect Flash Middleware
app.use(flash());

// Custom Flash Middleware
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_msg');
    res.locals.error_message = req.flash('error_msg');
    next();
})

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));



