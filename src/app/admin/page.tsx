'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { siteConfig, Project } from '@/data/siteConfig';

// ─── Upload helper ───
async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data.url;
}

// ─── Reusable Components ───
function Field({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
    return (
        <div>
            {label && <label className="block text-xs text-gray-400 mb-1.5 font-mono uppercase tracking-wider">{label}</label>}
            <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
                className="w-full bg-[var(--cyber-dark)] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-[var(--cyber-primary)] focus:outline-none transition-colors placeholder-gray-600" />
        </div>
    );
}

function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
    return (
        <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-mono uppercase tracking-wider">{label}</label>
            <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
                className="w-full bg-[var(--cyber-dark)] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-[var(--cyber-primary)] focus:outline-none transition-colors resize-none" />
        </div>
    );
}

// ─── Image Upload Button ───
function ImageUpload({ currentUrl, onUploaded, label }: { currentUrl: string; onUploaded: (url: string) => void; label: string }) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        setError('');
        try {
            const url = await uploadToCloudinary(file);
            onUploaded(url);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Upload gagal');
        } finally {
            setUploading(false);
            if (fileRef.current) fileRef.current.value = '';
        }
    };

    return (
        <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-mono uppercase tracking-wider">{label}</label>
            <div className="relative w-full h-36 bg-[var(--cyber-darker)] rounded-xl border border-gray-700 overflow-hidden group mb-2">
                {currentUrl ? (
                    <img src={currentUrl} alt="Preview" className="w-full h-full object-cover opacity-80" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
                    </div>
                )}
                {/* Upload overlay */}
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => fileRef.current?.click()}>
                    {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-6 h-6 border-2 border-[var(--cyber-primary)] border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs text-[var(--cyber-primary)] font-mono">Uploading...</span>
                        </div>
                    ) : (
                        <>
                            <svg className="w-8 h-8 text-white/80 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                            <span className="text-xs text-white/80 font-mono">Klik untuk upload</span>
                        </>
                    )}
                </div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            {error && <p className="text-red-400 text-xs font-mono mt-1">⚠ {error}</p>}
            {/* Manual URL input as fallback */}
            <div className="flex gap-2 items-end">
                <div className="flex-1">
                    <input type="text" value={currentUrl} onChange={(e) => onUploaded(e.target.value)} placeholder="atau paste URL manual..."
                        className="w-full bg-[var(--cyber-dark)] border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:border-[var(--cyber-primary)] focus:outline-none transition-colors placeholder-gray-600" />
                </div>
                <button onClick={() => fileRef.current?.click()} disabled={uploading}
                    className="px-3 py-2 bg-[var(--cyber-primary)]/20 border border-[var(--cyber-primary)]/40 rounded-lg text-[var(--cyber-primary)] text-xs font-mono hover:bg-[var(--cyber-primary)]/30 transition-colors disabled:opacity-50 whitespace-nowrap">
                    📁 Upload
                </button>
            </div>
        </div>
    );
}

// ─── Project Card Editor ───
function ProjectEditor({ project, index, onUpdate, onRemove }: {
    project: Project; index: number; onUpdate: (index: number, updated: Project) => void; onRemove: (index: number) => void;
}) {
    const update = (partial: Partial<Project>) => onUpdate(index, { ...project, ...partial });
    return (
        <div className="bg-[var(--cyber-dark)] rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-4 space-y-3">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ background: project.color }}></div>
                        <span className="text-white font-mono text-sm font-bold">{project.title || 'Untitled'}</span>
                    </div>
                    <button onClick={() => onRemove(index)} className="text-red-400 hover:text-red-300 text-xs font-mono px-2 py-1 rounded hover:bg-red-500/10 transition-colors">✕ Hapus</button>
                </div>

                <ImageUpload label="Gambar Project" currentUrl={project.image} onUploaded={(url) => update({ image: url })} />
                <Field label="Judul" value={project.title} onChange={(v) => update({ title: v })} placeholder="Nama project" />
                <Field label="Deskripsi Singkat" value={project.description} onChange={(v) => update({ description: v })} placeholder="Deskripsi singkat" />
                <TextArea label="Detail Deskripsi" value={project.detailDescription} onChange={(v) => update({ detailDescription: v })} />
                <Field label="Link Website" value={project.url || ''} onChange={(v) => update({ url: v || undefined })} placeholder="https://project.vercel.app" />
                <Field label="Tech Stack (pisah koma)" value={project.tech.join(', ')} onChange={(v) => update({ tech: v.split(',').map(t => t.trim()).filter(Boolean) })} placeholder="Next.js, React, Tailwind CSS" />
                <div className="flex items-center gap-2">
                    <input type="color" value={project.color} onChange={(e) => update({ color: e.target.value })} className="w-10 h-8 rounded cursor-pointer border-0" />
                    <div className="flex-1"><Field label="" value={project.color} onChange={(v) => update({ color: v })} placeholder="#00d4ff" /></div>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════
// MAIN ADMIN PAGE
// ═══════════════════════════════════════
export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'images' | 'skills' | 'library' | 'showcase'>('library');
    const [profile, setProfile] = useState(siteConfig.profile);
    const [skills, setSkills] = useState(siteConfig.skills);
    const [projects, setProjects] = useState(siteConfig.projects);
    const [showCode, setShowCode] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [heroPhoto, setHeroPhoto] = useState(siteConfig.heroPhoto || '');
    const [profilePhoto, setProfilePhoto] = useState(profile.photo || '');

    const updateProject = (index: number, updated: Project) => {
        const newProjects = [...projects];
        newProjects[index] = updated;
        setProjects(newProjects);
    };

    const removeProject = (index: number) => {
        if (confirm('Hapus project ini?')) setProjects(projects.filter((_, i) => i !== index));
    };

    const addProject = () => {
        setProjects([...projects, { id: Date.now(), title: 'New Project', description: 'Project description', detailDescription: 'Detailed description here...', tech: ['Next.js'], color: '#00d4ff', image: '', url: '' }]);
    };

    const generateCode = () => {
        const updatedProfile = { ...profile, photo: profilePhoto };
        return `// Portfolio Data Configuration\n// Edit this file to customize your portfolio content\n\nexport interface Skill {\n    name: string;\n    icon: string;\n    color: string;\n}\n\nexport interface Project {\n    id: number;\n    title: string;\n    description: string;\n    detailDescription: string;\n    tech: string[];\n    color: string;\n    image: string;\n    url?: string;\n}\n\nexport interface ProfileData {\n    name: string;\n    username: string;\n    title: string;\n    tagline: string;\n    bio: string;\n    email: string;\n    location: string;\n    github: string;\n    linkedin: string;\n    whatsapp: string;\n    photo?: string;\n    experience: string;\n    projectCount: string;\n    clientCount: string;\n}\n\nexport interface SiteConfig {\n    profile: ProfileData;\n    heroPhoto: string;\n    skills: Skill[];\n    projects: Project[];\n}\n\nexport const siteConfig: SiteConfig = {\n    profile: ${JSON.stringify(updatedProfile, null, 4)},\n\n    heroPhoto: "${heroPhoto}",\n\n    skills: ${JSON.stringify(skills, null, 4)},\n\n    projects: ${JSON.stringify(projects, null, 4)},\n};\n`;
    };

    const copyCode = async () => {
        await navigator.clipboard.writeText(generateCode());
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const tabs = [
        { id: 'library', label: 'Library', icon: '📚' },
        { id: 'showcase', label: 'Showcase', icon: '🖼️' },
        { id: 'profile', label: 'Profile', icon: '👤' },
        { id: 'images', label: 'Images', icon: '📸' },
        { id: 'skills', label: 'Skills', icon: '⚡' },
    ];

    return (
        <main className="min-h-screen bg-[var(--cyber-dark)] p-4 md:p-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[var(--cyber-primary)] mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>{'<'} ADMIN PANEL {'/>'}</h1>
                        <p className="text-gray-500 font-mono text-xs">// Upload gambar langsung ke Cloudinary ☁️</p>
                    </div>
                    <a href="/" className="px-4 py-2 bg-[var(--cyber-primary)]/10 border border-[var(--cyber-primary)] rounded-lg text-[var(--cyber-primary)] hover:bg-[var(--cyber-primary)]/20 transition-colors font-mono text-sm">← Back to Site</a>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto mb-6">
                <div className="flex gap-2 flex-wrap">
                    {tabs.map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`px-4 py-3 rounded-lg font-mono text-sm transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[var(--cyber-primary)] text-black font-bold' : 'bg-[var(--cyber-darker)] text-gray-400 hover:text-[var(--cyber-primary)] border border-gray-700'}`}>
                            <span>{tab.icon}</span><span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--cyber-darker)] rounded-xl border border-gray-700 p-6">

                    {/* ═══ LIBRARY TAB ═══ */}
                    {activeTab === 'library' && (
                        <div>
                            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                                <div>
                                    <h2 className="text-xl font-bold text-[var(--cyber-secondary)] font-mono">{'>'} Section {'{'} LIBRARY {'}'}</h2>
                                    <p className="text-gray-500 text-xs font-mono mt-1">Upload gambar, edit judul, deskripsi, link & tech stack</p>
                                </div>
                                <button onClick={addProject} className="px-4 py-2 bg-[var(--cyber-primary)] text-black rounded-lg font-mono text-sm font-bold hover:opacity-90">+ Tambah Project</button>
                            </div>
                            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 mb-6">
                                <p className="text-green-400 font-mono text-xs">☁️ Upload gambar langsung ke Cloudinary — hover gambar lalu klik, atau gunakan tombol "Upload"</p>
                            </div>
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {projects.map((project, index) => (
                                    <ProjectEditor key={project.id} project={project} index={index} onUpdate={updateProject} onRemove={removeProject} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ═══ SHOWCASE TAB ═══ */}
                    {activeTab === 'showcase' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-[var(--cyber-secondary)] font-mono">{'>'} Contoh Web Pro & Bisnis</h2>
                                <p className="text-gray-500 text-xs font-mono mt-1">Preview & edit project fan-card carousel</p>
                            </div>
                            <div className="bg-[var(--cyber-primary)]/5 border border-[var(--cyber-primary)]/20 rounded-lg p-3 mb-6">
                                <p className="text-[var(--cyber-primary)] font-mono text-xs">💡 Data sama dengan Library. Edit di sini atau di tab Library.</p>
                            </div>

                            {/* Preview Cards */}
                            <div className="bg-[var(--cyber-dark)] rounded-xl p-6 border border-gray-700 mb-6">
                                <h3 className="text-sm text-gray-400 font-mono mb-4 uppercase tracking-wider">Preview</h3>
                                <div className="flex flex-wrap gap-4">
                                    {projects.map((project, i) => (
                                        <div key={project.id} className="relative w-32 aspect-[3/4] rounded-xl overflow-hidden border border-gray-700" style={{ transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)` }}>
                                            {project.image ? <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-70" /> : <div className="w-full h-full bg-[var(--cyber-darker)] flex items-center justify-center text-gray-600 text-xl">🖼️</div>}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: project.color }}></div>
                                            <div className="absolute bottom-0 left-0 right-0 p-2">
                                                <p className="text-[10px] font-bold text-white truncate" style={{ fontFamily: 'Orbitron, sans-serif' }}>{project.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Edit */}
                            <div className="space-y-4">
                                {projects.map((project, index) => (
                                    <div key={project.id} className="bg-[var(--cyber-dark)] rounded-lg p-4 border border-gray-700">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-4 h-4 rounded-full" style={{ background: project.color }}></div>
                                            <span className="text-white font-mono text-sm font-bold">{project.title}</span>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            <ImageUpload label="Gambar" currentUrl={project.image} onUploaded={(url) => updateProject(index, { ...project, image: url })} />
                                            <div className="space-y-3">
                                                <Field label="Judul" value={project.title} onChange={(v) => updateProject(index, { ...project, title: v })} />
                                                <Field label="Link Website" value={project.url || ''} onChange={(v) => updateProject(index, { ...project, url: v || undefined })} placeholder="https://..." />
                                                <Field label="Deskripsi" value={project.description} onChange={(v) => updateProject(index, { ...project, description: v })} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ═══ PROFILE TAB ═══ */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-[var(--cyber-primary)] font-mono">{'>'} Profile Information</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Field label="Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
                                <Field label="Username" value={profile.username} onChange={(v) => setProfile({ ...profile, username: v })} />
                                <Field label="Title" value={profile.title} onChange={(v) => setProfile({ ...profile, title: v })} />
                                <Field label="Email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} type="email" />
                                <Field label="Location" value={profile.location} onChange={(v) => setProfile({ ...profile, location: v })} />
                                <Field label="WhatsApp" value={profile.whatsapp} onChange={(v) => setProfile({ ...profile, whatsapp: v })} />
                                <Field label="GitHub" value={profile.github} onChange={(v) => setProfile({ ...profile, github: v })} />
                                <Field label="LinkedIn" value={profile.linkedin} onChange={(v) => setProfile({ ...profile, linkedin: v })} />
                                <Field label="Experience" value={profile.experience} onChange={(v) => setProfile({ ...profile, experience: v })} />
                                <Field label="Project Count" value={profile.projectCount} onChange={(v) => setProfile({ ...profile, projectCount: v })} />
                                <div className="md:col-span-2"><TextArea label="Bio" value={profile.bio} onChange={(v) => setProfile({ ...profile, bio: v })} rows={4} /></div>
                            </div>
                        </div>
                    )}

                    {/* ═══ IMAGES TAB ═══ */}
                    {activeTab === 'images' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-[var(--cyber-primary)] font-mono">{'>'} Images & Photos</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-[var(--cyber-dark)] rounded-xl p-5 border border-gray-700">
                                    <h3 className="text-base font-bold text-[var(--cyber-secondary)] mb-3 font-mono">Hero Section Photo</h3>
                                    <ImageUpload label="Foto Hero" currentUrl={heroPhoto} onUploaded={setHeroPhoto} />
                                </div>
                                <div className="bg-[var(--cyber-dark)] rounded-xl p-5 border border-gray-700">
                                    <h3 className="text-base font-bold text-[var(--cyber-secondary)] mb-3 font-mono">Profile ID Card Photo</h3>
                                    <ImageUpload label="Foto ID Card" currentUrl={profilePhoto} onUploaded={setProfilePhoto} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ═══ SKILLS TAB ═══ */}
                    {activeTab === 'skills' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-[var(--cyber-primary)] font-mono">{'>'} Skills</h2>
                                <button onClick={() => setSkills([...skills, { name: 'New Skill', icon: '🔧', color: '#00d4ff' }])} className="px-4 py-2 bg-[var(--cyber-primary)] text-black rounded-lg font-mono text-sm font-bold hover:opacity-90">+ Add Skill</button>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {skills.map((skill, index) => (
                                    <div key={index} className="bg-[var(--cyber-dark)] rounded-lg p-4 border border-gray-700">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-2xl">{skill.icon}</span>
                                            <button onClick={() => setSkills(skills.filter((_, i) => i !== index))} className="text-red-400 hover:text-red-300 text-xs font-mono">✕ Remove</button>
                                        </div>
                                        <Field label="Name" value={skill.name} onChange={(v) => { const s = [...skills]; s[index] = { ...s[index], name: v }; setSkills(s); }} />
                                        <div className="mt-2"><Field label="Icon (emoji)" value={skill.icon} onChange={(v) => { const s = [...skills]; s[index] = { ...s[index], icon: v }; setSkills(s); }} /></div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <input type="color" value={skill.color} onChange={(e) => { const s = [...skills]; s[index] = { ...s[index], color: e.target.value }; setSkills(s); }} className="w-10 h-8 rounded cursor-pointer" />
                                            <div className="flex-1"><Field label="" value={skill.color} onChange={(v) => { const s = [...skills]; s[index] = { ...s[index], color: v }; setSkills(s); }} /></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Export Section */}
                <div className="mt-6 bg-[var(--cyber-darker)] rounded-xl border border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-[var(--cyber-primary)] font-mono">{'>'} Export Configuration</h2>
                            <p className="text-gray-500 text-xs font-mono mt-1">Generate → Copy → Paste ke src/data/siteConfig.ts</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setShowCode(!showCode)} className="px-4 py-2 bg-[var(--cyber-secondary)] text-black rounded-lg font-mono text-sm font-bold hover:opacity-90">{showCode ? 'Hide Code' : 'Generate Code'}</button>
                            {showCode && (
                                <button onClick={copyCode} className={`px-4 py-2 rounded-lg font-mono text-sm font-bold transition-all ${copySuccess ? 'bg-green-500 text-white' : 'bg-[var(--cyber-primary)] text-black hover:opacity-90'}`}>{copySuccess ? '✓ Copied!' : 'Copy Code'}</button>
                            )}
                        </div>
                    </div>
                    {showCode && (
                        <pre className="bg-[var(--cyber-dark)] rounded-lg p-4 text-xs text-gray-300 overflow-x-auto max-h-96 overflow-y-auto border border-gray-700"><code>{generateCode()}</code></pre>
                    )}
                </div>
            </div>
        </main>
    );
}
