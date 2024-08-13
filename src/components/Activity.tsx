import { useState, useRef, useEffect } from "react";
import { BucketIcon } from "./BucketIcon";
import {
  Bucket,
  getMaxStreak,
  getOldestBucketDate,
  getTodayBuckets,
} from "@/recoil/bucketsState";
import Loading from "./Loading";

type ActivityProps = {
  isAuthenticated: boolean;
  allBuckets: Bucket[];
  loading: boolean;
};

function getCurrentDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 月は0から始まるため+1
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}年${month}月${day}日`;
}

export default function Activity(props: ActivityProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState("0px"); // 初期値を0pxに設定
  const { isAuthenticated } = props;
  const { allBuckets: buckets, loading } = props;

  useEffect(() => {
    contentRef.current &&
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [loading, isOpen]);

  useEffect(() => {
    setIsOpen(isAuthenticated);
  }, [isAuthenticated]);

  const handleOpen = () => {
    isAuthenticated && setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-gray-700 bg-opacity-10 rounded-xl px-5 backdrop-blur-sm w-full">
      <label
        htmlFor={isAuthenticated ? "" : "my-modal-4"}
        className="flex justify-between items-center w-full py-6"
        onClick={handleOpen}
      >
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-3">trending_up</span>
          <p>アクティビティ</p>
        </div>
        <div className="material-icons text-blue-300 rounded-full bg-opacity-0 border-none">
          {isAuthenticated ? (
            isOpen ? (
              "expand_more"
            ) : (
              "expand_less"
            )
          ) : (
            <label className="flex items-center text-xs rounded-full text-gray-400 text-opacity-80">
              ログインして利用
            </label>
          )}
        </div>
      </label>
      <div
        ref={contentRef}
        className="relative transition-height"
        style={{ height }}
      >
        <ul>
          {/* 今日 */}
          <div className="flex items-center justify-between text-gray-500 border-b border-opacity-20 border-gray-500 py-1">
            <div className="flex items-center">
              <span className="material-icons text-xs pr-1">today</span>
              <p className="text-sm">今日</p>
            </div>
            <p className="text-xs text-blue-300 font-light">
              {getCurrentDate()}
            </p>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <li className="flex items-center py-3 text-blue-300">
                <div className="flex items-center w-1/2">
                  <span className="pl-3 pr-3">
                    <BucketIcon />
                  </span>
                  <p className="font-semibold text-xl">
                    {`${getTodayBuckets(buckets).length} `}
                    <span className="text-sm font-thin">
                      {getTodayBuckets(buckets).length === 1
                        ? "bucket"
                        : "buckets"}
                    </span>
                  </p>
                </div>
                <div className="flex items-center w-1/2">
                  <span className="material-icons text-blue-300 mr-2">
                    water_drop
                  </span>
                  <p className="font-semibold text-lg">
                    {`${(
                      (getTodayBuckets(buckets).reduce(
                        (sum, bucket) => sum + bucket.storage,
                        0
                      ) /
                        1500) *
                      8
                    ).toLocaleString()} `}{" "}
                    <span className="font-thin text-sm">L</span>
                  </p>
                </div>
              </li>
              <li className="flex items-center py-3 text-blue-300">
                <div className="flex items-center w-1/2">
                  <span className="material-icons text-blue-300 pl-3 pr-2">
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
                    )
                      .toString()
                      .padStart(2, "0")} `}
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
            <p className="text-xs text-blue-300 font-light">
              {`${getOldestBucketDate(buckets)} - ${getCurrentDate()}`}
            </p>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <li className="flex items-center py-3 text-blue-300">
                <div className="flex items-center w-1/2">
                  <span className="pl-3 pr-3">
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
                  <span className="material-icons text-blue-300 mr-2">
                    water_drop
                  </span>
                  <p className="font-semibold text-lg">
                    {`${(
                      (buckets.reduce(
                        (sum, bucket) => sum + bucket.storage,
                        0
                      ) /
                        1500) *
                      8
                    ).toLocaleString()} `}{" "}
                    <span className="font-thin text-sm">L</span>
                  </p>
                </div>
              </li>
              <li className="flex items-center py-3 text-blue-300">
                <div className="flex items-center w-1/2">
                  <span className="material-icons text-blue-300 pl-3 pr-2">
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
                    )
                      .toString()
                      .padStart(2, "0")} `}
                    <span className="text-sm font-thin">{"min"}</span>
                  </button>
                </div>
                <div className="flex items-center w-1/2">
                  <span className="material-icons text-blue-300 pr-2">
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
        <div className="flex w-full p-1 pb-3"></div>
      </div>
    </div>
  );
}
