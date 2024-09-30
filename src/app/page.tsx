"use client";
import { useRecoilValue } from "recoil";
import RainBackground from "@/components/RainBackground";
import { Timer } from "@/components/Timer";
import MenuBar, { menuBarIsHiddenState } from "@/components/MenuBar";
import LoginModal from "@/components/modals/LoginModal";
import LogoutModal from "@/components/modals/LogoutModal";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { ProfileModal } from "@/components/modals/ProfileModal";
import FirstVisitDialog from "@/components/FirstVisitDialog";
import { TodayPredipitation } from "@/components/TodayPrecipitations";
import { VolumeModal } from "@/components/modals/VolumeModal";

export default function Home() {
  const { isAuthenticated, checkAuth } = useAuth();
  const menuBarIsHidden = useRecoilValue(menuBarIsHiddenState);

  useEffect(() => {
    checkAuth();
  }, [isAuthenticated, checkAuth]);

  return (
    <main className="h-full">
      <RainBackground />
      <div className="lg:flex w-full h-full pb-3 bg-opacity-0">
        <div
          className={`relative lg:pt-5 ${
            menuBarIsHidden ? "w-full" : "lg:w-2/3"
          }`}
        >
          <div className="pb-5 w-full h-full">
            <div className={` ${menuBarIsHidden ? "h-1/3" : "h-0"}`} />
            <Timer />
            <div className={` ${menuBarIsHidden ? "h-2/3" : "h-0"}`} />
          </div>
        </div>
        <div
          className={`
            ${
              menuBarIsHidden
                ? "w-0 h-0 overflow-hidden opacity-0"
                : "lg:w-1/3 lg:pt-5 opacity-100"
            }
          `}
        >
          <TodayPredipitation />
          <MenuBar />
        </div>
      </div>
      {/* ログイン・ログアウトモーダル */}
      <LoginModal />
      <LogoutModal />
      <ProfileModal />
      <FirstVisitDialog />
      <VolumeModal />
    </main>
  );
}
