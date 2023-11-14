import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import messageSlice from "./slices/messageSlice"

const store = configureStore({
    reducer : {
        user : userSlice,
        message : messageSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store;