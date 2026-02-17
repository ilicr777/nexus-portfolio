"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalTypingProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}

export function TerminalTyping({
  text,
  className,
  speed = 50,
  delay = 0,
  cursor = true,
  onComplete,
}: TerminalTypingProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let index = 0;

    const startTyping = () => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    };

    timeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span className={cn("font-mono", className)}>
      {displayText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="text-primary ml-0.5"
        >
          ▋
        </motion.span>
      )}
    </span>
  );
}

interface TerminalPromptProps {
  children: React.ReactNode;
  prefix?: string;
  className?: string;
}

export function TerminalPrompt({
  children,
  prefix = "nexus@security:~$",
  className,
}: TerminalPromptProps) {
  return (
    <div className={cn("font-mono text-sm", className)}>
      <span className="text-emerald-400">{prefix}</span>
      <span className="text-muted-foreground ml-2">{children}</span>
    </div>
  );
}

interface TerminalWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function TerminalWindow({
  children,
  title = "terminal",
  className,
}: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-lg border border-border bg-black/80 backdrop-blur-xl overflow-hidden",
        className
      )}
    >
      {/* Title Bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-background/50">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
        </div>
        <span className="text-xs text-muted-foreground font-mono ml-2">
          {title}
        </span>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-2">
        {children}
      </div>
    </motion.div>
  );
}

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function GlitchText({
  text,
  className,
  intensity = "medium",
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, intensity === "low" ? 5000 : intensity === "medium" ? 3000 : 1500);

    return () => clearInterval(interval);
  }, [intensity]);

  return (
    <span
      className={cn(
        "glitch relative inline-block",
        isGlitching && "animate-pulse",
        className
      )}
      data-text={text}
    >
      {text}
    </span>
  );
}

interface CyberLineProps {
  className?: string;
  direction?: "horizontal" | "vertical";
  animated?: boolean;
}

export function CyberLine({
  className,
  direction = "horizontal",
  animated = true,
}: CyberLineProps) {
  return (
    <div
      className={cn(
        "relative",
        direction === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent",
          direction === "vertical" && "bg-gradient-to-b"
        )}
      />
      {animated && (
        <motion.div
          className={cn(
            "absolute bg-primary",
            direction === "horizontal" ? "h-full w-8" : "w-full h-8"
          )}
          animate={{
            [direction === "horizontal" ? "x" : "y"]: ["0%", "1200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            boxShadow: "0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary) / 0.5)",
          }}
        />
      )}
    </div>
  );
}
