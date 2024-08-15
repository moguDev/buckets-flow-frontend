"use client";
import { signup } from "@/libs/auth";
import { authErrorState, authLoadingState } from "@/recoil/authState";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function SignupPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [termIsChecked, setTermIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error] = useRecoilState(authErrorState);
  const env = process.env.NEXT_PUBLIC_ENV;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signup(email, password, passwordConfirmation, userName);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return env === "dev" ? (
    <div className="max-w-4xl mx-auto p-2 placeholder:bg-opacity-0 shadow-md rounded-lg">
      <div className="flex items-center">
        <span className="material-icons text-blue-200 pr-2">person_add</span>
        <h3 className="font-bold text-2xl py-3 text-blue-200">
          アカウント作成
        </h3>
      </div>
      {error && <p className="text-red-500">{}</p>}
      <div className="relative">
        {loading && (
          <div className="absolute flex items-center justify-center bg-theme bg-opacity-90 h-full w-full">
            <p className="flex items-center text-blue-300 opacity-50">
              <span className="loading loading-spinner loading-xs mr-2" />
              アカウントを作成しています...
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="px-3">
          <div className="form-control pb-5">
            <label className="label">
              <span className="label-text text-blue-200 text-opacity-70">
                アカウント名
                <span className="text-orange-600 text-xs">【必須】</span>
              </span>
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input border-b border-blue-500 border-opacity-20 bg-opacity-0 text-blue-200 rounded-xl"
              placeholder="アカウント名"
              required
            />
          </div>
          <div className="form-control pb-5">
            <label className="label ">
              <span className="label-text text-blue-200 text-opacity-70">
                メールアドレス
                <span className="text-orange-600 text-xs">【必須】</span>
              </span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input border-b border-blue-500 border-opacity-20 bg-opacity-0 text-blue-200 rounded-xl"
              placeholder="user@example.com"
              required
            />
          </div>
          <div className="form-control pb-5">
            <label className="label">
              <span className="label-text text-blue-200 text-opacity-70">
                パスワード
                <span className="text-orange-600 text-xs">【必須】</span>
              </span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input border-b border-blue-500 border-opacity-20 bg-theme text-blue-200 rounded-xl"
              required
            />
          </div>
          <div className="form-control pb-5">
            <label className="label">
              <span className="label-text text-blue-200 text-opacity-70">
                パスワード（確認用）
                <span className="text-orange-600 text-xs">【必須】</span>
              </span>
            </label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="input border-b border-blue-500 border-opacity-20 bg-theme text-blue-200 rounded-xl"
              required
            />
          </div>
          <div className="form-control p-3">
            <label className="flex items-center cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={termIsChecked}
                onClick={() => setTermIsChecked((prev) => !prev)}
                className="checkbox checkbox-info mr-1"
              />
              <span>
                <a
                  href="/terms"
                  className="underline text-blue-300 px-1"
                  target="_blank"
                >
                  利用規約
                </a>
                および
                <a
                  href="/privacy"
                  className="underline text-blue-300 px-1"
                  target="_blank"
                >
                  プライバシーポリシー
                </a>
                に同意しました。
              </span>
            </label>
          </div>
          <div className="modal-action">
            <Link
              href="/"
              className="btn border-none text-gray-300 font-thin bg-opacity-0"
            >
              キャンセル
            </Link>
            <button
              type="submit"
              className={`btn font-bold text-blue-300 border-none bg-opacity-0`}
              disabled={!termIsChecked}
            >
              新規アカウント作成
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div>メンテナンス中</div>
  );
}
