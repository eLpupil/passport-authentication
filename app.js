const express = require('express');
require('dotenv').config();

const app = express();


// Routes
app.use('/', require('./routes/index'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));



