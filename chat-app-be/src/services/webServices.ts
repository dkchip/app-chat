import User from "../models/user";

export const getAllUsers = async (userId:string|undefined) => {
    try {
        const usersData = await User.find({
            id : {$ne : userId}
        });
        if(!usersData){
            return {
                status : false,
                message : "Đã xảy ra lỗi vui lòng thử lại !",
                statusCode : 500
            }
        }
      
        return {
            status : true,
            data : {
                data : usersData
            }
            }
    } catch (error) {
        return Promise.reject(error)
    }
}
