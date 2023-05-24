import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * Component for displaying daily activity.
 * @param {Object[]} datas - The data for daily activity.
 * @returns {JSX.Element} - The rendered component.
 */
const DailyActivity = ({ datas }) => {
  const data = datas;

  return (
    <div className="daily-activity-container">
      <div className="daily-activity-header">
        <h3>Activité quotidienne</h3>
        <ul>
          <li>Poids (kg)</li>
          <li>Calories brûlées (kCal)</li>
        </ul>
      </div>
      <div className="daily-activity-graph">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="2 2"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value, index) => `${index + 1}`}
            />
            <YAxis orientation="right" axisLine={false} tickLine={false} />

            <Tooltip
              offset={40}
              wrapperStyle={{ outline: "none", fontWeight: 400 }}
              content={<CustomTooltip />}
            />
            <Bar
              dataKey="kilogram"
              name="kg"
              fill="black"
              radius={[10, 10, 0, 0]}
              barSize={10}
              label={10}
            />
            <Bar
              dataKey="calories"
              name="kCal"
              fill="red"
              radius={[10, 10, 0, 0]}
              barSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/**
 * Custom tooltip component for displaying values.
 * @param {Object} data - The data for the tooltip.
 * @returns {JSX.Element|null} - The rendered tooltip component.
 */
const CustomTooltip = (data) => {
  try {
    let kg = data.payload[0]["value"];
    let kCal = data.payload[1]["value"];

    return (
      <div className="custom-tooltip">
        <p className="label">{`${kg}kg`}</p>
        <p className="label">{`${kCal}Kcal`}</p>
      </div>
    );
  } catch {
    return null;
  }
};

export default DailyActivity;
