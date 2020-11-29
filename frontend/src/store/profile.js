import { fetch } from "./csrf";

const LOOKUP_STOCK = "LOOKUP_STOCK";
const CURRENT_STOCK = "CURRENT_STOCK";
const CURRENT_STOCKCHART = "CURRENT_STOCKCHART";
const SET_WATCHLIST = "SET_WATCHLIST";
const FIRST_STOCK = "FIRST_STOCK";


const lookupStock = (symbol) => {
  return {
    type: LOOKUP_STOCK,
    payload: symbol,
  };
};

const currentStock = (stock) => {
  return {
    type: CURRENT_STOCK,
    payload: stock,
  };
};

const currentStockGraph = (graph) => {
  return {
    type: CURRENT_STOCKCHART,
    payload: graph,
  };
};

const setWatchlist = (list) => {
  return {
    type: SET_WATCHLIST,
    payload: list,
  };
}

const setFirstStock = (data) => {
  return {
    type: FIRST_STOCK,
    payload: data,
  }
}

export const mainStock = ({ stock }) => async (dispatch) => {

  const res = await fetch("/api/profile/search-stock", {
    method: "POST",
    body: JSON.stringify({stock}),
  })

  const { stockData, stockChartData } = res.data
  
  dispatch(currentStockGraph(stockChartData))
  graphData(stockChartData)
  dispatch(currentStock(stockData));


  return {
    type: CURRENT_STOCK,
    payload: stockData,
  };
}


export const graphData = (data) => async (dispatch) => {
  return {
    type: CURRENT_STOCKCHART,
    payload: data,
  };
}

export const getWatchlist = ({ id }) => async (dispatch) => {

  const res = await fetch("api/profile/", {
    method: "POST",
    body: JSON.stringify({ id }),
  });

  const { stockData, firstStockData } = res.data;

  dispatch(setWatchlist(stockData));
  dispatch(setFirstStock(firstStockData));
  return {
    type: SET_WATCHLIST,
    payload: stockData,
  };
};

export const getStock = ({ symbol }) => async (dispatch) => {
  const res = await fetch("api/profile/search-match", {
    method: "POST",
    body: JSON.stringify({symbol}),
  });

  const { bestMatches } = res.data
  
  dispatch(lookupStock(bestMatches));
  return {
    type: LOOKUP_STOCK,
    payload: bestMatches,
  };
};

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case LOOKUP_STOCK:
      return { ...state, symbol: action.payload };
    case CURRENT_STOCK:
      return { ...state, stock: action.payload };
    case CURRENT_STOCKCHART:
      return { ...state, graph: action.payload };
    case SET_WATCHLIST:
      return { ...state, list: action.payload };
    case FIRST_STOCK:
      return { ...state, firstStock: action.payload}
    default:
      return state;
  }
}

export default profileReducer;



