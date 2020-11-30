<h1 align="center">
  <a name="logo" href="https://stockup94.herokuapp.com/"><img src="https://github.com/miguelcoria94/picsforjs/blob/main/Screen%20Shot%202020-11-30%20at%208.25.44%20AM.png" alt="Listenuplogo" width="300"></a>
  <br>
  JustStocks Documentation
</h1>

<h4 align="center">JustStocks is a web app that allows user to create an account to track and manage there watchlist</h4>

<h1 align="center">
  Visit JustStocks
</h1>

A live version of our application can be found [here](https://stockup94.herokuapp.com/).

<h1 align="center">
  Overview
</h1>

![home pic](https://github.com/miguelcoria94/picsforjs/blob/main/Screen%20Shot%202020-11-30%20at%208.28.48%20AM.png)

JustStocks is a stock tracking webapp inspired by RobinHood. As a logged out user, you do not have the ability to view stocks. As a logged in user you have the ability to add and remove stocks from your watchlist. As a logged in user you also have the ability to search stocks. JustStocks is built with Express JS, React w/ Redux, RechartsJS, Vanilla CSS and a Postgres Backend.

<h1 align="center">
  Watchlist
</h1>

![home login](https://github.com/miguelcoria94/picsforjs/blob/main/Screen%20Shot%202020-11-30%20at%208.43.57%20AM.png)

When a user logins a request to the backend is sent to fetch all the stocks associated with the user's id.

```js
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

export const addStock = ({ symbol, id }) => async (dispatch) => {
  return await fetch("api/profile/add-stock", {
    method: "POST",
    body: JSON.stringify({ symbol, id }),
  })
}
```

```js
router.post("/", asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const watchlistData = await WatchList.getCurrentWatchlist({ id });

  const stockIdArray = []

  watchlistData.forEach(async (el) => {
    let stockId = el["dataValues"]["stockId"];
    stockIdArray.push(stockId)
  })

  let stockSymbols = await Promise.all(
    stockIdArray.map(async (stockId) => {
      let dbResponse = await Stock.getStockSymbol(stockId)
      return dbResponse["dataValues"]["symbol"];
    })
  );

  let stockData = await Promise.all(
    stockSymbols.map(async (stockSymbol) => {
      let apiResponse = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=compact&apikey=${apiKey}`
      )
        .then((response) => response.json())
        .then((result) => {
          return result;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      return apiResponse
    })
  );
 const firstStockData = await fetch(
   `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbols[0]}&apikey=${apiKey}`
 )
   .then((response) => response.json())
   .then((result) => {
     return result;
   })
   .catch((error) => {
     console.error("Error:", error);
   });

  return res.json({
    stockData,
    firstStockData
  })
}))
```

<h1 align="center">
  Search
</h1>

![home login](https://github.com/miguelcoria94/picsforjs/blob/main/Screen%20Shot%202020-11-30%20at%209.01.31%20AM.png)

Each time the user types a character into the searchbar input a fetch request is sent to the backend which send another fetch request to the alphavantage api with the user's input to fetch an array of the best matches. The matches are then rendered in an UL element. When a user clicks a LI element the stock symbol is used as the value to search for rendering that stock as the main chart stock. At the same time when a stock is being searched for that stock is being added to the database, so that it gives the user the ability to add and remove that stock from their watchlist.

```js
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
```

```js
router.post("/search-stock",
  asyncHandler(async (req, res, next) => {

    const { stock } = req.body

    try {
      const newStock = await Stock.addStock(stock);
    } catch {
      console.log("stock already in DB")
    }


    const stockData = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock}&apikey=${apiKey}`,
    )
      .then((response) => response.json())
      .then((result) => {
        return result
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
    const stockChartData = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=compact&apikey=${apiKey}`
    )
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
    
    return res.json({
      stockData,
      stockChartData
    });
  }));

```
