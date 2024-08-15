import { useEffect, useRef, useState } from "react";
import { MenuAccordion } from "./MyComponents";
import { authState } from "@/recoil/authState";
import { useRecoilValue } from "recoil";

export const timerValues = [15, 20, 25, 30, 45, 50, 60, 90];

export default function Preferences() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useRecoilValue(authState).isAuthenticated;

  const [sliderValue, setSliderValue] = useState(3); // スライダーの値を状態管理
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSliderValue(Number(event.target.value)); // 値を更新
  const SliderMark = ({ value }: { value: number }) => (
    <span className="relative">
      <p className="text-center">|</p>
      <p className="absolute inset-x-0 flex items-center justify-center text-center">
        {value}
      </p>
    </span>
  );

  return (
    <MenuAccordion
      isOpen={isOpen}
      handleOpen={() => setIsOpen((prev) => !prev)}
      iconName="settings"
      label="設定"
      isAuthenticated={isAuthenticated}
    >
      <ul className="p-2">
        <div className="flex items-center justify-between text-gray-500">
          <p className="text-xs">タイマーの時間</p>
        </div>
        <li className="mt-3 mb-6">
          <input
            type="range"
            min={1}
            max={8}
            value={sliderValue}
            className="range range-info range-xs opacity-60"
            step="1"
            onChange={handleSliderChange} // スライダーの変化に応じて値を更新
          />
          <div className="flex w-full justify-between px-2 text-xs text-blue-300">
            {timerValues.map((value) => (
              <SliderMark key={value} value={value} />
            ))}
          </div>
        </li>
        <div className="flex items-center justify-between text-gray-500">
          <p className="text-xs">休憩の時間</p>
        </div>
        <li className="mt-3 mb-6">
          <input
            type="range"
            min={5}
            max={10}
            value={sliderValue}
            className="range range-info range-xs opacity-60"
            step="1"
            onChange={() => {}} // スライダーの変化に応じて値を更新
          />
          <div className="flex w-full justify-between px-2 text-xs text-blue-300">
            <span className="relative">
              <p className="text-center">|</p>
              <p className="absolute inset-x-0 flex items-center justify-center text-sm text-center">
                {5}
              </p>
            </span>
            <span className="relative">
              <p className="text-center">|</p>
              <p className="absolute inset-x-0 flex items-center justify-center text-sm text-center">
                {6}
              </p>
            </span>
            <span className="relative">
              <p className="text-center">|</p>
              <p className="absolute inset-x-0 flex items-center justify-center text-sm text-center">
                {7}
              </p>
            </span>
            <span className="relative">
              <p className="text-center">|</p>
              <p className="absolute inset-x-0 flex items-center justify-center text-sm text-center">
                {8}
              </p>
            </span>
            <span className="relative">
              <p className="text-center">|</p>
              <p className="absolute inset-x-0 flex items-center justify-center text-sm text-center">
                {9}
              </p>
            </span>
            <span className="relative">
              <p className="text-center">|</p>
              <p className="absolute inset-x-0 flex items-center justify-center text-sm text-center">
                {10}
              </p>
            </span>
          </div>
        </li>
      </ul>
    </MenuAccordion>
  );
}
