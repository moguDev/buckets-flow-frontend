"use client";
import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { isPlayingState } from "@/state/atoms";

interface Drop {
  x: number;
  y: number;
  length: number;
  velocity: number;
}

const RainAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPlaying = useRecoilValue(isPlayingState);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const numberOfDrops = 120;
    const drops: Drop[] = [];

    for (let i = 0; i < numberOfDrops; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 50 + 150,
        velocity: Math.random() * 2 + 20,
      });
    }

    const drawRain = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "black";
      context.fillRect(0, 0, width, height);
      context.strokeStyle = "#FAFAFF15";
      context.lineWidth = 1;

      drops.forEach((drop) => {
        context.beginPath();
        context.moveTo(drop.x, drop.y);
        context.lineTo(drop.x, drop.y + drop.length);
        context.stroke();

        drop.y += drop.velocity;

        if (drop.y > height) {
          drop.y = -drop.length;
        }
      });

      animationFrameIdRef.current = requestAnimationFrame(drawRain);
    };

    if (isPlaying) {
      drawRain();
    } else {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    }

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <canvas ref={canvasRef} style={{ display: "block", background: "black" }} />
  );
};

export default function RainBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden h-full w-full">
      <RainAnimation />
    </div>
  );
}
