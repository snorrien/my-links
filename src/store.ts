import userReducer from './states/userSlice'
import { applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    enhancers: [composedEnhancer]
})

export default store

export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch


