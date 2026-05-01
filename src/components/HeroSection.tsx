'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { useEffect, useState, useRef } from 'react';

// Pre-computed particle positions to avoid hydration mismatch from Math.random()
const particles = [
  { w: 3.5, h: 3.8, x: 12, y: 7, dur: 6.2, del: 0.3 },
  { w: 2.9, h: 2.8, x: 53, y: 83, dur: 7.1, del: 1.1 },
  { w: 5.3, h: 2.5, x: 46, y: 69, dur: 5.4, del: 0.7 },
  { w: 5.5, h: 2.1, x: 84, y: 97, dur: 6.8, del: 1.5 },
  { w: 2.3, h: 4.3, x: 72, y: 36, dur: 5.9, del: 0.2 },
  { w: 4.3, h: 3.5, x: 32, y: 72, dur: 7.5, del: 1.8 },
  { w: 3.3, h: 3.2, x: 50, y: 99, dur: 5.2, del: 0.5 },
  { w: 4.5, h: 4.3, x: 4, y: 37, dur: 6.5, del: 1.3 },
  { w: 3.2, h: 5.9, x: 40, y: 83, dur: 7.8, del: 0.9 },
  { w: 4.8, h: 3.4, x: 13, y: 84, dur: 5.7, del: 1.6 },
  { w: 3.6, h: 3.9, x: 19, y: 68, dur: 6.1, del: 0.4 },
  { w: 4.5, h: 4.8, x: 8, y: 83, dur: 7.3, del: 1.0 },
  { w: 4.4, h: 4.9, x: 14, y: 32, dur: 5.6, del: 0.8 },
  { w: 4.9, h: 4.5, x: 29, y: 47, dur: 6.9, del: 1.4 },
  { w: 4.0, h: 4.2, x: 67, y: 20, dur: 7.0, del: 0.6 },
];

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const fullText = siteConfig.profile.title;
  const indexRef = useRef(0);
  const phaseRef = useRef<'typing' | 'pausing' | 'resetting'>('typing');

  const [isMobile, setIsMobile] = useState(false);

  // Typing animation effect
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const timer = setInterval(() => {
      if (phaseRef.current === 'pausing' || phaseRef.current === 'resetting') return;

      if (indexRef.current <= fullText.length) {
        setDisplayText(fullText.slice(0, indexRef.current));
        indexRef.current++;
      } else {
        phaseRef.current = 'pausing';
        setTimeout(() => {
          indexRef.current = 0;
          setDisplayText('');
          phaseRef.current = 'typing';
        }, 3000);
      }
    }, 120);
    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden cyber-grid scanline"
    >
      {/* Animated Background Particles - Reduced for mobile performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.w,
              height: p.h,
              background: i % 2 === 0 ? 'var(--cyber-primary)' : 'var(--cyber-secondary)',
              left: `${p.x}%`,
              top: `${p.y}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              delay: p.del,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 3D Floating Geometric Shapes - Hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {/* Large rotating cube outline */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border border-[var(--cyber-primary)]/20"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating diamond */}
        <motion.div
          className="absolute bottom-32 left-20 w-16 h-16 border border-[var(--cyber-secondary)]/30 rotate-45"
          animate={{
            y: [0, -30, 0],
            rotate: [45, 90, 45],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Pulsing circles */}
        <motion.div
          className="absolute top-1/3 left-10 w-24 h-24 rounded-full border border-[var(--cyber-accent)]/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Hexagon */}
        <motion.div
          className="absolute bottom-20 right-32"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="var(--cyber-primary)" strokeWidth="1" opacity="0.3">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
          </svg>
        </motion.div>

        {/* 3D Ring */}
        <motion.div
          className="absolute top-1/2 right-10 w-20 h-20"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{
            rotateX: [0, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-[var(--cyber-secondary)]/30"
            style={{ transform: 'rotateX(70deg)' }}
          />
        </motion.div>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--cyber-primary)]/30 bg-[var(--cyber-primary)]/5 mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300 font-mono">{siteConfig.profile.tagline}</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              <span className="text-white">Hello, I'm</span>
              <br />
              <span className="bg-gradient-to-r from-[var(--cyber-primary)] to-[var(--cyber-secondary)] bg-clip-text text-transparent">
                {siteConfig.profile.name}
              </span>
            </motion.h1>

            {/* Title with Enhanced Typing Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-3 bg-[var(--cyber-darker)] rounded-lg border border-[var(--cyber-secondary)]/30 backdrop-blur-sm">
                <span className="text-[var(--cyber-secondary)]">{'>'}</span>
                <span className="text-xl md:text-2xl font-mono">
                  <span className="text-[var(--cyber-primary)]">{displayText}</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-[var(--cyber-secondary)] ml-1"
                  >
                    ▌
                  </motion.span>
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-lg max-w-xl mb-8 leading-relaxed"
            >
              Passionate about creating innovative digital solutions with cutting-edge technology.
              Specializing in building scalable web applications and delivering exceptional user experiences.
            </motion.p>

            {/* Skills Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-8"
            >
              <p className="text-sm text-gray-500 font-mono mb-4">{'// Tech Stack'}</p>
              <div className="flex flex-wrap gap-3">
                {siteConfig.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      boxShadow: `0 10px 30px ${skill.color}40`
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--cyber-dark)] border border-gray-700 hover:border-[var(--cyber-primary)] transition-all cursor-pointer group"
                  >
                    <span className="text-lg">{skill.icon}</span>
                    <span className="text-sm text-gray-300 group-hover:text-[var(--cyber-primary)] transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-gradient-to-r from-[var(--cyber-primary)] to-[var(--cyber-secondary)] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                My Services
              </motion.button>
              <motion.a
                href="https://wa.me/6287810851738"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-[var(--cyber-primary)] text-[var(--cyber-primary)] rounded-lg hover:bg-[var(--cyber-primary)]/10 transition-colors"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 flex justify-center perspective-1000 pt-16 md:pt-0"
          >
            <div className="relative">
              {/* Main Profile Card with 3D Effect - Simplified on mobile */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-72 md:w-80 aspect-square"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Glow Behind Card */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[var(--cyber-primary)]/30 to-[var(--cyber-secondary)]/30 rounded-3xl blur-2xl opacity-50"></div>

                {/* Card Background */}
                <div className="relative h-full bg-gradient-to-br from-[var(--cyber-primary)]/10 to-[var(--cyber-secondary)]/10 rounded-2xl border border-[var(--cyber-primary)]/40 backdrop-blur-sm overflow-hidden">
                  {/* Animated gradient overlay - desktop only */}
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    />
                  )}

                  {/* Grid Pattern */}
                  <div className="absolute inset-0 cyber-grid opacity-20"></div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-6">
                    {/* Avatar with glow */}
                    <motion.div
                      className="relative mb-4"
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 10, repeat: Infinity }}
                    >
                      <div className="absolute -inset-2 bg-gradient-to-r from-[var(--cyber-primary)] to-[var(--cyber-secondary)] rounded-full blur-lg opacity-40"></div>
                      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[var(--cyber-dark)] to-[var(--cyber-darker)] border-2 border-[var(--cyber-primary)]/50 flex items-center justify-center overflow-hidden">
                        {siteConfig.heroPhoto ? (
                          <img
                            src={siteConfig.heroPhoto}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg className="w-20 h-20 md:w-24 md:h-24 text-[var(--cyber-primary)]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        )}
                      </div>
                    </motion.div>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {siteConfig.profile.name}
                    </h3>
                    <p className="text-[var(--cyber-primary)] text-sm font-mono mb-4">{siteConfig.profile.username}</p>

                    {/* Stats */}
                    <div className="flex gap-6 text-center">
                      <div>
                        <p className="text-xl font-bold text-white">
                          {siteConfig.profile.experience}
                        </p>
                        <p className="text-xs text-gray-400">Experience</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white">
                          {siteConfig.profile.projectCount}
                        </p>
                        <p className="text-xs text-gray-400">Projects</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white">
                          {siteConfig.profile.clientCount}
                        </p>
                        <p className="text-xs text-gray-400">Clients</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[var(--cyber-primary)]"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[var(--cyber-secondary)]"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[var(--cyber-secondary)]"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[var(--cyber-primary)]"></div>
              </motion.div>

              {/* Orbiting Elements - Desktop only */}
              {!isMobile && (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-30px] pointer-events-none"
                  >
                    <div className="absolute top-0 left-1/2 w-3 h-3 bg-[var(--cyber-primary)] rounded-full shadow-lg shadow-[var(--cyber-primary)]/50"></div>
                  </motion.div>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-50px] pointer-events-none"
                  >
                    <div className="absolute top-1/2 right-0 w-2 h-2 bg-[var(--cyber-secondary)] rounded-full shadow-lg shadow-[var(--cyber-secondary)]/50"></div>
                  </motion.div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-70px] pointer-events-none"
                  >
                    <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-[var(--cyber-accent)] rounded-full shadow-lg shadow-[var(--cyber-accent)]/50"></div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-[var(--cyber-primary)]"
        >
          <span className="text-xs mb-2 font-mono">SCROLL</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
