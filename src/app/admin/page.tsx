'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'images' | 'skills' | 'projects'>('profile');
    const [profile, setProfile] = useState(siteConfig.profile);
    const [skills, setSkills] = useState(siteConfig.skills);
    const [projectsRow1, setProjectsRow1] = useState(siteConfig.projectsRow1);
    const [projectsRow2, setProjectsRow2] = useState(siteConfig.projectsRow2);
    const [showCode, setShowCode] = useState(false);

    // Image states
    const [heroPhoto, setHeroPhoto] = useState(profile.photo || '');
    const [profilePhoto, setProfilePhoto] = useState(profile.photo || '');

    const generateCode = () => {
        const updatedProfile = { ...profile, photo: profilePhoto };
        const code = `// Copy this to src/data/siteConfig.ts

export const siteConfig = {
  profile: ${JSON.stringify(updatedProfile, null, 4)},

  skills: ${JSON.stringify(skills, null, 4)},

  projectsRow1: ${JSON.stringify(projectsRow1, null, 4)},

  projectsRow2: ${JSON.stringify(projectsRow2, null, 4)},
  
  // Hero Section Photo (use in HeroSection component)
  heroPhoto: "${heroPhoto}",
};`;
        return code;
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: '👤' },
        { id: 'images', label: 'Images', icon: '🖼️' },
        { id: 'skills', label: 'Skills', icon: '⚡' },
        { id: 'projects', label: 'Projects', icon: '📁' },
    ];

    return (
        <main className="min-h-screen bg-[var(--cyber-dark)] p-4 md:p-8">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1
                            className="text-3xl font-bold text-[var(--cyber-primary)] mb-2"
                            style={{ fontFamily: 'Orbitron, sans-serif' }}
                        >
                            {'<'} ADMIN PANEL {'/>'}
                        </h1>
                        <p className="text-gray-400 font-mono text-sm">// Edit your portfolio content</p>
                    </div>
                    <a
                        href="/"
                        className="px-4 py-2 bg-[var(--cyber-primary)]/10 border border-[var(--cyber-primary)] rounded-lg text-[var(--cyber-primary)] hover:bg-[var(--cyber-primary)]/20 transition-colors font-mono text-sm"
                    >
                        ← Back to Site
                    </a>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-6xl mx-auto mb-6">
                <div className="flex gap-2 flex-wrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as 'profile' | 'skills' | 'projects')}
                            className={`px-6 py-3 rounded-lg font-mono text-sm transition-all flex items-center gap-2 ${activeTab === tab.id
                                ? 'bg-[var(--cyber-primary)] text-black'
                                : 'bg-[var(--cyber-darker)] text-gray-400 hover:text-[var(--cyber-primary)] border border-gray-700'
                                }`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[var(--cyber-darker)] rounded-xl border border-gray-700 p-6"
                >
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-[var(--cyber-primary)] font-mono mb-4">
                                {'>'} Profile Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full bg-[var(--cyber-dark)] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[var(--cyber-primary)] focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Username</label>
                                    <input
                                        type="text"
                                        value={profile.username}
                                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                        className="w-full bg-[var(--cyber-dark)] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[var(--cyber-primary)] focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={profile.title}
                                        onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                                        className="w-full bg-[var(--cyber-dark)] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[var(--cyber-primary)] focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        className="w-full bg-[var(--cyber-dark)] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[var(--cyber-primary)] focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={profile.location}
                                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                        className="w-full bg-[var(--cyber-dark)] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[var(--cyber-primary)] focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Photo URL</label>
                                    <input
                                        type="text"
                                        value={profile.photo || ''}
                                        onChange={(e) => setProfile({ ...profile, photo: e.target.value })}
                                        placeholder="https://example.com/photo.jpg"
                                        className="w-full bg-[var(--cyber-dark)] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[var(--cyber-primary)] focus:outline-none transition-colors placeholder-gray-600"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-400 mb-2">Bio</label>
                                    <textarea
                                        value={profile.bio}
                                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                        rows={4}
                                        className="w-full bg-[var(--cyber-dark)] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[var(--cyber-primary)] focus:outline-none transition-colors resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">GitHub</label>
                                    <input
                                        type="text"
                                        value={profile.github}
                                        onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                                        className="w-full bg-[var(--cyber-dark)] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[var(--cyber-primary)] focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">LinkedIn</label>
                                    <input
                                        type="text"
                                        value={profile.linkedin}
                                        onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                                        className="w-full bg-[var(--cyber-dark)] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[var(--cyber-primary)] focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Experience</label>
                                    <input
                                        type="text"
                                        value={profile.experience}
                                        onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                                        placeholder="3+"
                                        className="w-full bg-[var(--cyber-dark)] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[var(--cyber-primary)] focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Project Count</label>
                                    <input
                                        type="text"
                                        value={profile.projectCount}
                                        onChange={(e) => setProfile({ ...profile, projectCount: e.target.value })}
                                        placeholder="20+"
                                        className="w-full bg-[var(--cyber-dark)] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[var(--cyber-primary)] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Images Tab */}
                    {activeTab === 'images' && (
                        <div className="space-y-8">
                            <h2 className="text-xl font-bold text-[var(--cyber-primary)] font-mono mb-4">
                                {'>'} Images & Photos
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Hero Section Photo */}
                                <div className="bg-[var(--cyber-dark)] rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-lg font-bold text-[var(--cyber-secondary)] mb-4 font-mono">
                                        Hero Section Photo
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4">
                                        This photo appears in the profile card on the Hero section.
                                    </p>

                                    {/* Preview */}
                                    <div className="w-full aspect-square bg-[var(--cyber-darker)] rounded-xl border border-gray-600 overflow-hidden mb-4 flex items-center justify-center">
                                        {heroPhoto ? (
                                            <img
                                                src={heroPhoto}
                                                alt="Hero Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <svg className="w-16 h-16 mx-auto text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                                                </svg>
                                                <p className="text-gray-500 text-sm mt-2">No image</p>
                                            </div>
                                        )}
                                    </div>

                                    <label className="block text-sm text-gray-400 mb-2">Image URL</label>
                                    <input
                                        type="text"
                                        value={heroPhoto}
                                        onChange={(e) => setHeroPhoto(e.target.value)}
                                        placeholder="https://example.com/your-photo.jpg"
                                        className="w-full bg-[var(--cyber-darker)] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[var(--cyber-primary)] focus:outline-none transition-colors placeholder-gray-600"
                                    />
                                </div>

                                {/* Profile Section Photo */}
                                <div className="bg-[var(--cyber-dark)] rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-lg font-bold text-[var(--cyber-secondary)] mb-4 font-mono">
                                        Profile ID Card Photo
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4">
                                        This photo appears in the draggable ID card on the Profile section.
                                    </p>

                                    {/* Preview */}
                                    <div className="w-full aspect-square bg-[var(--cyber-darker)] rounded-xl border border-gray-600 overflow-hidden mb-4 flex items-center justify-center">
                                        {profilePhoto ? (
                                            <img
                                                src={profilePhoto}
                                                alt="Profile Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <svg className="w-16 h-16 mx-auto text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                                <p className="text-gray-500 text-sm mt-2">No image</p>
                                            </div>
                                        )}
                                    </div>

                                    <label className="block text-sm text-gray-400 mb-2">Image URL</label>
                                    <input
                                        type="text"
                                        value={profilePhoto}
                                        onChange={(e) => setProfilePhoto(e.target.value)}
                                        placeholder="https://example.com/your-photo.jpg"
                                        className="w-full bg-[var(--cyber-darker)] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[var(--cyber-primary)] focus:outline-none transition-colors placeholder-gray-600"
                                    />
                                </div>
                            </div>

                            {/* Tips */}
                            <div className="bg-[var(--cyber-primary)]/5 border border-[var(--cyber-primary)]/20 rounded-lg p-4">
                                <p className="text-[var(--cyber-primary)] font-mono text-sm mb-2">💡 Tips:</p>
                                <ul className="text-gray-400 text-sm space-y-1">
                                    <li>• Use square images (1:1 ratio) for best results</li>
                                    <li>• Recommended size: 400x400 pixels or larger</li>
                                </ul>
                            </div>

                            {/* Image Hosting Options */}
                            <div className="bg-[var(--cyber-secondary)]/5 border border-[var(--cyber-secondary)]/20 rounded-lg p-4 mt-4">
                                <p className="text-[var(--cyber-secondary)] font-mono text-sm mb-3">🔗 Cara Upload Gambar:</p>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-2">
                                        <p className="text-green-400 font-semibold">✅ Yang Bisa Digunakan:</p>
                                        <ul className="text-gray-400 space-y-1">
                                            <li>• <a href="https://imgur.com" target="_blank" rel="noopener" className="text-[var(--cyber-primary)] hover:underline">Imgur</a> - Upload → Copy "Direct Link"</li>
                                            <li>• <a href="https://imgbb.com" target="_blank" rel="noopener" className="text-[var(--cyber-primary)] hover:underline">ImgBB</a> - Upload → Copy URL</li>
                                            <li>• <a href="https://cloudinary.com" target="_blank" rel="noopener" className="text-[var(--cyber-primary)] hover:underline">Cloudinary</a> - Gratis, profesional</li>
                                            <li>• GitHub - Upload ke repo, copy raw URL</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-red-400 font-semibold">❌ Yang TIDAK Bisa:</p>
                                        <ul className="text-gray-400 space-y-1">
                                            <li>• Google Drive sharing link</li>
                                            <li>• OneDrive sharing link</li>
                                            <li>• Link yang butuh login</li>
                                        </ul>
                                        <p className="text-yellow-400 text-xs mt-2">⚠️ Link sharing tidak mengarah langsung ke file gambar</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Skills Tab */}
                    {activeTab === 'skills' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-[var(--cyber-primary)] font-mono">
                                    {'>'} Skills
                                </h2>
                                <button
                                    onClick={() => setSkills([...skills, { name: 'New Skill', icon: '🔧', color: '#00d4ff' }])}
                                    className="px-4 py-2 bg-[var(--cyber-primary)] text-black rounded-lg font-mono text-sm hover:opacity-90 transition-opacity"
                                >
                                    + Add Skill
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {skills.map((skill, index) => (
                                    <div key={index} className="bg-[var(--cyber-dark)] rounded-lg p-4 border border-gray-700">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-2xl">{skill.icon}</span>
                                            <button
                                                onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                                                className="text-red-400 hover:text-red-300 text-sm"
                                            >
                                                ✕ Remove
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            value={skill.name}
                                            onChange={(e) => {
                                                const newSkills = [...skills];
                                                newSkills[index].name = e.target.value;
                                                setSkills(newSkills);
                                            }}
                                            placeholder="Skill name"
                                            className="w-full bg-[var(--cyber-darker)] border border-gray-700 rounded px-3 py-2 text-white text-sm mb-2 focus:border-[var(--cyber-primary)] focus:outline-none"
                                        />
                                        <input
                                            type="text"
                                            value={skill.icon}
                                            onChange={(e) => {
                                                const newSkills = [...skills];
                                                newSkills[index].icon = e.target.value;
                                                setSkills(newSkills);
                                            }}
                                            placeholder="Icon (emoji)"
                                            className="w-full bg-[var(--cyber-darker)] border border-gray-700 rounded px-3 py-2 text-white text-sm mb-2 focus:border-[var(--cyber-primary)] focus:outline-none"
                                        />
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                value={skill.color}
                                                onChange={(e) => {
                                                    const newSkills = [...skills];
                                                    newSkills[index].color = e.target.value;
                                                    setSkills(newSkills);
                                                }}
                                                className="w-10 h-8 rounded cursor-pointer"
                                            />
                                            <input
                                                type="text"
                                                value={skill.color}
                                                onChange={(e) => {
                                                    const newSkills = [...skills];
                                                    newSkills[index].color = e.target.value;
                                                    setSkills(newSkills);
                                                }}
                                                className="flex-1 bg-[var(--cyber-darker)] border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-[var(--cyber-primary)] focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects Tab */}
                    {activeTab === 'projects' && (
                        <div className="space-y-6">
                            {/* Row 1 */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-[var(--cyber-primary)] font-mono">
                                        {'>'} Projects Row 1 (→ Right)
                                    </h2>
                                    <button
                                        onClick={() => setProjectsRow1([...projectsRow1, {
                                            id: Date.now(),
                                            title: 'New Project',
                                            description: 'Project description',
                                            tech: ['React'],
                                            color: '#00d4ff'
                                        }])}
                                        className="px-4 py-2 bg-[var(--cyber-primary)] text-black rounded-lg font-mono text-sm hover:opacity-90 transition-opacity"
                                    >
                                        + Add Project
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {projectsRow1.map((project, index) => (
                                        <div key={project.id} className="bg-[var(--cyber-dark)] rounded-lg p-4 border border-gray-700">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="w-4 h-4 rounded" style={{ background: project.color }}></div>
                                                <button
                                                    onClick={() => setProjectsRow1(projectsRow1.filter((_, i) => i !== index))}
                                                    className="text-red-400 hover:text-red-300 text-sm"
                                                >
                                                    ✕ Remove
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                value={project.title}
                                                onChange={(e) => {
                                                    const newProjects = [...projectsRow1];
                                                    newProjects[index].title = e.target.value;
                                                    setProjectsRow1(newProjects);
                                                }}
                                                placeholder="Project title"
                                                className="w-full bg-[var(--cyber-darker)] border border-gray-700 rounded px-3 py-2 text-white text-sm mb-2 focus:border-[var(--cyber-primary)] focus:outline-none"
                                            />
                                            <input
                                                type="text"
                                                value={project.description}
                                                onChange={(e) => {
                                                    const newProjects = [...projectsRow1];
                                                    newProjects[index].description = e.target.value;
                                                    setProjectsRow1(newProjects);
                                                }}
                                                placeholder="Description"
                                                className="w-full bg-[var(--cyber-darker)] border border-gray-700 rounded px-3 py-2 text-white text-sm mb-2 focus:border-[var(--cyber-primary)] focus:outline-none"
                                            />
                                            <input
                                                type="text"
                                                value={project.tech.join(', ')}
                                                onChange={(e) => {
                                                    const newProjects = [...projectsRow1];
                                                    newProjects[index].tech = e.target.value.split(',').map(t => t.trim());
                                                    setProjectsRow1(newProjects);
                                                }}
                                                placeholder="Tech (comma separated)"
                                                className="w-full bg-[var(--cyber-darker)] border border-gray-700 rounded px-3 py-2 text-white text-sm mb-2 focus:border-[var(--cyber-primary)] focus:outline-none"
                                            />
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={project.color}
                                                    onChange={(e) => {
                                                        const newProjects = [...projectsRow1];
                                                        newProjects[index].color = e.target.value;
                                                        setProjectsRow1(newProjects);
                                                    }}
                                                    className="w-10 h-8 rounded cursor-pointer"
                                                />
                                                <input
                                                    type="text"
                                                    value={project.color}
                                                    onChange={(e) => {
                                                        const newProjects = [...projectsRow1];
                                                        newProjects[index].color = e.target.value;
                                                        setProjectsRow1(newProjects);
                                                    }}
                                                    className="flex-1 bg-[var(--cyber-darker)] border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-[var(--cyber-primary)] focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-[var(--cyber-secondary)] font-mono">
                                        {'>'} Projects Row 2 (← Left)
                                    </h2>
                                    <button
                                        onClick={() => setProjectsRow2([...projectsRow2, {
                                            id: Date.now(),
                                            title: 'New Project',
                                            description: 'Project description',
                                            tech: ['React'],
                                            color: '#a855f7'
                                        }])}
                                        className="px-4 py-2 bg-[var(--cyber-secondary)] text-black rounded-lg font-mono text-sm hover:opacity-90 transition-opacity"
                                    >
                                        + Add Project
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {projectsRow2.map((project, index) => (
                                        <div key={project.id} className="bg-[var(--cyber-dark)] rounded-lg p-4 border border-gray-700">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="w-4 h-4 rounded" style={{ background: project.color }}></div>
                                                <button
                                                    onClick={() => setProjectsRow2(projectsRow2.filter((_, i) => i !== index))}
                                                    className="text-red-400 hover:text-red-300 text-sm"
                                                >
                                                    ✕ Remove
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                value={project.title}
                                                onChange={(e) => {
                                                    const newProjects = [...projectsRow2];
                                                    newProjects[index].title = e.target.value;
                                                    setProjectsRow2(newProjects);
                                                }}
                                                placeholder="Project title"
                                                className="w-full bg-[var(--cyber-darker)] border border-gray-700 rounded px-3 py-2 text-white text-sm mb-2 focus:border-[var(--cyber-primary)] focus:outline-none"
                                            />
                                            <input
                                                type="text"
                                                value={project.description}
                                                onChange={(e) => {
                                                    const newProjects = [...projectsRow2];
                                                    newProjects[index].description = e.target.value;
                                                    setProjectsRow2(newProjects);
                                                }}
                                                placeholder="Description"
                                                className="w-full bg-[var(--cyber-darker)] border border-gray-700 rounded px-3 py-2 text-white text-sm mb-2 focus:border-[var(--cyber-primary)] focus:outline-none"
                                            />
                                            <input
                                                type="text"
                                                value={project.tech.join(', ')}
                                                onChange={(e) => {
                                                    const newProjects = [...projectsRow2];
                                                    newProjects[index].tech = e.target.value.split(',').map(t => t.trim());
                                                    setProjectsRow2(newProjects);
                                                }}
                                                placeholder="Tech (comma separated)"
                                                className="w-full bg-[var(--cyber-darker)] border border-gray-700 rounded px-3 py-2 text-white text-sm mb-2 focus:border-[var(--cyber-primary)] focus:outline-none"
                                            />
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={project.color}
                                                    onChange={(e) => {
                                                        const newProjects = [...projectsRow2];
                                                        newProjects[index].color = e.target.value;
                                                        setProjectsRow2(newProjects);
                                                    }}
                                                    className="w-10 h-8 rounded cursor-pointer"
                                                />
                                                <input
                                                    type="text"
                                                    value={project.color}
                                                    onChange={(e) => {
                                                        const newProjects = [...projectsRow2];
                                                        newProjects[index].color = e.target.value;
                                                        setProjectsRow2(newProjects);
                                                    }}
                                                    className="flex-1 bg-[var(--cyber-darker)] border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-[var(--cyber-primary)] focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Export Code Section */}
                <div className="mt-6 bg-[var(--cyber-darker)] rounded-xl border border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-[var(--cyber-primary)] font-mono">
                            {'>'} Export Configuration
                        </h2>
                        <button
                            onClick={() => setShowCode(!showCode)}
                            className="px-4 py-2 bg-[var(--cyber-secondary)] text-black rounded-lg font-mono text-sm hover:opacity-90 transition-opacity"
                        >
                            {showCode ? 'Hide Code' : 'Generate Code'}
                        </button>
                    </div>

                    {showCode && (
                        <div className="relative">
                            <button
                                onClick={() => navigator.clipboard.writeText(generateCode())}
                                className="absolute top-2 right-2 px-3 py-1 bg-[var(--cyber-primary)] text-black rounded text-xs font-mono hover:opacity-90"
                            >
                                Copy
                            </button>
                            <pre className="bg-[var(--cyber-dark)] rounded-lg p-4 text-sm text-gray-300 overflow-x-auto max-h-96 overflow-y-auto">
                                <code>{generateCode()}</code>
                            </pre>
                        </div>
                    )}

                    <p className="text-gray-500 text-sm mt-4 font-mono">
            // Copy the generated code and paste it into src/data/siteConfig.ts to apply changes
                    </p>
                </div>
            </div>
        </main>
    );
}
