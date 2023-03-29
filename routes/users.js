const express = require('express');
const router = express.Router();
const passport = require('passport');


const usersController = require('../controller/user_controller');

router.get('/profile',passport.checkAuthentication, usersController.profile);



//add a new user entry to db
router.post('/create', usersController.create);
router.post('/create-session', 
    passport.authenticate('local',{failureRedirect:'/sign_in'}),
    usersController.createSession);

router.get('/logout',usersController.destroySession);

router.post('/update',passport.checkAuthentication,usersController.update);
router.get('/addToFav',passport.checkAuthentication,usersController.addFav);
router.get('/removeFav',passport.checkAuthentication,usersController.remFav);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/sign-in'}),usersController.createSession);

module.exports = router;