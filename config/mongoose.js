const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/serviceHub_db');

const db = mongoose.connection;

//if error then
db.on('error', console.error.bind(console, 'error connecting to db') );

//if up and running then
db.once('open', function(){
    console.log('successfully connected to database');
});

