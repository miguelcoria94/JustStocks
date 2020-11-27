import { fetch } from "./csrf";

const LOOKUP_STOCK = "LOOKUP_STOCK";
const CURRENT_STOCK = "CURRENT_STOCK";
const CURRENT_STOCKCHART = "CURRENT_STOCKCHART";


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
    default:
      return state;
  }
}

export default profileReducer;



