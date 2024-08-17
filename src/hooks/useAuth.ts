import { atom, selector, useRecoilState, useSetRecoilState } from "recoil";
import Cookies from "js-cookie";
import { login as loginUser } from "@/lib/auth";
import { logout as logoutUser } from "@/lib/auth";
import { signup as signupUser } from "@/lib/auth";
import { useCallback, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { successMessageState } from "@/components/MyComponents";
import { redirect } from "next/navigation";

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

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
          userName: userName,
        });
        setError("");
      } catch (error) {
        setAuth({ isAuthenticated: false, userName: "" });
      } finally {
        setLoading(false);
      }
    }
  }, [setAuth]);

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
        setSuccessMessage(`bucket Flowへようこそ！`);
      } catch (error) {
        console.log(error);
        throw new Error("サインアップに失敗しました。");
      } finally {
        setLoading(false);
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
        setSuccessMessage("ログインしました。");
      } catch (error) {
        console.error("ログインに失敗しました:", error);
        throw new Error("ログインに失敗しました。");
      } finally {
        setLoading(false);
      }
    },
    [setAuth]
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await logoutUser();
      setAuth({ isAuthenticated: false, userName: "" });
      setSuccessMessage("ログアウトしました。");
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
      throw new Error("ログアウトに失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [setAuth]);

  return {
    isAuthenticated: auth.isAuthenticated,
    userName: auth.userName,
    loading,
    error,
    checkAuth,
    signup,
    login,
    logout,
  };
};
