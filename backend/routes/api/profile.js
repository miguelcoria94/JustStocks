const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const fetch = require("node-fetch");
const { Stock, WatchList } = require("../../db/models");
const stock = require("../../db/models/stock");

const apiKey = "7B9VRQ2X6FX1KB7N";

const router = express.Router();

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

  router.post(
    "/search-match",
    asyncHandler(async (req, res, next) => {
      const { symbol } = req.body;

      const bestMatches = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKey}`,
      )
        .then((response) => response.json())
        .then((result) => {
          return result.bestMatches;
        })

      return res.json({
        bestMatches,
      });
    })
  );

router.post("/add-stock", asyncHandler(async (req, res, next) => {
  const { symbol, id } = req.body
  const stockToFind = await Stock.findAStock({ symbol })
  return await WatchList.addStock(id, stockToFind)
}))
  
router.post(
  "/remove-stock",
  asyncHandler(async (req, res, next) => {
    const { symbol, id } = req.body;
    const stockToFind = await Stock.findAStock({ symbol });
    return await WatchList.removeStock(id, stockToFind);
  })
);

module.exports = router;