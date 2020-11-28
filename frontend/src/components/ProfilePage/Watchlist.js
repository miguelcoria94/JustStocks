import React from "react";
import { useSelector } from "react-redux";
import "./ProfilePage.style.css";
import { useDispatch } from "react-redux";
import * as profileActions from "../../store/profile";


function Watchlist() {

    const watchlistData = useSelector((state) => state.profile.list);

    const stockSymbols = []

    if (watchlistData) {
        for (let i = 0; i < watchlistData.length; i++) {
            let graphEntriesNumber = Object.entries(
              Object.entries(watchlistData[i])
            );
            graphEntriesNumber.forEach((el) =>
              stockSymbols.push(Object.entries(el)[1][1][1]["2. Symbol"])
            );
        }
    }

    const filteredSymbols = stockSymbols.filter((word) => word !== undefined);



    
    console.log("hello", filteredSymbols)
    return (
      <>
        {filteredSymbols.map((symbol, idx) => (
          <li key={idx}>{symbol}</li>
        ))}
      </>
    );
}

export default Watchlist;
