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
    tagline: 'A full-stack electronics commerce platform with custom build configurators and advanced catalog management.',
    description:
      'A full-stack electronics commerce platform with custom build configurators, advanced catalog management, GST-aware checkout, payment and shipping integrations, wishlists, returns/exchanges, and an admin dashboard for managing the storefront and product ecosystem.',
    tier: 'major',
    mockupType: 'laptop',
    tech: ['React 19', 'Vite', 'Node.js', 'Express 5', 'MySQL', 'Playwright'],
    category: 'E-Commerce Platform',
    developer: 'Nitya Mehta & Devanshu Verma',
    story:
      'This project is a full-stack e-commerce platform built for tech and electronics shopping, with a strong focus on custom system building and guided purchasing. It combines a modern React/Vite frontend with an Express/MySQL backend to support product browsing, intelligent filtering, cart and checkout flows, wishlists, user accounts, order tracking, refund/cancel requests, and a large admin dashboard for managing catalog and storefront content. What makes it stand out is its specialized buying experiences for PC builds, NAS setups, CCTV/security, and network hardware.',
    links: [
      { label: 'Live site', href: '#' },
    ],
    features: [
      'Custom system configurators for PC builds, NAS, and CCTV setups',
      'Advanced catalog with intelligent filtering, combo offers, and condition-based pricing',
      'Modular Express API with independent route groups for payments, compatibility, and returns',
      'GST-aware checkout flow with dynamic shipping quotes and payment verification',
      'End-to-end admin dashboard for storefront merchandising and product ecosystem management',
      'Comprehensive testing suite using Vitest, React Testing Library, and Playwright',
    ],
    thumbnail: '/projects/newageit/logo.png',
    screenshots: [
      '/projects/newageit/01.png',
      '/projects/newageit/02.png',
      '/projects/newageit/03.png',
      '/projects/newageit/04.png',
    ],
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
    tech: ['React 19', 'Vite', 'Express 5', 'MySQL 8', 'Framer Motion'],
    category: 'Full-Stack Development',
    developer: 'Devanshu Verma',
    story:
      'Sparkline is a full-stack catalog and inquiry platform for construction machinery. Built with a React/Vite frontend and an Express/MySQL backend, it supports public catalog browsing, account-aware quote requests, and an extensive admin portal for managing inquiries, inventory, and users with role-based access control.',
    links: [
      { label: 'Live site', href: 'https://www.sparklineindia.com/' }
    ],
    features: [
      'Public catalog browsing for categories, products, brochures, gallery media, and spare-parts inquiry',
      'User authentication with signup, login, password reset, and account-aware quote forms',
      'Admin portal for inquiries, catalog management, gallery management, user management, tasks, and audits',
      'Owner-level controls for admin account creation and destructive catalog actions'
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
