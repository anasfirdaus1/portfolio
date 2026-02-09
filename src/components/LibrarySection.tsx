'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Dummy project data
const projectsRow1 = [
    {
        id: 1,
        title: 'TaniLink',
        description: 'Agricultural marketplace platform',
        tech: ['React', 'Node.js', 'PostgreSQL'],
        color: '#00ff88',
    },
    {
        id: 2,
        title: 'E-Commerce Pro',
        description: 'Modern e-commerce solution',
        tech: ['Next.js', 'Tailwind', 'Stripe'],
        color: '#00d4ff',
    },
    {
        id: 3,
        title: 'Task Manager',
        description: 'Productivity application',
        tech: ['React', 'Firebase', 'Material UI'],
        color: '#ff00ff',
    },
    {
        id: 4,
        title: 'Weather App',
        description: 'Real-time weather dashboard',
        tech: ['Vue.js', 'OpenWeather API'],
        color: '#ffcc00',
    },
    {
        id: 5,
        title: 'Portfolio v2',
        description: 'Personal portfolio website',
        tech: ['Next.js', 'Three.js', 'Framer'],
        color: '#00ff88',
    },
    {
        id: 6,
        title: 'Chat Application',
        description: 'Real-time messaging app',
        tech: ['Socket.io', 'React', 'MongoDB'],
        color: '#00d4ff',
    },
];

const projectsRow2 = [
    {
        id: 7,
        title: 'Blog Platform',
        description: 'Content management system',
        tech: ['PHP', 'Laravel', 'MySQL'],
        color: '#ff00ff',
    },
    {
        id: 8,
        title: 'Inventory System',
        description: 'Stock management tool',
        tech: ['Python', 'Django', 'PostgreSQL'],
        color: '#ffcc00',
    },
    {
        id: 9,
        title: 'Music Player',
        description: 'Web-based audio player',
        tech: ['JavaScript', 'Web Audio API'],
        color: '#00ff88',
    },
    {
        id: 10,
        title: 'Recipe Finder',
        description: 'Food recipe application',
        tech: ['React', 'Spoonacular API'],
        color: '#00d4ff',
    },
    {
        id: 11,
        title: 'Fitness Tracker',
        description: 'Health monitoring app',
        tech: ['React Native', 'Firebase'],
        color: '#ff00ff',
    },
    {
        id: 12,
        title: 'Budget Planner',
        description: 'Personal finance manager',
        tech: ['Vue.js', 'Chart.js', 'Supabase'],
        color: '#ffcc00',
    },
];

interface ProjectCardProps {
    project: {
        id: number;
        title: string;
        description: string;
        tech: string[];
        color: string;
    };
}

function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div
            className="flex-shrink-0 w-72 md:w-80 p-6 rounded-xl cyber-card mx-4 group"
            style={{
                borderColor: `${project.color}40`,
            }}
        >
            {/* Project Thumbnail Placeholder */}
            <div
                className="w-full h-40 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${project.color}10 0%, ${project.color}05 100%)`,
                    border: `1px solid ${project.color}30`,
                }}
            >
                {/* Placeholder Icon */}
                <svg
                    className="w-16 h-16 transition-transform group-hover:scale-110"
                    style={{ color: project.color }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                </svg>

                {/* Hover Overlay */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    style={{ background: `${project.color}20` }}
                >
                    <span className="text-sm font-mono" style={{ color: project.color }}>
                        VIEW PROJECT
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
        </div>
    );
}

export default function LibrarySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Duplicate projects for infinite scroll effect
    const duplicatedRow1 = [...projectsRow1, ...projectsRow1];
    const duplicatedRow2 = [...projectsRow2, ...projectsRow2];

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
                <p className="text-gray-400 font-mono text-sm">
                    {'// A collection of my recent projects'}
                </p>
            </motion.div>

            {/* First Row - Moving Right */}
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
            >
                <div className="flex marquee-right hover:[animation-play-state:paused]">
                    {duplicatedRow1.map((project, index) => (
                        <ProjectCard key={`row1-${project.id}-${index}`} project={project} />
                    ))}
                </div>
            </motion.div>

            {/* Second Row - Moving Left */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <div className="flex marquee-left hover:[animation-play-state:paused]">
                    {duplicatedRow2.map((project, index) => (
                        <ProjectCard key={`row2-${project.id}-${index}`} project={project} />
                    ))}
                </div>
            </motion.div>

            {/* View All Button */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mt-16"
            >
                <button className="px-8 py-3 border-2 border-[var(--cyber-primary)] text-[var(--cyber-primary)] rounded-lg font-mono text-sm hover:bg-[var(--cyber-primary)] hover:text-black transition-all duration-300 pulse-glow">
                    VIEW_ALL_PROJECTS( )
                </button>
            </motion.div>

            {/* Decorative Lines */}
            <div className="absolute left-0 top-1/4 w-32 h-px bg-gradient-to-r from-transparent via-[var(--cyber-primary)] to-transparent opacity-30" />
            <div className="absolute right-0 top-3/4 w-32 h-px bg-gradient-to-l from-transparent via-[var(--cyber-secondary)] to-transparent opacity-30" />
        </section>
    );
}
