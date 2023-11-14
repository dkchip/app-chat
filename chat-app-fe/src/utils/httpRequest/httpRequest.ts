import axios from "axios";
import Cookie from "js-cookie";

const httpRequest = axios.create({
    baseURL : 'http://localhost:8080/api',
    withCredentials : true
})

httpRequest.interceptors.request.use(
    (config) => {
        const token = Cookie.get("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default httpRequest