import { LineChart, Legend, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, AreaChart, Tooltip, ReferenceLine, Area} from 'recharts';

function StockChart({ graphData }) {

  let chartData = []

  if (graphData) {
    let graphEntriesNumber = Object.entries(Object.entries(graphData)[1][1]);
    graphEntriesNumber.slice(0, 50).forEach((el) => 
      chartData.push(Object.entries(el)[1][1])
    )
  }

  console.log("ss",chartData)

  return (
    <div className="graph-container" style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          height={100}
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 10 }}
        >
          <Tooltip labelStyle={{ display: "none" }}/>
          <YAxis domain={"auto"} hide="true" />
          <Line
            dataKey="4. close"
            stroke="#227956"
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


