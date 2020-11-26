import React, { useState }from "react";
import { useDispatch } from "react-redux";
import * as profileActions from "../../store/profile";
import './ProfilePage.style.css'
import SearchItem from './SearchItem'


function SearchBar({ search }) {
  
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    setSymbol(e.target.value)
    console.log(e.target.value)
    return dispatch(
      profileActions.getStock({ symbol })
    )
  };
  
  const handleSearch = (e) => {
    e.preventDefault()
    document.getElementById("search-result-div").className = 
      "hide-search";
    dispatch(profileActions.graphData({ stock: symbol }))
    dispatch(profileActions.mainStock({ stock: symbol }));
  }
    
    return (
      <>
        <form
          onSubmit={handleSearch}
          className="searchbar_container"
        >
          <div>
            <input
              placeholder=" Enter a symbol. . ."
              type="text"
              value={symbol}
              onChange={onChange}
              className="search-input"
              id="search-input"
              autocomplete="off"
            />
            <button className="search-button" type="submit">
              <i class="fas fa-search"></i>
              Search
            </button>
            {search ? (
              <div className="search-result-div" id="search-result-div">
                <SearchItem searchItem={search[0]} setSymbol={setSymbol} />
                <SearchItem searchItem={search[1]} setSymbol={setSymbol} />
                <SearchItem searchItem={search[2]} setSymbol={setSymbol} />
                <SearchItem searchItem={search[3]} setSymbol={setSymbol} />
                <SearchItem searchItem={search[4]} setSymbol={setSymbol} />
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
