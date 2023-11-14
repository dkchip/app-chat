import express from 'express';

import * as messageController from "../controllers/messageController" 
import authJWT from '../middleware/authenticate/authJwt';

const router = express.Router({mergeParams : true});

router.get("/get-messages/:userId",authJWT,messageController.getAllMesssage)
router.post("/send-messages/:userId",authJWT,messageController.sendMessageToUser)

export default router;