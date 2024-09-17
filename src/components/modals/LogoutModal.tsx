"use client";
import { useAuth } from "@/hooks/useAuth";

export default function LogoutModal() {
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("ログアウト中にエラーが発生しました:", error);
    }
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box bg-theme bg-opacity-90 border-2 border-blue-300 border-opacity-10 backdrop-blur-sm">
        <p className="py-4 text-lg font-semibold text-blue-300">
          ログアウトしますか？
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn text-gray-200 bg-opacity-0 font-thin border-none">
              キャンセル
            </button>
            <button
              onClick={handleLogout}
              className="btn bg-opacity-0 text-blue-300 font-bold border-none"
            >
              ログアウト
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
