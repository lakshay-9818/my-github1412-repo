const express= require('express');
const router = express.Router();

const homeController = require('../controller/home_controller');
console.log('router loaded'); 

router.get('/', homeController.home);

// router.get('/',passport.checkAuthentication, homeController.home);

router.get('/newRegistrationPage',homeController.newVpage);

router.get('/search-reqq',homeController.vendorReqq);
router.post('/create-contact',homeController.createVendor);
router.get('/delete-vendor',homeController.deleteV);
router.get('/sign_in',homeController.signin);


router.use('/users', require('./users'));
router.use('/api', require('./api'));
router.use('/blogs', require('./blogs'));
module.exports= router;
