const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const fetch = require("node-fetch");
const { Stock } = require("../../db/models");

const apiKey = "7B9VRQ2X6FX1KB7N";

const router = express.Router();


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
    
    

    console.log(stockChartData)
    
    return res.json({
      stockData, stockChartData
    })
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
      
      console.log(bestMatches)

      return res.json({
        bestMatches,
      });
    })
  );

router.post("/add-stock", asyncHandler(async (req, res, next) => {
  const { symbol } = req.body
  console.log(symbol)
  }))

module.exports = router;