"use client";
import { useState } from "react";
import Timer from "@/components/Timer";
import Bucket from "@/components/Bucket";

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
      <div className="w-1/3">
        <div className="bg-gray-500 bg-opacity-10 rounded-xl p-5">
          <span className="material-icons">bar_chart</span>
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
        </div>
      </div>
    </div>
  );
}
