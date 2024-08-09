import { useEffect, useRef, useState } from "react";

export default function Preferences() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState("auto");
  const [isOpen, setIsOpen] = useState(false);
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
          <span className="material-icons text-sm pr-3">settings</span>
          <p className="">設定</p>
        </div>
        <div className="material-icons text-blue-300 rounded-full bg-opacity-0 border-none">
          {isOpen ? "expand_more" : "expand_less"}
        </div>
      </button>
      <div ref={contentRef} className="transition-height" style={{ height }}>
        <div className="flex w-full p-1 pb-3"></div>
      </div>
    </div>
  );
}
