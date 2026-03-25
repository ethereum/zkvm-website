"use client";

import { useEffect, useState } from "react";

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
        viewBox="0 0 140 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {/* Bottom diamond - draws first, then fills */}
        <path
          d="M69.9988 239.096L0 136.454L69.9988 181.206L140 136.454L69.9988 239.096Z"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          style={{
            strokeDasharray: 600,
            strokeDashoffset: visible ? 0 : 600,
            strokeOpacity: visible ? 0.08 : 0,
            transition: 'stroke-dashoffset 2s ease-out, stroke-opacity 1s ease-out',
          }}
        />
        {/* Top diamond - draws second, then fills */}
        <path
          d="M140 121.991L69.9988 166.749L0 121.991L69.9988 0L140 121.991Z"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          style={{
            strokeDasharray: 600,
            strokeDashoffset: visible ? 0 : 600,
            strokeOpacity: visible ? 0.08 : 0,
            transition: 'stroke-dashoffset 2.5s ease-out 0.4s, stroke-opacity 1s ease-out 0.4s',
          }}
        />
      </svg>
    </div>
  );
}
