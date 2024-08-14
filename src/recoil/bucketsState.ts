import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import axiosInstance from "@/libs/axiosInstance";
import { useEffect, useCallback } from "react";

export interface Bucket {
  id: number;
  user_id: number;
  filled: boolean;
  duration: number;
  storage: number;
  starttime: number;
  endtime: number;
}

export interface BucketsByDate {
  [date: string]: Bucket[];
}

// State Atoms
export const allBucketsState = atom<Bucket[]>({
  key: "allBucketsState",
  default: [],
});

export const allBucketsLoadingState = atom<boolean>({
  key: "allBucketsLoadingState",
  default: true,
});

export const allBucketsErrorState = atom<string | null>({
  key: "allBucketsErrorState",
  default: null,
});

export const periodState = atom<string>({
  key: "periodState",
  default: "week",
});

export const periodCountState = atom<number>({
  key: "periodCountState",
  default: 0,
});

export const bucketsByDateState = atom<BucketsByDate | null>({
  key: "bucketsByDateState",
  default: {},
});

export const bucketsByDateLoadingState = atom<boolean>({
  key: "bucketsByDateLoadingState",
  default: true,
});

export const bucketsByDateErrorState = atom<string | null>({
  key: "bucketsByDateErrorState",
  default: null,
});

// Custom Hooks
export const useBuckets = () => {
  const [allBuckets, setAllBuckets] = useRecoilState(allBucketsState);
  const period = useRecoilValue(periodState);
  const [periodCount, setPeriodCount] = useRecoilState(periodCountState);
  const [bucketsByDate, setBucketsByDate] = useRecoilState(bucketsByDateState);
  const setAllBucketsLoading = useSetRecoilState(allBucketsLoadingState);
  const setAllBucketsError = useSetRecoilState(allBucketsErrorState);
  const setBucketsByDateLoading = useSetRecoilState(bucketsByDateLoadingState);

  const fetchAllBuckets = useCallback(async () => {
    setAllBucketsLoading(true);
    try {
      const response = await axiosInstance.get("buckets");
      setAllBuckets(response.data);
    } catch (error) {
      setAllBucketsError("データの取得に失敗しました");
      console.error(error);
    } finally {
      setAllBucketsLoading(false);
    }
  }, [setAllBuckets, setAllBucketsLoading, setAllBucketsError]);

  const fetchBucketsByPeriod = useCallback(
    async (date: Date) => {
      setBucketsByDateLoading(true);
      try {
        const response = await axiosInstance.get("buckets/show_buckets", {
          params: {
            date: date.toISOString().split("T")[0],
            period,
          },
        });
        setBucketsByDate(response.data);
      } catch (error) {
        setAllBucketsError("データの取得に失敗しました");
        console.error(error);
      } finally {
        setBucketsByDateLoading(false);
      }
    },
    [period, setBucketsByDate, setBucketsByDateLoading, setAllBucketsError]
  );

  const createBucket = useCallback(
    async (newBucket: Omit<Bucket, "id" | "user_id">) => {
      try {
        const response = await axiosInstance.post("buckets", newBucket);
        setAllBuckets((prevBuckets) => [...prevBuckets, response.data]);
      } catch (error) {
        setAllBucketsError("新しいバケットの作成に失敗しました");
        console.error(error);
      }
    },
    [setAllBuckets, setAllBucketsError]
  );

  useEffect(() => {
    const targetDate = new Date();
    period === "week"
      ? targetDate.setDate(targetDate.getDate() - 7 * periodCount)
      : targetDate.setMonth(targetDate.getMonth() - periodCount);
    fetchBucketsByPeriod(targetDate);
  }, [fetchBucketsByPeriod, period, periodCount]);

  return {
    allBuckets,
    allBucketsLoading: useRecoilValue(allBucketsLoadingState),
    error: useRecoilValue(allBucketsErrorState),
    bucketsByDate,
    bucketsByDateLoading: useRecoilValue(bucketsByDateLoadingState),
    fetchAllBuckets,
    createBucket,
  };
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

  const uniqueDays = Array.from(
    new Set(
      buckets.map((bucket) => {
        const date = new Date(bucket.starttime * 1000);
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
