"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useCallback, useEffect, useState } from "react";

type responseData = {
  time: string;
  total_duration: number;
};

export const useRecentRainfall = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [datas, setDatas] = useState<responseData[]>([]);

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
