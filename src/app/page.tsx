"use client";
import Timer from "@/components/Timer";
import { RecoilRoot, useRecoilValue } from "recoil";
import RainBackground from "@/components/RainBackground";
import Header from "@/components/Header";
import MenuBar, { menuBarIsHiddenState } from "@/components/MenuBar";
import LoginModal from "@/components/modals/LoginModal";
import { useAuth } from "@/recoil/authState";

export default function Home() {
  const { isAuthenticated, userName, login, logout } = useAuth();
  const menuBarIsHidden = useRecoilValue(menuBarIsHiddenState);
  const props = { isAuthenticated, userName, login, logout };
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("ログアウト中にエラーが発生しました:", error);
    }
  };
  return (
    <>
      <Header {...props} />
      <RainBackground />
      <div className="lg:flex w-full h-full pt-20 pb-3 lg:px-10 px-5 bg-opacity-0">
        <div
          className={`flex flex-col items-center py-5 transition-all duration-300 ${
            menuBarIsHidden ? "w-full" : "lg:w-2/3 lg:pt-5`"
          }`}
        >
          <Timer />
        </div>
        <div
          className={`
            ${menuBarIsHidden ? "w-0 h-0 overflow-hidden" : "lg:w-1/3 lg:pt-5"}
          `}
        >
          <MenuBar {...props} />
        </div>
      </div>
      <LoginModal {...props} />
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
    </>
  );
}
