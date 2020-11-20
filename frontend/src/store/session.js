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

const sessionReducer = (state = {}, action) => {

}