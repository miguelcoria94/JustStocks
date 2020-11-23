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
            { (stockDetails.length > 0) ? <h3>{stockDetails[0][0]}</h3> : <h1>Loading...</h1>}
        </div>
    )
}

export default StockData;

