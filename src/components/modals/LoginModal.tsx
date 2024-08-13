"use client";
import { useState } from "react";

const LoginModal = ({
  login,
}: {
  login: (email: string, password: string) => Promise<void>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      const checkbox = document.getElementById(
        "my-modal-4"
      ) as HTMLInputElement;
      checkbox.checked = false;
    } catch (error) {
      setError("ログインに失敗しました。");
    }
  };

  return (
    <div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-gray-900 backdrop-blur-sm">
          <div className="flex items-center">
            <span className="material-icons text-blue-200 opacity-50 pr-2">
              login
            </span>
            <h3 className="font-bold text-xl py-3 text-blue-200">ログイン</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-control pb-2">
              <label className="label ">
                <span className="label-text text-blue-200 text-opacity-70">
                  *メールアドレス
                </span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input border-none bg-opacity-5 text-blue-200"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-blue-200 text-opacity-70">
                  *パスワード
                </span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input border-none bg-opacity-5 text-blue-200"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="modal-action">
              <label
                htmlFor="my-modal-4"
                className="btn border-none text-gray-300 bg-opacity-0"
              >
                キャンセル
              </label>
              <button
                type="submit"
                className="btn bg-blue-800 bg-opacity-80 text-white border-none"
              >
                ログイン
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
