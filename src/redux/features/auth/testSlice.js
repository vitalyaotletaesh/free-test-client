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
    questionIndex: null,
    question: null,
    annotation: null,
    // Статистика
    statistics: [],
    statisticsFromDB: null,
}

export const getStatistics = createAsyncThunk('auth/getStatistics', async (params) => {
    try {
        const {data} = await axios.get('/statistic', {params: params})
        return data
    } catch (err) {
        console.log(err)
    }
},)

export const getAnnotation = createAsyncThunk('auth/getAnnotation', async (params) => {
    try {
        const {data} = await axios.get('/annotation', {params: params})
        return data
    } catch (err) {
        console.log(err)
    }
},)

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
        const {data} = await axios.get('/question/getAll', {params: params})
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
        setQuestionIndexNull: (state) => {
            state.questionIndex = null
        },
        setQuestionIndex: (state, action) => {
            if ((state.questionIndex !== 1 || action.payload !== -1)
                && (state.questionIndex < state.test?.questions?.length || action.payload === -1)) {
                state.questionIndex += action.payload
            }
        },
        setQuestionStatistics: (state, action) => {
            state.statistics.push(action.payload)
        },
        clearStatistics: (state) => {
            state.statistics = []
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
        // Get Annotation
        [getAnnotation.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getAnnotation.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.status
            state.annotation = action?.payload[0]
        },
        [getAnnotation.rejected]: (state, action) => {
            state.status = action.payload?.message
            state.isLoading = false
        },
        // Get Statistics
        [getStatistics.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getStatistics.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.status
            state.statisticsFromDB = action?.payload[0]
        },
        [getStatistics.rejected]: (state, action) => {
            state.status = action.payload?.message
            state.isLoading = false
        },
    },
})

export const {
    setCategoryId,
    setPage,
    setQuestionIndex,
    setQuestionIndexNull,
    setQuestionStatistics,
    clearStatistics
} = testSlice.actions

export default testSlice.reducer