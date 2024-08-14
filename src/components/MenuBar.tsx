"use client";
import { useAuth } from "@/recoil/authState";
import Activity from "./Activity";
import LeaderBoard from "./LeaderBoard";
import Preferences from "./Preferences";
import RainfallCharts from "./RainfallCharts";
import UserInfo from "./UserInfo";
import { atom, useRecoilValue } from "recoil";
import {
  allBucketsState,
  allBucketsErrorState,
  allBucketsLoadingState,
} from "@/recoil/bucketsState";

export const menuBarIsHiddenState = atom<boolean>({
  key: "menuBarIsHiddenState",
  default: false,
});

export default function MunuBar({
  isAuthenticated,
  userName,
}: {
  isAuthenticated: boolean;
  userName: string;
}) {
  const childProps = {
    isAuthenticated,
    userName,
    allBuckets: useRecoilValue(allBucketsState),
    loading: useRecoilValue(allBucketsLoadingState),
    error: useRecoilValue(allBucketsErrorState),
  };
  return (
    <div>
      <div className="relative mb-3">
        <div className="pb-3">
          <UserInfo {...childProps} />
        </div>
        <div className="pb-3">
          <Activity {...childProps} />
        </div>
        <div>
          <RainfallCharts {...childProps} />
        </div>
      </div>
      <div className="pb-3">
        <LeaderBoard />
      </div>
      <div className="pb-3">
        <Preferences />
      </div>
      {isAuthenticated && (
        <div className="pb-3">
          <div className="bg-gray-700 bg-opacity-10 rounded-xl px-5 backdrop-blur-sm w-full">
            <button
              className="flex justify-between items-center w-full py-6"
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_1"
                ) as HTMLDialogElement;
                modal !== null && modal.showModal();
              }}
            >
              <div className="flex items-center text-blue-300">
                <span className="material-icons text-sm pr-3">logout</span>
                <p className="">ログアウト</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
