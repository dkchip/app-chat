import User from '../models/user';
import { SaveOptions } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

import generateToken from '../utils/jwt/generateToken';
import EmailCerificationCodes from '../models/emailCerificationCodes';
import sendEmail from '../utils/email/sendEmail';
import hideEmail from '../utils/email/hideEmail';
import hashPassword from '../utils/password/hashPassword';
import comparePassword from '../utils/password/comparePassword';
import generateRefreshToken from '../utils/jwt/generateRefreshToken';
import { UploadedFile, User as UserType } from '../types';
import handleUploadImage from '../utils/cloudinary/uploadImage';

export const authRegister = async (data: UserType) => {
    try {
        const checkEmail = await User.findOne({
            email: data.email,
        });

        if (checkEmail) {
            return {
                status: false,
                message: 'Email already exits',
                statusCode: 400,
            };
        }

        const encryptionPassword = hashPassword(data.password);
        const username = data.email.split('@')[0];
        const userData = new User({
            id: uuidV4(),
            email: data.email,
            password: encryptionPassword,
            first_name: data.first_name,
            last_name: data.last_name,
            full_name: data.first_name + ' ' + data.last_name,
            username: username,
            image: data.avatar ? data.avatar : null,
            background_image: null,
            last_username_change: null,
            created_at: new Date(),
            updated_at: new Date(),
        });

        const error = await userData.save();

        if (!error) {
            return {
                status: false,
                message: 'Error saving',
                statusCode: 500,
            };
        }

        return {
            status: true,
            data: {
                ...userData,
                password: data.password,
            },
        };
    } catch (error) {
        return Promise.reject(error);
    }
};

export const authLogin = async (data: UserType) => {
    try {
        const userData: UserType | null = await User.findOne({
            email: data.email,
        });

        if (!userData) {
            return {
                status: false,
                message: 'Wrong username',
                statusCode: 401,
            };
        }

        const decryptedPassword = comparePassword(data.password, userData.password);
        if (!decryptedPassword) {
            return {
                status: false,
                message: 'Wrong password',
                statusCode: 401,
            };
        }

        const payload = {
            uuid: uuidV4(),
            userId: userData.id,
        };
        const accessToken = generateToken(payload);
        const refreshToken = generateRefreshToken(payload);
        return {
            status: true,
            data: {
                data: userData,
                accessToken,
                refreshToken,
            },
        };
    } catch (error) {
        return Promise.reject(error);
    }
};

export const authProfile = async (userId: string | number) => {
    try {
        const userData = await User.findOne(
            {
                id: userId,
            },
            { password: 0 },
        );

        if (!userData) {
            return {
                status: false,
                message: 'Wrong email or password',
                statusCode: 401,
            };
        }

        return {
            status: true,
            data: userData,
        };
    } catch (error) {
        return Promise.reject(error);
    }
};

interface ImageFiles {
    avatar : UploadedFile[],
    background_image : UploadedFile[]
}

export const updateProfile = async (userId: string, profileData: UserType, imageFiles: ImageFiles | null = null) => {
    try {
        const oldProfile = await User.findOne({
            id: userId,
        });
        if (!oldProfile)
            return {
                status: false,
                message: 'User not found',
                statusCode: 404,
            };

        if (imageFiles) {
            const cldRes = await handleUploadImage(imageFiles.avatar[0]);
            if (profileData.username == oldProfile.username) {
                const { acknowledged } = await User.updateOne(
                    {
                        id: userId,
                    },
                    {
                        first_name: profileData.first_name,
                        last_name: profileData.last_name,
                        full_name: profileData.first_name + ' ' + profileData.last_name,
                    },
                );
            }
            return {
                status: true,
            };
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

// Excute when user reset(forgot password) password by email
// This function will send the authentication code to the user's email
export const sendCodeByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return {
                status: false,
                message: 'User not found',
                statusCode: 404,
            };
        }
        const oldCode = await EmailCerificationCodes.findOne({ email: email });
        if (oldCode) await EmailCerificationCodes.deleteOne({ email: email });
        let newCode = Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, '0');
        const emailCerificationCodesData = await EmailCerificationCodes.create({
            email: email,
            code: newCode,
            created_at: new Date(),
            expires_at: new Date(new Date().getTime() + 5 * 60000), // expires in 5 minutes
        });

        await sendEmail(email, 'Mã xác thực', 'Mã xác thực của bạn là: ' + newCode);

        return {
            status: true,
            data: {
                _id: emailCerificationCodesData._id,
                message: 'Send code successfully',
            },
        };
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

export const getVerificationInfor = async (idVerification: string) => {
    try {
        const verificationData = await EmailCerificationCodes.findOne({ _id: idVerification }).select(
            '_id email created_at expires_at',
        );
        if (!verificationData) {
            return {
                status: false,
                message: 'Not found verification',
                statusCode: 404,
            };
        }

        if (verificationData.expires_at && new Date() > verificationData.expires_at) {
            return {
                status: false,
                message: 'Verification expire',
                statusCode: 401,
            };
        }
        verificationData.email = verificationData.email && hideEmail(verificationData.email);
        return {
            status: true,
            data: verificationData,
        };
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

export const confirmVerificationCode = async (idVerification: string, code: number) => {
    try {
        const verificationData = await EmailCerificationCodes.findById(idVerification);
        if (!verificationData) {
            return {
                status: false,
                message: 'Not found verification',
                statusCode: 404,
            };
        }

        if (verificationData.code !== code) {
            return {
                status: false,
                message: 'The verification code provided is incorrect. Please try again',
                statusCode: 400,
            };
        }

        const newPassword = Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, '0');

        const verifyPassword = hashPassword(newPassword);
        await User.updateOne(
            {
                email: verificationData.email,
            },
            {
                password: verifyPassword,
            },
        );

        if (verificationData.email) {
            sendEmail(verificationData.email, 'New password', 'Password had changed, new password : ' + newPassword);
        }

        return {
            status: true,
            data: {
                message: 'Password changed',
            },
        };
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};
