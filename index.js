import express from "express";
import env from "./config/environment.js";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app=express();
import getAssetPath from "./config/view-helpers.js";
getAssetPath(app);

const port=6565;
import expressLayouts from "express-ejs-layouts";

import db from "./config/mongoose.js";
// used for session cookie
import session from "express-session";
import passport from "passport";
import passportLocal from "./config/passport-local-strategy.js";
import passportJWT from "./config/passport-jwt-strategy.js";
import passportGoogle from "./config/passport-google-oauth-strategy.js";

import MongoStore from "connect-mongo";
import sassMiddleware from "node-sass-middleware";
import flash from "connect-flash";
import { setFlash } from "./config/middleware.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if(env.name=='development'){
app.use(sassMiddleware({
    src: path.join(__dirname,env.asset_path,'scss'),
    dest: path.join(__dirname,env.asset_path,'css'),
    debug: true,
    outputStyle: 'extended',
    prefix:'/css'
}));
}
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(env.asset_path));

app.use(logger(env.morgan.mode,env.morgan.options));

//make uploadpath visible to browser
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts',true);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

//set ejs as our template engine
app.set('view engine','ejs');
app.set('views','./views');

//mongoStore is used to store the session cookie in the db
app.use(session({
    name: 'servicehub',
    //TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
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

app.use(flash());
app.use(setFlash);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// use express router
import routes from "./routes/index.js";
app.use("/", routes);

app.listen(port,function(err){
    if(err){console.log(`error in running the server: ${err}`);}
    else {console.log(`server is up and running on port: ${port}`);}
});

