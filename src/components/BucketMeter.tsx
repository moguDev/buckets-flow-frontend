import React from "react";
import { RainAnimation } from "./RainAnimation";
import { useRecoilValue } from "recoil";
import { isPlayingState, TimerState, timerState } from "@/hooks/useTimer";

export type BucketMeterProps = {
  filled: number;
  active?: boolean;
};

const BucketMeter: React.FC<BucketMeterProps> = ({
  filled,
  active = false,
}) => {
  const waterHeight = `${filled}%`;
  const isPlaying = useRecoilValue(isPlayingState);
  const timer = useRecoilValue(timerState);
  return (
    <div className="relative my-1">
      {timer === TimerState.WORKING && active && (
        <div
          className={`absolute -top-12 left-2.5 right-0 flex justify-center transition-all duration-300 h-full`}
        >
          <RainAnimation isDrop={active && isPlaying} />
        </div>
      )}
      <button
        className={`relative transition-transform duration-700 ${
          active ? "opacity-90 lg:scale-110 px-3" : "opacity-60 scale-75 px-2"
        } hover:opacity-100 tooltip`}
        data-tip={`${Math.round(filled)}%`}
      >
        <div
          className={`absolute top-0 w-12 h-0.5 ${
            filled === 100 ? "bg-blue-300" : "bg-gray-700"
          }`}
        />
        <div
          className={`relative w-10 h-12 rounded-b-lg overflow-hidden  ${
            filled === 100 ? "bg-blue-300" : "bg-gray-700"
          }`}
        >
          <div
            className="absolute bottom-0 w-full bg-blue-300 z-10 rounded-b"
            style={{ height: waterHeight }}
          />
        </div>
      </button>
    </div>
  );
};

export default BucketMeter;
