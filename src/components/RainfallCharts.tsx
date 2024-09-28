"use client";
import { useState, useEffect } from "react";
import ChartBar from "./ChartBar";
import { atom, useRecoilState } from "recoil";
import { Loading } from "./MyComponents";
import { formatDateString } from "./Activity";
import { MenuAccordion } from "./MyComponents";
import { useCharts } from "@/hooks/useCharts";
import { useAuth } from "@/hooks/useAuth";

export const selectedDateState = atom<Date | null>({
  key: "selectedDateState",
  default: null,
});

export const RainfallCharts = () => {
  const { isAuthenticated } = useAuth();
  const {
    bucketsWithDate,
    loading,
    period,
    setPeriod,
    initTargetDate,
    incrementTargetDate,
    decrementTargetDate,
    fetchData,
  } = useCharts();

  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxValue, setMaxValue] = useState(0);
  const [selectedDate] = useRecoilState(selectedDateState);

  useEffect(() => {
    fetchData();
  }, [isAuthenticated, period, fetchData]);

  useEffect(() => {
    !isAuthenticated && setIsOpen(false);
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedDate) {
    }
  }, [selectedDate]);

  useEffect(() => {
    if (bucketsWithDate) {
      console.log(bucketsWithDate);
      const dates = Object.keys(bucketsWithDate);
      setStartDate(formatDateString(new Date(dates[0])));
      setEndDate(formatDateString(new Date(dates[dates.length - 1])));
      let maxDuration = 0;
      maxDuration = Math.max(
        ...Object.values(bucketsWithDate).map(
          (buckets) =>
            Math.floor(
              (buckets.reduce((sum, bucket) => sum + bucket.duration, 0) /
                1500) *
                8 *
                10
            ) / 10
        )
      );

      console.log(maxDuration);
      setMaxValue(maxDuration);
    }
  }, [bucketsWithDate, period]);

  return (
    <MenuAccordion
      isOpen={isOpen}
      handleOpen={() => {
        setIsOpen((prev) => !prev);
      }}
      iconName="equalizer"
      label="降水量チャート"
      isAuthenticated={isAuthenticated}
      loading={loading}
    >
      <div className="flex items-center bg-blue-900 bg-opacity-10 rounded-lg mt-2 p-1">
        {["week", "month", "year"].map((value) => (
          <button
            key={value}
            onClick={() => {
              if (!loading) {
                initTargetDate();
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
              onClick={() => decrementTargetDate()}
            >
              keyboard_arrow_left
            </button>
            <p className="text-sm font-thin">
              {startDate}〜{endDate} -{" "}
              <button className="font-semibold">
                {bucketsWithDate &&
                  Math.floor(
                    (Object.values(bucketsWithDate)
                      .flat()
                      .reduce((sum, bucket) => sum + bucket.duration, 0) /
                      1500) *
                      8 *
                      10
                  ) / 10}{" "}
                <span className="font-thin">mm</span>
              </button>
            </p>
            <button
              aria-label="次の期間"
              className="material-icons text-xl hover:text-white"
              onClick={() => incrementTargetDate()}
            >
              keyboard_arrow_right
            </button>
          </div>
          <div className="flex w-full p-1 pb-3">
            {bucketsWithDate &&
              Object.entries(bucketsWithDate).map(([date, buckets]) => (
                <ChartBar
                  key={date}
                  maxValue={maxValue}
                  value={
                    Math.floor(
                      (buckets.reduce(
                        (sum, bucket) => sum + bucket.duration,
                        0
                      ) /
                        1500) *
                        8 *
                        10
                    ) / 10
                  }
                  date={new Date(date)}
                />
              ))}
          </div>
        </>
      )}
    </MenuAccordion>
  );
};
