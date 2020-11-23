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
        {searchResult ? console.log(searchResult) : <li>no results</li>}
          </div>
        </form>
      </>
    );
}

export default SearchBar;
