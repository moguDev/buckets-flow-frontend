"use client";
import { useState } from "react";
import Timer from "@/components/Timer";
import Charts from "@/components/Charts";
import Infomation from "@/components/Infomation";
import LeaderBoard from "@/components/LeaderBoard";
import AllRecoards from "@/components/AllRecords";

export default function Home() {
  const [filled, setFilled] = useState(50);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value))); // 0〜100の範囲に制限
    setFilled(value);
  };
  return (
    <div className="md:flex justify-center w-full">
      <div className="md:w-2/3 pr-2">
        <div className="mb-10">
          <Timer />
        </div>
        <div className="mb-3">
          <AllRecoards />
        </div>
      </div>
      <div className="md:w-1/3 h-full mx-1">
        <div className="mb-3">
          <Infomation />
        </div>
        <div className="mb-3">
          <Charts />
        </div>
        <div className="mb-3">
          <LeaderBoard />
        </div>
      </div>
    </div>
  );
}
