export const SET_AUTH_USER = "auth/SET_AUTH_USER"

export const LOGOUT = "auth/LOGOUT"

export function setAuthenUser(payload) {
    return {
        type: SET_AUTH_USER,
        payload,
    }
}

export function logout() {
    return {
        type: LOGOUT,

    }
}