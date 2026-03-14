'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { siteConfig, Project } from '@/data/siteConfig';

interface ProjectCardProps {
    project: Project;
    onSelect: (project: Project) => void;
    isPaused: boolean;
}

function ProjectCard({ project, onSelect, isPaused }: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(project)}
            className="flex-shrink-0 w-72 md:w-80 p-6 rounded-xl cyber-card mx-4 group cursor-pointer"
            style={{
                borderColor: `${project.color}40`,
            }}
        >
            {/* Project Thumbnail */}
            <div
                className="w-full h-40 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${project.color}10 0%, ${project.color}05 100%)`,
                    border: `1px solid ${project.color}30`,
                }}
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm"
                    style={{ background: `${project.color}30` }}
                >
                    <span className="text-sm font-mono font-bold text-white px-4 py-2 rounded-lg" style={{ background: `${project.color}90` }}>
                        VIEW DETAIL
                    </span>
                </div>
            </div>

            {/* Project Info */}
            <h3
                className="text-lg font-bold mb-2 transition-colors"
                style={{ color: project.color, fontFamily: 'Orbitron, sans-serif' }}
            >
                {project.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4">{project.description}</p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                    <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded font-mono"
                        style={{
                            background: `${project.color}15`,
                            color: project.color,
                            border: `1px solid ${project.color}30`,
                        }}
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

// Project Detail Modal
function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
                style={{
                    background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)',
                    border: `2px solid ${project.color}60`,
                    boxShadow: `0 0 60px ${project.color}20, 0 25px 80px rgba(0,0,0,0.5)`,
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{
                        background: `${project.color}20`,
                        border: `1px solid ${project.color}50`,
                    }}
                >
                    <svg className="w-5 h-5" style={{ color: project.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header with Image */}
                <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-t-2xl">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(to top, #0f0f1a 0%, transparent 60%)`,
                        }}
                    />
                    {/* Animated shimmer */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
                    />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 -mt-8 relative">
                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl md:text-3xl font-bold mb-2"
                        style={{ color: project.color, fontFamily: 'Orbitron, sans-serif' }}
                    >
                        {project.title}
                    </motion.h2>

                    {/* Short Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-gray-400 text-sm font-mono mb-4"
                    >
                        {project.description}
                    </motion.p>

                    {/* Divider */}
                    <div className="h-px w-full mb-6" style={{ background: `linear-gradient(to right, ${project.color}50, transparent)` }} />

                    {/* Detail Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                    >
                        <h3 className="text-sm font-mono mb-3" style={{ color: project.color }}>
                            {'>'} DESKRIPSI
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                            {project.detailDescription}
                        </p>
                    </motion.div>

                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="mb-8"
                    >
                        <h3 className="text-sm font-mono mb-3" style={{ color: project.color }}>
                            {'>'} TECH_STACK
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, i) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + i * 0.05 }}
                                    className="text-xs px-3 py-1.5 rounded-lg font-mono"
                                    style={{
                                        background: `${project.color}15`,
                                        color: project.color,
                                        border: `1px solid ${project.color}30`,
                                    }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="flex flex-wrap gap-4"
                    >
                        {project.url ? (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-bold text-black transition-all hover:opacity-90 hover:scale-105"
                                style={{
                                    background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
                                    boxShadow: `0 4px 20px ${project.color}40`,
                                }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                LIHAT WEBSITE
                            </a>
                        ) : (
                            <span
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-bold transition-all cursor-not-allowed opacity-60"
                                style={{
                                    background: `${project.color}20`,
                                    color: project.color,
                                    border: `1px solid ${project.color}40`,
                                }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m9.374-9.373a9 9 0 11-12.728 0" />
                                </svg>
                                COMING SOON
                            </span>
                        )}

                        <button
                            onClick={onClose}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm border transition-all hover:scale-105"
                            style={{
                                borderColor: `${project.color}40`,
                                color: project.color,
                            }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            KEMBALI
                        </button>
                    </motion.div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-2xl" style={{ borderColor: project.color }} />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-2xl" style={{ borderColor: project.color }} />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-2xl" style={{ borderColor: project.color }} />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-2xl" style={{ borderColor: project.color }} />
            </motion.div>
        </motion.div>
    );
}

// Draggable Marquee wrapper for drag-to-scroll functionality
function DraggableMarquee({ children, direction = 'left', isPaused = false }: { children: React.ReactNode, direction?: 'left' | 'right', isPaused?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        setIsMouseDown(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const onMouseLeave = () => {
        setIsMouseDown(false);
        setIsDragging(false);
    };

    const onMouseUp = () => {
        setIsMouseDown(false);
        setTimeout(() => setIsDragging(false), 50);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDown || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        if (Math.abs(walk) > 5) {
            setIsDragging(true);
        }
        if (isDragging) {
            containerRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const onTouchStart = (e: React.TouchEvent) => {
        if (!containerRef.current) return;
        setIsMouseDown(true);
        setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const onTouchEnd = () => {
        setIsMouseDown(false);
        setTimeout(() => setIsDragging(false), 50);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!isMouseDown || !containerRef.current) return;
        const x = e.touches[0].pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        if (Math.abs(walk) > 5) {
            setIsDragging(true);
        }
        if (isDragging) {
            containerRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const animationClass = direction === 'left' ? 'marquee-left' : 'marquee-right';

    return (
        <div
            ref={containerRef}
            className="w-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
        >
            <div
                className={`flex w-max ${!isDragging ? 'hover:[animation-play-state:paused]' : '[animation-play-state:paused]'}`}
                style={{
                    animation: isPaused ? 'none' : `${animationClass} 30s linear infinite`,
                    pointerEvents: isDragging ? 'none' : 'auto', // cancel inner clicks while dragging
                }}
            >
                {children}
            </div>
        </div>
    );
}

export default function LibrarySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const isPaused = selectedProject !== null;

    // Split projects into two rows for marquee
    const half = Math.ceil(siteConfig.projects.length / 2);
    const row1 = siteConfig.projects.slice(0, half);
    const row2 = siteConfig.projects.slice(half);

    // Duplicate for infinite scroll
    const duplicatedRow1 = [...row1, ...row1, ...row1];
    const duplicatedRow2 = [...row2, ...row2, ...row2];

    return (
        <section
            ref={ref}
            className="min-h-screen py-20 relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, var(--cyber-darker) 0%, var(--cyber-dark) 100%)' }}
        >
            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-16 px-4"
            >
                <h2
                    className="text-3xl md:text-4xl font-bold neon-text-secondary mb-4"
                    style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-secondary)' }}
                >
                    {'{'} LIBRARY {'}'}
                </h2>
                <p className="text-gray-400 font-mono text-sm mb-2">
                    {'// Geser untuk mempercepat, klik untuk melihat detail'}
                </p>
            </motion.div>

            {/* First Row - Moving Right */}
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
            >
                <DraggableMarquee direction="right" isPaused={isPaused}>
                    {duplicatedRow1.map((project, index) => (
                        <ProjectCard
                            key={`row1-${project.id}-${index}`}
                            project={project}
                            onSelect={setSelectedProject}
                            isPaused={isPaused}
                        />
                    ))}
                </DraggableMarquee>
            </motion.div>

            {/* Second Row - Moving Left */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <DraggableMarquee direction="left" isPaused={isPaused}>
                    {duplicatedRow2.map((project, index) => (
                        <ProjectCard
                            key={`row2-${project.id}-${index}`}
                            project={project}
                            onSelect={setSelectedProject}
                            isPaused={isPaused}
                        />
                    ))}
                </DraggableMarquee>
            </motion.div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetailModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            {/* Decorative Lines */}
            <div className="absolute left-0 top-1/4 w-32 h-px bg-gradient-to-r from-transparent via-[var(--cyber-primary)] to-transparent opacity-30" />
            <div className="absolute right-0 top-3/4 w-32 h-px bg-gradient-to-l from-transparent via-[var(--cyber-secondary)] to-transparent opacity-30" />
        </section>
    );
}
