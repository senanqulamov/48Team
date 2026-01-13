"use client";

import React, { useState } from 'react';
import { Mail, Calendar, FileText, Image, Music, LucideIcon } from 'lucide-react';

interface CardData {
    id: number;
    icon: LucideIcon;
    title: string;
    subtitle: string;
    color: string;
    bgColor: string;
}

interface CardProps {
    card: CardData;
    index: number;
    isExpanded: boolean;
    totalCards: number;
    onClick: () => void;
}

const cardData: CardData[] = [
    {
        id: 1,
        icon: Mail,
        title: 'Messages',
        subtitle: '5 unread',
        color: 'from-blue-400 to-blue-500',
        bgColor: 'rgba(59, 130, 246, 0.08)'
    },
    {
        id: 2,
        icon: Calendar,
        title: 'Calendar',
        subtitle: 'Meeting at 3 PM',
        color: 'from-purple-400 to-purple-500',
        bgColor: 'rgba(168, 85, 247, 0.08)'
    },
    {
        id: 3,
        icon: FileText,
        title: 'Documents',
        subtitle: '12 files',
        color: 'from-emerald-400 to-emerald-500',
        bgColor: 'rgba(52, 211, 153, 0.08)'
    },
    {
        id: 4,
        icon: Image,
        title: 'Photos',
        subtitle: '47 new',
        color: 'from-rose-400 to-rose-500',
        bgColor: 'rgba(251, 113, 133, 0.08)'
    },
    {
        id: 5,
        icon: Music,
        title: 'Music',
        subtitle: '234 songs',
        color: 'from-amber-400 to-amber-500',
        bgColor: 'rgba(251, 191, 36, 0.08)'
    }
];

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

export default function StackedCards() {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCardClick = () => {
        setIsExpanded(!isExpanded);
    };

    const containerHeight = isExpanded ? cardData.length * 84 + 60 : 90;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
            {/* Background ambiance */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent"></div>

            <div className="relative w-full">
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
                        {cardData.map((card, index) => (
                            <Card
                                key={card.id}
                                card={card}
                                index={index}
                                isExpanded={isExpanded}
                                totalCards={cardData.length}
                                onClick={handleCardClick}
                            />
                        ))}
                    </div>
                </div>

                {/* Instruction hint */}
                <div className="text-center mt-12">
                    <p className="text-white/60 text-sm font-medium tracking-wide">
                        {isExpanded ? 'Tap any card to collapse' : 'Tap to expand cards'}
                    </p>
                    <p className="text-white/40 text-xs mt-2">
                        {isExpanded ? 'All cards have same scale (0.85)' : 'Cards stack with depth effect'}
                    </p>
                </div>
            </div>
        </div>
    );
}