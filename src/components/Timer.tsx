"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { isPlayingState, bucketCountState } from "../state/atoms";
import Bucket from "./Bucket";

export default function Timer() {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const [count, setCount] = useRecoilState(bucketCountState);
  const [time, setTime] = useState(5);
  const [endTime, setEndTime] = useState(-1);
  const [bucketPropses, setBucketPropses] = useState([
    { filled: 0, active: false },
    { filled: 0, active: false },
    { filled: 0, active: false },
    { filled: 0, active: false },
  ]);

  const rainingWords = [
    "まるで天からの贈り物だな！",
    "降り注ぐ雨が心まで洗い流してくれる！",
    "雨音が心を癒してくれる！",
    "雨に包まれて、世界が一層美しく見える！",
    "雨だけが、俺たちの心を満たしてくれる！",
  ];

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
      const timeRemaining = endTime - currentTime;

      if (timeRemaining <= 0) {
        setIsPlaying(false);
        setTime(1500);
        setCount((prev) => prev + 1);
        fadeOutAudio();
        setBucketPropses(
          bucketPropses.map((bucket, index) => {
            return { ...bucket, active: false };
          })
        );
      } else {
        const currentCount = Math.ceil(timeRemaining / 1000);
        const minutes = Math.floor(currentCount / 60);
        const seconds = String(currentCount % 60).padStart(2, "0");
        document.title = `${minutes}:${seconds} | RAINY`;
        setTime(currentCount);
        setBucketPropses(
          bucketPropses.map((bucket, index) => {
            return index === count % 4
              ? {
                  ...bucket,
                  filled: (1 - time / 1500) * 100,
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

  const playAudio = () => {
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

      setIsPlaying(true);
      setEndTime(Date.now() + time * 1000);
      setBucketPropses(
        bucketPropses.map((bucket, index) => {
          if (index === count % 4) {
            return { ...bucket, filled: (1 - time / 1500) * 100, active: true };
          } else if (index < count % 4) {
            return { ...bucket, filled: 100, active: false };
          }
          return { ...bucket, active: false };
        })
      );
    }
  };

  const fadeOutAudio = () => {
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
          pauseAudio(); // フェードアウト完了後に停止
        } else {
          gainNode.gain.value = currentVolume;
        }
      }, fadeOutInterval * 1000);
    }
  };

  const pauseAudio = () => {
    if (sourceRef.current) {
      sourceRef.current.stop();
      sourceRef.current = null;
      setIsPlaying(false);
    }
  };

  return (
    <div className="p-5">
      <p className="text-center font-light text-blue-300 text-sm">
        {isPlaying
          ? "💪😄☂️ " + rainingWords[count % rainingWords.length]
          : "😟🌂 ..."}
      </p>
      <p
        className={`text-center text-blue-300 font-normal md:text-9xl text-8xl transition-transform duration-700 ${
          isPlaying ? "scale-100" : "scale-90 brightness-90"
        } mb-5`}
      >
        {String(Math.floor(time / 60)).padStart(2, "0")}:
        {String(time % 60).padStart(2, "0")}
      </p>
      <div className="flex items-center justify-center p-2">
        {bucketPropses.map((bucketProps, index) => (
          <Bucket key={index} {...bucketProps} />
        ))}
      </div>
      <div className="flex items-center justify-center py-2">
        {isPlaying ? (
          <button
            onClick={pauseAudio}
            className={`
              btn m-2 p-2 border-none
              bg-blue-700 bg-opacity-10 backdrop-blur-sm
              text-gray-500
              flex items-center justify-center
              h-16 w-16 rounded-full tooltip`}
            data-tip="Stop the rain"
          >
            <span className="material-icons">pause</span>
          </button>
        ) : (
          <button
            onClick={playAudio}
            className={`
              btn m-2 p-2 border-none
              bg-blue-700 bg-opacity-10 backdrop-blur-sm
              text-gray-500 
              flex items-center justify-center
              h-16 w-16 rounded-full tooltip`}
            data-tip="Cause rain"
          >
            <span className="material-icons">play_arrow</span>
          </button>
        )}
      </div>
    </div>
  );
}
