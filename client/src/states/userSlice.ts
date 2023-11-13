import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

export interface UserState {
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
        userAuthenticated: (state, action: PayloadAction<string>) => {
            state.isLoggedIn = true;
            state.email = action.payload;
        },
        invalidCredentials: (state) => {
            state.isLoggedIn = false;
            state.email = '';
        }
    }
})
export const { userAuthenticated, invalidCredentials } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
