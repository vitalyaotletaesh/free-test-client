import {configureStore} from '@reduxjs/toolkit'
import authSlice from "./features/auth/authSlice"
import testSlice from "./features/auth/testSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        test: testSlice,
    },
})