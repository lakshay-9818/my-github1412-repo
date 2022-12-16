const express= require('express');
const cookieParser= require('cookie-parser');
const bodyParser = require('body-parser');
const app=express();
const port=6565;
const db= require('./config/mongoose');
const session = require('express-session');
const passport= require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore= require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('assests'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//set ejs as our template engine
app.set('view engine','ejs');
app.set('views','./views');

//mondoStore is used to store the session cookie in the db
app.use(session({
    name: 'servicehub',
    //TODO change the secret before deployment in production mode
    secret: "blahblahsometing",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: (1000*60*100) },
    // store: new MongoStore({
    //     mongooseConnection:db,
    //     autoRemove:'disabled'},
    //     function(err){console.log(err||'connect-mongoDb setup is ok');})
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost:27017',
            dbName: "db",
            stringify: false,
          })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use express router 
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){console.log(`error in running the server: ${err}`);}
    else {console.log(`server is up and running on port: ${port}`);}
});

