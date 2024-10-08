// lib/auth.ts
import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

interface LoginResponse {
  data: {
    email: string;
    name: string;
  };
}

export const signup = async (
  email: string,
  password: string,
  passwordConfirmation: string,
  userName: string
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post("auth", {
      email,
      password,
      password_confirmation: passwordConfirmation,
      name: userName,
    });

    const { "access-token": accessToken, client, uid } = response.headers;

    if (accessToken && client && uid) {
      Cookies.set("access-token", accessToken, {
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("client", client, { secure: true, sameSite: "strict" });
      Cookies.set("uid", uid, { secure: true, sameSite: "strict" });
    }
    return response.data;
  } catch (error) {
    console.error("サインアップに失敗しました:", error);
    throw new Error("サインアップに失敗しました。");
  }
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post("auth/sign_in", {
      email,
      password,
    });

    const { "access-token": accessToken, client, uid } = response.headers;

    if (accessToken && client && uid) {
      Cookies.set("access-token", accessToken, {
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("client", client, { secure: true, sameSite: "strict" });
      Cookies.set("uid", uid, { secure: true, sameSite: "strict" });
    }

    return response.data;
  } catch (error) {
    console.error("ログインに失敗しました:", error);
    throw new Error("ログインに失敗しました。");
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.delete("auth/sign_out");
    Cookies.remove("access-token");
    Cookies.remove("client");
    Cookies.remove("uid");
  } catch (error) {
    console.error("ログアウトに失敗しました:", error);
    throw new Error("ログアウトに失敗しました。");
  }
};

export const updateName = async (name: string): Promise<void> => {
  try {
    const response = await axiosInstance.put("/auth", { name });

    if (response.status === 200) {
      console.log("名前が更新されました:", response.data);
    }
  } catch (error) {
    console.error("名前の更新に失敗しました:", error);
    throw new Error("名前の更新に失敗しました。");
  }
};
