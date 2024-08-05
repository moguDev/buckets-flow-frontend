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
    <div className="w-full">
      <Timer />
    </div>
  );
}
