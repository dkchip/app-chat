import Message from "../models/message";
import { v4 } from "uuid";

export const getAllMesssage = async (userId1:string,userId2:string) => {
    try {
        const messageSendData = await Message.find({
            from : userId1,
            to : userId2
        })
        const messageReviceData = await Message.find({
            from : userId2,
            to : userId1
        })
        if(!messageSendData || !messageReviceData){
            return {
                status : false ,
                message : "Not found",
                statusCode : 404
            }
        }

        const messageSorted = messageSendData.concat(messageReviceData).sort((a:any,b:any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

        return {
            status : true,
            data : messageSorted
        }
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
} 

export const sendMessageToUser = async (userId1:string,userId2:string,content:string) => {
    try {
        const messageData = await Message.create({
            id : v4(),
            from : userId1,
            to : userId2,
            content : content,
            created_at : new Date(),
        })

        if(!messageData){
            return {
                status : false ,
                message : "Something went wrong, please try again",
                statusCode : 500
            }
        }

        return {
            status : true,
            data : messageData
        }
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
} 