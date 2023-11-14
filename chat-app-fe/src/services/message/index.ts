import httpRequest from "../../utils/httpRequest/httpRequest";
import { AxiosResponse } from "axios";

export const getMessage = async (userId:string):Promise<AxiosResponse<any>> => {
    try {
        const res = await httpRequest.get(`/messages/get-messages/${userId}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const sendMessage = async (userId:string,content:string|number):Promise<AxiosResponse<any>> => {
    try {
        const res = await httpRequest.post(`/messages/send-messages/${userId}`,{
            content
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}