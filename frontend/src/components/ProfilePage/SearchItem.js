import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as profileActions from "../../store/profile";
import "./ProfilePage.style.css";

function SearchItem({searchItem}) {
  const dispatch = useDispatch();
    let searchResult = useSelector((state) => state.profile.symbol);
    
  return (
      <>
        <li>
          <span>
            {`$${searchItem["1. symbol"]} - ${searchItem["2. name"]}`}
          </span>
        </li>
    </>
  );
}

export default SearchItem;
