'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedLines() {
    const materialRef = React.useRef<THREE.LineBasicMaterial>(null!);
    const groupRef = React.useRef<THREE.Group>(null!);

    React.useEffect(() => {
        let frameId: number;
        const animate = () => {
            if (groupRef.current) {
                groupRef.current.rotation.y += 0.0015;
            }
            frameId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(frameId);
    }, []);

    const lines = Array.from({ length: 40 }).map((_, i) => {
        const points = [];
        for (let j = 0; j < 10; j++) {
            points.push(new THREE.Vector3(j - 5, Math.sin(j + i), 0));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
            <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 'white' }))} />
        );
    });

    return <group ref={groupRef}>{lines}</group>;
}

export default function MeshBackground() {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <Suspense fallback={null}>
                <AnimatedLines />
            </Suspense>
        </Canvas>
    );
}
