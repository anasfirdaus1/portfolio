'use client';

import { useEffect, useState } from 'react';

export default function CursorLight() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Don't render on server or before mount
    if (!isMounted) return null;

    return (
        <>
            {/* Primary Glow */}
            <div
                className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-100"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 212, 255, 0.12), transparent 50%)`,
                }}
            />
            {/* Secondary Glow */}
            <div
                className="pointer-events-none fixed inset-0 z-50"
                style={{
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.08), transparent 40%)`,
                }}
            />
        </>
    );
}
