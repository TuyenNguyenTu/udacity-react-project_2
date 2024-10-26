import { configureStore } from '@reduxjs/toolkit';
import authedSlice from '../features/authSlice'
import questionSlice from '../features/questionSlice'
import userSlice from '../features/userSlice'
import loadingSlice from '../features/loadingSlice'

export const store = configureStore({
  reducer: {
    auth: authedSlice,
    question: questionSlice,
    user: userSlice,
    loading: loadingSlice
  },
});
