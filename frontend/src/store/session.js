import { fetch } from "./csrf";

const LOGIN_USER = "LOGIN_USER";
const SET_SESSION = "SET_SESSION";
const END_SESSION = "END_SESSION";


const setSession = (user) => {
  return {
    type: SET_SESSION,
    payload: user,
  };
};

const endSession = () => {
  return {
    type: END_SESSION,
  };
};

export const login = ({ credential, password }) => async (dispatch) => {
  const res = await fetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });

  const { user } = res.data;

  dispatch(setSession(user));

  return {
    type: LOGIN_USER,
    payload: user,
  };
};

export const restoreUser = () => async (dispatch) => {
  const res = await fetch("/api/session");
  dispatch(setSession(res.data.user));
  return res;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  dispatch(setSession(response.data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/session", {
    method: "DELETE",
  });
  dispatch(endSession());
  return response;
};

const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SESSION:
      return { ...state, user: action.payload };
    case END_SESSION:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
