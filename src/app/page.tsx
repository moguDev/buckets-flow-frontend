"use client";
import { useState } from "react";
import Timer from "@/components/Timer";
import Charts from "@/components/Charts";

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
        <Charts />
      </div>
    </div>
  );
}
