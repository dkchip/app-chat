import httpRequest from "../../utils/httpRequest/httpRequest";

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


export const userLogin = async (formLogin:FormLogin) => {
    try {
        const res = await httpRequest.post("/auth/login",formLogin);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const userRegister = async (formRegister:FormRegister) => {
    try {
        const res = await httpRequest.post("/auth/register",formRegister);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const userProfile = async () => {
    try {
        const res = await httpRequest.get("/auth/profile");
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}