"use client";

import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

export interface StackedCardData {
    id: number;
    icon: LucideIcon;
    title: string;
    subtitle: string;
    color: string;
    bgColor: string;
}

interface CardProps {
    card: StackedCardData;
    index: number;
    isExpanded: boolean;
    totalCards: number;
    onClick: () => void;
}

function Card({ card, index, isExpanded, totalCards, onClick }: CardProps) {
    const Icon = card.icon;

    const getTransform = () => {
        if (isExpanded) {
            // When expanded: same scale for ALL cards
            const offset = index * 84; // Spread out vertically
            const scale = 0.85; // Same scale for all cards
            return `translate3d(0, ${offset}px, 0) scale(${scale})`;
        } else {
            // When stacked: slightly scaled for depth effect
            const offset = -index * 6; // Stack upward
            const scale = 1 - index * 0.03; // Slightly scaled down for depth
            return `translate3d(0, ${offset}px, 0) scale(${scale})`;
        }
    };

    const getOpacity = () => {
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
                transformOrigin: 'center top',
                width: '320px', // Fixed width
                margin: '0 auto' // Center the card
            }}
            onClick={onClick}
        >
            {/* Card container with fixed width */}
            <div className="w-full">
                {/* Enhanced glass container with iPhone 17 inspired effects */}
                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
                    {/* Ultra-thin border effect */}
                    <div className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none"></div>

                    {/* Main glass layer */}
                    <div
                        className="relative backdrop-blur-3xl bg-gradient-to-br from-white/20 to-white/5"
                        style={{
                            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.06))`,
                            boxShadow: `
                                inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
                                inset 0 -1px 0 0 rgba(0, 0, 0, 0.1),
                                0 8px 32px -4px rgba(0, 0, 0, 0.15)
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

interface StackedCardsNewProps {
    cards: StackedCardData[];
    title?: string;
    showHint?: boolean;
}

export default function StackedCardsNew({ cards, title, showHint = true }: StackedCardsNewProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCardClick = () => {
        setIsExpanded(!isExpanded);
    };

    const containerHeight = isExpanded ? cards.length * 84 + 60 : 90;

    return (
        <div className="relative w-full">
            {title && (
                <h3 className="text-lg font-bold text-white mb-4 text-center">{title}</h3>
            )}

            {/* Fixed width container to prevent full-width cards */}
            <div className="relative mx-auto" style={{ width: '320px' }}>
                <div
                    className="relative"
                    style={{
                        height: `${containerHeight}px`,
                        transition: 'height 0.85s cubic-bezier(0.22, 1, 0.36, 1)',
                        perspective: '2000px',
                        perspectiveOrigin: 'center top'
                    }}
                >
                    {cards.map((card, index) => (
                        <Card
                            key={card.id}
                            card={card}
                            index={index}
                            isExpanded={isExpanded}
                            totalCards={cards.length}
                            onClick={handleCardClick}
                        />
                    ))}
                </div>
            </div>

            {/* Instruction hint */}
            {showHint && (
                <div className="text-center mt-6">
                    <p className="text-white/50 text-xs">
                        {isExpanded ? 'Tap any card to collapse' : 'Tap to expand cards'}
                    </p>
                </div>
            )}
        </div>
    );
}

