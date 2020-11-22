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
