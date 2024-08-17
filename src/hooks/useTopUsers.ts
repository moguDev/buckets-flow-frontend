import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useCallback } from "react";

export const leaderBoardPeriodState = atom<string>({
  key: "leaderBoardPeriodState",
  default: "week",
});

export const topUsersState = atom<any[]>({
  key: "topUsersState",
  default: [],
});

export const topUsersLoadingState = atom<boolean>({
  key: "topUsersLoadingState",
  default: true,
});

export const topUsersErrorState = atom<string | null>({
  key: "topUsersErrorState",
  default: null,
});

export const useTopUsers = () => {
  const [period, setPeriod] = useRecoilState(leaderBoardPeriodState);
  const [topUsers, setTopUsers] = useRecoilState(topUsersState);
  const setLoading = useSetRecoilState(topUsersLoadingState);
  const setError = useSetRecoilState(topUsersErrorState);

  const fetchTopUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("buckets/show_top_users", {
        params: {
          period,
        },
      });
      setTopUsers(response.data);
    } catch (e) {
      setError("データの取得に失敗しました");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchTopUsers();
  }, [fetchTopUsers]);

  return {
    topUsers,
    fetchTopUsers,
    period,
    setPeriod,
    loading: useRecoilValue(topUsersLoadingState),
  };
};
