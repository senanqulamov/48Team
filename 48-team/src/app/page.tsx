'use client';

import React, { useState } from 'react'; // ← FIXED: useState added here
import AnimatedMeshBackground from '@/components/AnimatedMeshBackground';
import HeroIntro from '@/components/HeroIntro';
import SmoothScrollSection from '@/components/SmoothScrollSection';
import PageWrapper from '@/components/PageWrapper';
import PageLoader from '@/components/PageLoader';
import ProgressiveBlurNoise from '@/components/ProgressiveBlurNoise';


export default function MainPage() {
    const [isLoading, setIsLoading] = useState(true);

    const handleComplete = () => {
        setIsLoading(false);
    };

    return (
        <div className="relative overflow-hidden text-white">
            {isLoading && <PageLoader onComplete={handleComplete}/>}

            <AnimatedMeshBackground/>
            <ProgressiveBlurNoise show={isLoading} />
            {!isLoading && (
                <PageWrapper>
                    <div className="bg-transparent relative z-10">
                        <HeroIntro/>
                        <SmoothScrollSection/>
                    </div>
                </PageWrapper>
            )}
        </div>
    );
}