// hooks/useBuckets.ts
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

interface Bucket {
  id: number;
  user_id: number;
  filled: boolean;
  duration: number;
  storage: number;
  starttime: number;
  endtime: number;
  // その他のプロパティ
}

export const useBuckets = () => {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuckets = async () => {
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

    fetchBuckets();
  }, []);

  return { buckets, loading, error };
};

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
