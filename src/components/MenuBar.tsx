"use client";
import { useAuth } from "@/recoil/authState";
import Activity from "./Activity";
import LeaderBoard from "./LeaderBoard";
import Preferences from "./Preferences";
import RainfallCharts from "./RainfallCharts";
import UserInfo from "./UserInfo";
import { useRecoilValue } from "recoil";
import {
  allBucketsState,
  allBucketsErrorState,
  bucketsByDateState,
  allBucketsLoadingState,
} from "@/recoil/bucketsState";

export default function MunuBar() {
  const { isAuthenticated } = useAuth();
  const props = {
    isAuthenticated,
    allBuckets: useRecoilValue(allBucketsState),
    loading: useRecoilValue(allBucketsLoadingState),
    error: useRecoilValue(allBucketsErrorState),
  };
  return (
    <>
      <div className="relative mb-3">
        <div className="pb-3">
          <UserInfo {...props} />
        </div>
        <div className="pb-3">
          <Activity {...props} />
        </div>
        <div>
          <RainfallCharts {...props} />
        </div>
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
