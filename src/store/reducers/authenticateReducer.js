import { SET_AUTH_USER, LOGOUT } from "../actions/authenticationAction"

const initialState = {}

const authenticateReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_AUTH_USER:
            return { ...state, user: payload }
        case LOGOUT:
            return { ...state, user: null }
        default:
            return state
    }
}

export default authenticateReducer