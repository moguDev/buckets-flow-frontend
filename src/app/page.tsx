"use client";
import { useState } from "react";
import Timer from "@/components/Timer";
import Infomation from "@/components/Activity";
import LeaderBoard from "@/components/LeaderBoard";
import AllRecoards from "@/components/AllRecords";
import { RecoilRoot } from "recoil";
import RainBackground from "@/components/RainBackground";

export default function Home() {
  const [filled, setFilled] = useState(50);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value))); // 0〜100の範囲に制限
    setFilled(value);
  };
  return (
    <RecoilRoot>
      <RainBackground />
      <div className="lg:flex w-full h-full pt-20 pb-10">
        <div className="lg:w-2/3 lg:pt-10">
          <Timer />
        </div>
        <div className="lg:w-1/3">
          <div className="pb-3">
            <Infomation />
          </div>
          <div className="pb-3">
            <LeaderBoard />
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}
