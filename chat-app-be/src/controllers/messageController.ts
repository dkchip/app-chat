import { Response } from "express"
import { AuthRequest } from "../middleware/authenticate/authJwt";
import * as messageServices from "../services/messageServices"

export const getAllMesssage = async (req:AuthRequest,res:Response) => {
    try {
        const userId1 = req.user?.userId;
        const userId2 = req.params.userId;
        if(!userId1){
            return res.status(403).json({
                message : "bad user",
                statusCode : 403
            })
        }
        const messageData = await messageServices.getAllMesssage(userId1,userId2)
        if(!messageData.status){
            return res.status(messageData.statusCode || 500).json({
                message : messageData.message,
                statusCode : messageData.statusCode
            })
        }

        return res.status(200).json(messageData.data)

    } catch (error:any) {
        return res.status(500).json({
            message : error.message,
            statusCode : 500
        })
    }
} 

export const sendMessageToUser = async (req:AuthRequest,res:Response) => {
    try {
        const userId1 = req.user?.userId;
        const userId2 = req.params.userId;
        const content = req.body.content

        if(!userId1){
            return res.status(403).json({
                message : "bad user",
                statusCode : 403
            })
        }
        const messageData = await messageServices.sendMessageToUser(userId1,userId2,content)
        if(!messageData.status){
            return res.status(messageData.statusCode || 500).json({
                message : messageData.message,
                statusCode : messageData.statusCode
            })
        }

        return res.status(200).json(messageData.data)

    } catch (error:any) {
        return res.status(500).json({
            message : error.message,
            statusCode : 500
        })
    }
}