"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useCallback, useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";

type responseData = {
  user_count: number;
  total_duration: number;
  rainfall_data: { time: string; duration: number }[];
};

const responseDataState = atom<responseData>({
  key: "ResponseDataState",
  default: {
    user_count: 0,
    total_duration: 0,
    rainfall_data: [],
  },
});

export const useFetchRecentRainfall = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [datas, setDatas] = useRecoilState(responseDataState);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("buckets/show_recent_rainfall");
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

  return { datas, loading, fetch };
};
