const express= require('express');
const router = express.Router();

const homeController = require('../controller/home_controller');
console.log('router loaded'); 

router.get('/', homeController.home);
router.get('/newRegistrationPage',homeController.newVpage);
router.post('/create-contact',homeController.createVendor);
router.get('/delete-vendor',homeController.deleteV);
router.get('/sign_in',homeController.signin);


router.use('/users', require('./users'));

module.exports= router;
