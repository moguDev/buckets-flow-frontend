import { useEffect, useRef, useState } from "react";

export default function Preferences() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState("auto");
  const [isOpen, setIsOpen] = useState(false);

  const [value, setValue] = useState(25);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setHeight(`${contentRef.current.scrollHeight}px`);
      } else {
        setHeight("0px");
      }
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-gray-700 bg-opacity-10 rounded-xl px-5 backdrop-blur-sm w-full">
      <button
        className="flex justify-between items-center w-full py-6"
        onClick={handleOpen}
      >
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-1">settings</span>
          <p className="">設定</p>
        </div>
        <div className="material-icons text-blue-300 rounded-full bg-opacity-0 border-none">
          {isOpen ? "expand_more" : "expand_less"}
        </div>
      </button>
      <div ref={contentRef} className="transition-height" style={{ height }}>
        <div className="p-1">
          <div className="flex justify-between text-blue-300">
            <p className="text-gray-400">バケツの容量</p>
            <p>
              {`${(value * 60 * 2).toLocaleString()}mL`}
              <span className="text-sm font-semibold">
                （{value} 分のタイマー）
              </span>
            </p>
          </div>
          <div className="w-full">
            <input
              type="range"
              min={25}
              max={50}
              value={value}
              className="range my-3"
              step={5}
              onChange={handleChange}
            />
            <div className="flex w-full justify-between px-2 text-xs">
              <span>25min</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>50min</span>
            </div>
          </div>
        </div>
        <div className="flex w-full p-1 pb-3"></div>
      </div>
    </div>
  );
}
