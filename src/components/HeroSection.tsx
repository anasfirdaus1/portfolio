'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { useEffect, useState } from 'react';

const skills = [
  { name: 'Python', icon: '🐍', color: '#3776ab' },
  { name: 'CSS', icon: '🎨', color: '#1572b6' },
  { name: 'HTML', icon: '📄', color: '#e34f26' },
  { name: 'PHP', icon: '🐘', color: '#777bb4' },
  { name: 'React', icon: '⚛️', color: '#61dafb' },
  { name: 'JavaScript', icon: '⚡', color: '#f7df1e' },
];

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = 'Fullstack Developer';

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        setIsTypingComplete(true);
        // Restart typing after pause
        setTimeout(() => {
          setIsTypingComplete(false);
          index = 0;
          setDisplayText('');
        }, 3000);
      }
    }, 120);
    return () => clearInterval(timer);
  }, [isTypingComplete]);

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden cyber-grid scanline"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: i % 2 === 0 ? 'var(--cyber-primary)' : 'var(--cyber-secondary)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 3D Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Pulsing circles */}
        <motion.div
          className="absolute top-1/3 left-10 w-24 h-24 rounded-full border border-[var(--cyber-accent)]/20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Hexagon */}
        <motion.div
          className="absolute bottom-20 right-32"
          animate={{
            rotate: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
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
            duration: 10,
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
              <span className="text-sm text-gray-300 font-mono">Available for work</span>
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
                Anas Firdaus
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
                {skills.map((skill, index) => (
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
            className="order-1 lg:order-2 flex justify-center perspective-1000"
          >
            <div className="relative">
              {/* Main Profile Card with 3D Effect */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotateY: [-5, 5, -5],
                }}
                transition={{
                  duration: 6,
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
                  {/* Animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />

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
                      Anas Firdaus
                    </h3>
                    <p className="text-[var(--cyber-primary)] text-sm font-mono mb-4">@anasfirdaus</p>

                    {/* Stats */}
                    <div className="flex gap-6 text-center">
                      <div>
                        <motion.p
                          className="text-xl font-bold text-white"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {siteConfig.profile.experience}
                        </motion.p>
                        <p className="text-xs text-gray-400">Experience</p>
                      </div>
                      <div>
                        <motion.p
                          className="text-xl font-bold text-white"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        >
                          {siteConfig.profile.projectCount}
                        </motion.p>
                        <p className="text-xs text-gray-400">Projects</p>
                      </div>
                      <div>
                        <motion.p
                          className="text-xl font-bold text-white"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                        >
                          {siteConfig.profile.clientCount}
                        </motion.p>
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

              {/* Orbiting Elements */}
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
