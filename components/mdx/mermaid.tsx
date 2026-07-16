"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

export function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        fontFamily: "var(--font-mono), monospace",
        primaryColor: "#000000",
        primaryTextColor: "#ffffff",
        primaryBorderColor: "#06b6d4",
        lineColor: "#06b6d4",
        secondaryColor: "#111827",
        tertiaryColor: "#1f2937",
        clusterBkg: "#00000050",
        clusterBorder: "#06b6d4",
      },
    });

    const renderChart = async () => {
      try {
        // Unique ID for each render
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
      } catch (err) {
        console.error("Mermaid parsing error:", err);
      }
    };

    if (chart) {
      renderChart();
    }
  }, [chart]);

  return (
    <div
      className="mermaid-wrapper flex justify-center my-8 rounded-xl border border-cyan-500/30 bg-card/40 p-6 shadow-2xl backdrop-blur-xl overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
