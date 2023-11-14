import { Schema,model } from "mongoose";

const userSchema = new Schema({
    id : String,
    email : String,
    password : String,
    first_name : String,
    last_name : String,
    full_name : String,
    image : String ,
    created_at : String,
    updated_at : String
})

export default model("User",userSchema)