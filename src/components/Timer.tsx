"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { isPlayingState } from "../state/atoms";
import Bucket from "./Bucket";

export default function Timer() {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const [count, setCount] = useState(5);
  const [endTime, setEndTime] = useState(-1);

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

  useEffect(() => {
    const t = setInterval(() => {
      const currentTime = Date.now();
      if (endTime - currentTime < 0) {
        setIsPlaying(false);
        setCount(1500);
        fadeOutAudio();
      }
      if (isPlaying) {
        const currentCount = Math.ceil((endTime - currentTime) / 1000);
        document.title = `${Math.floor(currentCount / 60)}:${String(
          currentCount % 60
        ).padStart(2, "0")} | RAINY`;
        setCount(currentCount);
      }
    }, 1000);
    return () => {
      clearInterval(t);
    };
  }, [isPlaying, endTime]);

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
      setEndTime(Date.now() + count * 1000);
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
    <div className="py-10 px-5">
      <p className="text-center text-blue-300 font-normal text-9xl mb-5">
        {Math.floor(count / 60)}:{String(count % 60).padStart(2, "0")}
      </p>
      <Bucket filled={(count / 1500) * 100} />
      <div className="flex items-center justify-center">
        {isPlaying ? (
          <button
            onClick={pauseAudio}
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
            onClick={playAudio}
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
      </div>
    </div>
  );
}
