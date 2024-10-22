import { combineReducers } from "@reduxjs/toolkit";
import authenticateReducer from "./authenticateReducer";
import questionReducer from "./questionsReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
  auth: authenticateReducer,
  questions: questionReducer,
  users: usersReducer,
});

export default rootReducer;
