import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

export interface User {
    _id: string;
    id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    full_name: string;
    username: string;
    avatar: string;
    background_image: string;
    created_at: string;
    updated_at: string;
    __v: any;
}

export interface UserState {
    isLogind: boolean;
    data: {
        [key: string]: any;
    };
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogind: false,
        data: {},
    } as UserState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<UserState>) => {
            return {
                ...state,
                isLogind: action.payload.isLogind,
                data: { ...action.payload.data },
            };
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
