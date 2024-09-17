"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useCallback, useEffect, useState } from "react";

type responseData = {
  user_count: number;
  total_duration: number;
  rainfall_data: { time: string; duration: number }[];
};

export const useRecentRainfall = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [datas, setDatas] = useState<responseData>({
    user_count: 0,
    total_duration: 0,
    rainfall_data: [],
  });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("buckets/show_recent_rainfall");
      console.log(res.data);
      setDatas(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { datas, loading };
};
