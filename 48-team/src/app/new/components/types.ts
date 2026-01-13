// types.ts
import { LucideIcon } from 'lucide-react';

export interface CardData {
    id: number;
    icon: LucideIcon;
    title: string;
    subtitle: string;
    color: string;
    bgColor: string;
}

export interface CardProps {
    card: CardData;
    index: number;
    isExpanded: boolean;
    totalCards: number;
    onClick: () => void;
}
