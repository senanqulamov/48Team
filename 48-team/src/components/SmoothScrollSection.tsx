'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const tunnelRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<any>(null);
    const progressRef = useRef<number>(0);

    useEffect(() => {
        lenisRef.current = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
        });

        const raf = (time: number) => {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        return () => lenisRef.current?.destroy();
    }, []);

    useEffect(() => {
        if (!containerRef.current || !tunnelRef.current) return;

        // Set up 3D scene
        gsap.set(containerRef.current, {
            perspective: 1000,
            transformStyle: 'preserve-3d',
        });

        const panels = gsap.utils.toArray<HTMLElement>('.tunnel-panel');
        const panelHeight = window.innerHeight;
        const totalPanels = panels.length;
        const totalScroll = panelHeight * totalPanels * 2; // Extra scroll space

        // Position panels in 3D space
        panels.forEach((panel, i) => {
            gsap.set(panel, {
                z: -i * panelHeight, // Stack panels along Z-axis
                position: 'absolute',
                width: '100%',
                height: '100vh',
                transformOrigin: 'center center',
            });
        });

        // Create scroll animation
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${totalScroll}`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
                progressRef.current = self.progress;

                // Animate panels to create tunnel effect
                panels.forEach((panel, i) => {
                    const zProgress = (progressRef.current - i/totalPanels) * totalPanels;
                    const scale = 1 - Math.min(Math.max(zProgress, 0), 0.8) * 0.5;

                    gsap.to(panel, {
                        z: -i * panelHeight + progressRef.current * totalPanels * panelHeight,
                        scale: scale,
                        opacity: 1 - Math.min(Math.max(zProgress, 0), 1),
                        ease: 'power1.out'
                    });
                });
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const content = [
        { text: 'Section 1', image: '/images/demo1/1.jpg' },
        { text: 'Section 2', image: '/images/demo1/2.jpg' },
        { text: 'Section 3', image: '/images/demo1/3.jpg' },
        { text: 'Section 4', image: '/images/demo1/4.jpg' },
        { text: 'Section 5', image: '/images/demo1/5.jpg' },
        { text: 'Section 6', image: '/images/demo1/6.jpg' },
    ];

    return (
        <div ref={containerRef} className="w-full h-screen overflow-hidden">
            <div ref={tunnelRef} className="relative w-full h-screen">
                {content.map((item, i) => (
                    <div
                        key={i}
                        className="tunnel-panel w-full h-screen flex items-center justify-center"
                    >
                        <div className="w-full max-w-4xl mx-auto p-8 bg-black bg-opacity-70 rounded-xl">
                            <h2 className="text-4xl font-bold mb-6">{item.text}</h2>
                            <div className="relative aspect-video w-full">
                                <Image
                                    src={item.image}
                                    alt={item.text}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}