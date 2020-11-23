import React, { useState }from "react";
import { useDispatch } from "react-redux";
import * as profileActions from "../../store/profile";
import './ProfilePage.style.css'
import SearchItem from './SearchItem'


function SearchBar({ search }) {
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState("");
  const [stock, setStock] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    setSymbol(e.target.value)
    setStock(e.target.value)
    return dispatch(
      profileActions.getStock({ symbol })
    )
  };
  
  const handleSearch = (e) => {
    e.preventDefault()

    return dispatch(
      profileActions.mainStock({ stock })
    )
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
              placeholder=" Search for..."
              type="text"
              value={symbol}
              onChange={onChange}
              className="search-input"
              id="search-input"
              autocomplete="off"
            />
            <button className="search-button" type="submit">
              Search
            </button>
            {search ? (
              <div className="search-result-div" id="search-result-div">
                <SearchItem searchItem={search[0]} />
                <SearchItem searchItem={search[1]} />
                <SearchItem searchItem={search[2]} />
                <SearchItem searchItem={search[3]} />
                <SearchItem searchItem={search[4]} />
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
