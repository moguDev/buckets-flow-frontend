"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { isPlayingState, bucketCountState } from "../state/atoms";
import Bucket from "./Bucket";

export default function Timer({ init = 1500 }) {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const [count, setCount] = useRecoilState(bucketCountState);
  const [time, setTime] = useState(init);
  const [endTime, setEndTime] = useState(-1);
  const [bucketPropses, setBucketPropses] = useState([
    { filled: 0, active: false },
    { filled: 0, active: false },
    { filled: 0, active: false },
    { filled: 0, active: false },
  ]);

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
        setTime(init);
        setCount((prev) => prev + 1);
        fadeOutAudio();
        setBucketPropses(
          bucketPropses.map((bucket, index) => {
            return { ...bucket, active: false };
          })
        );
      } else {
        const currentCount = Math.ceil(timeRemaining / 1000);
        const minutes = String(Math.floor(currentCount / 60)).padStart(2, "0");
        const seconds = String(currentCount % 60).padStart(2, "0");
        document.title = `${minutes}:${seconds} - buckets Flow`;
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

  const openModal = () => {
    const modal = document.getElementById("my_modal_5") as HTMLDialogElement;
    modal !== null && modal.showModal();
  };

  const handleReset = () => {
    pauseAudio();
    setTime(init);
    setEndTime(Date.now() + init * 1000);
  };

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
            return { ...bucket, filled: (1 - time / init) * 100, active: true };
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
    <div className={`p-2 rounded-xl`}>
      <p className="text-center font-light text-blue-300 text-sm">
        {isPlaying ? "😄雨が降っています！" : "😟..."}
      </p>
      <p
        className={`text-center text-blue-300 font-semibold md:text-9xl text-8xl transition-transform duration-700 ${
          isPlaying ? "scale-100" : "scale-90 brightness-90"
        } mb-5`}
      >
        {String(Math.floor(time / 60)).padStart(2, "0")}:
        {String(time % 60).padStart(2, "0")}
      </p>
      <div className="flex items-center justify-center py-2">
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
            data-tip="雨を止める"
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
            data-tip="雨を降らせる"
          >
            <span className="material-icons">play_arrow</span>
          </button>
        )}
        <button
          onClick={openModal}
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
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-gray-900 bg-opacity-90 backdrop-blur-sm text-white">
          <h3 className="font-bold text-lg">バケツをリセットしますか？</h3>
          <div className="modal-action">
            <form method="dialog w-full">
              <button className="btn mr-2 bg-opacity-0 border-none text-white">
                キャンセル
              </button>
              <button
                className="btn bg-blue-800 bg-opacity-40 border-none text-white"
                onClick={handleReset}
              >
                リセット
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
