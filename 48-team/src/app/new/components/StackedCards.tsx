// StackedCards.tsx
"use client";

import React, { useState } from 'react';
import { Mail, Calendar, FileText, Image, Music } from 'lucide-react';
import GlassCard from './GlassCard';
import { CardData } from './types';

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

interface StackedCardsProps {
    cards?: CardData[]; // Optional custom cards
    onCardClick?: (cardId: number) => void; // Optional click handler
}

export default function StackedCards({ cards = cardData, onCardClick }: StackedCardsProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleIndividualCardClick = (cardId: number) => {
        if (isExpanded) {
            // When expanded, toggle collapse and optionally call onCardClick
            setIsExpanded(false);
            if (onCardClick) {
                onCardClick(cardId);
            }
        } else {
            // When collapsed, expand the cards
            setIsExpanded(true);
        }
    };

    const containerHeight = isExpanded ? cards.length * 84 + 60 : 90;

    return (
        <div className="w-full flex items-center justify-center py-12">
            <div className="relative w-full">
                <div
                    className="relative mx-auto"
                    style={{
                        height: `${containerHeight}px`,
                        transition: 'height 0.85s cubic-bezier(0.22, 1, 0.36, 1)',
                        perspective: '2000px',
                        perspectiveOrigin: 'center top'
                    }}
                >
                    {cards.map((card, index) => (
                        <GlassCard
                            key={card.id}
                            card={card}
                            index={index}
                            isExpanded={isExpanded}
                            totalCards={cards.length}
                            onClick={() => handleIndividualCardClick(card.id)}
                        />
                    ))}
                </div>

                {/* Instruction hint */}
                <div className="text-center mt-12">
                    <p className="text-white/60 text-sm font-medium tracking-wide">
                        {isExpanded ? 'Tap any card to collapse or select' : 'Tap to expand cards'}
                    </p>
                </div>
            </div>
        </div>
    );
}

