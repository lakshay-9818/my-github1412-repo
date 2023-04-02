//require('dotenv').config();
const fs = require('fs');
const rfs= require('rotating-file-stream');
const path = require('path');
const morgan = require('morgan');
const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);

const accessLogStream =rfs.createStream('access.log',{
    interval:'1d',
    path: logDirectory
});


const development={
    name:'development',
    asset_path: './assets',
    session_cookie_key: 'blahblahsometing',
    db: 'serviceHub_db',
    google_client_id: "733185169347-ng000866kbu0rj6ft5uq70p9ibuurr5f.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_URL: "http://localhost:6565/users/auth/google/callback",
    jwt_secret: 'serviceH',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}


const production={
    name:'production',    
    asset_path: process.env.SERVICEHUB_ASSET_PATH,
    session_cookie_key: process.env.SERVICEHUB_SESSION_COOKIE_KEY,
    db: process.env.SERVICEHUB_DB,
    google_client_id: process.env.SERVICEHUB_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.SERVICEHUB_CLIENT_SECRET,
    google_callback_URL: process.env.SERVICEHUB_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.SERVICEHUB_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}


module.exports = //development;
//production;
eval(process.env.SERVICEHUB_ENVIRONMENT)==undefined? development:eval(process.env.SERVICEHUB_ENVIRONMENT) ;