"use client";
import { useAuth } from "@/recoil/authState";
import Activity from "./Activity";
import LeaderBoard from "./LeaderBoard";
import Preferences from "./Preferences";
import RainfallCharts from "./RainfallCharts";
import UserInfo from "./UserInfo";
import { useBuckets } from "@/recoil/bucketsState";

export default function MunuBar() {
  const { isAuthenticated } = useAuth();
  const { buckets, loading, error } = useBuckets();
  return (
    <>
      <div className="relative mb-3">
        <div className="pb-3">
          <UserInfo />
        </div>
        <div className="pb-3">
          <Activity open={true} />
        </div>
        <div>
          <RainfallCharts />
        </div>
        {false && (
          <button className="absolute top-0 w-full h-full btn bg-gray-900 bg-opacity-10 border-none backdrop-blur-md">
            <div className="flex items-center justify-center rounded-xl h-full w-full">
              <button className="text-blue-300 font-bold text-lg">
                ログインしてすべての機能を利用する
              </button>
            </div>
          </button>
        )}
      </div>
      <div className="pb-3">
        <LeaderBoard />
      </div>
      <div className="pb-3">
        <Preferences />
      </div>
    </>
  );
}
