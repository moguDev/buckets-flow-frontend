import { useEffect, useState } from "react";
import { BucketIcon } from "./BucketIcon";
import {
  getMaxStreak,
  getOldestBucketDate,
  getTodayBuckets,
  useBuckets,
} from "@/hooks/useBuckets";
import { useAuth } from "@/hooks/useAuth";
import { MenuAccordion, Loading } from "./MyComponents";

export function formatDateString(date: Date): string {
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const Activity = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { buckets, loading, fetchBuckets } = useBuckets();

  useEffect(() => {
    fetchBuckets();
  }, [isAuthenticated]);

  return (
    <MenuAccordion
      isOpen={isOpen}
      handleOpen={() => {
        setIsOpen((prev) => !prev);
      }}
      iconName="trending_up"
      label="アクティビティ"
      isAuthenticated={isAuthenticated}
      loading={loading}
    >
      <ul>
        {/* 今日 */}
        <div className="flex items-center justify-between text-gray-500 border-b border-opacity-20 border-gray-500 py-1">
          <div className="flex items-center">
            <span className="material-icons text-xs pr-1">today</span>
            <p className="text-sm">今日</p>
          </div>
          <p className="text-xs text-blue-300 font-light">
            {formatDateString(new Date())}
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
                    Math.floor(
                      (getTodayBuckets(buckets).reduce(
                        (sum, bucket) => sum + bucket.storage,
                        0
                      ) /
                        1500) *
                        8 *
                        10
                    ) / 10
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
            <span className="material-icons text-xs pr-1">calendar_month</span>
            <p className="text-sm">すべての期間</p>
          </div>
          <p className="text-xs text-blue-300 font-light">
            {`${getOldestBucketDate(buckets)} - ${formatDateString(
              new Date()
            )}`}
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
                    Math.floor(
                      (buckets.reduce(
                        (sum, bucket) => sum + bucket.storage,
                        0
                      ) /
                        1500) *
                        8 *
                        10
                    ) / 10
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
    </MenuAccordion>
  );
};
