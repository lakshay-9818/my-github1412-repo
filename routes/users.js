const express = require('express');
const router = express.Router();

const usersController = require('../controller/user_controller');

router.get('/profile', usersController.profile);

//render sign up login page
router.get('/sign_up', usersController.signU);
router.get('/sign_in', usersController.signI);

//add a new user entry to db
router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);



module.exports = router;