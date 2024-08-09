import { useState, useRef, useEffect } from "react";
import { BucketIcon } from "./BucketIcon";
import { getMaxStreak, getTodayBuckets } from "@/recoil/bucketsState";
import { useBuckets } from "@/recoil/bucketsState";
import Loading from "./Loading";

export default function Activity() {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState("0px"); // 初期値を0pxに設定

  const { buckets, loading, error } = useBuckets();

  useEffect(() => {
    if (contentRef.current) {
      // loadingが終わった後に高さを計算
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [loading, isOpen]);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-gray-700 bg-opacity-10 rounded-xl px-6 backdrop-blur-sm w-full">
      <button
        className="flex justify-between items-center w-full py-6"
        onClick={handleOpen}
      >
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-1">person</span>
          <p>アクティビティ</p>
        </div>
        <div className="material-icons text-blue-300 rounded-full bg-opacity-0 border-none">
          {isOpen ? "expand_more" : "expand_less"}
        </div>
      </button>

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
          {loading ? (
            <Loading />
          ) : (
            <>
              <li className="flex items-center py-3 text-blue-300">
                <div className="flex items-center w-1/2">
                  <span className="px-3">
                    <BucketIcon />
                  </span>
                  <p className="font-semibold text-xl pl-1">
                    {`${getTodayBuckets(buckets).length} `}
                    <span className="text-sm font-thin">
                      {getTodayBuckets(buckets).length === 1
                        ? "bucket"
                        : "buckets"}
                    </span>
                  </p>
                </div>
                <div className="flex items-center w-1/2">
                  <span className="material-icons text-blue-300 mr-3">
                    water_drop
                  </span>
                  <p className="font-semibold text-lg">
                    {`${(
                      getTodayBuckets(buckets).reduce(
                        (sum, bucket) => sum + bucket.storage,
                        0
                      ) * 2
                    ).toLocaleString()} `}{" "}
                    <span className="font-thin text-sm">mL</span>
                  </p>
                </div>
              </li>
              <li className="flex items-center py-3 text-blue-300">
                <div className="flex items-center w-1/2">
                  <span className="material-icons text-blue-300 px-3">
                    timer
                  </span>
                  <button className="font-semibold text-xl">
                    {`${Math.floor(
                      getTodayBuckets(buckets).reduce(
                        (sum, bucket) => sum + bucket.duration / 60,
                        0
                      ) / 60
                    )} `}
                    <span className="text-sm font-thin">{"h"}</span>
                    {` ${Math.floor(
                      getTodayBuckets(buckets).reduce(
                        (sum, bucket) => sum + bucket.duration / 60,
                        0
                      ) % 60
                    )} `}
                    <span className="text-sm font-thin">{"min"}</span>
                  </button>
                </div>
              </li>
            </>
          )}
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
          {loading ? (
            <Loading />
          ) : (
            <>
              <li className="flex items-center py-3 text-blue-300">
                <div className="flex items-center w-1/2">
                  <span className="pl-4 pr-3">
                    <BucketIcon />
                  </span>
                  <p className="font-semibold text-xl">
                    {`${buckets.length} `}
                    <span className="text-sm font-thin">
                      {getTodayBuckets(buckets).length === 1
                        ? "bucket"
                        : "buckets"}
                    </span>
                  </p>
                </div>
                <div className="flex items-center w-1/2">
                  <span className="material-icons text-blue-300 mr-3">
                    water_drop
                  </span>
                  <p className="font-semibold text-lg">
                    {`${(
                      buckets.reduce((sum, bucket) => sum + bucket.storage, 0) *
                      2
                    ).toLocaleString()} `}{" "}
                    <span className="font-thin text-sm">mL</span>
                  </p>
                </div>
              </li>
              <li className="flex items-center py-3 text-blue-300">
                <div className="flex items-center w-1/2">
                  <span className="material-icons text-blue-300 px-3">
                    timer
                  </span>
                  <button className="font-semibold text-xl">
                    {`${Math.floor(
                      buckets.reduce(
                        (sum, bucket) => sum + bucket.duration / 60,
                        0
                      ) / 60
                    )} `}
                    <span className="text-sm font-thin">{"h"}</span>
                    {` ${Math.floor(
                      buckets.reduce(
                        (sum, bucket) => sum + bucket.duration / 60,
                        0
                      ) % 60
                    )} `}
                    <span className="text-sm font-thin">{"min"}</span>
                  </button>
                </div>
                <div className="flex items-center w-1/2">
                  <span className="material-icons text-blue-300 pr-3">
                    whatshot
                  </span>
                  <button className="font-semibold text-xl">
                    {getMaxStreak(buckets)}{" "}
                    <span className="font-thin text-sm">day streak.</span>
                  </button>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
