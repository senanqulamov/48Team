'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const stepTime = 2200 / 48;

        const interval = setInterval(() => {
            setCount(prev => {
                if (prev >= 48) {
                    clearInterval(interval);
                    setTimeout(() => onComplete(), 300);
                    return 48;
                }
                return prev + 1;
            });
        }, stepTime);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white text-5xl font-bold"
            >
                {count}
            </motion.div>
        </AnimatePresence>
    );
}
