'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NeonStarfieldBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const req = useRef<number | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Create reusable circle texture
        const createCircleTexture = () => {
            const size = 64;
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = size;
            const ctx = canvas.getContext('2d')!;
            const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(0.2, 'rgba(255,255,255,0.9)');
            gradient.addColorStop(0.4, 'rgba(255,255,255,0.5)');
            gradient.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, size, size);
            return new THREE.CanvasTexture(canvas);
        };

        const circleTexture = createCircleTexture();

        // Initialize Three.js
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        // Mouse movement tracking
        const mouse = new THREE.Vector2();
        const target = new THREE.Vector2();
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        document.addEventListener('mousemove', handleMouseMove);

        // Starfield
        const starsCount = 800;
        const starsGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starsCount * 3);
        const colors = new Float32Array(starsCount * 3);
        const sizes = new Float32Array(starsCount);

        // Create some colored "planets" (5% of stars)
        const planetColors = [
            new THREE.Color(0x00ffff), // Cyan
            new THREE.Color(0xff00ff), // Magenta
            new THREE.Color(0xffff00), // Yellow
            new THREE.Color(0x00ff00), // Green
            new THREE.Color(0xff6600), // Orange
        ];
        const planetIndices = new Set<number>();
        while (planetIndices.size < starsCount * 0.05) {
            planetIndices.add(Math.floor(Math.random() * starsCount));
        }

        for (let i = 0; i < starsCount; i++) {
            // Random spherical distribution
            const radius = 50 * Math.random();
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            if (planetIndices.has(i)) {
                sizes[i] = 0.5 + Math.random() * 0.5;
                const color = planetColors[Math.floor(Math.random() * planetColors.length)];
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;
            } else {
                sizes[i] = 0.1 + Math.random() * 0.2;
                const intensity = 0.5 + Math.random() * 0.5;
                colors[i * 3] = intensity;
                colors[i * 3 + 1] = intensity;
                colors[i * 3 + 2] = 1.0; // Blue tint
            }
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const starsMaterial = new THREE.PointsMaterial({
            size: 0.3,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
            map: circleTexture,
            depthWrite: false,
        });

        const starfield = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starfield);

        // ========== GLOWING VECTOR SHOOTING STARS ==========
        class ShootingStar {
            line: THREE.Line;
            positions: Float32Array;
            speed: number;
            direction: THREE.Vector3;
            age: number;
            maxAge: number;
            length: number;
            color: THREE.Color;
            currentPosition: THREE.Vector3;

            constructor() {
                this.length = 15; // Number of segments in the streak
                this.positions = new Float32Array(this.length * 3);

                // Create the line geometry
                const geometry = new THREE.BufferGeometry();
                geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

                // Create color gradient
                const lineColors = new Float32Array(this.length * 3);
                this.color = new THREE.Color().setHSL(Math.random(), 1, 0.7);

                for (let i = 0; i < this.length; i++) {
                    const ratio = i / this.length;
                    // Bright head fading to dim tail
                    const intensity = Math.pow(1 - ratio, 2);
                    lineColors[i * 3] = this.color.r * intensity;
                    lineColors[i * 3 + 1] = this.color.g * intensity;
                    lineColors[i * 3 + 2] = this.color.b * intensity;
                }
                geometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

                const material = new THREE.LineBasicMaterial({
                    vertexColors: true,
                    transparent: true,
                    opacity: 0.9,
                    blending: THREE.AdditiveBlending,
                    linewidth: 2
                });

                this.line = new THREE.Line(geometry, material);
                this.currentPosition = new THREE.Vector3();
                this.speed = 0;
                this.direction = new THREE.Vector3();
                this.age = 0;
                this.maxAge = 0;

                this.reset();
            }

            reset() {
                // Start from random edge of view
                const angle = Math.random() * Math.PI * 2;
                const radius = 50;
                const startX = Math.cos(angle) * radius;
                const startY = Math.sin(angle) * radius;
                const startZ = (Math.random() - 0.5) * radius;

                // Direction with slight curve
                this.direction.set(
                    -startX * 0.01 + (Math.random() - 0.5) * 0.05,
                    -startY * 0.01 + (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05
                ).normalize();

                // Slower speed
                this.speed = 0.2 + Math.random() * 0.1;
                this.age = 0;
                this.maxAge = 250 + Math.random() * 100;

                // Initialize positions
                this.currentPosition.set(startX, startY, startZ);
                for (let i = 0; i < this.length; i++) {
                    const offset = i * 0.5;
                    this.positions[i * 3] = startX + this.direction.x * offset;
                    this.positions[i * 3 + 1] = startY + this.direction.y * offset;
                    this.positions[i * 3 + 2] = startZ + this.direction.z * offset;
                }

                this.line.geometry.attributes.position.needsUpdate = true;
            }

            update() {
                this.age++;

                // Move current position
                const movement = this.direction.clone().multiplyScalar(this.speed);
                this.currentPosition.add(movement);

                // Update positions (shift array)
                for (let i = this.length - 1; i > 0; i--) {
                    this.positions[i * 3] = this.positions[(i - 1) * 3];
                    this.positions[i * 3 + 1] = this.positions[(i - 1) * 3 + 1];
                    this.positions[i * 3 + 2] = this.positions[(i - 1) * 3 + 2];
                }

                // Add new position at head
                this.positions[0] = this.currentPosition.x;
                this.positions[1] = this.currentPosition.y;
                this.positions[2] = this.currentPosition.z;

                this.line.geometry.attributes.position.needsUpdate = true;

                // Reset if expired or out of bounds
                if (this.age > this.maxAge ||
                    Math.abs(this.currentPosition.x) > 70 ||
                    Math.abs(this.currentPosition.y) > 70 ||
                    Math.abs(this.currentPosition.z) > 70) {
                    this.reset();
                }
            }
        }

        // Create and manage shooting stars
        const shootingStars: ShootingStar[] = [];
        for (let i = 0; i < 8; i++) {
            const star = new ShootingStar();
            scene.add(star.line);
            shootingStars.push(star);
        }

        // Animation loop
        const clock = new THREE.Clock();
        const animate = () => {
            const time = clock.getElapsedTime();

            // Smooth camera follow
            target.x += (mouse.x * 10 - target.x) * 0.05;
            target.y += (mouse.y * 10 - target.y) * 0.05;
            camera.position.x = target.x;
            camera.position.y = target.y;
            camera.lookAt(scene.position);

            // Slow starfield rotation
            starfield.rotation.x = time * 0.02;
            starfield.rotation.y = time * 0.01;

            // Update shooting stars
            shootingStars.forEach(star => star.update());

            renderer.render(scene, camera);
            req.current = requestAnimationFrame(animate);
        };

        req.current = requestAnimationFrame(animate);

        // Cleanup
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            if (req.current) cancelAnimationFrame(req.current);
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: -1,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'black',
                display: 'block',
            }}
        />
    );
}