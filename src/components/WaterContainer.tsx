import React from "react";

const WaterContainer = ({ level }) => {
  return (
    <div className="water-container rounded-xl bg-gray-700 bg-opacity-10 backdrop-blur-sm w-full h-96">
      <div
        className="water bg-blue-300 opacity-60"
        style={{ height: `${level}%` }}
      >
        <div className="water-surface"></div>
      </div>
    </div>
  );
};

export default WaterContainer;
