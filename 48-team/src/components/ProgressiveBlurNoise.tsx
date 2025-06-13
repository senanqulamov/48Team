'use client';

import React, { useRef, useEffect } from 'react';

export default function ProgressiveBlurNoise({ show }: { show: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!show) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        let frame = 0;
        const maxFrames = 60;
        const initialIntensity = 20; // Start with strong blur

        const draw = () => {
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create noise texture
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                const val = Math.random() * 255;
                imageData.data[i] = val;
                imageData.data[i + 1] = val;
                imageData.data[i + 2] = val;
                imageData.data[i + 3] = 25; // transparency (0-255)
            }
            ctx.putImageData(imageData, 0, 0);

            // Calculate current intensity based on frame count
            const currentIntensity = Math.max(0, initialIntensity - (frame * (initialIntensity / maxFrames)));
            ctx.filter = `blur(${currentIntensity}px)`;

            if (frame < maxFrames) {
                frame++;
                requestAnimationFrame(draw);
            } else {
                ctx.filter = 'blur(0px)'; // Ensure final state is clear
            }
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [show]);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed top-0 left-0 w-full h-full z-[1000] pointer-events-none transition-opacity duration-1000 ease-out ${
                show ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
                mixBlendMode: 'screen',
                backgroundColor: 'transparent',
            }}
        />
    );
}