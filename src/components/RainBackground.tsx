"use client";
import React, { useEffect, useRef, useState } from "react";
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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initializeDrops = (width: number, height: number) => {
      const numberOfDrops = 120;
      const drops: Drop[] = [];
      for (let i = 0; i < numberOfDrops; i++) {
        drops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * 50 + 100,
          velocity: Math.random() * 2 + 20,
        });
      }
      return drops;
    };

    const drawRain = (drops: Drop[], width: number, height: number) => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#040612";
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

      animationFrameIdRef.current = requestAnimationFrame(() =>
        drawRain(drops, width, height)
      );
    };

    const handleResize = () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      resizeCanvas();
      const width = canvas.width;
      const height = canvas.height;
      const drops = initializeDrops(width, height);
      if (isPlaying) {
        drawRain(drops, width, height);
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial setup
    handleResize();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", background: "#040612" }}
    />
  );
};

export default function RainBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden h-full w-full">
      <RainAnimation />
    </div>
  );
}
