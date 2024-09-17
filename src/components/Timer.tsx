"use client";
import React from "react";
import { TimerState, useTimer } from "@/hooks/useTimer";
import BucketMeter from "./BucketMeter";

export const Timer = () => {
  const {
    remainingTime,
    bucketMeterPropses,
    isPlaying,
    timer,
    startFlow,
    stopFlow,
    resetFlow,
  } = useTimer();

  return (
    <div>
      <div className="relative text-center text-blue-300 font-semibold text-opacity-80 my-3">
        {timer === TimerState.BREAK && (
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
        className={`text-center text-blue-300 font-medium md:text-timer text-8xl mb-12 transition-transform duration-700 transition-brightness ${
          isPlaying ? "scale-105 brightness-110" : "scale-90 brightness-90"
        } select-none`}
      >
        {Math.floor(Math.max(remainingTime, 0) / 60)
          .toString()
          .padStart(2, "0")}
        :{(Math.max(remainingTime, 0) % 60).toString().padStart(2, "0")}
      </p>
      <div className="flex items-center justify-center mb-2">
        {bucketMeterPropses.map((bucketMeterProps, index) => (
          <BucketMeter key={index} {...bucketMeterProps} />
        ))}
      </div>
      <div className="flex items-center justify-center p-1">
        {isPlaying ? (
          <button
            onClick={stopFlow}
            className={`
              btn m-2 p-2 border-none
              bg-blue-700 bg-opacity-10 backdrop-blur-sm
              text-gray-500
              flex items-center justify-center
              h-16 w-16 rounded-full`}
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
};
