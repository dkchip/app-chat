import User from "../models/user";
import { SaveOptions } from "mongoose";
import {v4 as uuidV4} from "uuid"

import generateToken from "../utils/jwt/generateToken";

interface User {
    id : String,
    email : String,
    password : String,
    first_name : String,
    last_name : String,
    image : String,
}

export const userRegister = async (data:User) => {
    try {
        const checkEmail = await User.findOne({
            email : data.email
        })

        if(checkEmail){
            return {
                status : false,
                message : "Email already exits",
                statusCode : 400
            }
        }

        const userData =  new User({
            id : uuidV4(),
            email : data.email,
            password : data.password,
            first_name : data.first_name,
            last_name : data.last_name,
            full_name : data.first_name + " " + data.last_name,
            image : data.image ?data.image : null ,
            created_at : new Date(),
            updated_at : new Date(),
        })

        const error =  await userData.save()

        if(!error){
            return {
                status : false,
                message : "Error saving",
                statusCode : 500
            }
        }
           
        return {
            status : true,
            data : userData
            }
    } catch (error) {
        return Promise.reject(error)
    }
}

export const userLogin = async (data:User) => {
    try {
        const userData = await User.findOne({
            email : data.email,
            password : data.password
        })

        if(!userData){
            return {
                status : false,
                message : "Wrong email or password",
                statusCode : 401
            }
        }
        const payload = {
            uuid : uuidV4(),
            userId : userData.id
        }
        const accessToken = generateToken(payload)
       
        return {
            status : true,
            data : {
                data : userData,
                accessToken : accessToken
            }
            }
    } catch (error) {
        return Promise.reject(error)
    }
}

export const userProfile = async (userId:string|number) => {
    try {
        const userData = await User.findOne({
            id : userId,
        },{password : 0})

        if(!userData){
            return {
                status : false,
                message : "Wrong email or password",
                statusCode : 401
            }
        }
       
        return {
            status : true,
            data : userData
            }
    } catch (error) {
        return Promise.reject(error)
    }
}
