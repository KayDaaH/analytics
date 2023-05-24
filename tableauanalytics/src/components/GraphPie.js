import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

/**
 * Component for displaying a pie chart.
 * @param {number} datas - The data for the pie chart.
 * @returns {JSX.Element} - The rendered component.
 */
const GraphPie = ({ datas }) => {
  const data = [{ name: "Score", value: datas * 100 }];
  return (
    <div className="graph-pie-container">
      <h3>Score</h3>
      <div className="information-circle">
        <h2>{datas * 100}%</h2>
        <p>
          de votre <br />
          objectif
        </p>
      </div>
      <ResponsiveContainer width="100%" height="100%" id="spin">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={80}
            endAngle={datas * 360 + 80}
            innerRadius={"60%"}
            outerRadius={"70%"}
            dataKey="value"
            cornerRadius={10}
          >
            <Cell stroke="" fill="red" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphPie;
