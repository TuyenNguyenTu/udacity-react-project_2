import { configureStore } from '@reduxjs/toolkit';
import authedSlice from '../features/auth/authSlice'
import questionSlice from '../features/question/questionSlice'
import userSlice from '../features/user/userSlice'
import loadingSlice from '../features/loading/loadingSlice'

export const store = configureStore({
  reducer: {
    auth: authedSlice,
    question: questionSlice,
    user: userSlice,
    loading: loadingSlice
  },
});
