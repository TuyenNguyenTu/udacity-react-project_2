import {  SET_QUESTIONS } from "../actions/questionsAction";

const initialState =  null;

const questionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_QUESTIONS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default questionReducer;
