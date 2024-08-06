import Bucket from "./Bucket";
import { useRecoilState } from "recoil";
import { bucketCountState } from "@/state/atoms";

export default function Infomation() {
  const [bucketCount, setBucketCount] = useRecoilState(bucketCountState);

  return (
    <div className="bg-gray-700 bg-opacity-10 rounded-xl px-5 py-2 backdrop-blur-sm w-full">
      <div className="flex justify-between items-center w-full pb-2">
        <div className="flex items-center text-blue-300">
          <span className="material-icons text-sm pr-1">person</span>
          <p className="">あなたの記録</p>
        </div>
        <button className="btn material-icons text-blue-300 rounded-full bg-opacity-0 border-none">
          expand_more
        </button>
      </div>
      <ul>
        {/* 今日 */}
        <div className="flex items-center justify-between text-gray-400 border-b border-opacity-20 border-gray-500 py-1">
          <p className="text-sm">今日</p>
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
        {/* いままで */}
        <div className="flex items-center justify-between text-gray-400 border-b border-opacity-20 border-gray-500 py-1">
          <p className="text-sm">いままで</p>
          <p className="text-sm"></p>
        </div>
        <li className="flex items-center py-3 text-blue-300">
          <div className="flex items-center w-1/2">
            <span className="scale-50">
              <Bucket filled={100} active={true} />
            </span>
            <p className="font-semibold text-xl">{3}</p>
          </div>
          <div className="flex items-center w-1/2">
            <span className="material-icons text-blue-300 mr-3">
              water_drop
            </span>
            <p className="font-semibold text-lg">
              9,000 <span className="font-thin"> mL</span>
            </p>
          </div>
        </li>
        <li className="flex items-center py-3 text-blue-300">
          <div className="flex items-center w-1/2">
            <span className="material-icons text-blue-300 px-3">timer</span>
            <button className="font-semibold text-xl">1 : 15</button>
          </div>
          <div className="flex items-center w-1/2">
            <span className="material-icons text-blue-300 pr-3">whatshot</span>
            <button className="font-semibold text-xl">
              1 <span className="font-thin text-sm">day streak.</span>
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}
