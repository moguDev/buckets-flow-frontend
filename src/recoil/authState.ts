import { atom, selector, useRecoilState, useSetRecoilState } from "recoil";
import Cookies from "js-cookie";
import { login as loginUser } from "@/libs/auth";
import { logout as logoutUser } from "@/libs/auth";
import { signup as signupUser } from "@/libs/auth";
import { useBuckets } from "./bucketsState";
import { useEffect, useCallback } from "react";
import axiosInstance from "@/libs/axiosInstance";
import { SuccessMessage, successMessageState } from "@/components/MyComponents";

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

export const authLoadingState = atom<boolean>({
  key: "loadingState",
  default: false,
});

export const authErrorState = atom<string | null>({
  key: "errorState",
  default: null,
});

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const { fetchAllBuckets } = useBuckets();
  const setLoading = useSetRecoilState(authLoadingState);
  const setError = useSetRecoilState(authErrorState);
  const setSuccessMessage = useSetRecoilState(successMessageState);

  const checkAuth = useCallback(async () => {
    const token = Cookies.get("access-token");
    const client = Cookies.get("client");
    const uid = Cookies.get("uid");

    if (token && client && uid) {
      setLoading(true);
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
        setAuth({ isAuthenticated: false, userName: "" });
      } finally {
        setLoading(false);
        setError("");
      }
    }
  }, [setAuth, fetchAllBuckets]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const signup = useCallback(
    async (
      email: string,
      password: string,
      passwordConfirmation: string,
      userName: string
    ) => {
      setLoading(true);
      try {
        const { data } = await signupUser(
          email,
          password,
          passwordConfirmation,
          userName
        );
        setAuth({ isAuthenticated: true, userName: data.name });
        fetchAllBuckets();
      } catch (error) {
        console.log(error);
        setError("サインアップに失敗しました。");
      } finally {
        setLoading(false);
        setSuccessMessage(`bucket Flowへようこそ！`);
      }
    },
    [setAuth, fetchAllBuckets]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const { data } = await loginUser(email, password);
        setAuth({ isAuthenticated: true, userName: data.name });
        fetchAllBuckets();
      } catch (error) {
        console.error("ログインに失敗しました:", error);
        throw new Error("ログインに失敗しました。");
      } finally {
        setLoading(false);
        setSuccessMessage("ログインしました。");
      }
    },
    [setAuth, fetchAllBuckets]
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await logoutUser();
      setAuth({ isAuthenticated: false, userName: "" });
      fetchAllBuckets();
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
      throw new Error("ログアウトに失敗しました。");
    } finally {
      setLoading(false);
      setSuccessMessage("ログアウトしました。");
    }
  }, [setAuth, fetchAllBuckets]);

  return { signup, login, logout };
};
