import express from "express";
const router = express.Router();
import passport from "passport";


import {
    profile,
    update,
    create,
    createSession,
    destroySession,
    remFav,
    addFav
  } from "../controller/user_controller.js";

router.get('/profile',passport.checkAuthentication, profile);



//add a new user entry to db
router.post('/create', create);
router.post('/create-session', 
    passport.authenticate('local',{failureRedirect:'/sign_in'}),
    createSession);

router.get('/logout',destroySession);

router.post('/update',passport.checkAuthentication,update);
router.get('/addToFav',passport.checkAuthentication,addFav);
router.get('/removeFav',passport.checkAuthentication,remFav);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/sign-in'}),createSession);

export default router;