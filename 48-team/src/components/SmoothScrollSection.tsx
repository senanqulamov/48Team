'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function ZAxisScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<Lenis | null>(null);

    const content = [
        {
            title: "Welcome",
            text: "Scroll into the unknown",
            image: "/images/demo1/1.jpg",
            position: { x: 0, y: 0, z: 0 },
        },
        {
            title: "Explore",
            text: "Each step reveals more",
            image: "/images/demo1/2.jpg",
            position: { x: -300, y: 200, z: -1000 },
        },
        {
            title: "Discover",
            text: "Dynamic camera flythrough",
            image: "/images/demo1/3.jpg",
            position: { x: 300, y: -150, z: -2000 },
        },
        {
            title: "Arrive",
            text: "The journey ends, or begins?",
            image: "/images/demo1/4.jpg",
            position: { x: 0, y: 100, z: -3000 },
        },
        {
            title: "Arrive",
            text: "The journey ends, or begins?",
            image: "/images/demo1/5.jpg",
            position: { x: 0, y: 100, z: -4000 },
        },
        {
            title: "Arrive",
            text: "The journey ends, or begins?",
            image: "/images/demo1/6.jpg",
            position: { x: 0, y: 100, z: -5000 },
        },
    ];


    useEffect(() => {
        // ✅ Init Lenis
        lenisRef.current = new Lenis({
            lerp: 0.07,
            smoothWheel: true,
            syncTouch: true,
        });

        const raf = (time: number) => {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        // ✅ Setup 3D Scroll
        if (!containerRef.current || !viewportRef.current || !sceneRef.current) return;

        gsap.set(viewportRef.current, {
            perspective: 1200,
            transformStyle: 'preserve-3d',
        });

        const sections = gsap.utils.toArray<HTMLElement>('.z-section');
        const sectionDepth = 1000;
        const totalDepth = sections.length * sectionDepth;

        sections.forEach((section, index) => {
            gsap.set(section, {
                z: -index * sectionDepth,
                position: 'fixed',
                top: '50%',
                left: '50%',
                width: '90%',
                maxWidth: '1000px',
                height: '70vh',
                transform: 'translate(-50%, -50%)',
                transformStyle: 'preserve-3d',
                opacity: index === 0 ? 1 : 0.3,
                scale: index === 0 ? 1 : 0.8,
            });
        });

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${totalDepth}`,
            scrub: 0.5,
            onUpdate: (self) => {
                const progress = self.progress;
                const zPosition = progress * totalDepth;

                gsap.to(viewportRef.current, {
                    z: -zPosition,
                    ease: 'power2.out',
                });

                sections.forEach((section, index) => {
                    const targetZ = index * sectionDepth;
                    const distance = Math.abs(zPosition - targetZ);
                    const visibility = 1 - Math.min(distance / (sectionDepth * 0.8), 1);

                    gsap.to(section, {
                        opacity: visibility,
                        scale: 0.8 + visibility * 0.4,
                        ease: 'power2.out',
                    });
                });
            },
        });

        return () => {
            lenisRef.current?.destroy();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full" style={{ height: `${content.length * 100}vh` }}>
            <div
                ref={viewportRef}
                className="sticky top-0 h-screen w-full"
                style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
            >
                <div ref={sceneRef} className="w-full h-full relative">
                    {content.map((section, index) => (
                        <div
                            key={index}
                            className="z-section flex flex-col md:flex-row items-center justify-center gap-6 p-6"
                            style={{ backfaceVisibility: 'hidden' }}
                        >
                            <div className={`${section.bgColor} rounded-xl p-6 backdrop-blur-md w-full max-w-md`}>
                                <h2 className="text-3xl font-bold mb-3 text-center md:text-left">
                                    {section.title}
                                </h2>
                                <p className="text-lg mb-4 text-center md:text-left">
                                    {section.text}
                                </p>
                            </div>
                            <div className="relative w-full h-64 md:h-80">
                                <Image
                                    src={section.image}
                                    alt={section.title}
                                    fill
                                    className="object-cover rounded-xl shadow-2xl"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={index === 0}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
