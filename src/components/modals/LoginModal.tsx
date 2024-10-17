"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const LoginModal = () => {
  const defaultValues = { email: "", password: "" };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const emailRef = useRef<HTMLInputElement | null>(null);

  // モーダルが開かれたときにフォーカスを設定
  useEffect(() => {
    const checkbox = document.getElementById("login-modal") as HTMLInputElement;
    const handleFocus = () => {
      if (emailRef.current) emailRef.current.focus();
    };
    checkbox?.addEventListener("change", handleFocus);
    return () => checkbox?.removeEventListener("change", handleFocus);
  }, []);

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
    <div>
      <input type="checkbox" id="login-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-theme bg-opacity-90 border-2 border-blue-300 border-opacity-10 backdrop-blur-sm">
          <div className="flex items-center">
            <span className="material-icons text-blue-200 opacity-50 pr-2">
              login
            </span>
            <h3 className="font-bold text-xl py-3 text-blue-200">ログイン</h3>
          </div>
          <div className="relative">
            {loading && (
              <div className="absolute flex items-center justify-center bg-theme bg-opacity-90 h-full w-full">
                <p className="flex items-center text-blue-300 opacity-80">
                  <span className="loading loading-spinner loading-xs mr-2" />
                  ログイン中...
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
              <div className="form-control pb-3">
                <label htmlFor="email" className="label">
                  <span className="label-text text-blue-200 text-opacity-70">
                    メールアドレス
                  </span>
                </label>
                <div className="flex items-center border border-blue-500 border-opacity-20 rounded-xl px-2 py-1">
                  <span className="material-icons text-gray-700 mx-1">
                    mail
                  </span>
                  <input
                    type="email"
                    className="input bg-opacity-0 text-blue-200 placeholder-gray-700 border-none focus:outline-none rounded-xl w-full"
                    placeholder="user@example.com"
                    autoComplete="email"
                    {...register("email", {
                      required: "メールアドレスを入力してください。",
                      pattern: {
                        value:
                          /^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i,
                        message: "メールアドレスの形式が不正です。",
                      },
                    })}
                  />
                </div>
              </div>
              <div className="form-control pb-3">
                <label htmlFor="password" className="label">
                  <span className="label-text text-blue-200 text-opacity-70">
                    パスワード
                  </span>
                </label>
                <div className="flex items-center border border-blue-500 border-opacity-20 rounded-xl px-2 py-1">
                  <span className="material-icons text-gray-700 mx-1">
                    password
                  </span>
                  <input
                    type="password"
                    className="input bg-theme text-blue-200 placeholder-gray-700 border-none rounded-xl focus:outline-none w-full"
                    placeholder="半角英数のみ8文字以上"
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
              <Link href="/signup" className="text-blue-400 text-xs mx-3">
                新規アカウントの作成
              </Link>
              {error && <p className="text-red-500">{error}</p>}
              <div className="modal-action">
                <label
                  htmlFor="login-modal"
                  className="btn border-none text-gray-300 font-thin bg-opacity-0"
                >
                  キャンセル
                </label>
                <button
                  type="submit"
                  className="btn font-bold text-blue-300 border-none bg-opacity-0"
                >
                  ログイン
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
