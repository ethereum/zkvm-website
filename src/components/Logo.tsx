"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  variant?: "auto" | "blue";
}

export function Logo({ className = "h-10 w-auto", variant = "auto" }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  let src: string;
  if (variant === "blue") {
    // Darker blue on light bg for contrast, brighter blue on dark bg
    src = isDark ? "/logo-blue-dark.svg" : "/logo-blue-light.svg";
  } else {
    src = isDark ? "/logo-white.svg" : "/logo-black.svg";
  }

  return (
    <Image
      src={src}
      alt="ethereum foundation zkEVM"
      width={180}
      height={74}
      className={className}
      priority
    />
  );
}
