// lib/auth.ts
import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

interface LoginResponse {
  data: {
    email: string;
    // 他の必要なユーザーデータ
  };
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post("auth/sign_in", {
      email,
      password,
    });

    // レスポンスヘッダーからトークンを取得してクッキーに保存
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
    // エラーメッセージの処理
    console.error("ログインに失敗しました:", error);
    throw new Error("ログインに失敗しました。");
  }
};

export const logout = async (): Promise<void> => {
  try {
    // サーバーサイドでログアウトリクエストを送信
    await axiosInstance.delete("auth/sign_out");

    // クッキーを削除
    Cookies.remove("access-token");
    Cookies.remove("client");
    Cookies.remove("uid");
  } catch (error) {
    // エラーメッセージの処理
    console.error("ログアウトに失敗しました:", error);
    throw new Error("ログアウトに失敗しました。");
  }
};
