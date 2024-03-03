import { Request, Response } from 'express';
import * as authServices from '../services/authServices';

export const authRegister = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const registerData = await authServices.authRegister(data);
        if (!registerData.status) {
            return res.status(registerData.statusCode || 500).json({
                message: registerData.message,
                statusCode: registerData.statusCode,
            });
        }
        return res.status(200).json(registerData.data);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            statusCode: 500,
        });
    }
};

export const authLogin = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const userData = await authServices.authLogin(data);
        if (!userData.status) {
            return res.status(userData.statusCode || 500).json({
                message: userData.message,
                statusCode: userData.statusCode,
            });
        }
        return res.status(200).json(userData.data);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            statusCode: 500,
        });
    }
};

export const authProfile = async (req: any, res: Response) => {
    try {
        const { userId } = req.user;
        const loginData = await authServices.authProfile(userId);
        if (!loginData.status) {
            return res.status(loginData.statusCode || 500).json({
                message: loginData.message,
                statusCode: loginData.statusCode,
            });
        }
        return res.status(200).json(loginData.data);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            statusCode: 500,
        });
    }
};

export const sendCodeByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const emailCerificationCodesData = await authServices.sendCodeByEmail(email);
        if (!emailCerificationCodesData.status) {
            return res.status(emailCerificationCodesData.statusCode || 500).json({
                message: emailCerificationCodesData.message,
                statusCode: emailCerificationCodesData.statusCode,
            });
        }
        return res.status(200).json(emailCerificationCodesData.data);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            statusCode: 500,
        });
    }
};

export const getVerificationInfor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const verificationData = await authServices.getVerificationInfor(id);
        if (!verificationData.status) {
            return res.status(verificationData.statusCode || 500).json({
                message: verificationData.message,
                statusCode: verificationData.statusCode,
            });
        }
        return res.status(200).json(verificationData.data);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            statusCode: 500,
        });
    }
};

export const confirmVerificationCode = async (req: Request, res: Response) => {
    try {
        const { idVerification, code } = req.body;
        const verificationData = await authServices.confirmVerificationCode(idVerification, code);
        if (!verificationData.status) {
            return res.status(verificationData.statusCode || 500).json({
                message: verificationData.message,
                statusCode: verificationData.statusCode,
            });
        }
        return res.status(200).json(verificationData.data);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            statusCode: 500,
        });
    }
};
