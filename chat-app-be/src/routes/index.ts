import express from 'express';

import webRouter from "./web"
import messageRouter from './message';
import userRouter from "./user"

const router = express.Router();

router.use("/api",webRouter)
router.use("/api/messages",messageRouter)
router.use("/api/auth",userRouter)

export default router

