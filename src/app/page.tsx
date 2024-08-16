"use client";
import { useAuth } from "@/recoil/authState";
import { useRecoilValue } from "recoil";
import RainBackground from "@/components/RainBackground";
import { Timer } from "@/components/Timer";
import MenuBar, { menuBarIsHiddenState } from "@/components/MenuBar";
import LoginModal from "@/components/modals/LoginModal";
import LogoutModal from "@/components/modals/LogoutModal";
import { othersIsHiddenState } from "@/components/Others";

export default function Home() {
  const { login, logout } = useAuth();
  const othersIsHidden = useRecoilValue(othersIsHiddenState);
  const menuBarIsHidden = useRecoilValue(menuBarIsHiddenState);

  return (
    <main className="h-full">
      <RainBackground />
      <div className="lg:flex w-full h-full pb-3 bg-opacity-0">
        <div
          className={`relative transition-all duration-700 lg:pt-5 ${
            menuBarIsHidden ? "w-full" : "lg:w-2/3"
          }`}
        >
          <div className="pb-5 w-full h-full">
            <div
              className={`transition-all duration-700 ${
                othersIsHidden && menuBarIsHidden ? "h-1/2" : "h-0"
              }`}
            />
            <Timer />
            <div
              className={`transition-all duration-700 ${
                othersIsHidden && menuBarIsHidden ? "h-1/2" : "h-0"
              }`}
            />
          </div>
        </div>
        <div
          className={`transition-opacity duration-300 
            ${
              menuBarIsHidden
                ? "w-0 h-0 overflow-hidden opacity-0"
                : "lg:w-1/3 lg:pt-5 opacity-100"
            }
          `}
        >
          <MenuBar />
        </div>
      </div>
      {/* ログイン・ログアウトモーダル */}
      <LoginModal login={login} />
      <LogoutModal logout={logout} />
    </main>
  );
}
