"use client";
import { useEffect, useRef, useState } from "react";
import ChartBar from "./ChartBar";
import LoginModal from "./modals/LoginModal";
import {
  bucketsByDateLoadingState,
  bucketsByDateState,
  periodState,
} from "@/recoil/bucketsState";
import { useRecoilState, useRecoilValue } from "recoil";
import Loading from "./Loading";

type RainfallChartsProps = {
  isAuthenticated: boolean;
};

export default function RainfallCharts(props: RainfallChartsProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState("auto");
  const [isOpen, setIsOpen] = useState(false);
  const [period, setPeriod] = useRecoilState(periodState);
  const bucketsByDate = useRecoilValue(bucketsByDateState);
  const loading = useRecoilValue(bucketsByDateLoadingState);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { isAuthenticated } = props;

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setHeight(`${contentRef.current.scrollHeight}px`);
      } else {
        setHeight("0px");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    isAuthenticated === false && setIsOpen(false);
  }, [isAuthenticated]);

  useEffect(() => {
    if (bucketsByDate) {
      const dates = Object.keys(bucketsByDate);
      setStartDate(
        new Date(dates[0]).toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
      setEndDate(
        new Date(dates[dates.length - 1]).toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
  }, [bucketsByDate]);

  const handleOpen = () => {
    isAuthenticated && setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-gray-700 bg-opacity-10 rounded-xl px-5 backdrop-blur-sm w-full">
      <label
        htmlFor={isAuthenticated ? "" : "my-modal-4"}
        className="flex justify-between items-center w-full py-6"
        onClick={handleOpen}
      >
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-3">equalizer</span>
          <p className="">降水量チャート</p>
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
          <button
            onClick={() => {
              !loading && setPeriod("week");
            }}
            className={`w-1/3 chart-tab ${
              period === "week" && "chart-tab-selected"
            }`}
          >
            週間
          </button>
          <button
            onClick={() => {
              !loading && setPeriod("month");
            }}
            className={`w-1/3 chart-tab ${
              period === "month" && "chart-tab-selected"
            }`}
          >
            月間
          </button>
          <button
            onClick={() => {
              !loading && setPeriod("year");
            }}
            className={`w-1/3 chart-tab ${
              period === "year" && "chart-tab-selected"
            }`}
          >
            年間
          </button>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex items-center justify-between px-1 py-3 text-blue-300">
              <button className="material-icons text-xl">
                keyboard_arrow_left
              </button>
              <p className="text-sm font-thin">
                {startDate}〜{endDate} -{" "}
                <button className="font-semibold">
                  {bucketsByDate && Object.values(bucketsByDate).flat().length}{" "}
                  <span className="font-thin">bucket</span>
                </button>
              </p>
              <button className="material-icons text-xl">
                keyboard_arrow_right
              </button>
            </div>
            <div className="flex w-full p-1 pb-3">
              {bucketsByDate &&
                Object.entries(bucketsByDate).map(([date, buckets]) => (
                  <ChartBar
                    key={date}
                    maxValue={10}
                    value={buckets.length}
                    date={new Date(date)}
                  />
                ))}
            </div>
          </>
        )}
        <div className="flex w-full p-1 pb-3"></div>
      </div>
      <LoginModal />
    </div>
  );
}
