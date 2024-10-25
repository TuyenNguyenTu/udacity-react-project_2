import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../../api/_DATA";
export const saveQuestion = createAsyncThunk(
    'question/save',
    async (question) => {
        const q = await _saveQuestion(question);
        if(q && q.id) return q;
        return null;
    }
)

export const fetchQuestions = createAsyncThunk(
    'question/fetchQuestions',
    async () => {
        const q = await _getQuestions();
        return q;
    }
)

export const saveQuestionAnswer = createAsyncThunk(
    'question/saveAnswer',
    async (answer) => {
        const a = await _saveQuestionAnswer(answer);
        return a;
    }
)
const questionSlice = createSlice({
    name: 'question',
    initialState: {
        questions: []
    },
    reducers: {
        getQuestions: (state) => state.questions,
        setQuestions: (state, action) => ({...state, questions: action.payload})
    },
    extraReducers: (builder) => {
        builder.addCase(saveQuestion.fulfilled, (state, action) => {
            if(!action.payload) return;
            state.questions = {
                ...state.questions,
                [action.payload.id]: action.payload
            }
        });

        builder.addCase(saveQuestionAnswer.fulfilled, (state, action) => {
            if(!action.payload) return;

        });
        builder.addCase(fetchQuestions.fulfilled, (state, action) => {
            state.questions = {
                ...state.questions,
                ...action.payload
            }
        })
    }
})

export const {getQuestions, setQuestions } = questionSlice.actions;
export default questionSlice.reducer;