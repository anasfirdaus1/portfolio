'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const workflows = [
    { id: 1, title: 'Brief', description: 'Diskusi awal memahami visi, tujuan, dan kebutuhan proyek.', icon: '📝', color: '#00d4ff' },
    { id: 2, title: 'Wireframe', description: 'Pembuatan kerangka kasar untuk struktur layout & navigasi.', icon: '📐', color: '#a855f7' },
    { id: 3, title: 'Design', description: 'Merancang UI/UX dengan visual, warna & interaksi premium.', icon: '🎨', color: '#00ff88' },
    { id: 4, title: 'Development', description: 'Coding & integrasi sistem menjadi aplikasi interaktif.', icon: '💻', color: '#ffcc00' },
    { id: 5, title: 'Revisi', description: 'Sesi review dan penyesuaian detail demi hasil sempurna.', icon: '🔄', color: '#ff6b6b' },
    { id: 6, title: 'Launch', description: 'Deployment, optimasi akhir, dan perilisan proyek ke publik.', icon: '🚀', color: '#4ecdc4' },
];

export default function WorkflowSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    return (
        <section
            id="workflow"
            ref={ref}
            className="min-h-screen py-20 px-4 relative overflow-hidden flex flex-col justify-center"
            style={{ background: 'var(--cyber-dark)' }}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>

            {/* 3D Floating Geometry Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
                <motion.div
                    className="absolute top-1/4 left-10 w-40 h-40 border-2 border-[var(--cyber-primary)]/10 rounded-full"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-10 w-32 h-32 border border-[var(--cyber-secondary)]/20"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateX: [360, 0], rotateZ: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
            </div>

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-20 relative z-10"
            >
                <div className="inline-block relative">
                    <h2
                        className="text-3xl md:text-5xl font-bold neon-text mb-4 uppercase"
                        style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-primary)' }}
                    >
                        {'{'} WORKFLOW {'}'}
                    </h2>
                    <motion.div
                        className="absolute -inset-4 border border-[var(--cyber-primary)]/30 rounded-lg"
                        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </div>
                <p className="text-gray-400 font-mono text-sm mt-4">
                    {'// Bagaimana cara saya bekerja dari awal hingga akhir'}
                </p>
            </motion.div>

            {/* Timeline */}
            <div className="max-w-5xl mx-auto w-full relative z-10">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--cyber-primary)] via-[var(--cyber-secondary)] to-[var(--cyber-accent)] opacity-20 transform -translate-x-1/2 rounded-full"></div>

                <div className="flex flex-col gap-12 md:gap-24 relative">
                    {workflows.map((step, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: isMobile ? 0 : (isEven ? -100 : 100) }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className={`flex flex-col md:flex-row items-center gap-6 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Empty space for desktop alignment */}
                                <div className="hidden md:block md:w-1/2"></div>

                                {/* Timeline Node */}
                                <div className="relative flex items-center justify-center z-10">
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 z-10 cyber-card"
                                        style={{
                                            borderColor: step.color,
                                            boxShadow: `0 0 20px ${step.color}40`,
                                            backgroundColor: 'var(--cyber-darker)'
                                        }}
                                    >
                                        <span className="relative z-10">{step.icon}</span>
                                        {/* Pulse effect - desktop only */}
                                        {!isMobile && (
                                            <motion.div
                                                className="absolute inset-0 rounded-full"
                                                style={{ backgroundColor: step.color }}
                                                animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                            />
                                        )}
                                    </motion.div>
                                    
                                    {/* Desktop Connector Branch */}
                                    <div 
                                        className={`hidden md:block absolute w-16 h-1 bg-gradient-to-r ${isEven ? 'right-full from-transparent to-[' + step.color + ']' : 'left-full from-[' + step.color + '] to-transparent'} opacity-50`}
                                        style={{ 
                                            backgroundImage: isEven 
                                                ? `linear-gradient(to right, transparent, ${step.color})` 
                                                : `linear-gradient(to right, ${step.color}, transparent)`
                                        }}
                                    />
                                </div>

                                {/* Content Card */}
                                <div className="w-full md:w-1/2 flex">
                                    <div
                                        className="w-full p-6 rounded-xl cyber-card relative group border transition-all hover:scale-105"
                                        style={{ borderColor: `${step.color}40` }}
                                    >
                                        {/* Card Inner Glow */}
                                        <div 
                                            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl blur-xl"
                                            style={{ backgroundColor: step.color }}
                                        />

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-4 mb-4">
                                                <span 
                                                    className="text-4xl font-black opacity-20"
                                                    style={{ fontFamily: 'Orbitron, sans-serif', color: step.color }}
                                                >
                                                    0{step.id}
                                                </span>
                                                <h3
                                                    className="text-2xl font-bold transition-colors group-hover:text-white"
                                                    style={{ color: step.color, fontFamily: 'Orbitron, sans-serif' }}
                                                >
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                                {step.description}
                                            </p>
                                        </div>

                                        {/* Corner Accents */}
                                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl-lg opacity-50" style={{ borderColor: step.color }}></div>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br-lg opacity-50" style={{ borderColor: step.color }}></div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
