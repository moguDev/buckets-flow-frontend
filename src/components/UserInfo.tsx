import { useAuth } from "@/hooks/useAuth";
import { useBuckets } from "@/hooks/useBuckets";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoginForm } from "./LoginForm";

const determineLevel = (value: number) => {
  const thresholds = [
    { limit: 8, lv: 0, label: "---", storage: 0 },
    { limit: 60, lv: 1, label: "バケツ", storage: 8 },
    { limit: 200, lv: 2, label: "洗濯機", storage: 60 },
    { limit: 500, lv: 3, label: "浴槽", storage: 200 },
    { limit: 1000, lv: 4, label: "小型貯水タンク", storage: 500 },
    { limit: 2000, lv: 5, label: "雨水タンク", storage: 1000 },
    { limit: 5000, lv: 6, label: "タンクローリー", storage: 2000 },
    { limit: 10000, lv: 7, label: "プール", storage: 5000 },
    { limit: 25000, lv: 8, label: "養殖池", storage: 10000 },
    { limit: 50000, lv: 9, label: "貯水池", storage: 25000 },
    { limit: 100000, lv: 10, label: "消防車の水槽", storage: 50000 },
    { limit: 200000, lv: 11, label: "ため池", storage: 100000 },
    { limit: 500000, lv: 12, label: "用水路", storage: 200000 },
    { limit: 1000000, lv: 13, label: "浄水場のタンク", storage: 500000 },
    { limit: 2500000, lv: 14, label: "湖（小規模）", storage: 1000000 },
    { limit: 5000000, lv: 15, label: "川の一部", storage: 2500000 },
    { limit: 10000000, lv: 16, label: "湖（中規模）", storage: 5000000 },
    { limit: 25000000, lv: 17, label: "水道タワー", storage: 10000000 },
    { limit: 50000000, lv: 18, label: "ダム湖", storage: 25000000 },
    { limit: Infinity, lv: 19, label: "海の入り江", storage: 50000000 },
  ];
  for (const threshold of thresholds) {
    if (value < threshold.limit) return threshold;
  }
  return { limit: Infinity, lv: 7, label: "学校のプール", storage: 422000 };
};

export const UserInfo = () => {
  const env = process.env.NEXT_PUBLIC_ENV;
  const [currentValue, setCurrenValue] = useState(0);
  const { isAuthenticated, userName } = useAuth();
  const { buckets, loading } = useBuckets();

  useEffect(() => {
    setCurrenValue(
      (buckets.reduce((sum, bucket) => sum + bucket.storage, 0) / 1500) * 8
    );
  }, [buckets]);

  return isAuthenticated ? (
    <div className="relative bg-gray-700 bg-opacity-10 rounded-xl backdrop-blur-sm w-full select-none cursor-pointer">
      <div className="p-5">
        <button className="flex justify-between items-center w-full">
          <p className="text-blue-300 font-semibold text-lg">{userName}</p>
          <label
            htmlFor="profile-modal"
            className="flex items-center text-gray-500 text-xs border border-gray-700 rounded-full px-3 py-1"
          >
            <span
              className="material-icons text-sm mr-0.5"
              style={{ fontSize: 14 }}
            >
              edit
            </span>
            アカウント名を編集
          </label>
        </button>
        <div className="pt-3 pb-1 text-blue-300">
          <div className="flex items-center justify-between p-1">
            <div className="text-blue-300">
              <p className="text-sm font-thin">
                {`Lv.${determineLevel(currentValue).lv}`}
                {determineLevel(currentValue).lv > 0 && (
                  <span className="text-md font-semibold px-1">
                    {` ${determineLevel(currentValue).label}`}
                  </span>
                )}
              </p>
            </div>
            <p className="text-right text-xs font-thin text-opacity-80 px-1">
              次のレベルまであと...
              <span className="font-semibold text-sm">
                {` ${Math.ceil(
                  determineLevel(currentValue).limit - currentValue
                )}L `}
              </span>
            </p>
          </div>
          <div className="w-full bg-gray-500 bg-opacity-30 rounded-full h-2 my-2">
            <div
              className="bg-blue-300 bg-opacity-60 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${
                  ((currentValue - determineLevel(currentValue).storage) /
                    (determineLevel(currentValue).limit -
                      determineLevel(currentValue).storage)) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoginForm />
  );
};
