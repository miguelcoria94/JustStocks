import React from "react";
import {
  LineChart,
  Line,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useSelector } from "react-redux";
import "./ProfilePage.style.css";


function Watchlist() {

    const watchlistData = useSelector((state) => state.profile.list);

    const stockSymbols = []

    const lastupdate = []

    if (watchlistData) {
        for (let i = 0; i < watchlistData.length; i++) {
            let graphEntriesNumber = Object.entries(
              Object.entries(watchlistData[i])
            );
            graphEntriesNumber.forEach((el) =>
                stockSymbols.push(Object.entries(el)[1][1][1]["2. Symbol"])
            );
        }

        for (let i = 0; i < watchlistData.length; i++) {
          let graphEntriesNumber = Object.entries(
            Object.entries(watchlistData[i])
          );
            graphEntriesNumber.forEach((el, idx) =>
                lastupdate.push(Object.entries(el)[idx][1][1])
          );
        }
    }

    let graphdata = []


    for (let i = 0; i < lastupdate.length; i++) {
        if (lastupdate[i] !== undefined) {
            let ele = Object.entries(Object.values(lastupdate[i]));
            ele.forEach((el, idx) => {
                graphdata.push(el[1])
            })
        }
    }
    const filteredSymbols = stockSymbols.filter((word) => word !== undefined);

    const stockStatus = (array) => {
        if (
          Object.values(array[0])[0] >
          Object.values(array[array.length - 1])[0]
        ) {
          return "stock-down";
        } else {
          return "chart";
        }
    }

    return (
      <div>
          <h1> MY WATCHLIST </h1>
        {filteredSymbols.map((symbol, idx) => (
            <div>
            <h3 key={idx}>{`$${symbol.toUpperCase()}`} - 100 DAY CHART</h3>
            <div
              className="graph-container"
              style={{ width: "200", height: 200, backgroundColor: "none" }}
            >
              <ResponsiveContainer>
                <LineChart
                  height={100}
                  className={stockStatus(
                    graphdata.slice(idx * 100, 100 * (idx + 1)).reverse()
                  )}
                  data={graphdata.slice(idx * 100, 100 * (idx + 1)).reverse()}
                  margin={{ top: 20, right: 0, left: 0, bottom: 10 }}
                >
                  <Tooltip
                    labelStyle={{ display: "none" }}
                    dataKey="4. close"
                  />
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
          </div>
        ))}
      </div>
    );
}

export default Watchlist;
