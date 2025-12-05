import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
//import { shopApi } from "../services/shopService"
import {authApi} from "../services/authService"
import userReducer from '../features/user/userSlice'
import {userApi} from "../services/userService"
import {prospectoApi} from "../services/prospectoService"
import prospectoReducer from "../features/prospecto/prospectoSlice"

export const store=configureStore({
    reducer:{
        authReducer,
        userReducer,
        prospectoReducer,
        //[shopApi.reducerPath]:shopApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [prospectoApi.reducerPath]:prospectoApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware).concat(prospectoApi.middleware)
})


export const middlewares=store.middleware;