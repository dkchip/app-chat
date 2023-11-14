import httpRequest from "../../utils/httpRequest/httpRequest";

export const getAllUser = async () => {
    try {
        const res = await httpRequest.get("/users/all")
        return res;
    } catch (error) {
        return Promise.reject(error)
    }
}