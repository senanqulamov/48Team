'use client';

import React from 'react';
import AnimatedMeshBackground from '@/components/AnimatedMeshBackground';
import HeroIntro from '@/components/HeroIntro';
import SmoothScrollSection from '@/components/SmoothScrollSection';

export default function MainPage() {
    return (
        <div className="relative overflow-hidden text-white">
            <AnimatedMeshBackground />
            <div className="bg-transparent relative z-10">
                <HeroIntro />
                <SmoothScrollSection />
            </div>
        </div>
    );
}
