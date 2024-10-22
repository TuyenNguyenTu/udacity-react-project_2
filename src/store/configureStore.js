import logger from "redux-logger";
import rootReducer from "./reducers";
import {  configureStore } from "@reduxjs/toolkit";


let store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger)
});

export default store; 
