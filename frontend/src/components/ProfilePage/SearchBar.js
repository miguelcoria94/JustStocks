import React, { useState }from "react";
import { useDispatch, useSelector} from "react-redux";
import * as profileActions from "../../store/profile";


function SearchBar() {
  const dispatch = useDispatch();
  let searchResult = useSelector((state) => state.profile.symbol);
  const [symbol, setSymbol] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    setSymbol(e.target.value)
    return dispatch(
      profileActions.getStock({ symbol })
    )
  };
  
  const handleSearch = () => {

  }
    
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
              onChange={onChange}
              className="search-input"
            />
            <button className="search-button" type="submit">
              Search
            </button>
            {searchResult ? (
              <div>
                <li>{`${searchResult[0]["1. symbol"]} ${searchResult[0]["2. name"]}`}</li>
                <li>{`${searchResult[1]["1. symbol"]} ${searchResult[1]["2. name"]}`}</li>
                <li>{`${searchResult[2]["1. symbol"]} ${searchResult[2]["2. name"]}`}</li>
                <li>{`${searchResult[4]["1. symbol"]} ${searchResult[3]["2. name"]}`}</li>
                <li>{`${searchResult[5]["1. symbol"]} ${searchResult[4]["2. name"]}`}</li>
              </div>
            ) : (
              <li></li>
            )}
          </div>
        </form>
      </>
    );
}

export default SearchBar;
