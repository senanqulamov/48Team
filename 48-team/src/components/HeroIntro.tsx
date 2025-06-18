'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './HeroIntro.css';

export default function HeroIntro() {
    const controls = useAnimation();
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subheadingRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: 'easeOut' },
        });

        // Animation for heading
        if (headingRef.current) {
            const finalText = "Welcome! I'm Senan :D";
            let i = 0;
            const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?/~";
            const colors = ['#D4A373', '#FDF6E3', '#4ADE80'];

            const animate = () => {
                if (i < finalText.length) {
                    // Create glitch effect for current character
                    const glitchChar = symbols[Math.floor(Math.random() * symbols.length)];
                    const color = colors[Math.floor(Math.random() * colors.length)];

                    headingRef.current!.innerHTML =
                        finalText.substring(0, i) +
                        `<span class="glitch-char" style="color:${color}">${glitchChar}</span>`;

                    // Randomly decide when to lock the final character
                    if (Math.random() > 0.7) {
                        i++;
                        headingRef.current!.innerHTML = finalText.substring(0, i);
                    }

                    setTimeout(animate, 10); // Fast animation speed
                } else {
                    headingRef.current!.classList.add('done');
                    startSubheading();
                }
            };

            animate();
        }

        const startSubheading = () => {
            setTimeout(() => {
                if (subheadingRef.current) {
                    const finalText = "Wanna know me better ?";
                    let i = 0;
                    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?/~";
                    const colors = ['#D4A373', '#FDF6E3', '#4ADE80'];

                    const animate = () => {
                        if (i < finalText.length) {
                            const glitchChar = symbols[Math.floor(Math.random() * symbols.length)];
                            const color = colors[Math.floor(Math.random() * colors.length)];

                            subheadingRef.current!.innerHTML =
                                finalText.substring(0, i) +
                                `<span class="glitch-char" style="color:${color}">${glitchChar}</span>`;

                            if (Math.random() > 0.6) { // Faster progression for subheading
                                i++;
                                subheadingRef.current!.innerHTML = finalText.substring(0, i);
                            }

                            setTimeout(animate, 10); // Even faster animation
                        } else {
                            subheadingRef.current!.classList.add('done');
                        }
                    };

                    animate();
                }
            }, 500); // Short delay before subheading starts
        };

    }, [controls]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={controls}
            className="w-full min-h-[calc(100vh-30px)] flex flex-col items-center justify-center text-center text-white bg-transparent"
        >
            <motion.h1
                ref={headingRef}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="terminal-text text-6xl md:text-7xl font-bold mb-6"
            />
            <motion.p
                ref={subheadingRef}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="terminal-subtext text-2xl"
            />
        </motion.div>
    );
}