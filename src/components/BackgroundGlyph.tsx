"use client";

import { useEffect, useState } from "react";

const layers = [
  { dx: 0, dy: 0, delay: 0, opacity: 0.08, duration: 2 },
  { dx: 8, dy: -12, delay: 0.3, opacity: 0.05, duration: 2.2 },
  { dx: -6, dy: 10, delay: 0.6, opacity: 0.04, duration: 2.4 },
  { dx: 14, dy: 6, delay: 0.9, opacity: 0.03, duration: 2.6 },
  { dx: -10, dy: -8, delay: 1.2, opacity: 0.025, duration: 2.8 },
];

export function BackgroundGlyph() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed top-1/2 -translate-y-1/2 pointer-events-none z-0"
      style={{ right: '-10%', width: '60vh', height: '90vh' }}
    >
      <svg
        viewBox="-20 -20 180 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {layers.map((layer, i) => (
          <g key={i} transform={`translate(${layer.dx}, ${layer.dy})`}>
            <path
              d="M69.9988 239.096L0 136.454L69.9988 181.206L140 136.454L69.9988 239.096Z"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              style={{
                strokeDasharray: 600,
                strokeDashoffset: visible ? 0 : 600,
                strokeOpacity: visible ? layer.opacity : 0,
                transition: `stroke-dashoffset ${layer.duration}s ease-out ${layer.delay}s, stroke-opacity 1s ease-out ${layer.delay}s`,
              }}
            />
            <path
              d="M140 121.991L69.9988 166.749L0 121.991L69.9988 0L140 121.991Z"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              style={{
                strokeDasharray: 600,
                strokeDashoffset: visible ? 0 : 600,
                strokeOpacity: visible ? layer.opacity : 0,
                transition: `stroke-dashoffset ${layer.duration + 0.4}s ease-out ${layer.delay + 0.2}s, stroke-opacity 1s ease-out ${layer.delay + 0.2}s`,
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
