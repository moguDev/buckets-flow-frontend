"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { isPlayingState, bucketCountState } from "@/recoil/timerState";
import Bucket from "./Bucket";
import { useBuckets } from "@/recoil/bucketsState";

export default function Timer({ init = 5 }) {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const [count, setCount] = useRecoilState(bucketCountState);
  const [startTime, setStartTime] = useState(-1);
  const [endTime, setEndTime] = useState(-1);
  const [remainingTime, setRemainingTime] = useState(init);
  const [bucketPropses, setBucketPropses] = useState([
    { filled: 0, active: false },
    { filled: 0, active: false },
    { filled: 0, active: false },
    { filled: 0, active: false },
  ]);

  const { createBucket } = useBuckets();

  /** 雨音のセットアップ **/
  useEffect(() => {
    const fetchAudio = async () => {
      const context = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      audioContextRef.current = context;

      const response = await fetch("/sounds/rain_sound.mp3");
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await context.decodeAudioData(arrayBuffer);
      audioBufferRef.current = audioBuffer;
    };

    fetchAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  /** タイマーのカウント **/
  useEffect(() => {
    if (!isPlaying) return;

    const updateTimer = () => {
      const currentTime = Date.now();
      const newRemainingTime = Math.ceil((endTime - currentTime) / 1000);

      if (newRemainingTime <= 0) {
        finishFlow();
      } else {
        const minutes = String(Math.floor(newRemainingTime / 60)).padStart(
          2,
          "0"
        );
        const seconds = String(newRemainingTime % 60).padStart(2, "0");
        document.title = `${minutes}:${seconds} - buckets Flow`;
        setRemainingTime(newRemainingTime);
        setBucketPropses(
          bucketPropses.map((bucket, index) => {
            return index === count % 4
              ? {
                  ...bucket,
                  filled: (1 - newRemainingTime / init) * 100,
                  active: true,
                }
              : { ...bucket, active: false };
          })
        );
      }
    };

    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [isPlaying, endTime, count, bucketPropses]);

  const startFlow = () => {
    if (audioContextRef.current && audioBufferRef.current) {
      const context = audioContextRef.current;
      const source = context.createBufferSource();
      const gainNode = context.createGain();

      source.buffer = audioBufferRef.current;
      source.connect(gainNode);
      gainNode.connect(context.destination);
      gainNode.gain.value = 1.5;

      source.loop = true;
      source.start(0);
      sourceRef.current = source;
      gainNodeRef.current = gainNode;

      startTime < 0 && setStartTime(Date.now());
      setIsPlaying(true);
      setEndTime(Date.now() + remainingTime * 1000);
      setBucketPropses(
        bucketPropses.map((bucket, index) => {
          if (index === count % 4) {
            return {
              ...bucket,
              filled: (1 - remainingTime / init) * 100,
              active: true,
            };
          } else if (index < count % 4) {
            return { ...bucket, filled: 100, active: false };
          }
          return { ...bucket, active: false };
        })
      );
    }
  };

  const stopFlow = () => {
    if (sourceRef.current) {
      sourceRef.current.stop();
      sourceRef.current = null;
      setIsPlaying(false);
    }
  };

  const finishFlow = () => {
    createBucket({
      filled: true,
      duration: 1500,
      storage: 1500,
      starttime: Math.ceil(startTime / 1000),
      endtime: Math.ceil(endTime / 1000),
    });
    setIsPlaying(false);
    setRemainingTime(init);
    setCount((prev) => prev + 1);
    setBucketPropses(
      bucketPropses.map((bucket, index) => {
        return { ...bucket, active: false };
      })
    );
    setStartTime(-1);
    if (gainNodeRef.current) {
      const gainNode = gainNodeRef.current;
      const fadeOutDuration = 1; // フェードアウトにかける秒数
      const fadeOutInterval = 0.05; // フェードアウトのインターバル（秒）

      let currentVolume = gainNode.gain.value;
      const step = currentVolume / (fadeOutDuration / fadeOutInterval);

      const fadeOut = setInterval(() => {
        currentVolume -= step;
        if (currentVolume <= 0) {
          clearInterval(fadeOut);
          gainNode.gain.value = 0;
          stopFlow(); // フェードアウト完了後に停止
        } else {
          gainNode.gain.value = currentVolume;
        }
      }, fadeOutInterval * 1000);
    }
  };

  const resetFlow = () => {
    stopFlow();
    setRemainingTime(init);
    setEndTime(Date.now() + init * 1000);
  };

  return (
    <div className={`p-2 rounded-xl`}>
      <p
        className={`text-center text-blue-300 font-semibold md:text-9xl text-8xl transition-transform duration-700 transition-brightness ${
          isPlaying ? "scale-105 brightness-110" : "scale-90 brightness-90"
        } mb-5`}
      >
        {String(Math.floor(remainingTime / 60)).padStart(2, "0")}:
        {String(remainingTime % 60).padStart(2, "0")}
      </p>
      <div className="flex items-center justify-center py-4">
        {bucketPropses.map((bucketProps, index) => (
          <Bucket key={index} {...bucketProps} />
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
            data-tip="雨を止める"
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
              h-16 w-16 rounded-full tooltip`}
            data-tip="雨を降らせる"
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
              h-16 w-16 rounded-full tooltip`}
          data-tip="リセット"
        >
          <span className="material-icons">replay</span>
        </button>
      </div>
    </div>
  );
}
