import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/libs/axiosInstance";

// Preferenceの型定義
export interface Preference {
  id: number;
  user_id: number;
  timer_duration: number; // タイマーの時間
  break_duration: number; // 休憩の時間
  long_break_duration: number; // 長い休憩の時間
}

// カスタムフックの定義
export const usePreferences = () => {
  const [preference, setPreference] = useState<Preference | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // current_userのPreferenceを取得
  const fetchCurrentUserPreference = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("preferences/current");
      setPreference(response.data);
    } catch (error) {
      setError("Preferenceの取得に失敗しました");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Preferenceを作成
  const createPreference = useCallback(
    async (newPreference: Omit<Preference, "id" | "user_id">) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.post("preferences", newPreference);
        setPreference(response.data);
      } catch (error) {
        setError("Preferenceの作成に失敗しました");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Preferenceを更新
  const updatePreference = useCallback(
    async (updatedPreference: Partial<Preference>) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.put(
          `preferences/${preference?.id}`,
          updatedPreference
        );
        setPreference(response.data);
      } catch (error) {
        setError("Preferenceの更新に失敗しました");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [preference?.id]
  );

  // Preferenceを削除
  const deletePreference = useCallback(async () => {
    if (!preference) return;

    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`preferences/${preference.id}`);
      setPreference(null);
    } catch (error) {
      setError("Preferenceの削除に失敗しました");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [preference]);

  useEffect(() => {
    fetchCurrentUserPreference();
  }, [fetchCurrentUserPreference]);

  return {
    preference,
    loading,
    error,
    fetchCurrentUserPreference,
    createPreference,
    updatePreference,
    deletePreference,
  };
};
