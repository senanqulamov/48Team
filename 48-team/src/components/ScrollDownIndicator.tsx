'use client';

import React, { useEffect, useState } from 'react';

export default function ScrollDownIndicator() {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY || window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;

            setFadeOut(progress > 0.9); // fade out after 95%
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // initial call

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div
            aria-label="Scroll down indicator"
            className={`fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer select-none transition-opacity duration-700 ${
                fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
      <span className="text-sm font-semibold text-white uppercase tracking-widest drop-shadow-lg animate-pulse-glow">
        Scroll
      </span>

            <div className="relative w-8 h-12">
                {/* Pulsing glowing dot */}
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full opacity-80 animate-pulse-glow"></span>

                {/* Animated arrows */}
                <svg
                    width="32"
                    height="48"
                    viewBox="0 0 32 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2"
                    aria-hidden="true"
                >
                    <line
                        x1="4"
                        y1="8"
                        x2="16"
                        y2="20"
                        stroke="cyan"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="arrow-line arrow-line-1"
                    />
                    <line
                        x1="28"
                        y1="8"
                        x2="16"
                        y2="20"
                        stroke="cyan"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="arrow-line arrow-line-2"
                    />
                </svg>
            </div>

            <style jsx>{`
                .arrow-line {
                    transform-origin: center;
                    animation: slideFade 2s infinite ease-in-out;
                }

                .arrow-line-2 {
                    animation-delay: 1s;
                }

                @keyframes slideFade {
                    0% {
                        opacity: 0;
                        transform: translateY(0);
                    }
                    50% {
                        opacity: 1;
                        transform: translateY(8px);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(16px);
                    }
                }

                .animate-pulse-glow {
                    animation: pulseGlow 2.5s ease-in-out infinite;
                    filter: drop-shadow(0 0 8px cyan);
                }

                @keyframes pulseGlow {
                    0%,
                    100% {
                        opacity: 0.7;
                        filter: drop-shadow(0 0 6px cyan);
                    }
                    50% {
                        opacity: 1;
                        filter: drop-shadow(0 0 12px cyan);
                    }
                }
            `}</style>
        </div>
    );
}
