'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function HeroIntro() {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: 'easeOut' },
        });
    }, [controls]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={controls}
            className="w-full min-h-[calc(100vh-30px)] flex flex-col items-center justify-center text-center text-white bg-transparent"
        >
            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-6xl md:text-7xl font-bold mb-6"
            >
                Welcome to 48Team
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="text-2xl opacity-80"
            >
                Build. Connect. Create.
            </motion.p>
        </motion.div>
    );
}