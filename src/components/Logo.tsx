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

  let src: string;
  if (variant === "blue") {
    src = "/logo-blue.svg";
  } else {
    src = mounted && resolvedTheme === "dark" ? "/logo-white.svg" : "/logo-black.svg";
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
