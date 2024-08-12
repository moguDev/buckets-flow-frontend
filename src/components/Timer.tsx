"use client";
import React, { useEffect, useRef, useState } from "react";
import { TimerState, useTimer } from "@/recoil/timerState";
import BucketMeter from "./BucketMeter";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { atom, useRecoilState } from "recoil";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

export const ItemType = "TAG";

interface LabelItemProps {
  title: string;
}

interface LabelAreaProps {
  onDrop: (tag: string) => void;
}

const droppedTagState = atom<string | null>({
  key: "droppedTagState",
  default: null,
});

const LabelItem: React.FC<LabelItemProps> = ({ title: tag }) => {
  const [, drag] = useDrag({
    type: ItemType,
    item: { tag },
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  return (
    <div
      ref={ref}
      className="text-blue-300 bg-blue-500 bg-opacity-20 text-sm rounded-xl p-2 m-1 cursor-pointer select-none"
    >
      {tag}
    </div>
  );
};

const LabelArea = ({ onDrop }: LabelAreaProps) => {
  const [droppedTag, setDroppedTag] = useRecoilState(droppedTagState);
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item: { tag: string }) => onDrop(item.tag),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [drop]);

  const styleUtils = droppedTag
    ? "text-blue-300 bg-blue-500 bg-opacity-20 h-10"
    : "bg-opacity-0 border border-dashed border-gray-300 text-gray-300 opacity-50 h-12";

  return (
    <div
      ref={ref}
      className={`flex items-center rounded-xl pl-4 pr-2 py-2 ${styleUtils}`}
    >
      <p className="">
        {droppedTag
          ? `${droppedTag}`
          : "ラベルをドロップしてバケツに貼り付ける"}
      </p>
      {droppedTag && (
        <button
          onClick={() => {
            setDroppedTag(null);
          }}
          className="material-icons text-xs p-1 opacity-30 scale-75 hover:opacity-50"
        >
          cancel
        </button>
      )}
    </div>
  );
};

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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // クライアントサイドでのみ実行
    const isMobile = (): boolean => {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    };

    setIsMobile(isMobile());
  }, []);

  const tags = ["React", "Next.js", "TypeScript", "JavaScript"];
  const [droppedTag, setDroppedTag] = useRecoilState(droppedTagState);

  const handleDrop = (tag: string) => {
    setDroppedTag(tag);
  };

  return (
    <DndProvider
      backend={isMobile ? TouchBackend : HTML5Backend}
      options={{ enableMouseEvents: true }}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <div className="relative text-center text-blue-300 font-semibold text-opacity-80">
          {timer === TimerState.WORKING && <LabelArea onDrop={handleDrop} />}
          {timer === TimerState.SHORT_BREAK && <p>短い休憩</p>}
          {timer === TimerState.LONG_BREAK && <p>長い休憩</p>}
        </div>
        <p
          className={`text-center text-blue-300 font-semibold md:text-9xl text-8xl transition-transform duration-700 transition-brightness ${
            isPlaying ? "scale-105 brightness-110" : "scale-90 brightness-90"
          } mb-5 select-none`}
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
              h-16 w-16 rounded-full tooltip`}
              data-tip="スタート"
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
            <span className="material-icons">refresh</span>
          </button>
        </div>
        <div className="relative bg-opacity-0 items-center mt-12">
          <div className="flex mt-5 bg-opacity-0">
            {tags.map((tag) => (
              <LabelItem key={tag} title={tag} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
