import { useEffect, useRef } from "react";

export const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

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

  return {};
};
