import passport from "passport";
import passportGoogleOAuth from "passport-google-oauth";
const googleStrategy = passportGoogleOAuth.OAuth2Strategy;
import crypto from "crypto";
import User from "../models/user.js";
import env from "./environment.js";

//tell passport to use a new strategy
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_URL,
    
},
function(accessToken,refresh,profile,done){
    // find a user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){console.log("error in google-strategy!-passport",err); return;} 

        console.log(profile);
        // if found set this user as req.user
        if(user){return done(null,user);}
        else{
            // if not found,create the user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                gender:profile.gender,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){                
                if(err){
                    console.log("error in creating user google-strategy!-passport",err); return;}
                return done(null,user);  
            }  
            )
        }
    })
}
));
export default passport;