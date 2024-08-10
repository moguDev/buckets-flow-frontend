// components/Header.tsx
"use client";
import { useAuth } from "@/recoil/authState";
import LoginModal from "./modals/LoginModal";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("ログアウト中にエラーが発生しました:", error);
    }
  };

  return (
    <header className="fixed top-0 h-16 w-full px-5 z-50">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center">
          <span className="material-icons text-blue-300 mr-1">water_drop</span>
          <p className="text-blue-300 text-2xl font-bold brightness-120">
            <span className="text-xl font-thin ">buckets </span>Flow
          </p>
        </div>
        {isAuthenticated ? (
          <button
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_1"
              ) as HTMLDialogElement;
              modal !== null && modal.showModal();
            }}
            className="flex items-center text-blue-300 bg-opacity-0 border-none btn"
          >
            <span className="material-icons text-xs">logout</span>
            <p className="font-normal">ログアウト</p>
          </button>
        ) : (
          <label
            htmlFor="my-modal-4"
            className="flex items-center text-blue-300 bg-opacity-0 border-none btn"
          >
            <span className="material-icons text-xs">login</span>
            <p className="font-normal">ログイン</p>
          </label>
        )}
      </div>
      <LoginModal />
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-gray-900 bg-opacity-80 backdrop-blur-sm">
          <p className="py-4 text-blue-100">ログアウトしますか？</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn text-blue-100 bg-opacity-0 border-none">
                キャンセル
              </button>
              <button
                onClick={handleLogout}
                className="btn text-white bg-red-900 border-none"
              >
                ログアウト
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </header>
  );
}
