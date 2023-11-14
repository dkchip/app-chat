import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface Message {
    id : string,
    _id : string,
    from : string,
    to : string,
    _v?:number,
    content : string,
    created_at : Date,
    updated_at?: Date
}

interface MessageState {
    currentUser : string ,
    currentRoom : string ,
    messageData : Message[]
}

const messageSlice  = createSlice({
    name : "message",
    initialState : {
        currentUser : "",
        currentRoom : "",
        messageData : []
    } as MessageState,
    reducers : {
        setMessage : (state,action) => {
            return {
                ...state,
                currentUser : action.payload.currentUser,
                currentRoom : action.payload.currentRoom,
                messageData : [...action.payload.messageData]
            }
        },
        updateMessage : (state,action) => {
            let newMessage = [...state.messageData,action.payload];
            return {
                ...state,
                messageData : newMessage
            }
        }
    }
})

export const {setMessage,updateMessage} = messageSlice.actions;
export default messageSlice.reducer;