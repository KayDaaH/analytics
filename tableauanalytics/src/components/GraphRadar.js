import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

/**
 * Component for displaying a radar chart.
 * @param {Array} datas - The data for the radar chart.
 * @returns {JSX.Element} - The rendered component.
 */
const GraphRadar = ({ datas }) => {
  const data = datas;

  // Order the data based on kind in a specific order for better visualization
  const orderedData = [
    ...data.filter((d) => d.kind === "Intensité"),
    ...data.filter((d) => d.kind === "Vitesse"),
    ...data.filter((d) => d.kind === "Force"),
    ...data.filter((d) => d.kind === "Endurance"),
    ...data.filter((d) => d.kind === "Energie"),
    ...data.filter((d) => d.kind === "Cardio"),
  ];

  const polarGrid = false;

  return (
    <div className="graph-radar-container">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="78%" data={orderedData}>
          <PolarGrid radialLines={polarGrid} stroke="#FFF" strokeWidth={1.5} />
          <PolarAngleAxis
            dataKey="kind"
            dy={4}
            tickSize={16}
            stroke="#FFF"
            tickLine={false}
          />

          <Radar
            name="performance"
            dataKey="value"
            fill="red"
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphRadar;
