import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    lenisRef.current = new Lenis({
      lerp: 0.06, // smoother, less CPU-heavy
      smoothWheel: true, // disable smooth wheel scrolling
      syncTouch: true,    // sync with touch input
      touchMultiplier: 1,
      wheelMultiplier: 1,
      infinite: false,
    })

    let frameId: number;
    function raf(time: number) {
      // Only run animation frame if document is visible
      if (document.visibilityState === "visible") {
        lenisRef.current?.raf(time);
      }
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);
}
