import { useAuth, userNameState } from "@/recoil/authState";
import { useBuckets } from "@/recoil/bucketsState";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const determineLevel = (value: number) => {
  const thresholds = [
    { limit: 8, lv: 0, label: "---", storage: "---" },
    { limit: 60, lv: 1, label: "バケツ", storage: "8L" },
    { limit: 200, lv: 2, label: "洗濯機", storage: "60L" },
    { limit: 500, lv: 3, label: "浴槽", storage: "200L" },
    { limit: 1000, lv: 4, label: "", storage: "500L" },
    { limit: Infinity, lv: 100, label: "", storage: "" },
  ];

  for (const threshold of thresholds) {
    if (value < threshold.limit) return threshold;
  }
  return { limit: Infinity, lv: 3, label: "", storage: "500L" };
};

export default function UserInfo() {
  const userName = useRecoilValue(userNameState);
  const { buckets, loading } = useBuckets();
  const [currentValue, setCurrenValue] = useState(0);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setCurrenValue(
      (buckets.reduce((sum, bucket) => sum + bucket.storage, 0) / 1500) * 8
    );
  }, [buckets]);

  return isAuthenticated ? (
    <div className="bg-gray-700 bg-opacity-10 rounded-xl px-5 backdrop-blur-sm w-full">
      <button className="flex justify-between items-center w-full pt-6 ">
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-3">account_circle</span>
          <p className="">{userName}</p>
        </div>
        {loading ? (
          <span className="loading loading-dots loading-xs bg-blue-300"></span>
        ) : (
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
        )}
      </button>
      <div className="pt-3 pb-6 text-blue-300">
        <p className="text-right text-xs font-thin text-opacity-80 px-1">
          次のレベルまであと...
          <span className="font-semibold text-sm">
            {` ${Math.ceil(
              determineLevel(currentValue).limit - currentValue
            )}L `}
          </span>
        </p>
        <div className="w-full bg-gray-500 bg-opacity-30 rounded-full h-2 my-2">
          <div
            className="bg-blue-300 bg-opacity-60 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${
                (currentValue / determineLevel(currentValue).limit) * 100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="backdrop-blur-sm w-full">
      <div className="flex items-center">
        <label
          htmlFor={isAuthenticated ? "" : "my-modal-4"}
          className="flex justify-between items-center w-full py-6 px-5 mr-1 bg-blue-900 bg-opacity-10 rounded-xl "
        >
          <div className="flex items-center text-blue-300">
            <span className="material-icons text-sm pr-3">login</span>
            <p>ログイン</p>
          </div>
        </label>
        <label
          htmlFor={isAuthenticated ? "" : ""}
          className="flex justify-between items-center w-full py-6 px-5 ml-1 bg-blue-900 bg-opacity-20 rounded-xl "
        >
          <div className="flex items-center text-blue-300">
            <span className="material-icons text-sm pr-3">person_add</span>
            <p>アカウント作成</p>
          </div>
        </label>
      </div>
    </div>
  );
}
