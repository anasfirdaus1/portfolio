'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

const socialLinks = [
    { name: 'Email', href: `mailto:${siteConfig.profile.email}` },
    { name: 'WhatsApp', href: `https://wa.me/62${siteConfig.profile.whatsapp.replace(/^0/, '')}` },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 px-4 border-t border-[var(--cyber-primary)]/20 bg-[var(--cyber-darker)]">
            <div className="max-w-6xl mx-auto">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                    {/* Logo/Name */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3
                            className="text-2xl font-bold text-[var(--cyber-primary)] neon-text"
                            style={{ fontFamily: 'Orbitron, sans-serif' }}
                        >
                            {'<AF/>'}
                        </h3>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex gap-6"
                    >
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[var(--cyber-primary)] transition-colors font-mono text-sm"
                            >
                                {social.name}
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[var(--cyber-primary)]/30 to-transparent mb-8" />

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center"
                >
                    <p className="text-gray-500 text-sm font-mono">
                        {'// '}&copy; {currentYear} {siteConfig.profile.name}. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-xs font-mono mt-2">
                        {'< Built with ❤️ and lots of ☕ />'}
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
