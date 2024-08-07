import React from "react";

type ChartBarProps = {
  maxValue: number;
  value: number;
  label?: string;
};

export default function ChartBar({
  maxValue,
  value,
  label = "",
}: ChartBarProps) {
  const height = `${(value / maxValue) * 100}%`;

  return (
    <div
      className="w-full p-1 opacity-60 tooltip tooltip-info"
      data-tip={`${value} buckets`}
    >
      <div className="relative w-full h-56 bg-gray-100 bg-opacity-5 rounded-lg overflow-hidden">
        <div
          className="absolute bottom-0 w-full bg-blue-300 transition-all duration-500"
          style={{ height }}
        />
      </div>
      <p className="text-center text-blue-200 font-light text-xs p-1">
        {label}
      </p>
    </div>
  );
}
