import React from "react";

const BlocIcon = ({ value, color, iconSvg, nutrient }) => {
  return (
    <div className="bloc-icon-container">
      <div className="bloc-logo" style={{ backgroundColor: `${color}` }}>
        {iconSvg}
      </div>
      <div className="information-container">
        <h2>{value}</h2>
        <p>{nutrient}</p>
      </div>
    </div>
  );
};

export default BlocIcon;
