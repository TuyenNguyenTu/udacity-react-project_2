import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "../../api/_DATA";
export const login = createAsyncThunk(
    'auth/login',
    async (request) => {
        const {id, password} = request;
        console.log(id, password);
        const users = await _getUsers();
        console.log(users);
        const user = users[id];
        console.log(user)
        if(user && user.password === password) return user;
        return null;
    }
)
const authSlice = createSlice({
    name: "auth",
    initialState: {
        authedId: "abc",
        authedUser: null
    },
    reducers: {
        getAuthedId: (state) => state.authedId,
        setAuthedUser: (state, action) => {
            const {user} = action.payload || {};
            return {
                ...state,
                authedId: user ?  user.id : null,
                authedUser: user
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            console.log(action);
            if(action.payload === null) return;
            state.authedId = action.payload.id;
            state.authedUser = action.payload
            console.log('dispatch ok done', state);
        })
    }
})

export const {getAuthedId, setAuthedUser} = authSlice.actions;
export default authSlice.reducer;