"use client";
import { useState, useEffect } from "react";
import ChartBar from "./ChartBar";
import {
  bucketsByDateLoadingState,
  bucketsByDateState,
  periodCountState,
  periodState,
} from "@/recoil/bucketsState";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { Loading } from "./MyComponents";
import { authState } from "@/recoil/authState";
import { formatDateString } from "./Activity";
import { MenuAccordion } from "./MyComponents";

export const selectedDateState = atom<string>({
  key: "selectedDateState",
  default: "",
});

export const RainfallCharts = () => {
  const isAuthenticated = useRecoilValue(authState).isAuthenticated;
  const [period, setPeriod] = useRecoilState(periodState);
  const [periodCount, setPeriodCount] = useRecoilState(periodCountState);
  const bucketsByDate = useRecoilValue(bucketsByDateState);
  const loading = useRecoilValue(bucketsByDateLoadingState);
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    !isAuthenticated && setIsOpen(false);
  }, [isAuthenticated]);

  useEffect(() => {
    if (bucketsByDate) {
      const dates = Object.keys(bucketsByDate);
      setStartDate(formatDateString(new Date(dates[0])));
      setEndDate(formatDateString(new Date(dates[dates.length - 1])));

      let maxBuckets = 0;
      if (period === "year") {
        const bucketsByMonth = dates.reduce((acc, date) => {
          const month = date.substring(0, 7);
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
  }, [bucketsByDate]);

  return (
    <MenuAccordion
      isOpen={isOpen}
      handleOpen={() => {
        setIsOpen((prev) => !prev);
      }}
      iconName="equalizer"
      label="降水量チャート"
      isAuthenticated={isAuthenticated}
    >
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
                {bucketsByDate &&
                  Math.floor(
                    (Object.values(bucketsByDate)
                      .flat()
                      .reduce((sum, bucket) => sum + bucket.duration, 0) /
                      1500) *
                      8 *
                      10
                  ) / 10}{" "}
                <span className="font-thin">L</span>
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
    </MenuAccordion>
  );
};
