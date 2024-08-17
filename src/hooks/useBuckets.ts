import { atom, useRecoilState, useSetRecoilState } from "recoil";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useCallback, useState } from "react";

export interface Bucket {
  id: number;
  user_id: number;
  filled: boolean;
  duration: number;
  storage: number;
  starttime: number;
  endtime: number;
}
// State Atoms
const bucketsState = atom<Bucket[]>({
  key: "allBucketsState",
  default: [],
});

export const useBuckets = () => {
  const [buckets, setBuckets] = useRecoilState(bucketsState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("buckets");
      setBuckets(response.data);
    } catch (error) {
      setError("データの取得に失敗しました");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [buckets]);

  const createBucket = useCallback(
    async (newBucket: Omit<Bucket, "id" | "user_id">) => {
      try {
        const res = await axiosInstance.post("buckets", newBucket);
        fetchData();
      } catch (error) {
        setError("新しいバケットの作成に失敗しました");
        console.error(error);
      }
    },
    [buckets]
  );

  return { buckets, loading, error, fetchData, createBucket };
};

// Utility Functions
export const isSameDay = (date1: Date, date2: Date): boolean =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

export const getTodayBuckets = (buckets: Bucket[]): Bucket[] => {
  const today = new Date();
  return buckets.filter((bucket) =>
    isSameDay(new Date(bucket.starttime * 1000), today)
  );
};

export const getMaxStreak = (buckets: Bucket[]): number => {
  if (buckets.length === 0) return 0;

  const jstOffset = 9 * 60; // JST is UTC+9

  const uniqueDays = Array.from(
    new Set(
      buckets.map((bucket) => {
        const date = new Date((bucket.starttime + jstOffset * 60) * 1000);
        return date.toISOString().split("T")[0];
      })
    )
  ).sort();

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < uniqueDays.length; i++) {
    const prevDate = new Date(uniqueDays[i - 1]);
    const currDate = new Date(uniqueDays[i]);

    const diffInDays =
      (currDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24);

    if (diffInDays === 1) {
      currentStreak++;
    } else {
      currentStreak = 1;
    }

    maxStreak = Math.max(maxStreak, currentStreak);
  }

  return maxStreak;
};

export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getOldestBucketDate = (buckets: Bucket[]): string | null => {
  if (buckets.length === 0) return null;

  const oldestBucket = buckets.reduce(
    (oldest, bucket) => (bucket.starttime < oldest.starttime ? bucket : oldest),
    buckets[0]
  );

  const date = new Date(oldestBucket.starttime * 1000);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}年${month}月${day}日`;
};
