import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/chat-app",{
            useNewUrlParser: true,
            useUnifiedTopology : true
        } as ConnectOptions)
        console.log("Connected to MongoDB server successfully")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB