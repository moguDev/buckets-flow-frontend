import { atom, selector, useRecoilState } from "recoil";
import Cookies from "js-cookie";
import { login as loginUser, logout as logoutUser } from "@/lib/auth";
import { useBuckets } from "./bucketsState"; // Buckets関連のカスタムフックのインポート
import { useEffect } from "react";

// Authに関する状態
export const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
  },
});

// Recoilのセレクターでの状態の取得
export const isAuthenticatedSelector = selector({
  key: "isAuthenticatedSelector",
  get: ({ get }) => {
    const auth = get(authState);
    return auth.isAuthenticated;
  },
});

// カスタムフックでログイン・ログアウトのロジックを提供
export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const { refetchBuckets } = useBuckets(); // Buckets関連のカスタムフックの利用

  const checkAuth = () => {
    const token = Cookies.get("access-token");
    const client = Cookies.get("client");
    const uid = Cookies.get("uid");

    if (token && client && uid) {
      setAuth({ isAuthenticated: true });
      refetchBuckets();
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    await loginUser(email, password);
    setAuth({ isAuthenticated: true });
    refetchBuckets();
  };

  const logout = async () => {
    try {
      await logoutUser();
      setAuth({ isAuthenticated: false });
      refetchBuckets();
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
      throw new Error("ログアウトに失敗しました。");
    }
  };

  return { isAuthenticated: auth.isAuthenticated, login, logout };
};
