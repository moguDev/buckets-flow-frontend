"use client";
import { useAuth } from "@/recoil/authState";
import { useRecoilValue } from "recoil";
import RainBackground from "@/components/RainBackground";
import Timer from "@/components/Timer";
import MenuBar, { menuBarIsHiddenState } from "@/components/MenuBar";
import LoginModal from "@/components/modals/LoginModal";
import LogoutModal from "@/components/modals/LogoutModal";

export default function Home() {
  const { login, logout } = useAuth();
  const menuBarIsHidden = useRecoilValue(menuBarIsHiddenState);
  return (
    <>
      <main>
        <RainBackground />
        <div className="lg:flex w-full h-full pb-3 bg-opacity-0">
          <div
            className={`flex flex-col items-center transition-all duration-300 ${
              menuBarIsHidden ? "w-full" : "lg:w-2/3 lg:pt-5`"
            }`}
          >
            <div className="pb-5">
              <Timer />
            </div>
          </div>
          <div
            className={`
            ${menuBarIsHidden ? "w-0 h-0 overflow-hidden" : "lg:w-1/3 lg:pt-5"}
          `}
          >
            <MenuBar />
          </div>
        </div>
      </main>
      {/* ログイン・ログアウトモーダル */}
      <LoginModal login={login} />
      <LogoutModal logout={logout} />
    </>
  );
}
