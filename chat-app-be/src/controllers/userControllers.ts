import { Request,Response} from "express";
import * as userServices from "../services/userServices";


export const userRegister =  async (req:Request,res:Response) => {
    try {
        const data = req.body;
        const registerData = await userServices.userRegister(data)
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

export const userLogin =  async (req:Request,res:Response) => {
    try {
        const data = req.body;

        const userData = await userServices.userLogin(data)
        if(!userData.status){
            return res.status(userData.statusCode || 500).json({
                message : userData.message,
                statusCode : userData.statusCode
            })
        }
        return res.status(200).json(userData.data)
    } catch (error:any) {
        return res.status(500).json({
            message : error.message,
            statusCode : 500
        })
    }
}

export const userProfile = async (req:any,res:Response) => {
    try {
        const {userId} = req.user;
        const loginData = await userServices.userProfile(userId)
        if(!loginData.status){
            return res.status(loginData.statusCode || 500).json({
                message : loginData.message,
                statusCode : loginData.statusCode
            })
        }
        return res.status(200).json(loginData.data)
    } catch (error:any) {
        return res.status(500).json({
            message : error.message,
            statusCode : 500
        })
    }
}

