"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Monitor,
  Fingerprint,
  Cookie,
  Globe,
  Wifi,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  RotateCcw,
  Terminal,
  Scan,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Types
interface SecurityCheck {
  id: string;
  name: string;
  description: string;
  status: "pending" | "checking" | "passed" | "warning" | "failed";
  details?: string;
  score: number;
  maxScore: number;
  icon: React.ElementType;
}

interface ScanResult {
  checks: SecurityCheck[];
  totalScore: number;
  maxScore: number;
  grade: "A" | "B" | "C" | "D" | "F";
  timestamp: Date;
}

// Utility to calculate grade
const calculateGrade = (score: number, maxScore: number): "A" | "B" | "C" | "D" | "F" => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 90) return "A";
  if (percentage >= 75) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 40) return "D";
  return "F";
};

// Grade colors
const gradeColors: Record<string, string> = {
  A: "text-emerald-400 border-emerald-400 shadow-emerald-400/50",
  B: "text-green-400 border-green-400 shadow-green-400/50",
  C: "text-yellow-400 border-yellow-400 shadow-yellow-400/50",
  D: "text-orange-400 border-orange-400 shadow-orange-400/50",
  F: "text-red-400 border-red-400 shadow-red-400/50",
};

const gradeGlow: Record<string, string> = {
  A: "shadow-[0_0_50px_rgba(52,211,153,0.5)]",
  B: "shadow-[0_0_50px_rgba(74,222,128,0.5)]",
  C: "shadow-[0_0_50px_rgba(250,204,21,0.5)]",
  D: "shadow-[0_0_50px_rgba(251,146,60,0.5)]",
  F: "shadow-[0_0_50px_rgba(248,113,113,0.5)]",
};

// Status icon component
const StatusIcon = ({ status }: { status: SecurityCheck["status"] }) => {
  switch (status) {
    case "pending":
      return <div className="w-4 h-4 rounded-full border-2 border-zinc-600" />;
    case "checking":
      return <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />;
    case "passed":
      return <CheckCircle className="w-4 h-4 text-emerald-400" />;
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
    case "failed":
      return <XCircle className="w-4 h-4 text-red-400" />;
  }
};

// Scan line animation component
const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-75"
    initial={{ top: 0 }}
    animate={{ top: "100%" }}
    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  />
);

// Terminal text effect
const TerminalText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1));
        index++;
        if (index >= text.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span>{displayText}<span className="animate-pulse">_</span></span>;
};

export function SecurityScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [currentCheckIndex, setCurrentCheckIndex] = useState(-1);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Initialize checks
  const getInitialChecks = (): SecurityCheck[] => [
    {
      id: "https",
      name: "HTTPS Connection",
      description: "Verifying encrypted connection",
      status: "pending",
      score: 0,
      maxScore: 20,
      icon: Lock,
    },
    {
      id: "cookies",
      name: "Cookie Security",
      description: "Checking cookie permissions",
      status: "pending",
      score: 0,
      maxScore: 15,
      icon: Cookie,
    },
    {
      id: "dnt",
      name: "Do Not Track",
      description: "Analyzing privacy preferences",
      status: "pending",
      score: 0,
      maxScore: 10,
      icon: EyeOff,
    },
    {
      id: "webdriver",
      name: "Bot Detection",
      description: "Scanning for automation signatures",
      status: "pending",
      score: 0,
      maxScore: 20,
      icon: Fingerprint,
    },
    {
      id: "screen",
      name: "Display Integrity",
      description: "Validating viewport authenticity",
      status: "pending",
      score: 0,
      maxScore: 15,
      icon: Monitor,
    },
    {
      id: "connection",
      name: "Connection Type",
      description: "Analyzing network properties",
      status: "pending",
      score: 0,
      maxScore: 10,
      icon: Wifi,
    },
    {
      id: "languages",
      name: "Locale Integrity",
      description: "Checking language configuration",
      status: "pending",
      score: 0,
      maxScore: 10,
      icon: Globe,
    },
  ];

  const [checks, setChecks] = useState<SecurityCheck[]>(getInitialChecks());

  // Individual security checks
  const runSecurityChecks = useCallback(async () => {
    const updatedChecks = [...getInitialChecks()];
    
    // Helper to update a specific check
    const updateCheck = (index: number, updates: Partial<SecurityCheck>) => {
      updatedChecks[index] = { ...updatedChecks[index], ...updates };
      setChecks([...updatedChecks]);
    };

    // Check 1: HTTPS
    setCurrentCheckIndex(0);
    updateCheck(0, { status: "checking" });
    await new Promise(r => setTimeout(r, 600));
    
    const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
    const isLocalhost = typeof window !== "undefined" && 
      (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
    
    if (isHttps) {
      updateCheck(0, { 
        status: "passed", 
        score: 20, 
        details: "Connection encrypted via TLS/SSL" 
      });
    } else if (isLocalhost) {
      updateCheck(0, { 
        status: "warning", 
        score: 15, 
        details: "Local development environment detected" 
      });
    } else {
      updateCheck(0, { 
        status: "failed", 
        score: 0, 
        details: "⚠️ Connection is NOT encrypted!" 
      });
    }

    // Check 2: Cookies
    setCurrentCheckIndex(1);
    updateCheck(1, { status: "checking" });
    await new Promise(r => setTimeout(r, 500));
    
    const cookiesEnabled = typeof navigator !== "undefined" && navigator.cookieEnabled;
    if (cookiesEnabled) {
      updateCheck(1, { 
        status: "passed", 
        score: 15, 
        details: "Cookies enabled for session management" 
      });
    } else {
      updateCheck(1, { 
        status: "warning", 
        score: 10, 
        details: "Cookies disabled - some features may not work" 
      });
    }

    // Check 3: Do Not Track
    setCurrentCheckIndex(2);
    updateCheck(2, { status: "checking" });
    await new Promise(r => setTimeout(r, 450));
    
    const dnt = typeof navigator !== "undefined" && 
      (navigator.doNotTrack === "1" || (window as unknown as { doNotTrack?: string }).doNotTrack === "1");
    if (dnt) {
      updateCheck(2, { 
        status: "passed", 
        score: 10, 
        details: "DNT enabled - privacy conscious user" 
      });
    } else {
      updateCheck(2, { 
        status: "warning", 
        score: 5, 
        details: "DNT not enabled - consider enabling for privacy" 
      });
    }

    // Check 4: Bot/WebDriver Detection
    setCurrentCheckIndex(3);
    updateCheck(3, { status: "checking" });
    await new Promise(r => setTimeout(r, 700));
    
    const isWebDriver = typeof navigator !== "undefined" && 
      ((navigator as unknown as { webdriver?: boolean }).webdriver === true);
    const hasAutomationFlags = typeof window !== "undefined" && (
      (window as unknown as { __nightmare?: unknown }).__nightmare ||
      (window as unknown as { phantom?: unknown }).phantom ||
      (window as unknown as { callPhantom?: unknown }).callPhantom ||
      (document as unknown as { __selenium_unwrapped?: unknown }).__selenium_unwrapped ||
      (document as unknown as { __webdriver_evaluate?: unknown }).__webdriver_evaluate ||
      (document as unknown as { __driver_evaluate?: unknown }).__driver_evaluate
    );
    
    if (!isWebDriver && !hasAutomationFlags) {
      updateCheck(3, { 
        status: "passed", 
        score: 20, 
        details: "No automation signatures detected" 
      });
    } else {
      updateCheck(3, { 
        status: "failed", 
        score: 0, 
        details: "⚠️ Automation/Bot signatures detected!" 
      });
    }

    // Check 5: Screen/Window ratio (detect headless browsers)
    setCurrentCheckIndex(4);
    updateCheck(4, { status: "checking" });
    await new Promise(r => setTimeout(r, 550));
    
    if (typeof window !== "undefined" && typeof screen !== "undefined") {
      const screenWidth = screen.width;
      const screenHeight = screen.height;
      const windowWidth = window.outerWidth;
      const windowHeight = window.outerHeight;
      
      // Headless browsers often have suspicious ratios
      const widthRatio = windowWidth / screenWidth;
      const heightRatio = windowHeight / screenHeight;
      const colorDepth = screen.colorDepth;
      
      const isValidRatio = widthRatio > 0.1 && widthRatio <= 1 && heightRatio > 0.1 && heightRatio <= 1;
      const isValidColorDepth = colorDepth >= 24;
      
      if (isValidRatio && isValidColorDepth) {
        updateCheck(4, { 
          status: "passed", 
          score: 15, 
          details: `Display: ${screenWidth}x${screenHeight} @ ${colorDepth}bit` 
        });
      } else if (!isValidColorDepth) {
        updateCheck(4, { 
          status: "warning", 
          score: 8, 
          details: `Unusual color depth: ${colorDepth}bit` 
        });
      } else {
        updateCheck(4, { 
          status: "warning", 
          score: 5, 
          details: "Unusual viewport configuration detected" 
        });
      }
    } else {
      updateCheck(4, { status: "warning", score: 5, details: "Unable to verify display" });
    }

    // Check 6: Connection type
    setCurrentCheckIndex(5);
    updateCheck(5, { status: "checking" });
    await new Promise(r => setTimeout(r, 400));
    
    const connection = typeof navigator !== "undefined" && 
      ((navigator as unknown as { connection?: { effectiveType?: string; saveData?: boolean } }).connection);
    
    if (connection) {
      const effectiveType = connection.effectiveType || "unknown";
      const saveData = connection.saveData;
      updateCheck(5, { 
        status: "passed", 
        score: 10, 
        details: `Connection: ${effectiveType}${saveData ? " (Data Saver ON)" : ""}` 
      });
    } else {
      updateCheck(5, { 
        status: "warning", 
        score: 7, 
        details: "Connection API not available" 
      });
    }

    // Check 7: Language/Locale
    setCurrentCheckIndex(6);
    updateCheck(6, { status: "checking" });
    await new Promise(r => setTimeout(r, 350));
    
    if (typeof navigator !== "undefined") {
      const languages = navigator.languages;
      const language = navigator.language;
      
      if (languages && languages.length > 0) {
        updateCheck(6, { 
          status: "passed", 
          score: 10, 
          details: `Primary: ${language} (${languages.length} configured)` 
        });
      } else if (language) {
        updateCheck(6, { 
          status: "warning", 
          score: 7, 
          details: `Single language: ${language}` 
        });
      } else {
        updateCheck(6, { 
          status: "warning", 
          score: 3, 
          details: "No language preferences detected" 
        });
      }
    } else {
      updateCheck(6, { status: "warning", score: 3, details: "Unable to detect locale" });
    }

    // Calculate final results
    const totalScore = updatedChecks.reduce((sum, check) => sum + check.score, 0);
    const maxScore = updatedChecks.reduce((sum, check) => sum + check.maxScore, 0);
    const grade = calculateGrade(totalScore, maxScore);

    setResult({
      checks: updatedChecks,
      totalScore,
      maxScore,
      grade,
      timestamp: new Date(),
    });

    setCurrentCheckIndex(-1);
    setScanComplete(true);
  }, []);

  const startScan = useCallback(() => {
    setIsScanning(true);
    setScanComplete(false);
    setResult(null);
    setChecks(getInitialChecks());
    setShowDetails(false);
    
    // Start scanning after brief delay for effect
    setTimeout(() => {
      runSecurityChecks().finally(() => {
        setIsScanning(false);
      });
    }, 500);
  }, [runSecurityChecks]);

  const resetScan = () => {
    setIsScanning(false);
    setScanComplete(false);
    setResult(null);
    setChecks(getInitialChecks());
    setCurrentCheckIndex(-1);
    setShowDetails(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Scanner Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        {/* Outer Frame - Cyberpunk HUD Style */}
        <div className="relative border border-cyan-500/30 bg-black/80 backdrop-blur-xl rounded-lg overflow-hidden">
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400" />

          {/* Header */}
          <div className="border-b border-cyan-500/30 bg-cyan-500/5 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-sm text-cyan-400">
                    NEXUS://security-scanner
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isScanning && (
                  <span className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    SCANNING
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="relative p-6">
            {/* Scan line effect when scanning */}
            {isScanning && <ScanLine />}

            {/* Initial State - Before Scan */}
            {!isScanning && !scanComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(34,211,238,0.3)",
                      "0 0 40px rgba(34,211,238,0.5)",
                      "0 0 20px rgba(34,211,238,0.3)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-cyan-400/50 bg-cyan-400/10 mb-6"
                >
                  <Shield className="w-12 h-12 text-cyan-400" />
                </motion.div>
                
                <h3 className="text-xl font-mono font-bold text-white mb-2">
                  Security Posture Scanner
                </h3>
                <p className="text-zinc-400 font-mono text-sm mb-6 max-w-md mx-auto">
                  Analyze your browser&apos;s security configuration and privacy settings in real-time.
                </p>
                
                <Button
                  onClick={startScan}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold px-8 py-3 rounded-none border border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300"
                >
                  <Scan className="w-4 h-4 mr-2" />
                  INITIALIZE SCAN
                </Button>
              </motion.div>
            )}

            {/* Scanning State */}
            {(isScanning || scanComplete) && (
              <div className="space-y-4">
                {/* Progress Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                    Security Analysis
                  </span>
                  <span className="font-mono text-xs text-cyan-400">
                    {checks.filter(c => c.status !== "pending" && c.status !== "checking").length}/{checks.length} COMPLETE
                  </span>
                </div>

                {/* Check Items */}
                <div className="space-y-2">
                  {checks.map((check, index) => {
                    const Icon = check.icon;
                    const isActive = currentCheckIndex === index;
                    
                    return (
                      <motion.div
                        key={check.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          backgroundColor: isActive ? "rgba(34,211,238,0.1)" : "transparent"
                        }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          "relative flex items-center gap-3 p-3 rounded border transition-all duration-300",
                          isActive 
                            ? "border-cyan-400/50" 
                            : check.status === "passed"
                            ? "border-emerald-500/30"
                            : check.status === "warning"
                            ? "border-yellow-500/30"
                            : check.status === "failed"
                            ? "border-red-500/30"
                            : "border-zinc-800"
                        )}
                      >
                        {/* Icon */}
                        <div className={cn(
                          "flex items-center justify-center w-8 h-8 rounded",
                          check.status === "passed" ? "bg-emerald-500/20 text-emerald-400" :
                          check.status === "warning" ? "bg-yellow-500/20 text-yellow-400" :
                          check.status === "failed" ? "bg-red-500/20 text-red-400" :
                          "bg-zinc-800 text-zinc-500"
                        )}>
                          <Icon className="w-4 h-4" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-white">
                              {check.name}
                            </span>
                            {check.status !== "pending" && check.status !== "checking" && (
                              <span className="font-mono text-xs text-zinc-500">
                                [{check.score}/{check.maxScore}]
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-xs text-zinc-500 block truncate">
                            {check.status === "checking" ? (
                              <TerminalText text={check.description} />
                            ) : check.details || check.description}
                          </span>
                        </div>

                        {/* Status */}
                        <StatusIcon status={check.status} />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Results */}
                <AnimatePresence>
                  {scanComplete && result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-8 pt-6 border-t border-zinc-800"
                    >
                      {/* Grade Display */}
                      <div className="text-center mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.5 }}
                          className={cn(
                            "inline-flex items-center justify-center w-32 h-32 rounded-lg border-2 text-6xl font-mono font-bold mb-4 transition-all duration-500",
                            gradeColors[result.grade],
                            gradeGlow[result.grade]
                          )}
                        >
                          {result.grade}
                        </motion.div>
                        
                        <div className="space-y-1">
                          <p className="font-mono text-lg text-white">
                            Security Score: <span className="text-cyan-400">{result.totalScore}</span>/{result.maxScore}
                          </p>
                          <p className="font-mono text-sm text-zinc-500">
                            Scan completed at {result.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>

                      {/* Summary Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-3 bg-emerald-500/10 border border-emerald-500/30 rounded">
                          <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                          <span className="font-mono text-lg text-emerald-400">
                            {result.checks.filter(c => c.status === "passed").length}
                          </span>
                          <p className="font-mono text-xs text-zinc-500">Passed</p>
                        </div>
                        <div className="text-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                          <AlertTriangle className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                          <span className="font-mono text-lg text-yellow-400">
                            {result.checks.filter(c => c.status === "warning").length}
                          </span>
                          <p className="font-mono text-xs text-zinc-500">Warnings</p>
                        </div>
                        <div className="text-center p-3 bg-red-500/10 border border-red-500/30 rounded">
                          <XCircle className="w-5 h-5 text-red-400 mx-auto mb-1" />
                          <span className="font-mono text-lg text-red-400">
                            {result.checks.filter(c => c.status === "failed").length}
                          </span>
                          <p className="font-mono text-xs text-zinc-500">Failed</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 justify-center">
                        <Button
                          onClick={startScan}
                          variant="outline"
                          className="font-mono border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 rounded-none"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          RESCAN
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Footer Status Bar */}
          <div className="border-t border-cyan-500/30 bg-cyan-500/5 px-4 py-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">
                {isScanning ? (
                  <span className="text-cyan-400">▶ Executing security analysis...</span>
                ) : scanComplete ? (
                  <span className="text-emerald-400">✓ Scan complete</span>
                ) : (
                  <span>Ready to scan</span>
                )}
              </span>
              <span className="text-zinc-600">
                NEXUS Security Suite v1.0
              </span>
            </div>
          </div>
        </div>

        {/* Outer Glow Effect */}
        {scanComplete && result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "absolute -inset-1 rounded-lg blur-xl -z-10 transition-all duration-1000",
              result.grade === "A" ? "bg-emerald-500/20" :
              result.grade === "B" ? "bg-green-500/20" :
              result.grade === "C" ? "bg-yellow-500/20" :
              result.grade === "D" ? "bg-orange-500/20" :
              "bg-red-500/20"
            )}
          />
        )}
      </motion.div>

      {/* Decorative Elements */}
      <div className="mt-6 text-center">
        <p className="font-mono text-xs text-zinc-600">
          All scans run locally in your browser. No data is transmitted.
        </p>
      </div>
    </div>
  );
}
