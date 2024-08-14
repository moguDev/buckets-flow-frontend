import { atom, selector, useRecoilState } from "recoil";
import Cookies from "js-cookie";
import { login as loginUser, logout as logoutUser } from "@/libs/auth";
import { useBuckets } from "./bucketsState";
import { useEffect, useCallback } from "react";
import axiosInstance from "@/libs/axiosInstance";

export const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
    userName: "",
  },
});

export const isAuthenticatedSelector = selector({
  key: "isAuthenticatedSelector",
  get: ({ get }) => get(authState).isAuthenticated,
});

export const userNameSelector = selector({
  key: "userNameSelector",
  get: ({ get }) => get(authState).userName,
});

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const { fetchAllBuckets } = useBuckets();

  const checkAuth = useCallback(async () => {
    const token = Cookies.get("access-token");
    const client = Cookies.get("client");
    const uid = Cookies.get("uid");

    if (token && client && uid) {
      try {
        const response = await axiosInstance.get("/auth/validate_token", {
          headers: {
            "access-token": token,
            client: client,
            uid: uid,
          },
        });

        const userName = response.data.data.name;

        setAuth({
          isAuthenticated: true,
          userName: userName, // ユーザー名を設定
        });

        fetchAllBuckets();
      } catch (error) {
        console.error("認証トークンの検証に失敗しました:", error);
        setAuth({ isAuthenticated: false, userName: "" });
      }
    }
  }, [setAuth, fetchAllBuckets]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { data } = await loginUser(email, password);
        setAuth({ isAuthenticated: true, userName: data.name });
        fetchAllBuckets();
      } catch (error) {
        console.error("ログインに失敗しました:", error);
        throw new Error("ログインに失敗しました。");
      }
    },
    [setAuth, fetchAllBuckets]
  );

  const logout = useCallback(async () => {
    try {
      await logoutUser();
      setAuth({ isAuthenticated: false, userName: "" });
      fetchAllBuckets();
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
      throw new Error("ログアウトに失敗しました。");
    }
  }, [setAuth, fetchAllBuckets]);

  return {
    isAuthenticated: auth.isAuthenticated,
    userName: auth.userName, // ユーザー名を返す
    login,
    logout,
  };
};
