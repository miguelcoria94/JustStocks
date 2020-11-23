import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as profileActions from "../../store/profile";
import "./ProfilePage.style.css";

function SearchItem({searchItem}) {
  const dispatch = useDispatch();
    let searchResult = useSelector((state) => state.profile.symbol);

    const handleSearch = (e) => {
      console.log(e.target.innerText.split('- ')[0])
  }
    
  return (
    <>
      <li>
        <span
          onClick={handleSearch}
        >{`$${searchItem["1. symbol"]} - ${searchItem["2. name"]}`}</span>
      </li>
    </>
  );
}

export default SearchItem;
