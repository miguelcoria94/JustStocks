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
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={100}
          data={chartData}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
        >
          <Tooltip />
          <Legend />
          <XAxis dataKey="2. high" />
          <YAxis type="number" domain={"auto"} />
          <Line
            dataKey="2. high"
            stroke="#169E5A"
            strokeWidth={5}
            fill="#8884d8"
          />
          <Line dataKey="3. low" stroke="#227956" strokeWidth={5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockChart;


