import "./ProfilePage.style.css";
import numeral from "numeral";
import { useSelector, useDispatch } from "react-redux";
import * as profileActions from "../../store/profile";

function StockData({ stock, search, user }) {
  const dispatch = useDispatch();
  const watchlistFirstStock = useSelector((state) => state.profile.firstStock);

  const firstStockDetails = []
  
  if (watchlistFirstStock) {
    const stockDetails = Object.entries(watchlistFirstStock);
    firstStockDetails.push(stockDetails)
  }
  

  const stockDetails = []
  
    
    if (stock) {
        const stockData = Object.entries(stock);
        stockDetails.push(stockData)
    }
  
    const updateList = (id) => {
      dispatch(profileActions.getWatchlist({ id }));
    }
  const addStockToWatchlist = (symbol) => {
    let id = user.id
    dispatch(profileActions.addStock({ symbol, id }))
    return updateList(id)
  }

  
  const removeStockToWatchlist = (symbol) => {
    let id = user.id;
    dispatch(profileActions.removeStock({ symbol, id }));
    return updateList(id);
  };

    return (
      <div className="stock-data-main-div">
        {stockDetails.length > 0 ? (
          <div className="stock-data-div">
            <div className="featured-data">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addStockToWatchlist(stockDetails[0][0].slice(1)[0]);
                }}
              >
                <button type="submit" className="add-button">
                  Add to watchlist
                </button>
              </form>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  removeStockToWatchlist(stockDetails[0][0].slice(1)[0]);
                }}
              >
                <button type="submit" className="remove-button">
                  Remove from watchlist
                </button>
              </form>
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
        ) : firstStockDetails.length > 0 ? (
          <div className="stock-data-div">
            <div className="featured-data">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addStockToWatchlist(firstStockDetails[0][0].slice(1)[0]);
                }}
              >
                <button type="submit" className="add-button">
                  Add to watchlist
                </button>
              </form>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  removeStockToWatchlist(firstStockDetails[0][0].slice(1)[0]);
                }}
              >
                <button type="submit" className="remove-button">
                  Remove from watchlist
                </button>
              </form>
            </div>
            <h1>
              {firstStockDetails.length < 0
                ? `$${firstStockDetails[0][0].slice(1)} Stock Overview`
                : "Waiting for user..."}
            </h1>
            <div className="featured-data">
              <h3 className="market-cap">
                {firstStockDetails.length < 0
                  ? `Market Cap - ${numeral(
                      Number(firstStockDetails[0][13].slice(1))
                    )
                      .format("($ 0.00 a)")
                      .toUpperCase()}`
                  : "Waiting for user..."}
              </h3>
            </div>
            <div className="featured-data">
              <p className="featured-data-text">
                <span className="featured-data-title">Name</span>
                {firstStockDetails.length < 0
                  ? ` - ${firstStockDetails[0][2].slice(1)}`
                  : "Waiting for user..."}
              </p>
              <p className="featured-data-text">
                <span className="featured-data-title">Exchange</span>
                {firstStockDetails.length < 0
                  ? ` - ${firstStockDetails[0][4].slice(1)}`
                  : "Waiting for user..."}
              </p>
              <p className="featured-data-text">
                <span className="featured-data-title">Sector</span>
                {firstStockDetails.length < 0
                  ? ` - ${firstStockDetails[0][8].slice(1)}`
                  : "Waiting for user..."}
              </p>
            </div>
            <div className="featured-data">
              <p className="featured-data-text">
                <span className="featured-data-title">EPS</span>
                {firstStockDetails.length < 0
                  ? ` - ${firstStockDetails[0][20].slice(1)}`
                  : "Waiting for user..."}
              </p>
              <p className="featured-data-text">
                <span className="featured-data-title">52WeekHigh</span>
                {firstStockDetails.length < 0
                  ? ` - ${numeral(Number(firstStockDetails[0][39].slice(1)))
                      .format("($ 0.00 a)")
                      .toUpperCase()}`
                  : "Waiting for user..."}
              </p>
              <p className="featured-data-text">
                <span className="featured-data-title">52WeekLow</span>
                {firstStockDetails.length < 0
                  ? ` - ${numeral(Number(firstStockDetails[0][40].slice(1)))
                      .format("($ 0.00 a)")
                      .toUpperCase()}`
                  : "Waiting for user..."}
              </p>
            </div>
            <p>
              {firstStockDetails.length < 0
                ? `${firstStockDetails[0][3].slice(1)}`
                : "Waiting for user..."}
            </p>
          </div>
        ) : (
          <h1>Waiting for user...</h1>
        )}
      </div>
    );
}

export default StockData;

