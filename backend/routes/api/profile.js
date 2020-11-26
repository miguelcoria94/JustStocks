const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const fetch = require("node-fetch");

const apiKey = "7B9VRQ2X6FX1KB7N";

const router = express.Router();


router.post("/search-stock",
  asyncHandler(async (req, res, next) => {

    const { stock } = req.body

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
    
    return res.json({
      stockData,
    })
}));

module.exports = router;