import { AxiosResponse } from 'axios';
import httpRequest from '../../utils/httpRequest/httpRequest';

interface FormLogin {
    email: string;
    password: string;
}

interface FormRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export const authLogin = async (formLogin: FormLogin): Promise<AxiosResponse> => {
    try {
        const res = await httpRequest.post('/auth/login', formLogin);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const authRegister = async (formRegister: FormRegister): Promise<AxiosResponse> => {
    try {
        const res = await httpRequest.post('/auth/register', formRegister);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const authProfile = async () => {
    try {
        const res = await httpRequest.get('/auth/profile');
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getCodeByEmail = async (email: string): Promise<AxiosResponse> => {
    try {
        const res = await httpRequest.post('/auth/send-code-email', {
            email: email,
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getVerificationInfor = async (id: string): Promise<AxiosResponse> => {
    try {
        const res = await httpRequest.get(`/auth/verification-info/${id}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const verificationCode = async (idVerification: string, code: number): Promise<AxiosResponse> => {
    try {
        const res = await httpRequest.post(`/auth/confirm-verification-code`, {
            idVerification,
            code,
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
