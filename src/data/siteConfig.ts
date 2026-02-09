// Portfolio Data Configuration
// Edit this file to customize your portfolio content

export interface Skill {
    name: string;
    icon: string;
    color: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    color: string;
    image?: string;
}

export interface ProfileData {
    name: string;
    username: string;
    title: string;
    tagline: string;
    bio: string;
    email: string;
    location: string;
    github: string;
    linkedin: string;
    whatsapp: string;
    photo?: string;
    experience: string;
    projectCount: string;
    clientCount: string;
}

export interface SiteConfig {
    profile: ProfileData;
    heroPhoto: string; // Add this line
    skills: Skill[];
    projectsRow1: Project[];
    projectsRow2: Project[];
}

// ===========================================
// EDIT YOUR DATA BELOW
// ===========================================

export const siteConfig: SiteConfig = {
    profile: {
        name: 'Anas Firdaus',
        username: '@anasfirdaus',
        title: 'Fullstack Developer',
        tagline: 'Available for work',
        bio: 'Passionate fullstack developer with expertise in modern web technologies. I love building scalable applications and exploring new technologies to solve complex problems. Always eager to learn and take on new challenges.',
        email: 'anasfirdaus000@gmail.com',
        location: 'Indonesia',
        github: 'github.com/anasfirdaus000',
        linkedin: 'linkedin.com/in/anasfirdaus',
        whatsapp: '087810851738',
        photo: 'https://i.imgur.com/4gbM4ra.jpeg', // [!] PASTE YOUR ID CARD PHOTO URL HERE
        experience: '3 Bulan',
        projectCount: '5',
        clientCount: '5',
    },

    heroPhoto: 'https://i.imgur.com/XZ1Hlre.jpeg', // [!] PASTE YOUR HERO SECTION PHOTO URL HERE

    skills: [
        { name: 'Python', icon: '🐍', color: '#3776ab' },
        { name: 'CSS', icon: '🎨', color: '#1572b6' },
        { name: 'HTML', icon: '📄', color: '#e34f26' },
        { name: 'PHP', icon: '🐘', color: '#777bb4' },
        { name: 'React', icon: '⚛️', color: '#61dafb' },
        { name: 'JavaScript', icon: '⚡', color: '#f7df1e' },
    ],

    projectsRow1: [
        {
            id: 1,
            title: 'TaniLink',
            description: 'Agricultural marketplace platform',
            tech: ['React', 'Node.js', 'PostgreSQL'],
            color: '#00d4ff',
        },
        {
            id: 2,
            title: 'E-Commerce Pro',
            description: 'Modern e-commerce solution',
            tech: ['Next.js', 'Tailwind', 'Stripe'],
            color: '#a855f7',
        },
        {
            id: 3,
            title: 'Task Manager',
            description: 'Productivity application',
            tech: ['React', 'Firebase', 'Material UI'],
            color: '#c084fc',
        },
        {
            id: 4,
            title: 'Weather App',
            description: 'Real-time weather dashboard',
            tech: ['Vue.js', 'OpenWeather API'],
            color: '#60a5fa',
        },
        {
            id: 5,
            title: 'Portfolio v2',
            description: 'Personal portfolio website',
            tech: ['Next.js', 'Three.js', 'Framer'],
            color: '#00d4ff',
        },
        {
            id: 6,
            title: 'Chat Application',
            description: 'Real-time messaging app',
            tech: ['Socket.io', 'React', 'MongoDB'],
            color: '#a855f7',
        },
    ],

    projectsRow2: [
        {
            id: 7,
            title: 'Blog Platform',
            description: 'Content management system',
            tech: ['PHP', 'Laravel', 'MySQL'],
            color: '#c084fc',
        },
        {
            id: 8,
            title: 'Inventory System',
            description: 'Stock management tool',
            tech: ['Python', 'Django', 'PostgreSQL'],
            color: '#60a5fa',
        },
        {
            id: 9,
            title: 'Music Player',
            description: 'Web-based audio player',
            tech: ['JavaScript', 'Web Audio API'],
            color: '#00d4ff',
        },
        {
            id: 10,
            title: 'Recipe Finder',
            description: 'Food recipe application',
            tech: ['React', 'Spoonacular API'],
            color: '#a855f7',
        },
        {
            id: 11,
            title: 'Fitness Tracker',
            description: 'Health monitoring app',
            tech: ['React Native', 'Firebase'],
            color: '#c084fc',
        },
        {
            id: 12,
            title: 'Budget Planner',
            description: 'Personal finance manager',
            tech: ['Vue.js', 'Chart.js', 'Supabase'],
            color: '#60a5fa',
        },
    ],
};
