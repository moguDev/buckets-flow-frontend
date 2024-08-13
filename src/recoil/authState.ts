import { atom, selector, useRecoilState, useSetRecoilState } from "recoil";
import Cookies from "js-cookie";
import { login as loginUser, logout as logoutUser } from "@/libs/auth";
import { useBuckets } from "./bucketsState"; // Buckets関連のカスタムフックのインポート
import { useEffect, useCallback } from "react";

// アトム定義
export const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
  },
});

export const userNameState = atom({
  key: "userNameState",
  default: "user-name",
});

// セレクタ定義
export const isAuthenticatedSelector = selector({
  key: "isAuthenticatedSelector",
  get: ({ get }) => get(authState).isAuthenticated,
});

// カスタムフック
export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const setUserName = useSetRecoilState(userNameState);
  const { fetchAllBuckets } = useBuckets(); // Buckets関連のカスタムフックの利用

  // 認証状態をチェックする関数
  const checkAuth = useCallback(() => {
    const token = Cookies.get("access-token");
    const client = Cookies.get("client");
    const uid = Cookies.get("uid");

    if (token && client && uid) {
      setAuth({ isAuthenticated: true });
      fetchAllBuckets();
    }
  }, [setAuth, fetchAllBuckets]);

  // コンポーネントの初回レンダリング時に認証状態をチェック
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ログイン処理
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { data } = await loginUser(email, password);
        setAuth({ isAuthenticated: true });
        setUserName(data.name);
        fetchAllBuckets();
      } catch (error) {
        console.error("ログインに失敗しました:", error);
        throw new Error("ログインに失敗しました。");
      }
    },
    [setAuth, setUserName, fetchAllBuckets]
  );

  // ログアウト処理
  const logout = useCallback(async () => {
    try {
      await logoutUser();
      setAuth({ isAuthenticated: false });
      fetchAllBuckets();
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
      throw new Error("ログアウトに失敗しました。");
    }
  }, [setAuth, fetchAllBuckets]);

  return {
    isAuthenticated: auth.isAuthenticated,
    login,
    logout,
  };
};
