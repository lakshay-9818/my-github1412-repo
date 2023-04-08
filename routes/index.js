import express from "express";
const router = express.Router();
import userRouter from "./users.js";
import blogsRouter from "./blogs.js";
import api from "./api/index.js";


import {home,signI,
    signU,newVpage,
    vendorReqq,
    createVendor,deleteV} from "../controller/home_controller.js";
console.log('router loaded'); 

router.get('/',home);
router.get('/newRegistrationPage',newVpage);
router.get('/search-reqq',vendorReqq);
router.post('/create-contact',createVendor);
router.get('/delete-vendor',deleteV);
//render sign up login page
router.get('/sign_up', signU);
router.get('/sign_in', signI);


router.use("/users", userRouter);
router.use("/blogs", blogsRouter);
router.use("/api", api);

export default router;