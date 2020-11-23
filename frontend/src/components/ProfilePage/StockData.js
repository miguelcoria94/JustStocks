import "./ProfilePage.style.css";

function StockData({ stock }) {
    const stockDetails = []
    
    if (stock) {
        const stockData = Object.entries(stock);
        stockDetails.push(stockData)
    }

    console.log(stockDetails)

    return (
      <div>
        {stockDetails.length > 0 ? (
          <div className="stock-data-div">
            <h3>{`Symbol - ${stockDetails[0][0].slice(1)}`}</h3>
            <p>{`Name - ${stockDetails[0][2].slice(1)}`}</p>
            <p>{`Description - ${stockDetails[0][3].slice(1)}`}</p>
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
}

export default StockData;

