"use client";
import { useState } from "react";
import Timer from "@/components/Timer";
import Bucket from "@/components/Bucket";
import ChartBar from "@/components/ChartBar";

export default function Home() {
  const [filled, setFilled] = useState(50);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value))); // 0〜100の範囲に制限
    setFilled(value);
  };
  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <Timer />
      </div>
      <div className="w-1/3 h-full mx-10">
        <div className="bg-gray-700 bg-opacity-20 rounded-xl px-3 backdrop-blur-sm w-full">
          <div className="flex justify-between items-center w-full p-3">
            <p className="h-full text-blue-300">チャート</p>
            <button className="btn material-icons text-blue-300 rounded-full bg-opacity-0 border-none">
              expand_less
            </button>
          </div>
          <div role="tablist" className="tabs tabs-boxed bg-opacity-80">
            <a role="tab" className="tab">
              日
            </a>
            <a role="tab" className="tab tab-active">
              週
            </a>
            <a role="tab" className="tab">
              月
            </a>
            <a role="tab" className="tab">
              年
            </a>
          </div>
          <div className="flex w-full p-1">
            <ChartBar maxValue={9} value={4} label="月" />
            <ChartBar maxValue={9} value={8} label="火" />
            <ChartBar maxValue={9} value={2} label="水" />
            <ChartBar maxValue={9} value={3} label="木" />
            <ChartBar maxValue={9} value={2} label="金" />
            <ChartBar maxValue={9} value={9} label="土" />
            <ChartBar maxValue={9} value={1} label="日" />
          </div>
        </div>
      </div>
    </div>
  );
}
