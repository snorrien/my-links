import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

interface UserState {
    isLoggedIn: boolean;
    email: string;
}

const initialState: UserState = {
    isLoggedIn: false,
    email: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.isLoggedIn = true;
            state.email = action.payload;
        }
    }
})
export const { login } = userSlice.actions

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer