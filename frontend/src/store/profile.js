import { fetch } from "./csrf";

const GET_STOCK= "GET_STOCK";

const getStock = (stock) => {
  return {
    type: GET_STOCK,
    payload: stock,
  };
};

export const addStock = ({ stockSymbol }) => async (dispatch) => {
  const res = await fetch("/api/profile/addStock", {
    method: "POST",
    body: JSON.stringify({ stockSymbol }),
  });

  const { stock } = res.data;

  dispatch(getStock(stock));

  return {
    type: GET_STOCK,
    payload: stock,
  };
};

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_STOCK:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
