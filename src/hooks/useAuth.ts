import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import Cookies from "js-cookie";
import { login as loginUser } from "@/lib/auth";
import { logout as logoutUser } from "@/lib/auth";
import { signup as signupUser } from "@/lib/auth";
import { useEffect, useCallback } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { successMessageState } from "@/components/MyComponents";

const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
    userName: "",
  },
});

const isAuthenticatedSelector = selector({
  key: "isAuthenticatedSelector",
  get: ({ get }) => get(authState).isAuthenticated,
});

const userNameSelector = selector({
  key: "userNameSelector",
  get: ({ get }) => get(authState).userName,
});

const loadingState = atom<boolean>({
  key: "loadingState",
  default: false,
});

const errorState = atom<string | null>({
  key: "errorState",
  default: null,
});

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const setLoading = useSetRecoilState(loadingState);
  const setError = useSetRecoilState(errorState);
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
      } catch (error) {
        setAuth({ isAuthenticated: false, userName: "" });
      } finally {
        setLoading(false);
        setError("");
      }
    }
  }, [setAuth]);

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
      } catch (error) {
        console.log(error);
        setError("サインアップに失敗しました。");
      } finally {
        setLoading(false);
        setSuccessMessage(`bucket Flowへようこそ！`);
      }
    },
    [setAuth]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const { data } = await loginUser(email, password);
        setAuth({ isAuthenticated: true, userName: data.name });
      } catch (error) {
        console.error("ログインに失敗しました:", error);
        throw new Error("ログインに失敗しました。");
      } finally {
        setLoading(false);
        setSuccessMessage("ログインしました。");
      }
    },
    [setAuth]
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await logoutUser();
      setAuth({ isAuthenticated: false, userName: "" });
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
      throw new Error("ログアウトに失敗しました。");
    } finally {
      setLoading(false);
      setSuccessMessage("ログアウトしました。");
    }
  }, [setAuth]);

  return {
    isAuthenticated: auth.isAuthenticated,
    userName: auth.userName,
    loading: useRecoilValue(loadingState),
    signup,
    login,
    logout,
  };
};
