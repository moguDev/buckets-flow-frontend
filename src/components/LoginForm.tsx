"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const defaultValues = { email: "", password: "" };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [error, setError] = useState("");
  const { login, loading } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      const checkbox = document.getElementById(
        "login-modal"
      ) as HTMLInputElement;
      checkbox.checked = false;
    } catch (error) {
      setError("ログインに失敗しました。");
    }
  };

  return (
    <div className="backdrop-blur-sm bg-gray-700 bg-opacity-10 px-5 pb-6 rounded-xl">
      <div className="flex items-center pt-6 pb-3 text-blue-300">
        <span className="material-icons text-sm pr-3">login</span>
        <p>ログイン</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
        <div className="form-control pb-1">
          <div className="flex items-center border-b border-blue-500 border-opacity-20 p-1">
            <span className="material-icons text-gray-700 p-1">mail</span>
            <input
              type="email"
              className="input bg-opacity-0 text-blue-200 placeholder-gray-700 border-none focus:outline-none rounded w-full"
              placeholder="メールアドレス"
              autoComplete="email"
              {...register("email", {
                required: "メールアドレスを入力してください。",
                pattern: {
                  value: /^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i,
                  message: "メールアドレスの形式が不正です。",
                },
              })}
            />
          </div>
        </div>
        <div className="form-control pb-3">
          <div className="flex items-center border-b border-blue-500 border-opacity-20 p-1">
            <span className="material-icons text-gray-700 p-1 text-center">
              password
            </span>
            <input
              type="password"
              className="input bg-opacity-0 text-blue-200 placeholder-gray-700 border-none rounded focus:outline-none w-full"
              placeholder="パスワード"
              autoComplete="current-password"
              {...register("password", {
                required: "パスワードを入力してください。",
                minLength: {
                  value: 8,
                  message: "パスワードは8文字以上にしてください。",
                },
              })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn font-bold bg-blue-900 text-blue-300 border-none bg-opacity-20 w-full"
        >
          ログイン
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <div className="divider text-xs">または</div>
      <Link
        href="/signup"
        className="btn bg-blue-900 text-blue-300 border-none bg-opacity-30 w-full"
      >
        <span className="material-icons" style={{ fontSize: "20px" }}>
          person_add
        </span>
        <span>新規アカウントの作成</span>
      </Link>
    </div>
  );
};
