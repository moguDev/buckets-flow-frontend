"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useEffect } from "react";

const getTodayBuckets: () => Promise<void> = async () => {
  const res = await axiosInstance.get("buckets/show_today_buckets");
  console.log(res);
};

const APITest = () => {
  useEffect(() => {
    getTodayBuckets();
  }, []);
  return (
    <button
      onClick={() => {
        getTodayBuckets();
      }}
    >
      GET
    </button>
  );
};

export default APITest;
