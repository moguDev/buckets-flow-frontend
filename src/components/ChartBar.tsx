import { periodState } from "@/recoil/bucketsState";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

type ChartBarProps = {
  maxValue: number;
  value: number;
  date: Date;
};

export default function ChartBar({ maxValue, value, date }: ChartBarProps) {
  const height = `${(value / maxValue) * 100}%`;
  const [period] = useRecoilState(periodState);
  let label = "";
  if (period === "week") {
    label = date.toLocaleDateString("ja-JP", { weekday: "short" });
  } else if (period === "month" && date.getDate() % 5 === 0) {
    label = date.getDate().toString();
  } else if (period === "year") {
    label = (date.getMonth() + 1).toString();
  }
  return (
    <div
      className="relative w-full p-0.5 opacity-60 tooltip tooltip-info"
      data-tip={`${value} buckets`}
    >
      <div className="relative w-full h-56 bg-gray-100 bg-opacity-5 rounded-lg overflow-hidden">
        <div
          className="absolute bottom-0 w-full bg-blue-300 transition-all duration-500"
          style={{ height }}
        />
      </div>
      <p className="absolute inset-x-0 flex items-center justify-center text-center text-blue-200 text-xs py-1">
        {label}
      </p>
    </div>
  );
}
