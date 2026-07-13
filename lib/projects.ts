export type ProjectTier = 'major' | 'minor';
export type MockupType = 'phone' | 'laptop' | 'none';

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tier: ProjectTier;
  mockupType: MockupType;
  tech: string[];
  story?: string;
  category?: string;
  developer?: string;
  links?: ProjectLink[];
  features?: string[];
  screenshots?: string[];
  thumbnail?: string;
};

export const projects: Project[] = [
  {
    slug: 'newageit',
    title: 'NewAgeIT',
    tagline: 'High-throughput WebRTC-based telemetry dashboard and cloud brand suite.',
    description:
      'NewAgeIT required a low-latency operations terminal to visualize stream metrics from their edge IoT nodes in real-time. We engineered a static-first Next.js web application utilizing WebRTC channels and rust-wasm decoders to display thousands of active streams with minimal main-thread overhead.',
    tier: 'major',
    mockupType: 'laptop',
    tech: ['Next.js', 'WebRTC', 'Rust WASM', 'Tailwind', 'Docker'],
    category: 'Edge Infrastructure',
    developer: 'Nitya Mehta & Devanshu Verma',
    story:
      'Faced with rising latency and rendering bottlenecks from standard WebSocket pipelines, NewAgeIT commissioned Trevalt to rebuild their stream dashboard. By compiling high-frequency packet decoders to WebAssembly and bypassing the central server using direct WebRTC data channels, we reduced display latency from 240ms to a sub-45ms baseline.',
    links: [
      { label: 'Live Console', href: 'https://newageit.trevalt.com' },
      { label: 'GitHub', href: 'https://github.com/trevalt-studio/newageit-dashboard' },
    ],
    features: [
      'Zero-Copy Frame Processing — stream packets are rendered directly to WebGL contexts via Rust-compiled decoders',
      'Asymmetric Control Console — responsive desktop layouts mapping telemetry nodes in real-time',
      'Dynamic WebRTC Topology — client devices handshake directly with edge nodes to minimize network transit overhead',
      'Stateless Auth & Config — local-first sessions secured with ephemeral ECDSA signatures',
    ],
    thumbnail: '/projects/newageit/logo.png',
  },
  {
    slug: 'geowav',
    title: 'GeoWav',
    tagline: 'Live location sharing, place alerts & emergency updates.',
    description:
      'GeoWav was built to solve a simple problem — knowing that the people you care about are safe, without constant manual check-ins. We engineered a low-power, background-location tracking engine that operates seamlessly within strict Android OS limitations.',
    tier: 'major',
    mockupType: 'phone',
    tech: ['Kotlin', 'Jetpack Compose', 'Clean Architecture', 'Google Maps SDK'],
    category: 'Maps & Navigation',
    developer: 'Aarav Halvadiya',
    story:
      'GeoWav was built to solve a simple problem — knowing that the people you care about are safe, without constant manual check-ins. By employing local coordinate caching and delta-based location updates, we minimized battery drainage on active routes to under 1.8% per hour while maintaining sub-meter resolution.',
    links: [
      { label: 'Get it on Google Play', href: 'https://play.google.com/store/apps/details?id=com.aarav.geowav' },
      { label: 'Developer apps', href: 'https://play.google.com/store/apps/dev?id=6894991724723705286' },
      { label: 'GitHub', href: 'https://github.com/Aarav3325/GeoWav' },
    ],
    features: [
      'Live Location Sharing — real-time location shared with a trusted circle',
      'Smart Arrival & Exit Alerts — automatic notifications when someone reaches or leaves saved places',
      'Emergency Mode — instant live-location sharing to trusted contacts in an emergency',
      'Activity Timeline — full history of arrivals, departures, and past sharing sessions',
      'Route Playback — visual playback of the exact path taken on the map',
      'WhatsApp Alerts — location updates delivered via WhatsApp',
      'Day Replay — a timeline view of daily movement, added in the most recent update',
    ],
    screenshots: [
      '/projects/geowav/02-sharing.png',
      '/projects/geowav/03-emergency.png',
      '/projects/geowav/04-timeline.png',
      '/projects/geowav/05-route.png',
      '/projects/geowav/01-home.png',
    ],
    thumbnail: '/projects/geowav/logo.png',
  },
  {
    slug: 'parkease',
    title: 'ParkEase',
    tagline: 'A Django-based smart parking management system for managing parking slots, booking requests, vehicle scans, complaints, and admin operations in one place.',
    description:
      'Full-stack parking management platform — slot booking, ANPR vehicle scanning, complaints, and subscription payments in one admin system.',
    tier: 'minor',
    mockupType: 'none',
    tech: ['Python', 'Django', 'PostgreSQL', 'OpenCV'],
    category: 'Web Platform',
    developer: 'Nitya Mehta',
    story:
      'ParkEase was developed to solve the logistical and security challenges of modern parking facilities. By integrating a computer-vision based Automatic Number-Plate Recognition (ANPR) system via OpenCV and RapidOCR, the platform automates vehicle scanning, minimizing manual check-ins alongside slot booking, complaint tracking, and Razorpay subscription payments.',
    links: [
      { label: 'Live site', href: 'https://park-ease-gilt.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/Nitya-Mehta/ParkEase' },
    ],
    features: [
      'User registration, login, and profile management',
      'Parking slot browsing and booking',
      'Admin slot management and request approval',
      'Vehicle scan flow with ANPR (automatic number-plate recognition) support, via OpenCV + RapidOCR',
      'Complaint submission and resolution',
      'Pass/subscription flow with Razorpay checkout',
      'Area-based dashboards and admin scoping',
    ],
    thumbnail: '/projects/parkease/logo.svg',
  },
  {
    slug: 'sparkline',
    title: 'Sparkline',
    tagline: 'Construction Machinery Catalog & Inquiry Platform.',
    description:
      'Developed a full-stack web platform for managing construction machinery catalogs, customer inquiries, brochures, and administrative operations. Implemented secure authentication, product management workflows, inquiry handling, and role-based access controls.',
    tier: 'minor',
    mockupType: 'laptop',
    tech: ['React.js', 'Express.js', 'MySQL', 'Node.js'],
    category: 'Full-Stack Development',
    developer: 'Devanshu Verma',
    story:
      'Sparkline required a scalable frontend and backend system with database integration for efficient business operations. We built a robust platform allowing customers to view product catalogs and request quotes, while admins can manage inventory and inquiries via role-based access controls.',
    links: [
      { label: 'Live site', href: 'https://www.sparklineindia.com/' }
    ],
    features: [
      'Product catalog management',
      'Customer inquiry and quotation system',
      'User authentication and password recovery',
      'Admin dashboard and user management',
      'Brochure request handling',
      'Gallery and inventory management',
      'Role-based access control (RBAC)'
    ],
    thumbnail: '/projects/sparkline/logo.png',
  },
  {
    slug: 'notestack',
    title: 'NoteStack',
    tagline: 'Take notes instantly. No login. No clutter. Just pure productivity.',
    description:
      'A fast, fully offline note-taking app with custom categories, pinning, and a clean Material 3 interface.',
    tier: 'minor',
    mockupType: 'phone',
    tech: ['Kotlin', 'Jetpack Compose', 'Room', 'MVVM'],
    category: 'Productivity',
    developer: 'Aarav Halvadiya',
    links: [
      { label: 'Get it on Google Play', href: 'https://play.google.com/store/apps/details?id=com.aarav.notesapp' },
      { label: 'GitHub', href: 'https://github.com/Aarav3325/NoteStack' },
    ],
    features: [
      'Fully offline, local-only storage - no account/login required',
      'Pin important notes and organize with custom categories',
      'Instant search',
      'Light and dark mode',
      'Backup/restore support',
    ],
    thumbnail: '/projects/notestack/logo.png',
    screenshots: [
      '/projects/notestack/01-home.png',
      '/projects/notestack/02-new-note.png',
      '/projects/notestack/03-categories.png',
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
