import express from "express";
const router = express.Router();
import passport from "passport";

import { index, destroy } from "../../../controller/api/v1/post_api.js";
router.get('/',index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),destroy);

export default router;