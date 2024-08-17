"use client";
import { atom, useRecoilState } from "recoil";
import { Bucket } from "./useBuckets";
import { useCallback, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

export type BucketsWithDate = {
  [date: string]: Bucket[];
};

const periodState = atom<string>({
  key: "chartPeriodState",
  default: "week",
});

export const useCharts = () => {
  const [bucketsWithDate, setBucketsWithDate] = useState<BucketsWithDate>({});
  const [period, setPeriod] = useRecoilState<string>(periodState);
  const [periodCount, setPeriodCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const targetDate = new Date();
    switch (period) {
      case "week":
        targetDate.setDate(targetDate.getDate() - 7 * periodCount);
        break;
      case "month":
        targetDate.setMonth(targetDate.getMonth() - periodCount);
        break;
      case "year":
        targetDate.setFullYear(targetDate.getFullYear() - periodCount);
        break;
      default:
        setError("パラメータの値が不正です。");
        break;
    }
    try {
      const res = await axiosInstance.get("buckets/show_buckets", {
        params: {
          date: targetDate.toISOString().split("T")[0],
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
  }, [period]);

  return {
    bucketsWithDate,
    loading,
    error,
    period,
    setPeriod,
    periodCount,
    setPeriodCount,
    fetchData,
  };
};
