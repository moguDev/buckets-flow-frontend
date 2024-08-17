import { atom } from "recoil";
import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useBuckets } from "./useBuckets";
import { BucketMeterProps } from "@/components/BucketMeter";

export enum TimerStatus {
  WORKING,
  SHORT_BREAK,
  LONG_BREAK,
}

export const timerState = atom({
  key: "timeState",
  default: {
    isPlaying: false,
    status: TimerStatus.WORKING,
  },
});

export const timerSettingsState = atom<Record<TimerStatus, number>>({
  key: "timerSettingsState",
  default: {
    [TimerStatus.WORKING]: 25 * 60, // 25分
    [TimerStatus.SHORT_BREAK]: 5 * 60, // 5分
    [TimerStatus.LONG_BREAK]: 30 * 60, // 30分
  },
});

const setTimerCountToTitle = (remainingTime: number) => {
  const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
  const seconds = String(remainingTime % 60).padStart(2, "0");
  document.title = `${minutes}:${seconds} | buckets Flow`;
};

export const useTimer = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const [timer, setTimer] = useRecoilState(timerState);
  const [bucketCount, setBucketCount] = useState<number>(0);
  const [timerSettings] = useRecoilState(timerSettingsState);

  const [startTime, setStartTime] = useState<number>(-1);
  const [endTime, setEndTime] = useState<number>(-1);
  const [remainingTime, setRemainingTime] = useState<number>(
    timerSettings[TimerStatus.WORKING]
  );
  const [bucketMeterPropses, setBucketMeterPropses] = useState<
    BucketMeterProps[]
  >([
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

  const playBucketSound = async () => {
    const context = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const response = await fetch("/sounds/bucket_sound_put01.mp3");
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start(0);
  };

  useEffect(() => {
    !timer.isPlaying && setRemainingTime(timerSettings[timer.status]);
  }, [timerSettings]);

  /** タイマーのカウント **/
  useEffect(() => {
    if (!timer.isPlaying) return;

    const updateTimer = () => {
      const currentTime = Date.now();
      const newRemainingTime = Math.ceil((endTime - currentTime) / 1000);
      setTimerCountToTitle(newRemainingTime);
      setRemainingTime(newRemainingTime);
      timer.status === TimerStatus.WORKING &&
        setBucketMeterPropses(
          bucketMeterPropses.map((bucket, index) => {
            return index === bucketCount % 4
              ? {
                  ...bucket,
                  filled:
                    (1 -
                      newRemainingTime / timerSettings[TimerStatus.WORKING]) *
                    100,
                  active: true,
                }
              : { ...bucket, active: false };
          })
        );

      newRemainingTime <= 0 && finishFlow();
    };

    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [timer, endTime, bucketCount, bucketMeterPropses]);

  const startFlow = () => {
    if (audioContextRef.current && audioBufferRef.current) {
      startTime < 0 && setStartTime(Date.now());
      setTimerCountToTitle(remainingTime);
      setEndTime(Date.now() + remainingTime * 1000);
      setTimer({ ...timer, isPlaying: true });
      if (timer.status === TimerStatus.WORKING) {
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
        setBucketMeterPropses(
          bucketMeterPropses.map((bucket, index) => {
            if (index === bucketCount % 4) {
              return {
                ...bucket,
                filled: (1 - remainingTime / timerSettings[timer.status]) * 100,
                active: true,
              };
            } else if (index < bucketCount % 4) {
              return { ...bucket, filled: 100, active: false };
            }
            return { ...bucket, active: false };
          })
        );
      }
    }
  };

  const stopFlow = () => {
    if (sourceRef.current) {
      sourceRef.current.stop();
      sourceRef.current = null;
    }
    setTimer({ ...timer, isPlaying: false });
  };

  const finishFlow = async () => {
    setTimer({ ...timer, isPlaying: true });
    if (timer.status === TimerStatus.WORKING) {
      createBucket({
        filled: true,
        duration: timerSettings[TimerStatus.WORKING],
        storage: timerSettings[TimerStatus.WORKING],
        starttime: Math.ceil(startTime / 1000),
        endtime: Math.ceil(endTime / 1000),
      });
      if (bucketCount % 4 === 3) {
        setTimer({ ...timer, status: TimerStatus.LONG_BREAK });
        setRemainingTime(timerSettings[TimerStatus.LONG_BREAK]);
      } else {
        setTimer({ ...timer, status: TimerStatus.SHORT_BREAK });
        setRemainingTime(timerSettings[TimerStatus.SHORT_BREAK]);
      }
    } else {
      if (timer.status === TimerStatus.LONG_BREAK) {
        setBucketMeterPropses([
          { filled: 0, active: false },
          { filled: 0, active: false },
          { filled: 0, active: false },
          { filled: 0, active: false },
        ]);
      } else {
        setBucketMeterPropses(
          bucketMeterPropses.map((bucket) => ({ ...bucket, active: false }))
        );
      }
      await playBucketSound();
      setBucketCount((prev) => prev + 1);
      setTimer({ ...timer, status: TimerStatus.WORKING });
      setRemainingTime(timerSettings[TimerStatus.WORKING]);
    }
    setStartTime(-1);
    if (gainNodeRef.current) {
      const gainNode = gainNodeRef.current;
      const fadeOutDuration = 0.5;
      const fadeOutInterval = 0.05;

      let currentVolume = gainNode.gain.value;
      const step = currentVolume / (fadeOutDuration / fadeOutInterval);
      const fadeOut = setInterval(() => {
        currentVolume -= step;
        if (currentVolume <= 0) {
          clearInterval(fadeOut);
          gainNode.gain.value = 0;
          stopFlow();
        } else {
          gainNode.gain.value = currentVolume;
        }
      }, fadeOutInterval * 1000);
    }
  };

  const resetFlow = () => {
    stopFlow();
    setRemainingTime(timerSettings[timer.status]);
    setEndTime(Date.now() + timerSettings[timer.status] * 1000);
  };

  return {
    timer,
    remainingTime,
    bucketPropses: bucketMeterPropses,
    startFlow,
    stopFlow,
    resetFlow,
  };
};
