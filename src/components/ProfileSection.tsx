'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

export default function ProfileSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [isDragging, setIsDragging] = useState(false);

    // Spring animation for the photo card drag
    const [{ x, y, rotateZ, scale }, api] = useSpring(() => ({
        x: 0,
        y: 0,
        rotateZ: 0,
        scale: 1,
        config: { mass: 2, tension: 200, friction: 25 },
    }));

    // Drag gesture for the card
    const bind = useDrag(
        ({ active, movement: [mx, my] }) => {
            const rotation = mx / 20;
            setIsDragging(active);

            api.start({
                x: active ? mx : 0,
                y: active ? my : 0,
                rotateZ: active ? rotation : 0,
                scale: active ? 1.05 : 1,
                immediate: active,
                config: active
                    ? { mass: 1, tension: 400, friction: 35 }
                    : { mass: 2, tension: 200, friction: 25 },
            });
        },
        { from: () => [0, 0] }
    );

    return (
        <section
            ref={ref}
            className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, var(--cyber-dark) 0%, var(--cyber-darker) 100%)' }}
        >
            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10"
            >
                <h2
                    className="text-3xl md:text-4xl font-bold text-center"
                    style={{
                        fontFamily: 'Orbitron, sans-serif',
                        color: 'var(--cyber-primary)',
                        textShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
                    }}
                >
                    {'<'} PROFILE {'/>'}
                </h2>
            </motion.div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-16">
                {/* Photo Card - Simple Drop Animation */}
                <div className="flex justify-center items-center">
                    <motion.div
                        initial={{ y: -200, opacity: 0, rotateZ: -5 }}
                        animate={isInView ? { y: 0, opacity: 1, rotateZ: 0 } : { y: -200, opacity: 0, rotateZ: -5 }}
                        transition={{
                            type: 'spring',
                            mass: 2,
                            stiffness: 100,
                            damping: 15,
                            delay: 0.3
                        }}
                    >
                        <animated.div
                            {...bind()}
                            style={{
                                x,
                                y,
                                rotateZ,
                                scale,
                                touchAction: 'none',
                            }}
                            className={`cursor-grab select-none ${isDragging ? 'cursor-grabbing' : ''}`}
                        >
                            {/* Photo Card */}
                            <div className="relative">
                                {/* Glow behind */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-[var(--cyber-primary)]/30 to-[var(--cyber-secondary)]/30 rounded-3xl blur-2xl opacity-60"></div>

                                <div className="relative w-72 md:w-80 bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] rounded-2xl border-2 border-[var(--cyber-primary)] overflow-hidden"
                                    style={{ boxShadow: '0 0 40px rgba(0, 212, 255, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5)' }}
                                >
                                    {/* Card Header */}
                                    <div className="bg-gradient-to-r from-[var(--cyber-primary)]/20 to-[var(--cyber-secondary)]/20 px-4 py-2 border-b border-[var(--cyber-primary)]/30">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-mono text-[var(--cyber-primary)]">PHOTO ID</span>
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 rounded-full bg-[var(--cyber-primary)]"></div>
                                                <div className="w-2 h-2 rounded-full bg-[var(--cyber-secondary)]"></div>
                                                <div className="w-2 h-2 rounded-full bg-[var(--cyber-accent)]"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Photo Area */}
                                    <div className="p-4">
                                        <div className="w-full aspect-[4/5] bg-gradient-to-br from-[var(--cyber-primary)]/10 to-[var(--cyber-secondary)]/10 rounded-xl border border-[var(--cyber-primary)]/30 flex items-center justify-center overflow-hidden relative">
                                            <div className="absolute inset-0 cyber-grid opacity-20"></div>

                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                                                animate={{ x: ['-200%', '200%'] }}
                                                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                            />

                                            <div className="relative flex flex-col items-center w-full h-full justify-center">
                                                {siteConfig.profile.photo ? (
                                                    <img
                                                        src={siteConfig.profile.photo}
                                                        alt="ID Card Photo"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <>
                                                        <svg className="w-24 h-24 text-[var(--cyber-primary)]/50" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                        </svg>
                                                        <p className="text-xs text-gray-500 font-mono mt-2">Your Photo Here</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-4 text-center">
                                            <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                                {siteConfig.profile.name}
                                            </h3>
                                            <p className="text-sm text-[var(--cyber-primary)] font-mono">{siteConfig.profile.username}</p>
                                        </div>
                                    </div>

                                    {/* Corner Decorations */}
                                    <div className="absolute top-12 left-2 w-3 h-3 border-t-2 border-l-2 border-[var(--cyber-primary)]" />
                                    <div className="absolute top-12 right-2 w-3 h-3 border-t-2 border-r-2 border-[var(--cyber-primary)]" />
                                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[var(--cyber-primary)]" />
                                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[var(--cyber-primary)]" />
                                </div>
                            </div>
                        </animated.div>
                    </motion.div>
                </div>

                {/* Profile Info */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-6"
                >
                    {/* Drag Hint */}
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center gap-3 p-4 rounded-lg bg-[var(--cyber-primary)]/5 border border-[var(--cyber-primary)]/20"
                    >
                        <span className="text-2xl">👆</span>
                        <div>
                            <p className="text-sm text-[var(--cyber-primary)] font-mono">Interactive Card</p>
                            <p className="text-xs text-gray-400">Try dragging the card around!</p>
                        </div>
                    </motion.div>

                    {/* Bio */}
                    <div className="cyber-card rounded-lg p-6">
                        <h3 className="text-lg font-bold text-[var(--cyber-primary)] mb-3 font-mono">
                            {'>'} ABOUT_ME
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            {siteConfig.profile.bio}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="cyber-card rounded-lg p-4 text-center cursor-pointer"
                        >
                            <p className="text-2xl font-bold text-[var(--cyber-primary)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                {siteConfig.profile.experience}
                            </p>
                            <p className="text-xs text-gray-400">Exp</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="cyber-card rounded-lg p-4 text-center cursor-pointer"
                        >
                            <p className="text-2xl font-bold text-[var(--cyber-secondary)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                {siteConfig.profile.projectCount}
                            </p>
                            <p className="text-xs text-gray-400">Projects</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="cyber-card rounded-lg p-4 text-center cursor-pointer"
                        >
                            <p className="text-2xl font-bold text-[var(--cyber-accent)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                {siteConfig.profile.clientCount}
                            </p>
                            <p className="text-xs text-gray-400">Clients</p>
                        </motion.div>
                    </div>

                    {/* Contact Links */}
                    <div className="cyber-card rounded-lg p-6">
                        <h3 className="text-lg font-bold text-[var(--cyber-primary)] mb-4 font-mono">
                            {'>'} CONNECT
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <motion.a
                                href="https://github.com/anasfirdaus000"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, x: 5 }}
                                className="flex items-center gap-3 text-gray-300 hover:text-[var(--cyber-primary)] transition-colors group p-2 rounded-lg hover:bg-[var(--cyber-primary)]/5"
                            >
                                <span className="text-xl">💻</span>
                                <span className="text-sm">GitHub</span>
                            </motion.a>
                            <motion.a
                                href="https://linkedin.com/in/anasfirdaus"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, x: 5 }}
                                className="flex items-center gap-3 text-gray-300 hover:text-[var(--cyber-secondary)] transition-colors group p-2 rounded-lg hover:bg-[var(--cyber-secondary)]/5"
                            >
                                <span className="text-xl">🔗</span>
                                <span className="text-sm">LinkedIn</span>
                            </motion.a>
                            <motion.a
                                href="mailto:anasfirdaus000@gmail.com"
                                whileHover={{ scale: 1.05, x: 5 }}
                                className="flex items-center gap-3 text-gray-300 hover:text-[var(--cyber-accent)] transition-colors group p-2 rounded-lg hover:bg-[var(--cyber-accent)]/5"
                            >
                                <span className="text-xl">📧</span>
                                <span className="text-sm">Email</span>
                            </motion.a>
                            <motion.a
                                href="https://wa.me/6287810851738"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, x: 5 }}
                                className="flex items-center gap-3 text-gray-300 hover:text-[var(--cyber-warning)] transition-colors group p-2 rounded-lg hover:bg-[var(--cyber-warning)]/5"
                            >
                                <span className="text-xl">📱</span>
                                <span className="text-sm">WhatsApp</span>
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
