'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export default function WelcomeText() {
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
            initial={{ opacity: 0, y: 80 }}
            animate={controls}
            className="absolute inset-0 flex flex-col items-center justify-center text-white z-10"
            style={{ pointerEvents: 'none' }}
        >
            <h1 className="text-6xl font-bold mb-4">Welcome to 48Team</h1>
            <p className="text-2xl opacity-80">Build. Connect. Create.</p>
        </motion.div>
    );
}
