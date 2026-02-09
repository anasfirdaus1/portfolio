'use client';

import { useEffect, useState, useCallback } from 'react';

export default function CursorLight() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Throttled mouse move handler for better performance
    const throttledMouseMove = useCallback((e: MouseEvent) => {
        requestAnimationFrame(() => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        });
    }, []);

    useEffect(() => {
        setIsMounted(true);
        // Check if mobile
        setIsMobile(window.innerWidth < 768);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('mousemove', throttledMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', throttledMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [throttledMouseMove]);

    // Don't render on server, before mount, or on mobile
    if (!isMounted || isMobile) return null;

    return (
        <>
            {/* Primary Glow */}
            <div
                className="pointer-events-none fixed inset-0 z-50"
                style={{
                    background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 212, 255, 0.1), transparent 50%)`,
                    willChange: 'background',
                }}
            />
        </>
    );
}
