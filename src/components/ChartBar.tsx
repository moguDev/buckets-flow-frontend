import { periodState } from "@/recoil/bucketsState";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedDateState } from "./RainfallCharts";

type ChartBarProps = {
  maxValue: number;
  value: number;
  date: Date;
};

export default function ChartBar({ maxValue, value, date }: ChartBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [period] = useRecoilState(periodState);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  useEffect(() => {
    let start: number | null = null;

    const animate = (time: number) => {
      if (start === null) start = time;
      const progress = Math.min((time - start) / 100, 1); // 1秒でアニメーション完了
      setAnimatedValue(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedValue(value); // 最終的に値を設定
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  const height = `${(animatedValue / maxValue) * 100}%`;
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
      className="relative w-full p-0.5 opacity-60"
      onClick={() => {
        value > 0 && setSelectedDate(date);
      }}
    >
      <div className="relative w-full h-56 bg-gray-100 bg-opacity-5 rounded-lg overflow-hidden">
        <div
          className={`absolute bottom-0 w-full bg-blue-400 ${
            maxValue * 0.75 < value
              ? "bg-opacity-90"
              : maxValue * 0.5 < value
              ? "bg-opacity-80"
              : maxValue * 0.25 < value
              ? "bg-opacity-70"
              : "bg-opacity-60"
          } transition-all rounded-lg duration-500 hover:brightness-150`}
          style={{ height }}
        />
      </div>
      <p className="absolute inset-x-0 flex items-center justify-center text-center text-blue-200 text-xs py-1">
        {label}
      </p>
    </div>
  );
}
