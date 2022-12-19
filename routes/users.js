const express = require('express');
const router = express.Router();
const passport = require('passport');


const usersController = require('../controller/user_controller');

router.get('/profile',passport.checkAuthentication, usersController.profile);

//render sign up login page
router.get('/sign_up', usersController.signU);
router.get('/sign_in', usersController.signI);

//add a new user entry to db
router.post('/create', usersController.create);
router.post('/create-session', 
    passport.authenticate('local',{failureRedirect:'/users/sign_in'}),
    usersController.createSession);

router.get('/logout',usersController.destroySession);


router.get('/addToFav',usersController.addFav);


module.exports = router;