'use client';

import { motion } from 'framer-motion';

export default function HeroIntro() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-white text-center"
        >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Welcome to 48Team</h1>
            <p className="text-xl md:text-2xl opacity-80">Build. Connect. Create.</p>
        </motion.div>
    );
}