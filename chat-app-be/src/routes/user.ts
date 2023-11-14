import express from 'express';

import * as userControllers from "../controllers/userControllers"
import authJWT from '../middleware/authenticate/authJwt';

const router = express.Router({mergeParams : true});

router.post("/register",userControllers.userRegister)
router.post("/login",userControllers.userLogin)
router.get("/profile",authJWT,userControllers.userProfile)

export default router;