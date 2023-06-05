import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "../../../utils/axios";

const initialState = {
    tests: [],
    categories: [],
    test: null,
    categoryId: 1,
    name: null,
    myTests: [],
    page: 1,
    totalCount: null,
    limit: 3,
    isLoading: false,
    status: null,

    // Для прохождения теста
    questionIndex: 1,
    question: null,
}

export const getAllCategories = createAsyncThunk('auth/getAllCategories', async () => {
    try {
        const {data} = await axios.get('/category')
        return data
    } catch (err) {
        console.log(err)
    }
},)

export const getAllQuestions = createAsyncThunk('auth/getAllQuestions', async (params) => {
    try {
        const {data} = await axios.get('/question', {params: params})
        return data
    } catch (err) {
        console.log(err)
    }
},)

export const getAllTests = createAsyncThunk('auth/getAllTests', async (params) => {
    try {
        const {data} = await axios.get('/test', {params: params})
        return data
    } catch (err) {
        console.log(err)
    }
},)

export const getMyTests = createAsyncThunk('auth/getMyTests', async ({id}) => {
    try {
        const {data} = await axios.get(`/test/my/${id}`)
        return data
    } catch (err) {
        console.log(err)
    }
},)

export const getTest = createAsyncThunk('auth/getTest', async (id) => {
    try {
        const {data} = await axios.get(`/test/${id}`)
        return data
    } catch (err) {
        console.log(err)
    }
},)

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        logout: (state) => {
            state.name = null
            state.img = null
            state.isLoading = false
            state.status = null
        },
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
            state.page = 1
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setQuestionIndex: (state, action) => {
            if ((state.questionIndex !== 1 || action.payload !== -1)
                && (state.questionIndex < state.test?.questions?.length || action.payload === -1)) {
                state.questionIndex += action.payload
            }
        },
    },
    extraReducers: {
        // Get all tests
        [getAllTests.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getAllTests.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.status
            state.tests = action.payload?.rows
            state.totalCount = action.payload?.count
        },
        [getAllTests.rejected]: (state, action) => {
            state.status = action.payload?.message
            state.isLoading = false
        },
        // Get one test
        [getTest.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getTest.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.status
            state.test = action.payload
        },
        [getTest.rejected]: (state, action) => {
            state.status = action.payload?.message
            state.isLoading = false
        },
        // Get my tests
        [getMyTests.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getMyTests.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.status
            state.myTests = action.payload?.myTests
        },
        [getMyTests.rejected]: (state, action) => {
            state.status = action.payload?.message
            state.isLoading = false
        },
        // Get all categories
        [getAllCategories.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getAllCategories.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.status
            state.categories = action.payload
        },
        [getAllCategories.rejected]: (state, action) => {
            state.status = action.payload?.message
            state.isLoading = false
        },
        // Get all questions
        [getAllQuestions.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getAllQuestions.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.status
            state.question = action.payload
        },
        [getAllQuestions.rejected]: (state, action) => {
            state.status = action.payload?.message
            state.isLoading = false
        },
    },
})

export const {setCategoryId, setPage, setQuestionIndex} = testSlice.actions

export default testSlice.reducer