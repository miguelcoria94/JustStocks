import "./ProfilePage.style.css";
import numeral from "numeral";

function StockData({ stock }) {
  const stockDetails = []
  
    
    if (stock) {
        const stockData = Object.entries(stock);
        stockDetails.push(stockData)
    }
  
  const addStockToWatchlist = () => {
    console.log("add")
  }

  const removeStockToWatchlist = () => {
    console.log("remove")
  };

    return (
      <div>
        {stockDetails.length > 0 ? (
          <div className="stock-data-div">
            <div className="featured-data">
              <button className="add-button" onClick={addStockToWatchlist}>
                Add to watchlist
              </button>
              <button className="remove-button" onClick={removeStockToWatchlist}>
                Remove from watchlist
              </button>
            </div>
            <h1>{`$${stockDetails[0][0].slice(1)} Stock Overview`}</h1>
            <div className="featured-data">
              <h3 className="market-cap">{`Market Cap - ${numeral(
                Number(stockDetails[0][13].slice(1))
              )
                .format("($ 0.00 a)")
                .toUpperCase()}`}</h3>
            </div>
            <div className="featured-data">
              <p className="featured-data-text">
                <span className="featured-data-title">Name</span>
                {` - ${stockDetails[0][2].slice(1)}`}
              </p>
              <p className="featured-data-text">
                <span className="featured-data-title">Exchange</span>
                {` - ${stockDetails[0][4].slice(1)}`}
              </p>
              <p className="featured-data-text">
                <span className="featured-data-title">Sector</span>
                {` - ${stockDetails[0][8].slice(1)}`}
              </p>
            </div>
            <div className="featured-data">
              <p className="featured-data-text">
                <span className="featured-data-title">EPS</span>
                {` - ${stockDetails[0][20].slice(1)}`}
              </p>
              <p className="featured-data-text">
                <span className="featured-data-title">52WeekHigh</span>
                {` - ${numeral(Number(stockDetails[0][39].slice(1)))
                  .format("($ 0.00 a)")
                  .toUpperCase()}`}
              </p>
              <p className="featured-data-text">
                <span className="featured-data-title">52WeekLow</span>
                {` - ${numeral(Number(stockDetails[0][40].slice(1)))
                  .format("($ 0.00 a)")
                  .toUpperCase()}`}
              </p>
            </div>
            <p>{`${stockDetails[0][3].slice(1)}`}</p>
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
}

export default StockData;

