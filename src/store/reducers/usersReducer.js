import { SET_USERS } from "../actions/userAction";

const initialState = null;

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USERS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default usersReducer;
