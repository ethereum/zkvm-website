"use client";

import { useEffect, useState } from "react";

const layers = [
  { dx: 0, dy: 0, delay: 0, opacity: 0.08, duration: 1.8 },
  { dx: 18, dy: -25, delay: 0.2, opacity: 0.06, duration: 2.5 },
  { dx: -15, dy: 20, delay: 0.5, opacity: 0.05, duration: 3.2 },
  { dx: 35, dy: 12, delay: 0.1, opacity: 0.04, duration: 2.0 },
  { dx: -28, dy: -18, delay: 0.7, opacity: 0.035, duration: 3.8 },
  { dx: 10, dy: 40, delay: 0.4, opacity: 0.03, duration: 2.8 },
  { dx: -40, dy: -5, delay: 0.9, opacity: 0.025, duration: 4.0 },
  { dx: 50, dy: -35, delay: 0.3, opacity: 0.02, duration: 3.5 },
  { dx: -20, dy: 50, delay: 1.1, opacity: 0.02, duration: 4.5 },
  { dx: 42, dy: 30, delay: 0.6, opacity: 0.015, duration: 3.0 },
];

export function BackgroundGlyph() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);

    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-1/2 -translate-y-1/2 pointer-events-none z-0"
      style={{
        right: '-10%',
        width: '60vh',
        height: '90vh',
        opacity: scrolled ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
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
