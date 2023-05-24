import React from "react";
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis } from "recharts";

/**
 * Component for displaying a line chart of session durations.
 * @param {Array} datas - The data for the line chart.
 * @returns {JSX.Element} - The rendered component.
 */
const GraphSessions = ({ datas }) => {
  const data = datas;

  return (
    <div className="graph-sessions-container">
      <h3>Durée moyenne des sessions</h3>
      <div className="graph-sessions">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ bottom: 10 }}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFF" stopOpacity={0.4} />
                <stop offset="20%" stopColor="#FFF" stopOpacity={0.4} />
                <stop offset="75%" stopColor="#FFF" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="sessionLength"
              strokeWidth={2.6}
              stroke="url(#color)"
              dot={false}
            />

            <XAxis
              dataKey="sessionLength"
              tick={null}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="custom-tooltip">
                      <p className="label">{`${payload[0].value} min`}</p>
                    </div>
                  );
                }
              }}
              wrapperStyle={{ outline: "none" }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="legend">
          <p>L</p>
          <p>M</p>
          <p>M</p>
          <p>J</p>
          <p>V</p>
          <p>S</p>
          <p>D</p>
        </div>
      </div>
      <div className="style-background-effect"></div>
    </div>
  );
};

export default GraphSessions;
