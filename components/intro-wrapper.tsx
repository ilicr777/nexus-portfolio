"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WelcomeAnimation } from "./welcome-animation";

interface IntroWrapperProps {
  children: React.ReactNode;
}

export function IntroWrapper({ children }: IntroWrapperProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if user has seen the intro in this session
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem("hasSeenIntro", "true");
  };

  // Prevent flash during hydration
  if (!isClient) {
    return (
      <div className="opacity-0">
        {children}
      </div>
    );
  }

  return (
    <>
      {showIntro && <WelcomeAnimation onComplete={handleIntroComplete} />}
      <motion.div
        initial={showIntro ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.5, delay: showIntro ? 0 : 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}
