'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const el = sectionRef.current;
        gsap.fromTo(
            el.querySelectorAll('.fade-in'),
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="min-h-screen bg-black text-white px-8 py-24 space-y-32">
            <div className="fade-in text-4xl font-bold">Scroll-Triggered Text 1</div>
            <div className="fade-in text-4xl font-bold">Scroll-Triggered Text 2</div>
            <div className="fade-in text-4xl font-bold">Scroll-Triggered Text 3</div>
        </section>
    );
}
