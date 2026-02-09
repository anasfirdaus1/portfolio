'use client';

import HeroSection from '@/components/HeroSection';
import ProfileSection from '@/components/ProfileSection';
import ServicesSection from '@/components/ServicesSection';
import Footer from '@/components/Footer';
import CursorLight from '@/components/CursorLight';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--cyber-dark)]">
      {/* Global Cursor Following Light Effect */}
      <CursorLight />

      {/* Hero Section - Name, Title, Skills */}
      <HeroSection />

      {/* Profile Section - Bio, ID Card */}
      <ProfileSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
