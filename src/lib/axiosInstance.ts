// lib/axiosInstance.ts
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/`,
});

// リクエストインターセプターを追加して、クッキーからトークンを取得
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access-token");
    const client = Cookies.get("client");
    const uid = Cookies.get("uid");

    if (token && client && uid) {
      config.headers["access-token"] = token;
      config.headers["client"] = client;
      config.headers["uid"] = uid;
    }

    return config;
  },
  (error) => {
    // リクエストエラーの処理
    return Promise.reject(error);
  }
);

export default axiosInstance;
