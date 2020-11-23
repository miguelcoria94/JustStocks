import React, { useState }from "react";
import { useDispatch, useSelector} from "react-redux";
import * as profileActions from "../../store/profile";


function SearchBar() {
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.profile.symbol);
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
