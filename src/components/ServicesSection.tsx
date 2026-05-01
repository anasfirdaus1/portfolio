'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Services data with cyber colors and icons
const services = [
    {
        id: 1,
        title: 'UX/UI Design',
        description: 'Craft intuitive and elegant digital experiences that captivate and convert.',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop', // Retro synthwave / tech
        color: '#a855f7',
        icon: '🎨',
    },
    {
        id: 2,
        title: 'Web Development',
        description: 'Pembuatan website modern dan responsif dengan teknologi terbaru.',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop', // Matrix matrix code
        color: '#00d4ff',
        icon: '🌐',
    },
    {
        id: 3,
        title: 'Mobile App',
        description: 'Pengembangan aplikasi mobile inovatif untuk Android dan iOS.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop', // Data visualization
        color: '#00ff88',
        icon: '📱',
    },
    {
        id: 4,
        title: 'Backend Dev',
        description: 'Pengembangan server, API, dan arsitektur database yang handal.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop', // Server racks
        color: '#ffcc00',
        icon: '⚙️',
    },
    {
        id: 5,
        title: 'E-Commerce',
        description: 'Sistem lengkap untuk toko online dengan integrasi pembayaran cerdas.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop', // Payment terminal
        color: '#ff6b6b',
        icon: '🛒',
    },
    {
        id: 6,
        title: 'Consultation',
        description: 'Konsultasi dan strategi teknologi untuk transformasi digital bisnis.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop', // Global network / space
        color: '#4ecdc4',
        icon: '💡',
    },
];

export default function ServicesSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [activeId, setActiveId] = useState(1);

    return (
        <section
            id="services"
            ref={ref}
            className="min-h-screen py-24 px-4 md:px-8 relative overflow-hidden flex flex-col justify-center"
            style={{ background: 'linear-gradient(180deg, var(--cyber-darker) 0%, var(--cyber-dark) 100%)' }}
        >
            {/* Background Details */}
            <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto w-full relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center md:text-left"
                >
                    <h2 
                        className="text-4xl md:text-5xl font-bold mb-4 neon-text-secondary"
                        style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-secondary)' }}
                    >
                        {'{'} SERVICES {'}'}
                    </h2>
                    <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto md:mx-0">
                        {'// Comprehensive solutions to elevate your brand'}
                    </p>
                </motion.div>

                {/* Accordion Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col md:flex-row h-[600px] md:h-[500px] gap-3 md:gap-4 w-full"
                >
                    {services.map((service) => {
                        const isActive = activeId === service.id;
                        
                        return (
                            <div
                                key={service.id}
                                onClick={() => setActiveId(service.id)}
                                onPointerEnter={(e) => {
                                    if (e.pointerType === 'mouse') {
                                        setActiveId(service.id);
                                    }
                                }}
                                className="relative rounded-xl overflow-hidden cursor-pointer transform-gpu border"
                                style={{
                                    flex: isActive ? '6 1 0%' : '0.6 1 0%',
                                    minHeight: '60px',
                                    transition: 'flex 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s ease, box-shadow 0.4s ease',
                                    contain: 'layout style',
                                    borderColor: isActive ? service.color : `${service.color}40`,
                                    boxShadow: isActive ? `0 0 20px ${service.color}20` : 'none',
                                    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 212, 255, 0.05) 100%)',
                                }}
                            >
                                {/* Background Image - Holographic Effect */}
                                <div className="absolute inset-0 bg-[var(--cyber-darker)]"></div>
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="absolute inset-0 w-full h-full object-cover transform-gpu grayscale mix-blend-screen"
                                    loading="eager"
                                    decoding="async"
                                    style={{
                                        opacity: isActive ? 0.6 : 0.4,
                                        transform: isActive ? 'scale(1)' : 'scale(1.08)',
                                        transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease',
                                    }}
                                />
                                
                                {/* Cyber Tint Overlays */}
                                <div 
                                    className="absolute inset-0 transition-opacity duration-500 pointer-events-none mix-blend-color"
                                    style={{ backgroundColor: service.color, opacity: isActive ? 0.5 : 0.2 }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--cyber-darker)] via-transparent to-transparent pointer-events-none"></div>
                                <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>

                                {/* Content Layer */}
                                <div className={`absolute left-0 right-0 p-4 md:p-6 flex ${isActive ? 'flex-col md:flex-row items-start md:items-end bottom-0' : 'flex-row md:flex-col items-center md:items-center justify-start md:justify-end md:bottom-6 bottom-0 top-0 md:top-auto h-full md:h-auto'} gap-4 md:gap-6`}>
                                    
                                    {/* Neon Badge */}
                                    <div 
                                        className="flex flex-col items-center justify-center bg-[var(--cyber-darker)]/80 backdrop-blur-sm font-mono z-10 flex-shrink-0 transform-gpu border"
                                        style={{
                                            width: isActive ? '56px' : '44px',
                                            height: isActive ? '56px' : '44px',
                                            borderColor: isActive ? service.color : `${service.color}50`,
                                            color: isActive ? '#fff' : service.color,
                                            boxShadow: isActive ? `0 0 15px ${service.color}60, inset 0 0 10px ${service.color}30` : 'none',
                                            borderRadius: '12px',
                                            transition: 'width 0.4s ease, height 0.4s ease, border-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease',
                                        }}
                                    >
                                        <span style={{ fontSize: isActive ? '12px' : '14px', color: service.color }} className="font-bold">0{service.id}</span>
                                        {isActive && <span className="text-xl leading-none mt-1 animate-pulse">{service.icon}</span>}
                                    </div>

                                    {/* Text Content */}
                                    <div 
                                        className="flex flex-col justify-end w-[220px] md:w-[300px] transform-gpu"
                                        style={{
                                            opacity: isActive ? 1 : 0,
                                            transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                                            transition: isActive
                                                ? 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s'
                                                : 'opacity 0.2s ease, transform 0.2s ease',
                                            pointerEvents: isActive ? 'auto' : 'none',
                                        }}
                                    >
                                        <h3 
                                            className="text-xl md:text-2xl font-bold mb-2 whitespace-nowrap"
                                            style={{ color: '#fff', fontFamily: 'Orbitron, sans-serif', textShadow: `0 0 10px ${service.color}80` }}
                                        >
                                            {service.title}
                                        </h3>
                                        <div className="w-12 h-1 mb-3" style={{ backgroundColor: service.color, boxShadow: `0 0 10px ${service.color}` }}></div>
                                        <p className="text-gray-300 font-mono text-xs md:text-sm line-clamp-2 md:line-clamp-none">
                                            {'>'} {service.description}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Cyber UI Accents */}
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 opacity-50 m-4 pointer-events-none transition-colors duration-500" style={{ borderColor: isActive ? service.color : 'transparent' }}></div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
