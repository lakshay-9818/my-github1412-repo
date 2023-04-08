import express from "express";
import passport from "passport";
const router = express.Router();

import {write,
    blogVew,
    deleteP
}  from "../controller/blog_controller.js";

router.post('/write',passport.checkAuthentication, write);
router.get('/blogPage', blogVew);
router.get('/deletePost',passport.checkAuthentication, deleteP);
export default router;