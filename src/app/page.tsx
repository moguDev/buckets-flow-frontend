"use client";
import { useState } from "react";
import Timer from "@/components/Timer";
import Activity from "@/components/Activity";
import LeaderBoard from "@/components/LeaderBoard";
import { RecoilRoot } from "recoil";
import RainBackground from "@/components/RainBackground";
import Preferences from "@/components/Preferences";
import Header from "@/components/Header";
import RainfallCharts from "@/components/RainfallCharts";
import UserInfo from "@/components/UserInfo";

export default function Home() {
  const [filled, setFilled] = useState(50);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value))); // 0〜100の範囲に制限
    setFilled(value);
  };
  return (
    <RecoilRoot>
      <Header />
      <RainBackground />
      <div className="lg:flex w-full h-full pt-20 pb-10 px-5 bg-opacity-0 z-10">
        <div className="lg:w-2/3 lg:pt-5">
          <Timer />
        </div>
        <div className="lg:w-1/3 lg:pt-5">
          <div className="pb-3">
            <UserInfo />
          </div>
          <div className="pb-3">
            <Activity />
          </div>
          <div className="pb-3">
            <RainfallCharts />
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
