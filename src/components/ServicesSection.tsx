'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Services data
const services = [
    {
        id: 1,
        title: 'Web Development',
        description: 'Pembuatan website modern dan responsif dengan teknologi terbaru',
        icon: '🌐',
        features: ['Landing Page', 'Company Profile', 'Portfolio Website'],
        color: '#00d4ff',
    },
    {
        id: 2,
        title: 'Mobile App Development',
        description: 'Pengembangan aplikasi mobile untuk Android dan iOS',
        icon: '📱',
        features: ['Flutter', 'React Native', 'Cross-Platform'],
        color: '#a855f7',
    },
    {
        id: 3,
        title: 'UI/UX Design',
        description: 'Desain antarmuka yang menarik dan user-friendly',
        icon: '🎨',
        features: ['Wireframing', 'Prototyping', 'User Research'],
        color: '#00ff88',
    },
    {
        id: 4,
        title: 'Backend Development',
        description: 'Pengembangan server, API, dan database yang handal',
        icon: '⚙️',
        features: ['REST API', 'Database Design', 'Server Management'],
        color: '#ffcc00',
    },
    {
        id: 5,
        title: 'E-Commerce Solution',
        description: 'Solusi lengkap untuk toko online Anda',
        icon: '🛒',
        features: ['Payment Integration', 'Inventory System', 'Order Management'],
        color: '#ff6b6b',
    },
    {
        id: 6,
        title: 'Consultation',
        description: 'Konsultasi teknologi dan solusi digital untuk bisnis',
        icon: '💡',
        features: ['Tech Strategy', 'Digital Transformation', 'Project Planning'],
        color: '#4ecdc4',
    },
];

interface ServiceCardProps {
    service: {
        id: number;
        title: string;
        description: string;
        icon: string;
        features: string[];
        color: string;
    };
    index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="p-6 rounded-xl cyber-card group cursor-pointer"
            style={{
                borderColor: `${service.color}40`,
            }}
        >
            {/* Icon */}
            <div
                className="w-16 h-16 rounded-xl mb-4 flex items-center justify-center text-3xl transition-transform group-hover:scale-110"
                style={{
                    background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}05 100%)`,
                    border: `1px solid ${service.color}30`,
                }}
            >
                {service.icon}
            </div>

            {/* Title */}
            <h3
                className="text-xl font-bold mb-2 transition-colors"
                style={{ color: service.color, fontFamily: 'Orbitron, sans-serif' }}
            >
                {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4">{service.description}</p>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                    <span
                        key={feature}
                        className="text-xs px-2 py-1 rounded font-mono"
                        style={{
                            background: `${service.color}15`,
                            color: service.color,
                            border: `1px solid ${service.color}30`,
                        }}
                    >
                        {feature}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

export default function ServicesSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            id="services"
            ref={ref}
            className="min-h-screen py-20 px-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, var(--cyber-darker) 0%, var(--cyber-dark) 100%)' }}
        >
            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2
                    className="text-3xl md:text-4xl font-bold neon-text-secondary mb-4"
                    style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-secondary)' }}
                >
                    {'{'} SERVICES {'}'}
                </h2>
                <p className="text-gray-400 font-mono text-sm">
                    {'// Layanan yang saya tawarkan untuk membantu bisnis Anda'}
                </p>
            </motion.div>

            {/* Services Grid - Responsive */}
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>

            {/* Contact CTA */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mt-16"
            >
                <p className="text-gray-400 mb-4 font-mono text-sm">
                    {'// Tertarik dengan layanan saya?'}
                </p>
                <a
                    href="https://wa.me/6287810851738"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 border-2 border-[var(--cyber-primary)] text-[var(--cyber-primary)] rounded-lg font-mono text-sm hover:bg-[var(--cyber-primary)] hover:text-black transition-all duration-300 pulse-glow"
                >
                    CONTACT_ME( )
                </a>
            </motion.div>

            {/* Decorative Lines */}
            <div className="absolute left-0 top-1/4 w-32 h-px bg-gradient-to-r from-transparent via-[var(--cyber-primary)] to-transparent opacity-30" />
            <div className="absolute right-0 top-3/4 w-32 h-px bg-gradient-to-l from-transparent via-[var(--cyber-secondary)] to-transparent opacity-30" />
        </section>
    );
}
