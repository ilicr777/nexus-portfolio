"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface MatrixRainProps {
  className?: string;
  color?: string;
  fontSize?: number;
  speed?: number;
  density?: number;
}

export function MatrixRain({
  className,
  color = "0, 255, 170", // Cyan-green
  fontSize = 14,
  speed = 33,
  density = 0.05,
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const dropsRef = useRef<number[]>([]);

  const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\+=_-*&^%$#@!";

  const initializeDrops = useCallback((columns: number) => {
    dropsRef.current = Array(columns).fill(1).map(() => Math.random() * -100);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        const columns = Math.floor(canvas.width / fontSize);
        initializeDrops(columns);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = `rgba(0, 0, 0, ${density})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = `rgba(${color}, 0.8)`;
      ctx.font = `${fontSize}px monospace`;

      const columns = Math.floor(canvas.width / fontSize);

      for (let i = 0; i < columns; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = dropsRef.current[i] * fontSize;

        // Brighter character at the head of the drop
        ctx.fillStyle = `rgba(${color}, 1)`;
        ctx.fillText(char, x, y);

        // Trail characters (dimmer)
        if (Math.random() > 0.98) {
          ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
          ctx.fillText(char, x, y);
        }

        // Reset drop when it goes off screen
        if (y > canvas.height && Math.random() > 0.975) {
          dropsRef.current[i] = 0;
        }

        dropsRef.current[i]++;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    const intervalId = setInterval(() => {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(draw);
      }
    }, speed);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(intervalId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, fontSize, speed, density, characters, initializeDrops]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{ opacity: 0.15 }}
    />
  );
}
