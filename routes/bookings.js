import express from "express";
import passport from "passport";
const router = express.Router();

import {createBooking,closeBooking
}  from "../controller/booking_controller.js";

router.post('/create-booking',passport.checkAuthentication, createBooking);
router.post('/close-booking',passport.checkAuthentication, closeBooking);


export default router;