import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRecoilState } from "recoil";
import { durationPreferenceState, TimerState } from "./useTimer";

export interface Preference {
  id: number;
  user_id: number;
  timer_duration: number;
  break_duration: number;
  long_break_duration: number;
}

export const usePreferences = () => {
  const [durationPreference, setDurationPreference] = useRecoilState(
    durationPreferenceState
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPreference = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("preferences");
      setDurationPreference({
        [TimerState.WORKING]: response.data["timer_duration"],
        [TimerState.BREAK]: response.data["break_duration"],
        [TimerState.LONG_BREAK]: response.data["long_break_duration"],
      });
    } catch (error) {
      setError("Preferenceの取得に失敗しました");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePreference = useCallback(
    async (updatedPreference: Partial<Preference>) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.put(
          "preferences",
          updatedPreference
        );
      } catch (error) {
        setError("Preferenceの更新に失敗しました");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchPreference();
  }, [fetchPreference]);

  return {
    loading,
    error,
    fetchPreference,
    updatePreference,
  };
};
