import { Response} from "express";
import { AuthRequest } from "../middleware/authenticate/authJwt";

import * as webServices from "../services/webServices";


export const getAllUsers =  async (req:AuthRequest,res:Response) => {
    try {
        const userId = req.user?.userId;
        const registerData = await webServices.getAllUsers(userId)
        if(!registerData.status){
            return res.status(registerData.statusCode || 500).json({
                message : registerData.message,
                statusCode : registerData.statusCode
            })
        }
        return res.status(200).json(registerData.data)
    } catch (error:any) {
        return res.status(500).json({
            message : error.message,
            statusCode : 500
        })
    }
}

