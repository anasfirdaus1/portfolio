'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

export default function ShowcaseSection() {
    const projects = siteConfig.projects;
    const totalItems = projects.length;

    // Detect mobile for dynamic math sizing
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile(); // Check immediately
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // The outer container is tall to create scroll space.
    // Each "step" is 100vh, plus 1 extra vh for the initial view.
    // So total height = (totalItems) * 100vh
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end'],
    });

    // Map scroll progress [0..1] to a continuous float index [0..lastIndex]
    const floatIndex = useTransform(scrollYProgress, [0, 1], [0, totalItems - 1]);

    // Track the nearest integer index for discrete state (border colors, content visibility)
    const [activeIndex, setActiveIndex] = useState(0);
    useMotionValueEvent(floatIndex, 'change', (v) => {
        const rounded = Math.round(v);
        setActiveIndex(Math.max(0, Math.min(rounded, totalItems - 1)));
    });

    // Calculate card styles based on continuous float index for buttery smooth animation
    const getCardStyle = (index: number, progress: number) => {
        const offset = index - progress;

        const isCenter = Math.abs(offset) < 0.5;
        const isAdjacent = Math.abs(offset) >= 0.5 && Math.abs(offset) < 1.5;
        const isVisible = Math.abs(offset) <= 2.5;

        // Fan-like rotation
        const rotation = offset * 8;
        // Horizontal spread (tighter on mobile)
        const translateX = offset * (isMobile ? 180 : 280);
        // Scale — center is biggest
        const dist = Math.abs(offset);
        const scale = Math.max(0.7, (isMobile ? 1.04 : 1.08) - dist * 0.18);
        // Opacity
        const opacity = Math.max(0, 1 - dist * 0.35);
        // z-index — center highest
        const zIndex = 30 - Math.round(dist * 10);
        // Vertical fan offset
        const translateY = (isMobile ? -5 : -10) + dist * (isMobile ? 12 : 25);

        return { offset, rotation, translateX, scale, opacity, zIndex, isCenter, isAdjacent, isVisible, translateY };
    };

    return (
        <section
            id="showcase"
            ref={targetRef}
            style={{ height: `${totalItems * 100}vh` }}
            className="relative"
        >
            {/* Sticky viewport — pinned until scroll exhausts the outer container */}
            <div
                className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden"
                style={{ background: 'linear-gradient(180deg, var(--cyber-dark) 0%, #080810 50%, var(--cyber-dark) 100%)' }}
            >
                {/* Background decorative elements */}
                <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none"></div>
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)' }}
                ></div>

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10 md:mb-14 relative z-10 max-w-3xl mx-auto px-4"
                >
                    <h2
                        className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-white leading-tight"
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                        Contoh Web{' '}
                        <span className="text-[var(--cyber-primary)]" style={{ textShadow: '0 0 20px rgba(0,212,255,0.4)' }}>
                            Pro & Bisnis
                        </span>
                    </h2>
                    <p className="text-gray-500 mt-4 font-mono text-sm tracking-widest uppercase">
                        {'// scroll untuk melihat portfolio'}
                    </p>
                </motion.div>

                {/* Fan Cards Container */}
                <div
                    className="relative w-full max-w-6xl mx-auto"
                    style={{ height: '480px', perspective: '1200px' }}
                >
                    {/* We render a motion-driven layer that re-renders on every scroll tick */}
                    <FanCards
                        projects={projects}
                        floatIndex={floatIndex}
                        activeIndex={activeIndex}
                        getCardStyle={getCardStyle}
                        isMobile={isMobile}
                    />
                </div>

                {/* Progress Dots */}
                <div className="flex items-center gap-3 mt-10 relative z-10">
                    {projects.map((project, i) => (
                        <div
                            key={project.id}
                            className="rounded-full transition-all duration-500"
                            style={{
                                width: i === activeIndex ? '28px' : '8px',
                                height: '8px',
                                background: i === activeIndex ? project.color : 'rgba(255,255,255,0.12)',
                                boxShadow: i === activeIndex ? `0 0 12px ${project.color}50` : 'none',
                            }}
                        />
                    ))}
                </div>

                {/* Project Counter */}
                <div className="mt-4 font-mono text-xs text-gray-600 tracking-widest">
                    <span style={{ color: projects[activeIndex]?.color }}>
                        {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="mx-2">/</span>
                    <span>{String(projects.length).padStart(2, '0')}</span>
                </div>

                {/* Scroll Hint (fades out after first scroll) */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
                >
                    <span className="text-xs font-mono tracking-wider uppercase">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// ─── Separated component that subscribes to the motion value for smooth rendering ───

interface FanCardsProps {
    projects: typeof siteConfig.projects;
    floatIndex: MotionValue<number>;
    activeIndex: number;
    isMobile: boolean;
    getCardStyle: (index: number, progress: number) => {
        offset: number;
        rotation: number;
        translateX: number;
        scale: number;
        opacity: number;
        zIndex: number;
        isCenter: boolean;
        isAdjacent: boolean;
        isVisible: boolean;
        translateY: number;
    };
}

function FanCards({ projects, floatIndex, activeIndex, getCardStyle, isMobile }: FanCardsProps) {
    const [progress, setProgress] = useState(0);
    useMotionValueEvent(floatIndex, 'change', (v) => setProgress(v));

    return (
        <>
            {projects.map((project, index) => {
                const style = getCardStyle(index, progress);
                if (!style.isVisible) return null;

                const isDiscretCenter = index === activeIndex;

                return (
                    <motion.div
                        key={project.id}
                        className="absolute top-0 cursor-pointer"
                        style={{
                            left: '50%',
                            width: isMobile ? '260px' : '300px',
                            height: isMobile ? '360px' : '420px',
                            marginLeft: isMobile ? '-130px' : '-150px',
                            zIndex: style.zIndex,
                            x: style.translateX,
                            y: style.translateY,
                            rotateZ: style.rotation,
                            scale: style.scale,
                            opacity: style.opacity,
                        }}
                        onClick={() => {
                            if (isDiscretCenter && project.url) {
                                window.open(project.url, '_blank');
                            }
                        }}
                    >
                        {/* Card Body */}
                        <div
                            className="w-full h-full rounded-2xl overflow-hidden relative transition-shadow duration-500"
                            style={{
                                border: isDiscretCenter
                                    ? `1px solid ${project.color}60`
                                    : '1px solid rgba(255,255,255,0.08)',
                                boxShadow: isDiscretCenter
                                    ? `0 25px 60px rgba(0,0,0,0.6), 0 0 30px ${project.color}15`
                                    : '0 15px 40px rgba(0,0,0,0.4)',
                                background: 'var(--cyber-darker)',
                            }}
                        >
                            {/* Project Image */}
                            <img
                                src={project.image}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="eager"
                                decoding="async"
                                style={{
                                    opacity: isDiscretCenter ? 0.85 : 0.5,
                                    transition: 'opacity 0.5s ease, filter 0.5s ease',
                                    filter: isDiscretCenter ? 'none' : 'grayscale(30%)',
                                }}
                            />

                            {/* Dark Gradient Overlay */}
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                                style={{ opacity: 0.85 }}
                            ></div>

                            {/* Colored accent line at top */}
                            <div
                                className="absolute top-0 left-0 right-0 h-[3px]"
                                style={{
                                    background: isDiscretCenter
                                        ? `linear-gradient(90deg, transparent, ${project.color}, transparent)`
                                        : 'transparent',
                                    boxShadow: isDiscretCenter ? `0 0 15px ${project.color}60` : 'none',
                                    transition: 'all 0.5s ease',
                                }}
                            ></div>

                            {/* Plus Button (Aquamare style — visible on non-center cards) */}
                            <div
                                className="absolute top-1/2 left-1/2 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border"
                                style={{
                                    transform: 'translate(-50%, -50%)',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'rgba(255,255,255,0.15)',
                                    opacity: isDiscretCenter ? 0 : 0.8,
                                    transition: 'opacity 0.4s ease',
                                }}
                            >
                                <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>

                            {/* Content at Bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                {/* Tech Tags */}
                                <div
                                    className="flex flex-wrap gap-2 mb-3"
                                    style={{
                                        opacity: isDiscretCenter ? 1 : 0,
                                        transform: isDiscretCenter ? 'translateY(0)' : 'translateY(8px)',
                                        transition: 'opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s',
                                    }}
                                >
                                    {project.tech.slice(0, 3).map((t, i) => (
                                        <span
                                            key={i}
                                            className="text-[10px] px-2 py-1 rounded-sm font-mono uppercase tracking-wider"
                                            style={{
                                                background: `${project.color}15`,
                                                color: project.color,
                                                border: `1px solid ${project.color}30`,
                                            }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Project Title */}
                                <h3
                                    className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide"
                                    style={{
                                        fontFamily: 'Orbitron, sans-serif',
                                        textShadow: isDiscretCenter ? `0 0 15px ${project.color}50` : 'none',
                                        transition: 'text-shadow 0.4s ease',
                                    }}
                                >
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p
                                    className="text-gray-400 text-sm mt-2 line-clamp-2 font-mono"
                                    style={{
                                        opacity: isDiscretCenter ? 1 : 0,
                                        maxHeight: isDiscretCenter ? '48px' : '0',
                                        transition: 'opacity 0.4s ease 0.1s, max-height 0.4s ease',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {project.description}
                                </p>

                                {/* CTA Link */}
                                {project.url && (
                                    <div
                                        className="mt-3 flex items-center gap-2 text-sm font-mono"
                                        style={{
                                            color: project.color,
                                            opacity: isDiscretCenter ? 1 : 0,
                                            transform: isDiscretCenter ? 'translateY(0)' : 'translateY(6px)',
                                            transition: 'opacity 0.3s ease 0.2s, transform 0.3s ease 0.2s',
                                        }}
                                    >
                                        <span>Visit Site</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </>
    );
}
