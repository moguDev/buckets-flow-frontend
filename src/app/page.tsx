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
          className={`transition-all duration-300 ${
            menuBarIsHidden ? "w-full" : "lg:w-2/3 lg:pt-5`"
          }`}
        >
          <div
            className={`pb-5 w-full h-max ${
              othersIsHidden && "flex justify-center"
            }`}
          >
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
      {/* ログイン・ログアウトモーダル */}
      <LoginModal login={login} />
      <LogoutModal logout={logout} />
    </main>
  );
}
