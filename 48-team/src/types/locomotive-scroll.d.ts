declare module 'locomotive-scroll' {
  interface LocomotiveScrollOptions {
    el: HTMLElement;
    smooth?: boolean;
    lerp?: number;
    multiplier?: number;
    class?: string;
    [key: string]: unknown;
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    update(): void;
    destroy(): void;
    scrollTo(target: HTMLElement | number | string, options?: Record<string, unknown>): void;
    on(event: string, callback: (...args: unknown[]) => void): void;
    off(event: string, callback: (...args: unknown[]) => void): void;
  }
}
