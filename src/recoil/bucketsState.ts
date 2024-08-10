import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import axiosInstance from "@/libs/axiosInstance";
import { useEffect } from "react";

export interface Bucket {
  id: number;
  user_id: number;
  filled: boolean;
  duration: number;
  storage: number;
  starttime: number;
  endtime: number;
}

export const bucketsState = atom<Bucket[]>({
  key: "bucketsState",
  default: [],
});

export const loadingState = atom<boolean>({
  key: "loadingState",
  default: true,
});

export const errorState = atom<string | null>({
  key: "errorState",
  default: null,
});

// バケツ取得のカスタムフック
export const useBuckets = () => {
  const [buckets, setBuckets] = useRecoilState(bucketsState);
  const setLoading = useSetRecoilState(loadingState);
  const setError = useSetRecoilState(errorState);

  const fetchBuckets = async () => {
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
  };

  const createBucket = async (newBucket: Omit<Bucket, "id" | "user_id">) => {
    try {
      const response = await axiosInstance.post("buckets", newBucket);
      setBuckets((prevBuckets) => [...prevBuckets, response.data]);
    } catch (error) {
      setError("新しいバケットの作成に失敗しました");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBuckets();
  }, []);

  return {
    buckets,
    loading: useRecoilValue(loadingState),
    error: useRecoilValue(errorState),
    refetchBuckets: fetchBuckets,
    createBucket,
  };
};

/**
 * Functions.
 * */

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getTodayBuckets = (buckets: Bucket[]): Bucket[] => {
  const today = new Date();

  return buckets.filter((bucket) => {
    const bucketDate = new Date(bucket.starttime * 1000); // 秒単位のエポックタイムをミリ秒に変換
    return isSameDay(bucketDate, today);
  });
};

export const getMaxStreak = (buckets: Bucket[]): number => {
  if (buckets.length === 0) return 0;

  // バケットのstarttimeを日付に変換し、一意の日付のリストを作成
  const uniqueDays = new Set<string>(
    buckets.map((bucket) => {
      const date = new Date(bucket.starttime * 1000); // ミリ秒単位に変換
      return date.toISOString().split("T")[0]; // YYYY-MM-DD形式の日付文字列に変換
    })
  );

  // 日付を配列に変換し、昇順にソート
  const sortedDays = Array.from(uniqueDays).sort();

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < sortedDays.length; i++) {
    const prevDate = new Date(sortedDays[i - 1]);
    const currDate = new Date(sortedDays[i]);

    // 前の日付と現在の日付が連続しているか確認
    const diffInTime = currDate.getTime() - prevDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    if (diffInDays === 1) {
      // 連続している場合
      currentStreak++;
    } else {
      // 連続していない場合
      currentStreak = 1;
    }

    // 最大の継続日数を更新
    maxStreak = Math.max(maxStreak, currentStreak);
  }

  return maxStreak;
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getOldestBucketDate = (buckets: Bucket[]): string | null => {
  if (buckets.length === 0) {
    return null;
  }

  // 一番古いstarttimeを持つバケツを探す
  const oldestBucket = buckets.reduce(
    (oldest, bucket) => (bucket.starttime < oldest.starttime ? bucket : oldest),
    buckets[0]
  );

  // starttimeをDateオブジェクトに変換
  const date = new Date(oldestBucket.starttime * 1000); // 秒単位なのでミリ秒に変換

  // 年月日を取得
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}年${month}月${day}日`;
};
