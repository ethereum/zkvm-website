"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Before mount, show black logo (light default) to avoid flash
  const src = mounted && resolvedTheme === "dark" ? "/logo-white.svg" : "/logo-black.svg";

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
