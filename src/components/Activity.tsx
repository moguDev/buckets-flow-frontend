import Bucket from "./Bucket";
import { useRecoilState } from "recoil";
import { bucketCountState } from "@/state/atoms";
import ChartBar from "./ChartBar";
import { useState, useRef, useEffect } from "react";

export default function Activity() {
  const [bucketCount, setBucketCount] = useRecoilState(bucketCountState);
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("auto");

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
    <div className="bg-gray-700 bg-opacity-10 rounded-xl px-5 py-2 backdrop-blur-sm w-full">
      <div className="flex justify-between items-center w-full py-2">
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-1">person</span>
          <p className="">アクティビティ</p>
        </div>
        <button
          className="btn material-icons text-blue-300 rounded-full bg-opacity-0 border-none"
          onClick={handleOpen}
        >
          {isOpen ? "expand_more" : "expand_less"}
        </button>
      </div>
      <div ref={contentRef} className="transition-height" style={{ height }}>
        <ul>
          {/* 今日 */}
          <div className="flex items-center justify-between text-gray-500 border-b border-opacity-20 border-gray-500 py-1">
            <div className="flex items-center">
              <span className="material-icons text-xs pr-1">today</span>
              <p className="text-sm">今日</p>
            </div>
            <p className="text-xs font-thin">2024年8月6日</p>
          </div>
          <li className="flex items-center py-3 text-blue-300">
            <div className="flex items-center w-1/2">
              <span className="scale-50">
                <Bucket filled={100} active={true} />
              </span>
              <p className="font-semibold text-xl">
                {`${bucketCount} `}
                <span className="text-sm font-thin">
                  {bucketCount === 1 ? "bucket" : "buckets"}
                </span>
              </p>
            </div>
            <div className="flex items-center w-1/2">
              <span className="material-icons text-blue-300 mr-3">
                water_drop
              </span>
              <p className="font-semibold text-lg">
                {`${(bucketCount * 3000).toLocaleString()} `}{" "}
                <span className="font-thin text-sm">mL</span>
              </p>
            </div>
          </li>
          <li className="flex items-center py-3 text-blue-300">
            <div className="flex items-center w-1/2">
              <span className="material-icons text-blue-300 px-3">timer</span>
              <button className="font-semibold text-xl">
                {`${Math.floor((bucketCount * 25) / 60)} `}
                <span className="text-sm font-thin">{"h"}</span>
                {` ${(bucketCount * 25) % 60} `}
                <span className="text-sm font-thin">{"min"}</span>
              </button>
            </div>
          </li>
          {/* すべての期間 */}
          <div className="flex items-center justify-between text-gray-500 border-b border-opacity-20 border-gray-500 mt-3 py-1">
            <div className="flex items-center">
              <span className="material-icons text-xs pr-1">
                calendar_month
              </span>
              <p className="text-sm">すべての期間</p>
            </div>
            <p className="text-sm"></p>
          </div>
          <li className="flex items-center py-3 text-blue-300">
            <div className="flex items-center w-1/2">
              <span className="scale-50">
                <Bucket filled={100} active={true} />
              </span>
              <p className="font-semibold text-xl">
                {`${bucketCount} `}
                <span className="text-sm font-thin">
                  {bucketCount === 1 ? "bucket" : "buckets"}
                </span>
              </p>
            </div>
            <div className="flex items-center w-1/2">
              <span className="material-icons text-blue-300 mr-3">
                water_drop
              </span>
              <p className="font-semibold text-lg">
                {`${(bucketCount * 3000).toLocaleString()} `}{" "}
                <span className="font-thin text-sm">mL</span>
              </p>
            </div>
          </li>
          <li className="flex items-center py-3 text-blue-300">
            <div className="flex items-center w-1/2">
              <span className="material-icons text-blue-300 px-3">timer</span>
              <button className="font-semibold text-xl">
                {`${Math.floor((bucketCount * 25) / 60)} `}
                <span className="text-sm font-thin">{"h"}</span>
                {` ${(bucketCount * 25) % 60} `}
                <span className="text-sm font-thin">{"min"}</span>
              </button>
            </div>
            <div className="flex items-center w-1/2">
              <span className="material-icons text-blue-300 pr-3">
                whatshot
              </span>
              <button className="font-semibold text-xl">
                1 <span className="font-thin text-sm">day streak.</span>
              </button>
            </div>
          </li>
        </ul>
        {/* チャート */}
        <div className="flex items-center justify-between text-gray-500 border-b border-opacity-20 border-gray-500 mt-3 py-1">
          <div className="flex items-center">
            <span className="material-icons text-xs pr-1">equalizer</span>
            <p className="text-sm">降水量チャート</p>
          </div>
          <p className="text-sm"></p>
        </div>
        <div className="flex items-center bg-blue-900 bg-opacity-10 rounded-lg mt-2 p-1">
          <button className="chart-tab w-1/4">日</button>
          <button className="chart-tab chart-tab-selected w-1/4">週</button>
          <button className="chart-tab w-1/4">月</button>
          <button className="chart-tab w-1/4">年</button>
        </div>
        <div className="flex items-center justify-between px-1 py-3 text-blue-300">
          <span className="material-icons text-xl">keyboard_arrow_left</span>
          <p className="text-sm font-light">2024年8月5日〜2024年8月11日</p>
          <span className="material-icons text-xl">keyboard_arrow_right</span>
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
  );
}
