import { LineChart, Legend, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, AreaChart, Tooltip, ReferenceLine, Area } from 'recharts';
import "./ProfilePage.style.css";

function StockChart({ graphData }) {

  let chartData = []

  if (graphData) {
    let graphEntriesNumber = Object.entries(Object.entries(graphData)[1][1]);
    graphEntriesNumber.slice(0, 50).forEach((el) => 
      chartData.push(Object.entries(el)[1][1])
    )
  }

  let myAttr;

  let chartDataReverse = chartData.reverse()
  
  try {
    if (!chartDataReverse ||
      Object.values(chartDataReverse[0])[0] >
      Object.values(chartDataReverse[chartDataReverse.length - 1])[0]
    ) {
      myAttr = { className: "stock-down" };
    } else {
      myAttr = { className: "chart" };
    }
  } catch {
    console.log("oops")
  }
  return (
    <div
      className="graph-container"
      style={{ width: "100%", height: 300, backgroundColor: "none" }}
    >
      <ResponsiveContainer>
        <LineChart
          id="chart"
          {...myAttr}
          height={100}
          data={chartDataReverse}
          margin={{ top: 20, right: 0, left: 0, bottom: 10 }}
        >
          <Tooltip labelStyle={{ display: "none" }} dataKey="4. close" />
          <YAxis domain={"auto"} hide="true" />
          <Line
            dataKey={"4. close"}
            className="tooltip"
            stroke="#EFEFEF"
            strokeWidth={5}
            name="PRICE"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockChart;


