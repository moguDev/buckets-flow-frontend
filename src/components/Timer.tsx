"use client";
import React from "react";
import { TimerState, useTimer } from "@/recoil/timerState";
import BucketMeter from "./BucketMeter";

export default function Timer() {
  const {
    isPlaying,
    remainingTime,
    bucketPropses,
    startFlow,
    stopFlow,
    resetFlow,
    timer,
  } = useTimer();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative text-center text-blue-300 font-semibold text-opacity-80 my-3">
        {timer === TimerState.SHORT_BREAK && (
          <p className="bg-blue-300 bg-opacity-70 rounded-full px-10 py-0.5 text-theme text-sm">
            休憩
          </p>
        )}
        {timer === TimerState.LONG_BREAK && (
          <p className="bg-blue-300 bg-opacity-70 rounded-full px-10 py-0.5 text-theme text-sm">
            長い休憩
          </p>
        )}
      </div>
      <p
        className={`text-center text-blue-300 font-medium md:text-timer text-8xl md:pb-8 pb-3 transition-transform duration-700 transition-brightness ${
          isPlaying ? "scale-105 brightness-110" : "scale-90 brightness-90"
        } select-none`}
      >
        {Math.floor(remainingTime / 60)
          .toString()
          .padStart(2, "0")}
        :{(remainingTime % 60).toString().padStart(2, "0")}
      </p>
      <div className="flex items-center justify-center py-4">
        {bucketPropses.map((bucketProps, index) => (
          <BucketMeter key={index} {...bucketProps} />
        ))}
      </div>
      <div className="flex items-center justify-center py-2">
        {isPlaying ? (
          <button
            onClick={stopFlow}
            className={`
              btn m-2 p-2 border-none
              bg-blue-700 bg-opacity-10 backdrop-blur-sm
              text-gray-500
              flex items-center justify-center
              h-16 w-16 rounded-full tooltip`}
            data-tip="一時停止"
          >
            <span className="material-icons">pause</span>
          </button>
        ) : (
          <button
            onClick={startFlow}
            className={`
              btn m-2 p-2 border-none
              bg-blue-700 bg-opacity-10 backdrop-blur-sm
              text-gray-500 
              flex items-center justify-center
              h-16 w-16 rounded-full`}
          >
            <span className="material-icons">play_arrow</span>
          </button>
        )}
        <button
          onClick={resetFlow}
          className={`
              btn m-2 p-2 border-none
              bg-gray-700 bg-opacity-10 backdrop-blur-sm
              text-gray-500
              flex items-center justify-center
              h-16 w-16 rounded-full`}
        >
          <span className="material-icons">refresh</span>
        </button>
      </div>
    </div>
  );
}
