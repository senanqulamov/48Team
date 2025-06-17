'use client';

import React, { useState } from 'react';
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
        <div className="relative text-white">
            {isLoading && <PageLoader onComplete={handleComplete} />}

            <ProgressiveBlurNoise show={isLoading} />
            {!isLoading && (
                <PageWrapper>
                    {/* Hero Section (normal scroll) */}
                    <div className="relative z-20 h-screen">
                        <HeroIntro />
                    </div>

                    {/* Z-Axis Scroll Section (takes full viewport after hero) */}
                    <div className="relative z-10 h-screen">
                        <SmoothScrollSection />
                    </div>
                </PageWrapper>
            )}
        </div>
    );
}