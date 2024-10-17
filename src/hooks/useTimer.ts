import { atom } from "recoil";
import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useBuckets } from "./useBuckets";
import { BucketMeterProps } from "@/components/BucketMeter";

export enum TimerState {
  WORKING,
  BREAK,
  LONG_BREAK,
}

export const durationPreferenceState = atom<Record<TimerState, number>>({
  key: "durationPreferenceState",
  default: {
    [TimerState.WORKING]: 25, // 25分
    [TimerState.BREAK]: 5 * 60, // 5分
    [TimerState.LONG_BREAK]: 30 * 60, // 30分
  },
});

export const isPlayingState = atom<boolean>({
  key: "isPlayingState",
  default: false,
});

export const bucketCountState = atom<number>({
  key: "bucketCountState",
  default: 0,
});

export const timerState = atom<TimerState>({
  key: "timerState",
  default: TimerState.WORKING,
});

export const volumeState = atom<number>({ key: "volumeState", default: 50.0 });

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
  const [volume, setVolume] = useRecoilState<number>(volumeState);
  const [isPlaying, setIsPlaying] = useRecoilState<boolean>(isPlayingState);
  const [bucketCount, setBucketCount] =
    useRecoilState<number>(bucketCountState);
  const [timer, setTimer] = useRecoilState<TimerState>(timerState);
  const [durationPreference] = useRecoilState(durationPreferenceState);
  const [startTime, setStartTime] = useState<number>(-1);
  const [endTime, setEndTime] = useState<number>(-1);
  const [remainingTime, setRemainingTime] = useState<number>(
    durationPreference[TimerState.WORKING]
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
    !isPlaying && setRemainingTime(durationPreference[timer]);
  }, [durationPreference]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        3.0 * (volume / 100),
        audioContextRef.current!.currentTime
      );
    }
  }, [volume]);

  /** タイマーのカウント **/
  useEffect(() => {
    if (!isPlaying) {
      return;
    } else {
      const updateTimer = () => {
        const currentTime = Date.now();
        const newRemainingTime = Math.ceil((endTime - currentTime) / 1000);
        setTimerCountToTitle(newRemainingTime);
        setRemainingTime(newRemainingTime);
        timer === TimerState.WORKING &&
          setBucketMeterPropses(
            bucketMeterPropses.map((bucket, index) => {
              return index === bucketCount % 4
                ? {
                    ...bucket,
                    filled:
                      (1 -
                        newRemainingTime /
                          durationPreference[TimerState.WORKING]) *
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
    }
  }, [isPlaying, remainingTime, endTime, bucketCount, bucketMeterPropses]);

  const startFlow = () => {
    if (audioContextRef.current && audioBufferRef.current) {
      startTime < 0 && setStartTime(Date.now());
      setTimerCountToTitle(remainingTime);
      setEndTime(Date.now() + remainingTime * 1000);
      setIsPlaying(true);
      if (timer === TimerState.WORKING) {
        const context = audioContextRef.current;
        const source = context.createBufferSource();
        const gainNode = context.createGain();
        source.buffer = audioBufferRef.current;
        source.connect(gainNode);
        gainNode.connect(context.destination);
        gainNode.gain.value = 3.0 * (volume / 100);
        source.loop = true;
        source.start(0);
        sourceRef.current = source;
        gainNodeRef.current = gainNode;
        setBucketMeterPropses(
          bucketMeterPropses.map((bucket, index) => {
            if (index === bucketCount % 4) {
              return {
                ...bucket,
                filled: (1 - remainingTime / durationPreference[timer]) * 100,
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
    setIsPlaying(false);
  };

  /** 通知の許可をリクエスト */
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.warn("通知が許可されていません");
        }
      });
    }
  }, []);

  /** タイマー終了時の通知を表示する関数 */
  const showNotification = (message: string) => {
    if (Notification.permission === "granted") {
      new Notification("buckets Flow", { body: message });
    }
  };

  const finishFlow = async () => {
    setIsPlaying(false);
    if (timer === TimerState.WORKING) {
      createBucket({
        filled: true,
        duration: durationPreference[TimerState.WORKING],
        storage: durationPreference[TimerState.WORKING],
        starttime: Math.ceil(startTime / 1000),
        endtime: Math.ceil(endTime / 1000),
      });
      if (bucketCount % 4 === 3) {
        setTimer(TimerState.LONG_BREAK);
        setRemainingTime(durationPreference[TimerState.LONG_BREAK]);
        showNotification("お疲れさま！長い休憩の時間です🎉");
      } else {
        setTimer(TimerState.BREAK);
        setRemainingTime(durationPreference[TimerState.BREAK]);
        showNotification("休憩の時間です☕️");
      }
    } else {
      if (timer === TimerState.LONG_BREAK) {
        setBucketMeterPropses([
          { filled: 0, active: false },
          { filled: 0, active: false },
          { filled: 0, active: false },
          { filled: 0, active: false },
        ]);
      }
      await playBucketSound();
      setBucketCount((prev) => prev + 1);
      setTimer(TimerState.WORKING);
      setRemainingTime(durationPreference[TimerState.WORKING]);
      showNotification("次のセッションを始めましょう！💪");
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
    setRemainingTime(durationPreference[timer]);
    setEndTime(Date.now() + durationPreference[timer] * 1000);
  };

  return {
    isPlaying,
    remainingTime,
    bucketMeterPropses,
    timer,
    startFlow,
    stopFlow,
    resetFlow,
  };
};
