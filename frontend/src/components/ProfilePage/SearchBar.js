import React, { useState, useSelector }from "react";
import { useDispatch } from "react-redux";
import * as profileActions from "../../store/profile";


function SearchBar() {
  const dispatch = useDispatch();
    const [symbol, setSymbol] = useState("");
    
  const handleSearch = (e) => {
      e.preventDefault();
      return dispatch(
        profileActions.getStock({ symbol })
      )
  };

  return (
    <>
      <form onSubmit={handleSearch} to="/profile" className="profile-logout-button">
        <div className="form_input-container">
                  <input
            placeholder="Search for..."
            type="text"
            value={symbol}
            onChange={(e) => {
              console.log(e.target.value)
              setSymbol(e.target.value)
            }}
          />
        </div>
        <div className="form_input-container">
          <button className="registerbtn" type="submit">
            Search
          </button>
        </div>
      </form>
    </>
  );
}

export default SearchBar;
