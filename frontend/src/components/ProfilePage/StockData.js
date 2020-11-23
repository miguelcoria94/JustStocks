import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as profileActions from "../../store/profile";
import "./ProfilePage.style.css";
import SearchItem from "./SearchItem";

function StockData({ stock }) {
    return (
        <div>
            {stock ? <h1>{stock}</h1> : <h1>Loading ... </h1>}
        </div>
    )
}

export default StockData;

