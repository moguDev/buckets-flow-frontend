"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

type FormData = {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export default function SignupPage() {
  const router = useRouter();
  const defaultValues = {
    userName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ defaultValues });
  const [termIsChecked, setTermIsChecked] = useState(false);

  const { signup, loading } = useAuth();
  const [error, setError] = useState("");
  const env = process.env.NEXT_PUBLIC_ENV;

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      await signup(
        data.email,
        data.password,
        data.passwordConfirmation,
        data.userName
      );
      router.push("/");
    } catch (error) {
      setError("アカウントの作成に失敗しました。");
    }
  };

  return env === "dev" ? (
    <div className="max-w-4xl mx-auto placeholder:bg-opacity-0 shadow-md rounded-lg">
      <div className="flex items-center">
        <span className="material-icons text-blue-200 pr-2">person_add</span>
        <h3 className="font-bold text-2xl py-3 text-blue-200">
          アカウント作成
        </h3>
      </div>
      {error && <p className="text-red-500 relative p-3 w-full">{error}</p>}
      <div className="relative">
        {loading && (
          <div className="absolute flex items-center justify-center bg-theme bg-opacity-90 h-full w-full">
            <p className="flex items-center text-blue-300 opacity-50">
              <span className="loading loading-spinner loading-xs mr-2" />
              アカウントを作成しています...
            </p>
          </div>
        )}
        {/* ここからフォーム */}
        <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
          <div className="flex flex-col p-2">
            <label htmlFor="userName" className="text-sm p-1">
              アカウント名
              <span className="text-orange-600 text-xs">【必須】</span>
            </label>
            <input
              id="userName"
              type="text"
              className="input border-b border-blue-500 border-opacity-20 bg-opacity-0 text-blue-200 rounded-xl"
              {...register("userName", {
                required: "アカウント名を入力してください。",
                maxLength: {
                  value: 32,
                  message: "アカウント名は32文字以内にしてください。",
                },
              })}
            />
            <div className="text-red-500 text-xs p-1">
              {errors.userName?.message}
            </div>
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="email" className="text-sm p-1">
              メールアドレス
              <span className="text-orange-600 text-xs">【必須】</span>
            </label>
            <input
              id="email"
              type="email"
              className="input border-b border-blue-500 border-opacity-20 bg-opacity-0 text-blue-200 rounded-xl"
              {...register("email", {
                required: "メールアドレスを入力してください。",
                pattern: {
                  value: /^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i,
                  message: "メールアドレスの形式が不正です。",
                },
              })}
            />
            <div className="text-red-500 text-xs p-1">
              {errors.email?.message}
            </div>
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="password" className="text-sm p-1">
              パスワード
              <span className="text-orange-600 text-xs">【必須】</span>
            </label>
            <input
              id="password"
              type="password"
              className="input border-b border-blue-500 border-opacity-20 bg-opacity-0 text-blue-200 rounded-xl"
              {...register("password", {
                required: "パスワードを入力してください。",
                minLength: {
                  value: 8,
                  message: "パスワードは8文字以上にしてください。",
                },
              })}
            />
            <div className="text-red-500 text-xs p-1">
              {errors.password?.message}
            </div>
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="passwordConfirmation" className="text-sm p-1">
              パスワード（確認用）
              <span className="text-orange-600 text-xs">【必須】</span>
            </label>
            <input
              id="passwordConfirmation"
              type="password"
              className="input border-b border-blue-500 border-opacity-20 bg-opacity-0 text-blue-200 rounded-xl"
              {...register("passwordConfirmation", {
                required: "パスワード（確認用）を入力してください。",
                validate: (value) => {
                  return (
                    value === getValues("password") ||
                    "パスワード（確認用）が一致しません。"
                  );
                },
              })}
            />
            <div className="text-red-500 text-xs p-1">
              {errors.passwordConfirmation?.message}
            </div>
          </div>
          <div className="p-3">
            <label className="flex items-center cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={termIsChecked}
                onClick={() => setTermIsChecked((prev) => !prev)}
                className="checkbox checkbox-info mr-1"
              />
              <span>
                <label
                  htmlFor="my-modal-2"
                  className="underline text-blue-300 px-1 cursor-pointer"
                >
                  利用規約
                </label>
                および
                <label
                  htmlFor="my-modal-3"
                  className="underline text-blue-300 px-1 cursor-pointer"
                >
                  プライバシーポリシー
                </label>
                に同意しました。
              </span>
            </label>
          </div>
          <div className="flex items-center justify-end p-2">
            <button
              className={`btn font-thin text-gray-300 border-none bg-opacity-0 mr-1`}
            >
              <Link href="/">キャンセル</Link>
            </button>
            <button
              type="submit"
              className={`btn font-bold text-blue-300 border-none bg-opacity-0 ml-1`}
              disabled={!termIsChecked}
            >
              アカウント作成
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div>メンテナンス中</div>
  );
}
