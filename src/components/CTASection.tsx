'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

export default function CTASection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const waNumber = siteConfig.profile.whatsapp.replace(/^0/, '');
    const waLink = `https://wa.me/62${waNumber}?text=Halo%20${siteConfig.profile.name},%20saya%20tertarik%20untuk%20bekerja%20sama%20dengan%20Anda.`;

    return (
        <section
            ref={ref}
            className="py-32 px-4 relative overflow-hidden flex items-center justify-center"
            style={{ background: 'var(--cyber-darker)' }}
        >
            {/* Background effects */}
            <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>
            
            {/* Glowing Orbs - static to avoid GPU drain */}
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[var(--cyber-primary)]/10 rounded-full blur-3xl opacity-40 pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[var(--cyber-secondary)]/10 rounded-full blur-3xl opacity-40 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                className="relative z-10 w-full max-w-4xl cyber-card p-12 md:p-20 rounded-3xl text-center border-2"
                style={{ 
                    borderColor: 'rgba(0, 212, 255, 0.3)',
                    boxShadow: '0 0 50px rgba(0, 212, 255, 0.1), inset 0 0 30px rgba(0, 212, 255, 0.05)'
                }}
            >
                {/* Decorative brackets */}
                <div className="absolute top-8 left-8 text-4xl text-[var(--cyber-primary)]/30 font-mono font-bold hidden md:block">{'<'}</div>
                <div className="absolute bottom-8 right-8 text-4xl text-[var(--cyber-primary)]/30 font-mono font-bold hidden md:block">{'>'}</div>
                <div className="absolute top-8 right-8 text-4xl text-[var(--cyber-secondary)]/30 font-mono font-bold hidden md:block">{'/*'}</div>
                <div className="absolute bottom-8 left-8 text-4xl text-[var(--cyber-secondary)]/30 font-mono font-bold hidden md:block">{'*/'}</div>

                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-6"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                    Siap Tingkatkan <span className="bg-gradient-to-r from-[var(--cyber-primary)] to-[var(--cyber-secondary)] bg-clip-text text-transparent">Bisnis Anda?</span>
                </motion.h2>
                
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12"
                >
                    Mari diskusikan ide Anda dan wujudkan visi digital yang luar biasa bersama-sama.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <motion.a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--cyber-primary)] to-[#00a8cc] text-black font-bold text-lg rounded-xl transition-all relative overflow-hidden group"
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                        {/* Shine effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                        
                        <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        <span className="relative z-10">Hubungi via WhatsApp</span>
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
}
