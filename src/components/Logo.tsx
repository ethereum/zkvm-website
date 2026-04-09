"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  variant?: "auto" | "blue" | "header";
}

export function Logo({ className = "h-10 w-auto", variant = "auto" }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  let src: string;
  if (variant === "header") {
    // On accent bg: white logo in light, dark logo in dark
    src = isDark ? "/logo-dark-on-accent.svg" : "/logo-white-on-accent.svg";
  } else if (variant === "blue") {
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
