import mongoose from "mongoose";
import env from "./environment.js";
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

//if error then
db.on('error', console.error.bind(console, 'error connecting to db') );

//if up and running then
db.once('open', function(){
    console.log('successfully connected to database');
});


export default db;
