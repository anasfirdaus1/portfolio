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
    detailDescription: string;
    tech: string[];
    color: string;
    image: string;
    url?: string; // [!] Add live URL when available
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
    heroPhoto: string;
    skills: Skill[];
    projects: Project[];
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
        experience: '9 Bulan',
        projectCount: '10+',
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

    projects: [
        {
            id: 1,
            title: 'TaniLink',
            description: 'Platform marketplace pertanian',
            detailDescription: 'TaniLink adalah platform marketplace digital yang menghubungkan petani langsung dengan pembeli. Dilengkapi fitur manajemen produk, sistem pembayaran terintegrasi, dan dashboard analitik untuk membantu petani memaksimalkan hasil penjualan.',
            tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
            color: '#00d4ff',
            image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
            // url: 'https://tanilink.vercel.app', // [!] Add live URL when available
        },
        {
            id: 2,
            title: 'Web Hukum',
            description: 'Website jasa layanan hukum',
            detailDescription: 'Website profesional untuk firma jasa hukum yang menyediakan informasi layanan konsultasi hukum, profil advokat, artikel hukum, dan sistem booking konsultasi online. Didesain dengan tampilan elegan dan terpercaya.',
            tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
            color: '#a855f7',
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
            // url: 'https://webhukum.vercel.app', // [!] Add live URL when available
        },
        {
            id: 3,
            title: 'Tour & Travel',
            description: 'Platform wisata dan perjalanan',
            detailDescription: 'Platform tour & travel yang menampilkan paket wisata menarik, galeri destinasi, sistem pemesanan online, dan informasi lengkap perjalanan. Dilengkapi dengan UI/UX modern dan responsif untuk pengalaman booking yang mudah.',
            tech: ['Next.js', 'React', 'Tailwind CSS', 'Supabase'],
            color: '#00ff88',
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
            // url: 'https://tour-travel.vercel.app', // [!] Add live URL when available
        },
        {
            id: 4,
            title: 'Travel Umroh',
            description: 'Website travel umroh & haji',
            detailDescription: 'Website travel umroh premium yang menampilkan paket perjalanan umroh dan haji, jadwal keberangkatan, galeri momen jamaah, dan sistem pendaftaran online. Dibangun dengan desain yang elegan dan bernuansa islami.',
            tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
            color: '#ffcc00',
            image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
            // url: 'https://travel-umroh.vercel.app', // [!] Add live URL when available
        },
        {
            id: 5,
            title: 'UMKM Jajanan',
            description: 'Website UMKM jajanan pinggir jalan',
            detailDescription: 'Website katalog digital untuk UMKM jajanan pinggir jalan yang menampilkan menu lengkap, harga, lokasi penjualan, dan sistem pemesanan online. Membantu pelaku UMKM go-digital dengan tampilan menarik dan mudah dikelola.',
            tech: ['Next.js', 'React', 'Tailwind CSS', 'MongoDB'],
            color: '#ff6b6b',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
            // url: 'https://umkm-jajanan.vercel.app', // [!] Add live URL when available
        },
        {
            id: 6,
            title: 'Yayasan',
            description: 'Website yayasan & lembaga sosial',
            detailDescription: 'Website resmi yayasan yang menampilkan profil organisasi, program-program sosial, laporan keuangan transparan, galeri kegiatan, dan sistem donasi online. Dibangun untuk meningkatkan kepercayaan donatur dan memperluas jangkauan sosial.',
            tech: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind CSS'],
            color: '#4ecdc4',
            image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
            // url: 'https://yayasan.vercel.app', // [!] Add live URL when available
        },
    ],
};

