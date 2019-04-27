const mongoose = require('mongoose');

require("dotenv").config();

const options = {
    useNewUrlParser: true
};

const connString = process.env.MONGODB_URI;

mongoose.connect(connString, options).then(
    () => { console.log(`Connected to the database`); },
    err => { console.log(err); }
);