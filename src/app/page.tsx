"use client";
import { useState } from "react";
import Timer from "@/components/Timer";
import Activity from "@/components/Activity";
import LeaderBoard from "@/components/LeaderBoard";
import { RecoilRoot } from "recoil";
import RainBackground from "@/components/RainBackground";
import useNotificationPermission from "@/hooks/useNotificationPermission";
import Preferences from "@/components/Preferences";
import WaterContainer from "@/components/WaterContainer";

export default function Home() {
  const permission = useNotificationPermission();
  const [filled, setFilled] = useState(50);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value))); // 0〜100の範囲に制限
    setFilled(value);
  };
  return (
    <RecoilRoot>
      <RainBackground />
      <div className="lg:flex w-full h-full pt-20 pb-10 px-5 bg-opacity-0 z-10">
        <div className="lg:w-2/3 lg:pt-10">
          <Timer />
          <WaterContainer level={50} />
        </div>
        <div className="lg:w-1/3">
          <div className="pb-3">
            <Activity />
          </div>
          <div className="pb-3">
            <LeaderBoard />
          </div>
          <div className="pb-3">
            <Preferences />
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}
