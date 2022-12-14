const express= require('express');
const cookieParser= require('cookie-parser');
const app=express();
const port=6565;
const bodyParser = require('body-parser');

const db= require('./config/mongoose');

app.use(cookieParser());

//use express router 
app.use(express.urlencoded());
app.use('/',require('./routes'));
//set ejs as our template engine
app.set('view engine','ejs');
app.set('views','./views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('assests'));

app.listen(port,function(err){
    if(err){console.log(`error in running the server: ${err}`);}
    else {console.log(`server is up and running on port: ${port}`);}
});

