"use client";
import { atom, useRecoilState } from "recoil";
import { Bucket } from "./useBuckets";
import { useCallback, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

export type BucketsWithDate = {
  [date: string]: Bucket[];
};

const bucketsWithDateState = atom<BucketsWithDate>({
  key: "bucketsWithDateState",
  default: {},
});

const periodState = atom<string>({
  key: "periodState",
  default: "week",
});

export const useCharts = () => {
  const [bucketsWithDate, setBucketsWithDate] =
    useRecoilState<BucketsWithDate>(bucketsWithDateState);
  const [period, setPeriod] = useRecoilState<string>(periodState);
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const initTargetDate = () => setTargetDate(new Date());

  const decrementTargetDate = () => {
    const newTargetDate = new Date(targetDate);
    switch (period) {
      case "week":
        newTargetDate.setDate(newTargetDate.getDate() - 7);
        break;
      case "month":
        newTargetDate.setMonth(newTargetDate.getMonth() - 1);
        break;
      case "year":
        newTargetDate.setFullYear(newTargetDate.getFullYear() - 1);
        break;
      default:
        break;
    }
    setTargetDate(newTargetDate);
    fetchData(newTargetDate);
  };

  const incrementTargetDate = () => {
    const newTargetDate = new Date(targetDate);
    switch (period) {
      case "week":
        newTargetDate.setDate(newTargetDate.getDate() + 7);
        break;
      case "month":
        newTargetDate.setMonth(newTargetDate.getMonth() + 1);
        break;
      case "year":
        newTargetDate.setFullYear(newTargetDate.getFullYear() + 1);
        break;
      default:
        break;
    }
    if (newTargetDate < new Date()) {
      setTargetDate(newTargetDate);
      fetchData(newTargetDate);
    }
  };

  const fetchData = useCallback(
    async (date = new Date()) => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("buckets/show_buckets", {
          params: {
            date: date.toISOString().split("T")[0],
            period,
          },
        });
        setBucketsWithDate(res.data);
        setError("");
      } catch (error) {
        setError("データの取得に失敗しました");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [period]
  );

  return {
    bucketsWithDate,
    loading,
    error,
    period,
    setPeriod,
    targetDate,
    initTargetDate,
    incrementTargetDate,
    decrementTargetDate,
    fetchData,
  };
};
