// const express = require('express');

// const router = express.Router();
// const homeController = require('../controllers/home_controller');

// console.log('router loaded');


const express= require('express');
const router = express.Router();

const homeController = require('../controller/home_controller');
console.log('router loaded'); 

router.get('/', homeController.home);
router.get('/newRegistrationPage',homeController.newVpage);
router.post('/create-contact',homeController.createVendor);
router.get('/delete-vendor',homeController.deleteV);
// router.get('/signInUp',homeController.tackle);
router.get('/sign_in',homeController.signin);
//router.get('/sign_up',homeController.signup);

router.use('/users', require('./users'));

module.exports= router;
