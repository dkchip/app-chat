import {Schema,model,Types} from "mongoose";

const messageSchema = new Schema({
    id : String,
    from : String,
    to : String,
    content : String,
    created_at : Date,
    updated_at: Date
})

export default model("Message",messageSchema)