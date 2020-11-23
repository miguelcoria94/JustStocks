import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, AreaChart, Tooltip, ReferenceLine, Area} from 'recharts';
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


function StockChart() {

  return (
    <ResponsiveContainer className="graph-container" width="100%" height="45%">
      <AreaChart data={data} margin={{ top: 40, right: 0, left: 0, bottom: 0 }}>
        <Tooltip />
        <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
        <ReferenceLine
          y={4000}
          label="Stock"
          stroke="#247856"
          strokeDasharray="3 3"
        />
        <Area
          width="100%"
          type="monotone"
          dataKey="uv"
          stroke="#247856"
          fill="#28835B"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default StockChart;


