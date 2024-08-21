import { useAuth } from "@/hooks/useAuth";
import { useBuckets } from "@/hooks/useBuckets";
import Link from "next/link";
import { useEffect, useState } from "react";

const determineLevel = (value: number) => {
  const thresholds = [
    { limit: 8, lv: 0, label: "---", storage: 0 },
    { limit: 60, lv: 1, label: "バケツ", storage: 8 },
    { limit: 200, lv: 2, label: "洗濯機", storage: 60 },
    { limit: 500, lv: 3, label: "浴槽", storage: 200 },
    { limit: 1000, lv: 4, label: "小型貯水タンク", storage: 500 },
    { limit: 2000, lv: 5, label: "", storage: 1000 },
    { limit: 5000, lv: 6, label: "タンクローリー", storage: 2000 },
    { limit: Infinity, lv: 7, label: "学校のプール", storage: 422000 },
  ];

  for (const threshold of thresholds) {
    if (value < threshold.limit) return threshold;
  }
  return { limit: Infinity, lv: 7, label: "学校のプール", storage: 422000 };
};

export const UserInfo = () => {
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
          <div className="flex items-center text-blue-300">
            <span className="material-icons text-sm pr-3">account_circle</span>
            <p className="">{userName}</p>
          </div>
          <label htmlFor="profile-modal">
            <span className="material-icons text-sm pr-1">edit</span>
          </label>
        </button>
        <div className="pt-3 pb-6 text-blue-300">
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
    <div className="backdrop-blur-sm w-full">
      <div className="flex items-center">
        <label
          htmlFor={isAuthenticated ? "" : "login-modal"}
          className="flex justify-between items-center w-full py-6 px-5 mr-1 bg-blue-900 bg-opacity-10 hover:bg-opacity-20 rounded-xl cursor-pointer"
        >
          <div className="flex items-center text-blue-300">
            <span className="material-icons text-sm pr-3">login</span>
            <p className="text-sm select-none">ログイン</p>
          </div>
        </label>
        <Link
          href="/signup"
          className="flex justify-between items-center w-full py-6 px-5 ml-1 bg-blue-900 bg-opacity-20 hover:bg-opacity-30 rounded-xl "
        >
          <div className="flex items-center text-blue-300">
            <span className="material-icons text-sm pr-2">person_add</span>
            <p className="text-sm select-none">アカウント作成</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
