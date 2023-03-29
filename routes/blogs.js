const express= require('express');
const passport = require('passport');
const router = express.Router();

const blogController = require('../controller/blog_controller');

router.post('/write',passport.checkAuthentication, blogController.write);
router.get('/blogPage', blogController.blogVew);
router.get('/deletePost',passport.checkAuthentication, blogController.deleteP);
module.exports= router;