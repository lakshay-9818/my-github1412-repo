import passport from "passport";

import pl from "passport-local";
const LocalStrategy = pl.Strategy;

import User from "../models/user.js";

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',passReqToCallback:true
},
function(req,email,password,done){

    //find a user and establish identity
    User.findOne({email:email}, function(err,user){
        if(err){req.flash('error',err); 
                 return done(err); }

        if(!user || user.password!=password){
            req.flash('error','invalid username/password'); 
            return done(null,false);}

        return done(null,user);
    });
   }

));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser( function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){console.log('Error in finding user --> passport'); 
        return done(err); }
        return done(null,user);
    });
});

//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
//if user is authenticated then pass on the request to new function(controller's action)
if(req.isAuthenticated()){return next();}
return res.redirect('/sign_in');
}

passport.setAuthenticatedUser= function(req,res,next){
    if(req.isAuthenticated()){res.locals.user= req.user; }
    next();
}

export default passport;