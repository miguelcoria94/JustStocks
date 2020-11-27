import "./ProfilePage.style.css";

function SearchItem({searchItem, setSymbol}) {
    const handleSearch = (e) => {
        setSymbol(e.target.innerText.split(' - ')[0].split("$").join("").toLowerCase())
      document.getElementById("search-result-div").className = "hide-search";
  }
  return (
    <>
      {searchItem ?
      <li>
        <span
          onClick={handleSearch}
        >{`$${searchItem["1. symbol"]} - ${searchItem["2. name"]}`}</span>
      </li>
      : ""}
    </>
  );
}

export default SearchItem;
