"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const welcomeTexts = [
  { text: "Welcome", lang: "en" },
  { text: "Bienvenido", lang: "es" },
  { text: "Bienvenue", lang: "fr" },
  { text: "欢迎", lang: "zh" },
  { text: "Benvenuto", lang: "it" },
];

interface WelcomeAnimationProps {
  onComplete: () => void;
}

export function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Duration for each word
    const wordDuration = 400;
    const totalWords = welcomeTexts.length;

    if (currentIndex < totalWords - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, wordDuration);
      return () => clearTimeout(timer);
    } else {
      // After last word, wait a bit then exit
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, wordDuration + 200);
      return () => clearTimeout(exitTimer);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (isExiting) {
      // Allow exit animation to complete before calling onComplete
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(completeTimer);
    }
  }, [isExiting, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] }
          }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -inset-[100%] opacity-30"
              style={{
                background: "radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 50%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Welcome text */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  y: -20, 
                  scale: 0.9,
                  transition: {
                    duration: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }
                }}
                className="text-center"
              >
                <span className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                  {welcomeTexts[currentIndex].text}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
              {welcomeTexts.map((_, index) => (
                <motion.div
                  key={index}
                  className="h-1.5 rounded-full bg-foreground/20"
                  initial={{ width: 8 }}
                  animate={{
                    width: index === currentIndex ? 24 : 8,
                    backgroundColor: index === currentIndex 
                      ? "hsl(var(--primary))" 
                      : index < currentIndex 
                        ? "hsl(var(--foreground) / 0.5)"
                        : "hsl(var(--foreground) / 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 h-16 w-16 border-l-2 border-t-2 border-foreground/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 h-16 w-16 border-r-2 border-b-2 border-foreground/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
