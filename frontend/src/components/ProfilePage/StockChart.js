import { LineChart, Line, YAxis, ResponsiveContainer, Tooltip} from 'recharts';
import "./ProfilePage.style.css";
import { useSelector } from "react-redux";

function StockChart({ graphData }) {

  let chartData = []

  const watchlistData = useSelector((state) => state.profile.list);


  const lastupdate = []

  if (watchlistData) {
    for (let i = 0; i < watchlistData.length; i++) {
      let graphEntriesNumber = Object.entries(
        Object.entries(watchlistData[i])
      );
      graphEntriesNumber.forEach((el, idx) =>
        lastupdate.push(Object.entries(el)[idx][1][1])
      );
    }
  }
  
  let wldata = []


    for (let i = 0; i < lastupdate.length; i++) {
        if (lastupdate[i] !== undefined) {
            let ele = Object.entries(Object.values(lastupdate[i]));
            ele.forEach((el, idx) => {
                wldata.push(el[1])
            })
        }
    }

  if (graphData) {
    let graphEntriesNumber = Object.entries(Object.entries(graphData)[1][1]);
    graphEntriesNumber.forEach((el) => 
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
          data={
            chartDataReverse.length
            ? chartDataReverse
            : wldata.slice(0 * 100, 100 * (0+ 1)).reverse()
          }
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


