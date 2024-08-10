import { getTodayBuckets, useBuckets } from "@/recoil/bucketsState";
import { useEffect, useRef, useState } from "react";
import ChartBar from "./ChartBar";
import { useAuth } from "@/recoil/authState";
import LoginModal from "./modals/LoginModal";

export default function RainfallCharts() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState("auto");
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setHeight(`${contentRef.current.scrollHeight}px`);
      } else {
        setHeight("0px");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    isAuthenticated === false && setIsOpen(false);
  }, [isAuthenticated]);

  const handleOpen = () => {
    isAuthenticated && setIsOpen((prev) => !prev);
  };

  const { buckets } = useBuckets();

  return (
    <div className="bg-gray-700 bg-opacity-10 rounded-xl px-5 backdrop-blur-sm w-full">
      <label
        htmlFor={isAuthenticated ? "" : "my-modal-4"}
        className="flex justify-between items-center w-full py-6"
        onClick={handleOpen}
      >
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-3">equalizer</span>
          <p className="">降水量チャート</p>
        </div>
        <div className="material-icons text-blue-300 rounded-full bg-opacity-0 border-none">
          {isAuthenticated ? (
            isOpen ? (
              "expand_more"
            ) : (
              "expand_less"
            )
          ) : (
            <div className="flex items-center text-xs rounded-full text-gray-400 text-opacity-80">
              ログインして利用
            </div>
          )}
        </div>
      </label>
      <div ref={contentRef} className="transition-height" style={{ height }}>
        <div className="flex items-center bg-blue-900 bg-opacity-10 rounded-lg mt-2 p-1">
          <button className="chart-tab w-1/4">日</button>
          <button className="chart-tab chart-tab-selected w-1/4">週</button>
          <button className="chart-tab w-1/4">月</button>
          <button className="chart-tab w-1/4">年</button>
        </div>
        <div className="flex items-center justify-between px-1 py-3 text-blue-300">
          <button className="material-icons text-xl">
            keyboard_arrow_left
          </button>
          <p className="text-sm font-thin">
            2024年8月5日〜2024年8月11日 -{" "}
            <button className="font-semibold">
              {getTodayBuckets(buckets).length}{" "}
              <span className="font-thin">bucket</span>
            </button>
          </p>

          <button className="material-icons text-xl">
            keyboard_arrow_right
          </button>
        </div>

        <div className="flex w-full p-1 pb-3">
          <ChartBar maxValue={9} value={4} label="月" />
          <ChartBar maxValue={9} value={8} label="火" />
          <ChartBar maxValue={9} value={2} label="水" />
          <ChartBar maxValue={9} value={3} label="木" />
          <ChartBar maxValue={9} value={2} label="金" />
          <ChartBar maxValue={9} value={9} label="土" />
          <ChartBar maxValue={9} value={1} label="日" />
        </div>
        <div className="flex w-full p-1 pb-3"></div>
      </div>
      <LoginModal />
    </div>
  );
}
