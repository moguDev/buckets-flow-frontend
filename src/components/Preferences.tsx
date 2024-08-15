import { useEffect, useRef, useState } from "react";

export const timerValues = [15, 20, 25, 30, 45, 50, 60, 90];

export default function Preferences() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState("0px");
  const [isOpen, setIsOpen] = useState(false);
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
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setHeight(`${contentRef.current.scrollHeight}px`);
      } else {
        setHeight("0px");
      }
    }
  }, [isOpen]);

  const handleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="bg-gray-700 bg-opacity-10 rounded-xl px-5 backdrop-blur-sm w-full">
      <button
        className="flex justify-between items-center w-full py-6"
        onClick={handleOpen}
      >
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-3">settings</span>
          <p className="">設定</p>
        </div>
        <div className="material-icons text-blue-300 rounded-full bg-opacity-0 border-none">
          {isOpen ? "expand_more" : "expand_less"}
        </div>
      </button>
      <div ref={contentRef} className="transition-height" style={{ height }}>
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
      </div>
    </div>
  );
}
