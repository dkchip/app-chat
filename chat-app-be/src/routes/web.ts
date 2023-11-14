import express from 'express';
import * as webControllers from '../controllers/webControllers';

import authJWT from '../middleware/authenticate/authJwt';

const router = express.Router({mergeParams : true});

router.get("/",(req,res) => {
    res.send("Welcome")
})

router.get("/users/all",authJWT,webControllers.getAllUsers)

export default router;