"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function SplashScreen() {
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      setTimeout(() => setReady(true), 600);
    };
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  useEffect(() => {
    if (ready) {
      const timer = setTimeout(() => setHidden(true), 700);
      return () => clearTimeout(timer);
    }
  }, [ready]);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${ready ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="relative flex items-center justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/logo.png`}
          alt=""
          width={200}
          height={60}
          className="h-[4.8rem] w-auto"
          preload
        />
        <svg
          className={`absolute size-32 ${ready ? "opacity-0" : "animate-splash-orbit opacity-100"} transition-opacity duration-300`}
          viewBox="0 0 128 128"
        >
          <circle cx="64" cy="8" r="4" fill="#1a56c4" />
        </svg>
      </div>
    </div>
  );
}
