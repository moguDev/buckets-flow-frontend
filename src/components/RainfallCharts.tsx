"use client";
import { useEffect, useRef, useState } from "react";
import ChartBar from "./ChartBar";
import {
  bucketsByDateLoadingState,
  bucketsByDateState,
  periodCountState,
  periodState,
} from "@/recoil/bucketsState";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import Loading from "./Loading";

export const selectedDateState = atom<string>({
  key: "selectedDateState",
  default: "",
});

type RainfallChartsProps = {
  isAuthenticated: boolean;
};

export default function RainfallCharts({
  isAuthenticated,
}: RainfallChartsProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState("0px");
  const [isOpen, setIsOpen] = useState(false);
  const [period, setPeriod] = useRecoilState(periodState);
  const [periodCount, setPeriodCount] = useRecoilState(periodCountState);
  const bucketsByDate = useRecoilValue(bucketsByDateState);
  const loading = useRecoilValue(bucketsByDateLoadingState);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      const newHeight = isOpen ? `${contentRef.current.scrollHeight}px` : "0px";
      setHeight(newHeight);
    }
  }, [isOpen]);

  useEffect(() => {
    !isAuthenticated && setIsOpen(false);
  }, [isAuthenticated]);

  useEffect(() => {
    if (bucketsByDate) {
      const dates = Object.keys(bucketsByDate);
      setStartDate(formatDate(dates[0]));
      setEndDate(formatDate(dates[dates.length - 1]));

      let maxBuckets = 0;
      if (period === "year") {
        const bucketsByMonth = dates.reduce((acc, date) => {
          const month = date.substring(0, 7); // "YYYY-MM"
          acc[month] = (acc[month] || 0) + bucketsByDate[date].length;
          return acc;
        }, {} as Record<string, number>);
        maxBuckets = Math.max(...Object.values(bucketsByMonth));
      } else {
        maxBuckets = Math.max(
          ...Object.values(bucketsByDate).map((buckets) => buckets.length)
        );
      }
      setMaxValue(maxBuckets);
    }
  }, [bucketsByDate, period]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleOpen = () => {
    isAuthenticated && setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-gray-700 bg-opacity-10 rounded-xl px-5 backdrop-blur-sm w-full select-none">
      <label
        htmlFor={isAuthenticated ? "" : "my-modal-4"}
        className="flex justify-between items-center w-full py-6"
        onClick={handleOpen}
      >
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-3">equalizer</span>
          <p>降水量チャート</p>
        </div>
        <div className="material-icons text-blue-300 rounded-full bg-opacity-0 border-none">
          {isAuthenticated ? (
            isOpen ? (
              "expand_more"
            ) : (
              "expand_less"
            )
          ) : (
            <div className="flex items-center text-xs rounded-full text-gray-400 text-opacity-80">
              ログインして利用
            </div>
          )}
        </div>
      </label>
      <div ref={contentRef} className="transition-height" style={{ height }}>
        <div className="flex items-center bg-blue-900 bg-opacity-10 rounded-lg mt-2 p-1">
          {["week", "month", "year"].map((value) => (
            <button
              key={value}
              onClick={() => {
                if (!loading) {
                  setPeriodCount(0);
                  setPeriod(value);
                }
              }}
              className={`w-1/3 chart-tab ${
                period === value && "chart-tab-selected"
              }`}
            >
              {value === "week" ? "週間" : value === "month" ? "月間" : "年間"}
            </button>
          ))}
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex items-center justify-between px-1 py-3 text-blue-300">
              <button
                aria-label="前の期間"
                className="material-icons text-xl hover:text-white"
                onClick={() => setPeriodCount((prev) => prev + 1)}
              >
                keyboard_arrow_left
              </button>
              <p className="text-sm font-thin">
                {startDate}〜{endDate} -{" "}
                <button className="font-semibold">
                  {bucketsByDate && Object.values(bucketsByDate).flat().length}{" "}
                  <span className="font-thin">bucket</span>
                </button>
              </p>
              <button
                aria-label="次の期間"
                className="material-icons text-xl hover:text-white"
                onClick={() => {
                  periodCount > 0 && setPeriodCount((prev) => prev - 1);
                }}
              >
                keyboard_arrow_right
              </button>
            </div>
            <div className="flex w-full p-1 pb-3">
              {bucketsByDate &&
                Object.entries(bucketsByDate).map(([date, buckets]) => (
                  <ChartBar
                    key={date}
                    maxValue={maxValue}
                    value={buckets.length}
                    date={new Date(date)}
                  />
                ))}
            </div>
          </>
        )}
        <div className="flex w-full p-1 pb-3"></div>
      </div>
    </div>
  );
}
