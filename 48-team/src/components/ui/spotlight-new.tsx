"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

/**
 * Spotlight (non-mouse-follow)
 * Lightweight, looping cinematic beams meant to sit behind hero text.
 * No cursor tracking, minimal perf cost, mobile-friendly.
 */
export const Spotlight = ({
  className,
  // Shift defaults to neutral white for more light
  gradientFirst =
    "radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0) 80%)",
  gradientSecond =
    "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 80%, rgba(255,255,255,0) 100%)",
  gradientThird =
    "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 80%, rgba(255,255,255,0) 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
}: SpotlightProps = {}) => {
  // Respect reduced motion preference
  const reduceMotion = useReducedMotion();

  // Responsive tuning: derive sizes from viewport for small screens
  const [vw, setVw] = React.useState<number>(1024);
  React.useEffect(() => {
    const update = () => setVw(Math.max(320, window.innerWidth || 0));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const isMobile = vw < 768;

  const effWidth = isMobile ? Math.max(220, Math.round(vw * 0.55)) : width;
  const effSmall = isMobile ? Math.max(140, Math.round(vw * 0.32)) : smallWidth;
  const effHeight = isMobile ? Math.round(vw * 1.9) : height;
  const effTranslateY = isMobile ? -240 : translateY;
  const effXOffset = reduceMotion ? 0 : (isMobile ? Math.max(28, Math.round(vw * 0.08)) : xOffset);
  const effDuration = reduceMotion ? 0.01 : (isMobile ? Math.max(8, duration + 2) : duration);

  // Shared style for each light strip
  const stripBase: React.CSSProperties = {
    willChange: "transform, opacity",
    filter: "blur(24px) brightness(1.08)",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
      className={cn("pointer-events-none absolute inset-0 h-full w-full z-[25]", className)}
      aria-hidden
    >
      {/* Global subtle pulse for light breathing */}
      <motion.div
        aria-hidden
        animate={reduceMotion ? { opacity: 0.9 } : { opacity: [0.85, 0.95, 0.85] }}
        transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {/* Left group */}
        <motion.div
          animate={reduceMotion ? { x: 0 } : { x: [0, effXOffset, 0] }}
          transition={reduceMotion ? undefined : { duration: effDuration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none"
        >
          <div
            style={{
              ...stripBase,
              transform: `translateY(${effTranslateY}px) rotate(-45deg)`,
              background: gradientFirst,
              width: `${effWidth}px`,
              height: `${effHeight}px`,
            }}
            className="absolute top-0 left-0 mix-blend-lighten opacity-90"
          />

          <div
            style={{
              ...stripBase,
              transform: "rotate(-45deg) translate(5%, -50%)",
              background: gradientSecond,
              width: `${effSmall}px`,
              height: `${effHeight}px`,
            }}
            className="absolute top-0 left-0 origin-top-left mix-blend-lighten opacity-80"
          />

          <div
            style={{
              ...stripBase,
              transform: "rotate(-45deg) translate(-180%, -70%)",
              background: gradientThird,
              width: `${effSmall}px`,
              height: `${effHeight}px`,
            }}
            className="absolute top-0 left-0 origin-top-left mix-blend-lighten opacity-70"
          />
        </motion.div>

        {/* Right group */}
        <motion.div
          animate={reduceMotion ? { x: 0 } : { x: [0, -effXOffset, 0] }}
          transition={reduceMotion ? undefined : { duration: effDuration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none"
        >
          <div
            style={{
              ...stripBase,
              transform: `translateY(${effTranslateY}px) rotate(45deg)`,
              background: gradientFirst,
              width: `${effWidth}px`,
              height: `${effHeight}px`,
            }}
            className="absolute top-0 right-0 mix-blend-lighten opacity-90"
          />

          <div
            style={{
              ...stripBase,
              transform: "rotate(45deg) translate(-5%, -50%)",
              background: gradientSecond,
              width: `${effSmall}px`,
              height: `${effHeight}px`,
            }}
            className="absolute top-0 right-0 origin-top-right mix-blend-lighten opacity-80"
          />

          <div
            style={{
              ...stripBase,
              transform: "rotate(45deg) translate(180%, -70%)",
              background: gradientThird,
              width: `${effSmall}px`,
              height: `${effHeight}px`,
            }}
            className="absolute top-0 right-0 origin-top-right mix-blend-lighten opacity-70"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Spotlight;
