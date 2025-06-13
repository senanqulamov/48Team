'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollSection() {
    type LenisInstance = {
        raf: (time: number) => void;
        destroy: () => void;
    };

    const sectionRef = useRef<HTMLElement>(null);
    const lenisRef = useRef<LenisInstance | null>(null);

    useEffect(() => {
        lenisRef.current = new Lenis({
            lerp: 0.1,
            duration: 1.2,
            easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        });

        function raf(time: number) {
            if (lenisRef.current) {
                lenisRef.current.raf(time);
                requestAnimationFrame(raf);
            }
        }


        requestAnimationFrame(raf);

        return () => lenisRef.current?.destroy();
    }, []);

    useEffect(() => {
        if (!sectionRef.current) return;

        const fadeInElems = sectionRef.current.querySelectorAll('.fade-in');

        fadeInElems.forEach((el) => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        const images = sectionRef.current.querySelectorAll('.skew-img');

        images.forEach((img) => {
            gsap.to(img, {
                scrollTrigger: {
                    trigger: img,
                    scrub: true,
                    start: 'top bottom',
                    end: 'bottom top',
                    onUpdate: (self) => {
                        const velocity = self.getVelocity();
                        gsap.to(img, {
                            skewY: velocity / -300,
                            duration: 0.3,
                            ease: 'power3.out',
                        });
                    },
                },
            });
        });
    }, []);

    const content = [
        {
            text: 'Scroll-Triggered Text 1',
            image: '/images/demo1/1.jpg',
        },
        {
            text: 'Scroll-Triggered Text 2',
            image: '/images/demo1/2.jpg',
        },
        {
            text: 'Scroll-Triggered Text 3',
            image: '/images/demo1/3.jpg',
        },
        {
            text: 'Scroll-Triggered Text 4',
            image: '/images/demo1/4.jpg',
        },
        {
            text: 'Scroll-Triggered Text 5',
            image: '/images/demo1/5.jpg',
        },
        {
            text: 'Scroll-Triggered Text 6',
            image: '/images/demo1/6.jpg',
        },
    ];

    return (
        <section ref={sectionRef} className="min-h-screen bg-transparent text-white px-8 py-24 space-y-32">
            {content.map((item, idx) => (
                <div
                    key={idx}
                    className={`flex flex-col md:flex-row items-center justify-between gap-12 fade-in ${
                        idx % 2 === 1 ? 'md:flex-row-reverse' : ''
                    }`}
                >
                    <div className="md:w-1/2 space-y-4">
                        <h2 className="text-4xl font-bold">{item.text}</h2>
                        <p className="text-lg text-gray-300">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint cumque placeat
                            reiciendis, veniam explicabo dolore.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <Image
                            className="rounded-lg shadow-xl skew-img w-full max-w-lg mx-auto"
                            src={item.image}
                            alt={item.text}
                            width={400}
                            height={400}
                            loading="lazy"
                        />
                    </div>
                </div>
            ))}
        </section>
    );
}
