import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "../../../utils/axios";

const initialState = {
    user: null,
    role: null,
    token: null,
    isLoading: false,
    status: null,
}

export const registerUser = createAsyncThunk('auth/registerUser', async ({email, username, password}) => {
    try {
        const {data} = await axios.post('/auth/register', {
            email,
            username,
            password,
        })
        if (data.token) {
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (err) {
        alert(err.response.data.message)
        console.log(err)
    }
},)

export const loginUser = createAsyncThunk('auth/loginUser', async ({email, password}) => {
    try {
        const {data} = await axios.post('/auth/login', {
            email,
            password,
        })
        if (data.token) {
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (err) {
        alert(err.response.data.message)
        console.log(err)
    }
},)

export const updateUsername = createAsyncThunk('auth/updateUsername', async ({username}) => {
    try {
        const {data} = await axios.patch('/auth/update/username', {
            username,
        })
        return data
    } catch (err) {
        alert(err.response.data.message)
        console.log(err)
    }
},)

export const updateEmail = createAsyncThunk('auth/updateEmail', async ({email}) => {
    try {
        const {data} = await axios.patch('/auth/update/email', {
            email,
        })
        return data
    } catch (err) {
        alert(err.response.data.message)
        console.log(err)
    }
},)

export const getMe = createAsyncThunk('auth/getMe', async () => {
    try {
        const {data} = await axios.get('/auth/getMe')
        return data
    } catch (err) {
        console.log(err)
    }
},)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
            state.role = null
        }
    },
    extraReducers: {
        // Register user
        [registerUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
            state.user = action.payload?.user
            state.token = action.payload?.token
        },
        [registerUser.rejected]: (state, action) => {
            state.status = action.payload?.message
            state.isLoading = false
        },
        // Login user
        [loginUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
            state.token = action.payload?.token
            state.role = action.payload?.user?.role
            state.user = action.payload?.user
        },
        [loginUser.rejected]: (state, action) => {
            state.status = action.payload?.message
            state.isLoading = false
        },
        // Проверка авторизации
        [getMe.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
            state.token = action.payload?.token
            state.role = action.payload?.role
            state.user = action.payload?.user
        },
        [getMe.rejected]: (state, action) => {
            state.status = action.payload?.message
            state.isLoading = false
        },
        // Смена username
        [updateUsername.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [updateUsername.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
            state.user = action.payload?.user
        },
        [updateUsername.rejected]: (state, action) => {
            state.status = action.payload?.message
            state.isLoading = false
        },
        // Смена email
        [updateEmail.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [updateEmail.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
            state.user = action.payload?.user
        },
        [updateEmail.rejected]: (state, action) => {
            state.status = action.payload?.message
            state.isLoading = false
        },
    },
})

export const checkIsAuth = (state) => Boolean(state.auth.token)

export const {logout} = authSlice.actions

export default authSlice.reducer