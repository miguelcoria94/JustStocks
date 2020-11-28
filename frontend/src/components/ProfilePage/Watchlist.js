import React from "react";
import { useSelector } from "react-redux";
import "./ProfilePage.style.css";
import { useDispatch } from "react-redux";
import * as profileActions from "../../store/profile";


function Watchlist() {
    const watchlistData = useSelector((state) => state.profile.list);

    console.log(Array.isArray(watchlistData))
    console.log(watchlistData)
    return (
      <>
      </>
    );
}

export default Watchlist;
