// GlassCard.tsx
"use client";

import React from 'react';
import { CardProps } from './types';

export default function GlassCard({
                                      card,
                                      index,
                                      isExpanded,
                                      totalCards,
                                      onClick
                                  }: CardProps) {
    const Icon = card.icon;

    const getTransform = (): string => {
        if (isExpanded) {
            return `translate3d(0, ${index * 84}px, 0) scale3d(1, 1, 1)`;
        } else {
            const offset = -index * 6;
            const scale = 1 - index * 0.03;
            return `translate3d(0, ${offset}px, 0) scale3d(${scale}, ${scale}, 1)`;
        }
    };

    const getOpacity = (): number => {
        if (isExpanded) return 1;
        return index === 0 ? 1 : Math.max(0.3, 1 - index * 0.2);
    };

    return (
        <div
            className="absolute top-0 left-0 right-0 will-change-transform cursor-pointer"
            style={{
                transform: getTransform(),
                opacity: getOpacity(),
                zIndex: totalCards - index,
                transition: 'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1)',
                transformOrigin: 'center top'
            }}
            onClick={onClick}
        >
            <div className="relative mx-auto w-80">
                {/* Enhanced glass container with iPhone 17 inspired effects */}
                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
                    {/* Ultra-thin border effect */}
                    <div className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none"></div>

                    {/* Main glass layer - optimized */}
                    <div
                        className="relative bg-gradient-to-br from-white/20 to-white/5"
                        style={{
                            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.05))`,
                            boxShadow: `
                inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
                0 4px 16px -2px rgba(0, 0, 0, 0.1)
              `
                        }}
                    >
                        {/* Dynamic gradient overlay */}
                        <div
                            className="absolute inset-0 opacity-30 mix-blend-overlay"
                            style={{
                                background: `linear-gradient(135deg, ${card.bgColor}, transparent 70%)`
                            }}
                        ></div>

                        {/* Subtle radial gradient */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

                        {/* Reflective top edge */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

                        {/* Card content */}
                        <div className="relative px-5 py-4 flex items-center gap-4">
                            {/* Icon container with enhanced glass */}
                            <div
                                className="relative rounded-xl p-3 backdrop-blur-2xl"
                                style={{
                                    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))`,
                                    boxShadow: `
                    inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
                    inset 0 -1px 0 0 rgba(0, 0, 0, 0.1),
                    0 4px 20px -2px rgba(0, 0, 0, 0.1)
                  `
                                }}
                            >
                                {/* Icon gradient */}
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.color} opacity-20`}></div>
                                <Icon
                                    className="relative text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                                    size={22}
                                    strokeWidth={2.2}
                                />
                            </div>

                            {/* Text content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-semibold text-[15px] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                                    {card.title}
                                </h3>
                                <p className="text-white/85 text-[13px] font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] mt-0.5">
                                    {card.subtitle}
                                </p>
                            </div>

                            {/* Subtle chevron indicator */}
                            <div className="text-white/40">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M9 18l6-6-6-6"/>
                                </svg>
                            </div>
                        </div>

                        {/* Bottom glow */}
                        <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

