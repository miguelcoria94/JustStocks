import fetch from "./csrf"

const LOGIN_USER = "LOGIN_USER";
const SET_SESSION = "SET_SESSION";
const END_SESSION = "END_SESSION";

const setSession = (user) => {
    return {
        type: SET_SESSION,
        payload: user,
    }
}

const endSession = (user) => {
    return {
        type: END_SESSION,
    }
};

export const loginUser = ({ credential, password }) => async (dispatch) => {
  try {
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
  } catch (err) {
      console.error(err)
  }
};

const sessionReducer = (state = {}, action) => {

}

export default sessionReducer;