'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const content = [
    { title: "Me, myself and I", text: "Who am I ?", image: "/images/mine/me1.webp", side: "left" },
    { title: "Developer", text: "Explore my WORK", image: "/images/demo1/2.jpg", side: "right" },
    { title: "Founder", text: "Discover my Startups", image: "/images/demo1/3.jpg", side: "left" },
    { title: "Study", text: "Find out what I know", image: "/images/demo1/4.jpg", side: "right" },
    { title: "Hobbies", text: "Evolve", image: "/images/demo1/5.jpg", side: "left" },
    { title: "Let's Start", text: "just click", image: "/images/demo1/6.jpg", side: "center" },
];

export default function ZAxisScroll() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);
    const lenis = useRef<Lenis>(null);

    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile on mount and on resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) {
            // On mobile, no fancy GSAP scroll logic, just simple vertical scroll
            if (lenis.current) {
                lenis.current.destroy();
                lenis.current = null;
            }
            ScrollTrigger.getAll().forEach(t => t.kill());
            return;
        }

        lenis.current = new Lenis({ lerp: 0.1 });
        const raf = (t: number) => {
            lenis.current?.raf(t);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        const items = gsap.utils.toArray<HTMLElement>('.z-section');
        const spacing = 600;
        const totalDepth = items.length * spacing;

        gsap.set(sceneRef.current, { transformStyle: 'preserve-3d' });

        items.forEach((item, i) => {
            const side = content[i].side;
            const x = side === "left" ? -300 : side === "right" ? 300 : 0;
            const y = gsap.utils.random(-50, 50);

            const z = i * spacing;

            gsap.set(item, {
                x: x,
                y: y,
                z: -z,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(20px)',
                opacity: 0,
                scale: 0.7,
            });
        });

        ScrollTrigger.create({
            trigger: wrapperRef.current!,
            start: 'top top',
            end: `+=${totalDepth + 1700}`,
            scrub: true,
            onUpdate: (self) => {
                const zMove = -self.progress * totalDepth;

                gsap.set(sceneRef.current, {
                    z: -zMove,
                });

                items.forEach((item, i) => {
                    const itemZ = i * spacing;
                    const distance = Math.abs(zMove + itemZ);
                    const threshold = 600;

                    const visible = 1 - Math.min(distance / threshold, 1);

                    gsap.set(item, {
                        opacity: visible,
                        scale: 0.3 + visible * 0.1,
                        filter: `blur(${20 * (1 - visible)}px)`,
                    });
                });
            },
        });

        return () => {
            lenis.current?.destroy();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [isMobile]);

    // ----------- Render -----------

    if (isMobile) {
        // Mobile: Simple vertical list, text + image stacked, no 3D
        return (
            <div className="px-4 py-8 bg-transparent min-h-screen text-white">
                {content.map((section, index) => (
                    <div key={index} className="mb-12">
                        <h2 className="text-2xl font-bold mb-2 drop-shadow-lg">{section.title}</h2>
                        <p className="mb-4 drop-shadow">{section.text}</p>
                        <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src={section.image}
                                alt={section.title}
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                        </div>
                        <button className="mt-4 px-5 py-2 bg-white text-black rounded shadow hover:bg-gray-200 transition">
                            View More
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    // Desktop: Original fancy 3D z-axis scroll
    return (
        <div ref={wrapperRef} style={{ height: `${content.length * 120}vh` }}>
            <div
                className="sticky top-0 w-full h-screen overflow-hidden"
                style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
            >
                <div ref={sceneRef} className="relative w-full h-full">
                    {content.map((section, index) => {
                        const side = section.side || 'center';
                        const alignClass =
                            side === 'left'
                                ? 'items-end text-right'
                                : side === 'right'
                                    ? 'items-start text-left'
                                    : 'items-center text-center';

                        const textAlign = side === 'left' ? 'right-0' : side === 'right' ? 'left-0' : 'left-1/2 -translate-x-1/2';

                        return (
                            <div
                                key={index}
                                className={`z-section w-100 lg:w-300 h-auto relative flex flex-col gap-2 ${alignClass}`}
                            >
                                {/* Text Container */}
                                <div className={`absolute top-[-5%] w-[100%] ${textAlign} px-4 py-2 z-10`}>
                                    <p className="text-xl font-bold text-white drop-shadow-lg cst-big-text">
                                        {section.title}
                                    </p>
                                    <p className="text-base text-white drop-shadow cst-mid-text">
                                        {section.text}
                                    </p>
                                </div>

                                {/* Image Container */}
                                <div className="relative w-full h-100 lg:h-300 mt-16">
                                    <Image
                                        src={section.image}
                                        alt={section.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 320px"
                                        className="object-cover rounded-xl shadow-xl"
                                    />
                                </div>

                                {/* Button */}
                                <a
                                    className="mt-4 px-4 py-2 cst-bottom-overlay cst-mid-text bg-white text-black rounded-md shadow hover:bg-gray-200 transition"
                                >
                                    View More
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
