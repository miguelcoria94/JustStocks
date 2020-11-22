import { fetch } from "./csrf";

const apikey = `3X02Y44FZUJOPFF9`;

const LOOKUP_STOCK = "LOOKUP_STOCK"

const lookupStock = (symbol) => {
  return {
    type: LOOKUP_STOCK,
    payload: symbol,
  };
};

export const getStock = ({ symbol }) => async (dispatch) => {
  const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apikey}`);


  dispatch(lookupStock(response.data.bestMatches));
  console.log(response)
  return {
    type: LOOKUP_STOCK,
    payload: response.data.bestMatches,
  };
};

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case LOOKUP_STOCK:
      return { ...state, symbol: action.payload };
    default:
      return state;
  }
}

export default profileReducer;



