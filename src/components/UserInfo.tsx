import { userNameState } from "@/recoil/authState";
import { useBuckets } from "@/recoil/bucketsState";
import { useRecoilValue } from "recoil";

const determineLevel = (value: number) => {
  const thresholds = [
    { limit: 60, lv: 0, label: "---", storage: "---" },
    { limit: 200, lv: 1, label: "洗濯機", storage: "60L" },
    { limit: 500, lv: 2, label: "バスタブ", storage: "200L" },
    { limit: Infinity, lv: 3, label: "", storage: "500L" },
  ];

  for (const threshold of thresholds) {
    if (value < threshold.limit) return threshold;
  }
  return { limit: Infinity, lv: 3, label: "", storage: "500L" };
};

export default function UserInfo() {
  const userName = useRecoilValue(userNameState);
  const { buckets } = useBuckets();
  const volume =
    (buckets.reduce((sum, bucket) => sum + bucket.storage, 0) / 1500) * 8;

  return (
    <div className="bg-gray-700 bg-opacity-10 rounded-xl px-5 backdrop-blur-sm w-full">
      <button className="flex justify-between items-center w-full py-6">
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-3">account_circle</span>
          <p className="">{userName}</p>
        </div>
        <div className="text-blue-300">
          <p className="text-sm text-light">
            {`Lv.${determineLevel(volume).lv} - `}
            <span className="text-md font-bold px-1">
              {determineLevel(volume).label}
            </span>
            <span className="text-sm text-light">
              ({determineLevel(volume).storage})
            </span>
          </p>
        </div>
      </button>
    </div>
  );
}
