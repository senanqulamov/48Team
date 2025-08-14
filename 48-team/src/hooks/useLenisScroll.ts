import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    lenisRef.current = new Lenis({
      lerp: 0.12, // Higher value for more direct, less laggy scroll
      syncTouch: true,
      touchMultiplier: 1.1, // Responsive but not too aggressive
      wheelMultiplier: 1.05, // Slightly faster but controlled
      infinite: false,
    });

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
