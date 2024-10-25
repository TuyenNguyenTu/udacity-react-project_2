import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "../../api/_DATA";

export const fetchUsers = createAsyncThunk(
    'user/save',
    async () => {
        const users = await _getUsers();
        return users;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: null
    },
    reducers: {
        getUsers: (state) =>state.users,
        setUsers: (state, action) => ({...state, users: action.payload}),
        addUserQuestion: (state, action) => {
            const {userId, qId} = action.payload;
            let {questions} = state.users[userId]; 
            return {
                ...state,
                users: {
                    ...state.users,
                    [userId]: {
                        ...state.users[userId],
                        // abc: qId,
                        questions: [...questions, qId]
                    }
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = {
                ...state.users,
                ...action.payload
            }
        })
    }
})

export const {getUsers, setUsers, addUserQuestion} = userSlice.actions;
export default userSlice.reducer;