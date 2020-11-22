import React, { useState, useSelector }from "react";
import { useDispatch } from "react-redux";
import * as profileActions from "../../store/profile";


function SearchBar() {
  const dispatch = useDispatch();
  const profileSearch = useSelector((state) => state.session.profile);
  const [symbol, setSymbol] = useState("");
    
  const handleSearch = (e) => {
      e.preventDefault();
      return dispatch(
        profileActions.getStock({ symbol })
      )
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        to="/profile"
        className="searchbar_container"
      >
        <div>
          <input
            placeholder="Search for..."
            type="text"
            value={symbol}
            onChange={(e) => {
              setSymbol(e.target.value);
            }}
            className="search-input"
          />
          <button className="search-button"type="submit">Search</button>
        </div>
        {}
      </form>
    </>
  );
}

export default SearchBar;
