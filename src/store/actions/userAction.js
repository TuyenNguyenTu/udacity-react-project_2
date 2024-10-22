export const SET_USERS = "user/SET_USERS";

export function setUsers(payload) {
  return {
    type: SET_USERS,
    payload,
  };
}