'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import type { Founder } from '@/lib/founders';

const FRONT = '#131211';
const FRONT_TEXT = '#f3f3f2';
const BACK = '#181716';
const BACK_TEXT = '#f3f3f2';
const ACCENT = '#ff5500';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function iconSvg(kind: 'linkedin' | 'github') {
  if (kind === 'linkedin') {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="${BACK_TEXT}" stroke-width="1.5"/>
      <path d="M8 10.5V18" stroke="${BACK_TEXT}" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M8 7.2V7.3" stroke="${BACK_TEXT}" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M11.5 18V13.7c0-1.8 1.1-3 2.7-3s2.5 1 2.5 2.8V18" stroke="${BACK_TEXT}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 19c-3 1-3-1.5-4-2" stroke="${BACK_TEXT}" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M15 19v-3c0-.9.3-1.7.8-2.4" stroke="${BACK_TEXT}" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M12 3.5a8.5 8.5 0 0 0-2.6 16.6c.4.1.6-.2.6-.5v-1.7c-2.4.5-2.9-1-2.9-1-.4-1-.9-1.3-.9-1.3-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .5-1.2-1.9-.2-3.9-1-3.9-4.2 0-.9.3-1.7.8-2.4-.1-.2-.4-1.2.1-2.4 0 0 .7-.2 2.4.9a8.1 8.1 0 0 1 4.4 0c1.7-1.1 2.4-.9 2.4-.9.5 1.2.2 2.2.1 2.4.5.7.8 1.5.8 2.4 0 3.2-2 4-3.9 4.2.3.3.6.8.6 1.6v2.4c0 .3.2.6.6.5A8.5 8.5 0 0 0 12 3.5Z" stroke="${BACK_TEXT}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function founderFirstLast(name: string) {
  return name.split(' ').filter(Boolean);
}

function nityaFrontSvg(founder: Founder) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg width="1200" height="685" viewBox="0 0 1200 685" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="685" rx="14" fill="#001246"/>
      
      <!-- Top Left Label -->
      <text x="68" y="90" fill="#f7fbfd" font-family="System-ui, -apple-system, sans-serif" font-size="36" font-weight="500">Devloper.</text>
      
      <!-- Giant Display Name -->
      <text x="330" y="295" fill="#f7fbfd" font-family="Fraunces, Georgia, serif" font-size="180" font-weight="900" letter-spacing="-5">NITYA</text>
      <text x="180" y="535" fill="#f7fbfd" font-family="Fraunces, Georgia, serif" font-size="180" font-weight="900" letter-spacing="-5">MEHTA</text>
      
      <!-- Bottom visual elements -->
      <rect x="68" y="600" width="36" height="36" fill="#f7fbfd"/>
      <line x1="168" y1="618" x2="1132" y2="618" stroke="#f7fbfd" stroke-width="4"/>
    </svg>
  `)}`;
}

function nityaBackSvg(founder: Founder) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg width="1200" height="685" viewBox="0 0 1200 685" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="685" rx="14" fill="#f7fbfd"/>
      
      <!-- Top Left Label -->
      <text x="68" y="90" fill="#001246" font-family="System-ui, -apple-system, sans-serif" font-size="36" font-weight="500">Developer</text>
      
      <!-- Display Name -->
      <text x="68" y="290" fill="#001246" font-family="Fraunces, Georgia, serif" font-size="144" font-weight="900" letter-spacing="-4">NITYA</text>
      <text x="68" y="470" fill="#001246" font-family="Fraunces, Georgia, serif" font-size="144" font-weight="900" letter-spacing="-4">MEHTA</text>
      
      <!-- Divider Line -->
      <line x1="700" y1="76" x2="700" y2="608" stroke="#001246" stroke-width="4"/>
      
      <!-- LinkedIn Icon & Handle -->
      <g transform="translate(68, 595)">
        <rect x="0" y="0" width="48" height="48" rx="6" fill="#001246"/>
        <text x="24" y="33" fill="#f7fbfd" font-family="System-ui, -apple-system, sans-serif" font-weight="900" font-size="28" text-anchor="middle">in</text>
        <text x="68" y="34" fill="#001246" font-family="System-ui, -apple-system, sans-serif" font-size="26" font-weight="700">nityamehta</text>
      </g>
      
      <!-- GitHub Icon & Handle -->
      <g transform="translate(355, 595)">
        <circle cx="24" cy="24" r="22" fill="#001246"/>
        <path d="M24 8a16 16 0 00-5.1 31.2c.8.1 1.1-.3 1.1-.8v-2.8c-4.4.9-5.4-2.1-5.4-2.1-.7-1.8-1.8-2.3-1.8-2.3-1.4-1 .1-1 .1-1 1.6.1 2.4 1.6 2.4 1.6 1.4 2.4 3.7 1.7 4.6 1.3.1-1 .6-1.7 1-2.1-3.5-.4-7.2-1.8-7.2-7.9 0-1.7.6-3.2 1.6-4.3-.2-.4-.7-2 .2-4.2 0 0 1.3-.4 4.4 1.6a15.3 15.3 0 018 0c3.1-2 4.4-1.6 4.4-1.6.9 2.2.4 3.8.2 4.2 1 1.1 1.6 2.6 1.6 4.3 0 6.1-3.7 7.5-7.2 7.9.6.5 1.1 1.5 1.1 3v4.5c0 .5.3.9 1.1.8A16 16 0 0024 8z" fill="#f7fbfd"/>
        <text x="60" y="34" fill="#001246" font-family="System-ui, -apple-system, sans-serif" font-size="26" font-weight="700">Nitya-Mehta</text>
      </g>
      
      <!-- Contact Details -->
      <text x="1132" y="535" fill="#001246" font-family="System-ui, -apple-system, sans-serif" font-size="28" font-weight="700" text-anchor="end">nityachintan@gmail.com</text>
      <text x="1132" y="595" fill="#001246" font-family="System-ui, -apple-system, sans-serif" font-size="28" font-weight="700" text-anchor="end">medium.com/@nityachintan</text>
    </svg>
  `)}`;
}

function frontSvg(founder: Founder) {
  if (founder.name.includes('Nitya')) {
    return nityaFrontSvg(founder);
  }
  const [first = '', last = ''] = founderFirstLast(founder.name);
  const codeId = `TRV-${first.substring(0, 3).toUpperCase()}-09`;
  const loc = founder.name.includes('Nitya') ? '19.0760 N, 72.8777 E' : founder.name.includes('Aarav') ? '23.0225 N, 72.5714 E' : '28.6139 N, 77.2090 E';
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg width="1200" height="685" viewBox="0 0 1200 685" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="685" rx="14" fill="${FRONT}"/>
      
      <!-- Layout grids -->
      <line x1="200" y1="0" x2="200" y2="685" stroke="${FRONT_TEXT}" stroke-opacity="0.04" stroke-width="1"/>
      <line x1="400" y1="0" x2="400" y2="685" stroke="${FRONT_TEXT}" stroke-opacity="0.04" stroke-width="1"/>
      <line x1="600" y1="0" x2="600" y2="685" stroke="${FRONT_TEXT}" stroke-opacity="0.04" stroke-width="1"/>
      <line x1="800" y1="0" x2="800" y2="685" stroke="${FRONT_TEXT}" stroke-opacity="0.04" stroke-width="1"/>
      <line x1="1000" y1="0" x2="1000" y2="685" stroke="${FRONT_TEXT}" stroke-opacity="0.04" stroke-width="1"/>
      <line x1="0" y1="150" x2="1200" y2="150" stroke="${FRONT_TEXT}" stroke-opacity="0.04" stroke-width="1"/>
      <line x1="0" y1="300" x2="1200" y2="300" stroke="${FRONT_TEXT}" stroke-opacity="0.04" stroke-width="1"/>
      <line x1="0" y1="450" x2="1200" y2="450" stroke="${FRONT_TEXT}" stroke-opacity="0.04" stroke-width="1"/>
      <line x1="0" y1="600" x2="1200" y2="600" stroke="${FRONT_TEXT}" stroke-opacity="0.04" stroke-width="1"/>

      <!-- Corner Crosshairs -->
      <path d="M30 40 H50 M40 30 V50" stroke="${FRONT_TEXT}" stroke-opacity="0.25" stroke-width="1.5"/>
      <path d="M1150 40 H1170 M1160 30 V50" stroke="${FRONT_TEXT}" stroke-opacity="0.25" stroke-width="1.5"/>
      <path d="M30 645 H50 M40 635 V655" stroke="${FRONT_TEXT}" stroke-opacity="0.25" stroke-width="1.5"/>
      <path d="M1150 645 H1170 M1160 635 V655" stroke="${FRONT_TEXT}" stroke-opacity="0.25" stroke-width="1.5"/>

      <!-- Text elements -->
      <text x="72" y="96" fill="${ACCENT}" font-family="JetBrains Mono, monospace" font-size="20" font-weight="700" letter-spacing="3">${escapeXml(founder.role.toUpperCase())}</text>
      
      <!-- Tech specs sidebars -->
      <text x="1128" y="96" fill="${FRONT_TEXT}" fill-opacity="0.4" font-family="JetBrains Mono, monospace" font-size="16" text-anchor="end" letter-spacing="1">ID: ${codeId}</text>
      <text x="1128" y="126" fill="${FRONT_TEXT}" fill-opacity="0.4" font-family="JetBrains Mono, monospace" font-size="16" text-anchor="end" letter-spacing="1">LOC: ${loc}</text>
      
      <!-- Giant Name -->
      <text x="72" y="275" fill="${FRONT_TEXT}" font-family="Fraunces, Georgia, serif" font-size="136" font-weight="900" letter-spacing="-5">${escapeXml(first)}</text>
      <text x="72" y="415" fill="${FRONT_TEXT}" font-family="Fraunces, Georgia, serif" font-size="136" font-weight="900" letter-spacing="-5">${escapeXml(last)}</text>
      
      <!-- Barcode / chip visual element -->
      <g transform="translate(1000, 545)">
        <rect x="0" y="0" width="8" height="30" fill="${FRONT_TEXT}" fill-opacity="0.6"/>
        <rect x="14" y="0" width="4" height="30" fill="${FRONT_TEXT}" fill-opacity="0.6"/>
        <rect x="24" y="0" width="12" height="30" fill="${FRONT_TEXT}" fill-opacity="0.6"/>
        <rect x="42" y="0" width="6" height="30" fill="${FRONT_TEXT}" fill-opacity="0.6"/>
        <rect x="54" y="0" width="4" height="30" fill="${FRONT_TEXT}" fill-opacity="0.6"/>
        <rect x="64" y="0" width="16" height="30" fill="${ACCENT}"/>
        <rect x="86" y="0" width="6" height="30" fill="${FRONT_TEXT}" fill-opacity="0.6"/>
        <rect x="98" y="0" width="12" height="30" fill="${FRONT_TEXT}" fill-opacity="0.6"/>
        <rect x="116" y="0" width="4" height="30" fill="${FRONT_TEXT}" fill-opacity="0.6"/>
      </g>
      
      <rect x="72" y="555" width="24" height="24" fill="${ACCENT}"/>
      <rect x="110" y="566" width="860" height="2" fill="${FRONT_TEXT}" fill-opacity="0.08"/>
      <text x="110" y="562" fill="${FRONT_TEXT}" fill-opacity="0.25" font-family="JetBrains Mono, monospace" font-size="12" letter-spacing="1">TREVALT COMMUNICATIONS LABS // SYS_INIT: 2026-Q3</text>
    </svg>
  `)}`;
}

function backSvg(founder: Founder) {
  if (founder.name.includes('Nitya')) {
    return nityaBackSvg(founder);
  }
  const [first = '', last = ''] = founderFirstLast(founder.name);
  const codeId = `TRV-${first.substring(0, 3).toUpperCase()}-09`;
  const loc = founder.name.includes('Nitya') ? '19.0760 N, 72.8777 E' : founder.name.includes('Aarav') ? '23.0225 N, 72.5714 E' : '28.6139 N, 77.2090 E';
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg width="1200" height="685" viewBox="0 0 1200 685" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="685" rx="14" fill="${BACK}"/>
      
      <!-- Layout grids -->
      <line x1="200" y1="0" x2="200" y2="685" stroke="${BACK_TEXT}" stroke-opacity="0.04" stroke-width="1"/>
      <line x1="400" y1="0" x2="400" y2="685" stroke="${BACK_TEXT}" stroke-opacity="0.04" stroke-width="1"/>
      <line x1="800" y1="0" x2="800" y2="685" stroke="${BACK_TEXT}" stroke-opacity="0.04" stroke-width="1"/>
      <line x1="1000" y1="0" x2="1000" y2="685" stroke="${BACK_TEXT}" stroke-opacity="0.04" stroke-width="1"/>
      <line x1="0" y1="150" x2="1200" y2="150" stroke="${BACK_TEXT}" stroke-opacity="0.04" stroke-width="1"/>
      <line x1="0" y1="300" x2="1200" y2="300" stroke="${BACK_TEXT}" stroke-opacity="0.04" stroke-width="1"/>
      <line x1="0" y1="450" x2="1200" y2="450" stroke="${BACK_TEXT}" stroke-opacity="0.04" stroke-width="1"/>
      <line x1="0" y1="600" x2="1200" y2="600" stroke="${BACK_TEXT}" stroke-opacity="0.04" stroke-width="1"/>

      <!-- Corner Crosshairs -->
      <path d="M30 40 H50 M40 30 V50" stroke="${BACK_TEXT}" stroke-opacity="0.25" stroke-width="1.5"/>
      <path d="M1150 40 H1170 M1160 30 V50" stroke="${BACK_TEXT}" stroke-opacity="0.25" stroke-width="1.5"/>
      <path d="M30 645 H50 M40 635 V655" stroke="${BACK_TEXT}" stroke-opacity="0.25" stroke-width="1.5"/>
      <path d="M1150 645 H1170 M1160 635 V655" stroke="${BACK_TEXT}" stroke-opacity="0.25" stroke-width="1.5"/>

      <!-- Caliper center ruler at x=600 -->
      <line x1="600" y1="78" x2="600" y2="607" stroke="${BACK_TEXT}" stroke-opacity="0.12" stroke-width="2"/>
      <path d="M590 100 H610 M595 150 H605 M590 200 H610 M595 250 H605 M590 300 H610 M595 350 H605 M590 400 H610 M595 450 H605 M590 500 H610 M595 550 H605 M590 600 H610" stroke="${BACK_TEXT}" stroke-opacity="0.18" stroke-width="1.5"/>

      <!-- LEFT COLUMN -->
      <text x="72" y="96" fill="${ACCENT}" font-family="JetBrains Mono, monospace" font-size="20" font-weight="700" letter-spacing="3">${escapeXml(founder.role.toUpperCase())}</text>
      <text x="72" y="170" fill="${BACK_TEXT}" font-family="Fraunces, Georgia, serif" font-size="64" font-weight="900" letter-spacing="-3">${escapeXml(first)} ${escapeXml(last)}</text>
      
      <!-- Bio (y=230 to 290) -->
      <text x="72" y="240" fill="${BACK_TEXT}" fill-opacity="0.65" font-family="System-ui, sans-serif" font-size="22" font-weight="400">
        ${escapeXml(founder.bio.split(',')[0] + ',')}
      </text>
      <text x="72" y="272" fill="${BACK_TEXT}" fill-opacity="0.65" font-family="System-ui, sans-serif" font-size="22" font-weight="400">
        ${escapeXml(founder.bio.split(',').slice(1).join(',').trim())}
      </text>

      <!-- Social coordinates -->
      <g transform="translate(72 410)">
        <text x="0" y="-12" fill="${BACK_TEXT}" fill-opacity="0.3" font-family="JetBrains Mono, monospace" font-size="12" letter-spacing="1">LINKEDIN</text>
        <g transform="translate(0 6)">${iconSvg('linkedin').replaceAll('\n', '')}</g>
        <text x="32" y="20" fill="${BACK_TEXT}" font-family="JetBrains Mono, monospace" font-size="18" letter-spacing="1">${escapeXml(founder.linkedin)}</text>
      </g>
      
      <g transform="translate(72 500)">
        <text x="0" y="-12" fill="${BACK_TEXT}" fill-opacity="0.3" font-family="JetBrains Mono, monospace" font-size="12" letter-spacing="1">GITHUB</text>
        <g transform="translate(0 6)">${iconSvg('github').replaceAll('\n', '')}</g>
        <text x="32" y="20" fill="${BACK_TEXT}" font-family="JetBrains Mono, monospace" font-size="18" letter-spacing="1">${escapeXml(founder.github)}</text>
      </g>

      <!-- LEFT COLUMN ADDITIONS (MEDIUM) -->
      ${founder.medium ? `
      <g transform="translate(72 580)">
        <text x="0" y="-12" fill="${BACK_TEXT}" fill-opacity="0.3" font-family="JetBrains Mono, monospace" font-size="12" letter-spacing="1">MEDIUM</text>
        <text x="0" y="16" fill="${BACK_TEXT}" font-family="JetBrains Mono, monospace" font-size="18" letter-spacing="1">@${founder.medium}</text>
      </g>
      ` : ''}

      <!-- RIGHT COLUMN -->
      <g transform="translate(680, 0)">
        <!-- Section label -->
        <text x="0" y="96" fill="${BACK_TEXT}" fill-opacity="0.4" font-family="JetBrains Mono, monospace" font-size="16" letter-spacing="2">[CONTACT DETAILS]</text>
        
        <!-- Email -->
        <text x="0" y="160" fill="${BACK_TEXT}" fill-opacity="0.3" font-family="JetBrains Mono, monospace" font-size="12" letter-spacing="1">SYS_EMAIL</text>
        <text x="0" y="200" fill="${BACK_TEXT}" font-family="System-ui, sans-serif" font-size="24" font-weight="700">${escapeXml(founder.email)}</text>
        
        <!-- Portfolio -->
        ${founder.portfolio ? `
        <text x="0" y="280" fill="${BACK_TEXT}" fill-opacity="0.3" font-family="JetBrains Mono, monospace" font-size="12" letter-spacing="1">SYS_PORTFOLIO</text>
        <text x="0" y="320" fill="${BACK_TEXT}" font-family="System-ui, sans-serif" font-size="24" font-weight="700">${escapeXml(founder.portfolio)}</text>
        ` : ''}
        
        <!-- Faux terminal log status -->
        <g transform="translate(0, 410)">
          <rect x="0" y="0" width="440" height="150" fill="${FRONT}" fill-opacity="0.5" stroke="${BACK_TEXT}" stroke-opacity="0.08" stroke-width="1.5" rx="8"/>
          <text x="20" y="35" fill="${ACCENT}" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">TRV_STATION // ${codeId}</text>
          <text x="20" y="65" fill="${BACK_TEXT}" fill-opacity="0.72" font-family="JetBrains Mono, monospace" font-size="14">&gt; STATUS: DEC_STABLE // ACTIVE</text>
          ${founder.playstore ? `
          <text x="20" y="95" fill="${BACK_TEXT}" fill-opacity="0.72" font-family="JetBrains Mono, monospace" font-size="14">&gt; PLAY_STORE: DEV_ID_${founder.playstore.substring(0, 7)}...</text>
          ` : `
          <text x="20" y="95" fill="${BACK_TEXT}" fill-opacity="0.72" font-family="JetBrains Mono, monospace" font-size="14">&gt; STATUS: ONLINE</text>
          `}
          <text x="20" y="125" fill="${BACK_TEXT}" fill-opacity="0.4" font-family="JetBrains Mono, monospace" font-size="12">&gt; LOC: ${loc}</text>
        </g>
      </g>
    </svg>
  `)}`;
}

function CardImage({
  src,
  alt,
  hidden = false,
}: {
  src: string;
  alt: string;
  hidden?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      draggable={false}
      className="rounded-[14px] object-cover"
      style={{ opacity: hidden ? 0 : 1, backfaceVisibility: 'hidden' }}
    />
  );
}

function DevanshuCardFront() {
  return (
    <div className="absolute inset-0 select-none overflow-hidden rounded-[14px] bg-[#f2f1ec] flex flex-col justify-center items-center h-full w-full">
      <div className="flex items-center text-[5.5cqw] font-bold tracking-[0.15em] font-sans text-[#1a1c1b]">
        <span className="mr-[1.5cqw]">DEVANSHU</span>
        <span className="bg-[#1a1c1b] text-[#f2f1ec] px-[2cqw] py-[1cqw]">VERMA</span>
      </div>
    </div>
  );
}

function DevanshuCardBack({ founder }: { founder: Founder }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[14px] bg-[#f2f1ec] p-[8cqw] text-[#1a1c1b] flex flex-col justify-between h-full w-full font-sans">
      {/* Top Left Title */}
      <div className="inline-flex flex-col self-start">
        <h2 className="text-[7.2cqw] font-bold tracking-tight text-[#1a1c1b] leading-none mb-[1cqw]">
          DEVANSHU VERMA
        </h2>
        <div className="h-[1.2cqw] w-full bg-[#1a1c1b]" />
      </div>

      {/* Bottom Left Links */}
      <div className="flex flex-col gap-[2.5cqw] text-[3.6cqw] font-normal tracking-[0.02em] pointer-events-auto w-fit text-[#1a1c1b]">
        {/* GitHub */}
        <a
          href={`https://github.com/${founder.github}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-[3cqw] hover:text-[#555] transition-colors"
        >
          <svg width="4.5cqw" height="4.5cqw" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          <span className="font-sans font-light tracking-wide">{founder.github}</span>
        </a>

        {/* LinkedIn */}
        <a
          href={`https://linkedin.com/in/${founder.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-[3cqw] hover:text-[#555] transition-colors"
        >
          <div className="relative shrink-0 flex">
            <span className="flex items-center justify-center rounded-[0.5cqw] bg-[#1a1c1b] text-[#f2f1ec] font-sans font-bold select-none" style={{ width: '4.5cqw', height: '4.5cqw', fontSize: '3.2cqw', letterSpacing: '-0.05em' }}>
              in
            </span>
            <span className="absolute -bottom-[0.1cqw] -right-[1.4cqw] text-[1.4cqw] font-bold">®</span>
          </div>
          <span className="font-sans font-light tracking-wide ml-[0.5cqw]">{founder.linkedin}</span>
        </a>

        {/* Email */}
        <a
          href={`mailto:${founder.email}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-[3cqw] hover:text-[#555] transition-colors"
        >
          <svg width="4.5cqw" height="4.5cqw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
            <path d="M2 6l10 7 10-7"></path>
          </svg>
          <span className="font-sans font-light tracking-wide">{founder.email}</span>
        </a>
      </div>
    </div>
  );
}

function NityaCardFront() {
  return (
    <div className="absolute inset-0 select-none overflow-hidden rounded-[14px] bg-[#001246] p-[6cqw] text-[#f7fbfd] flex flex-col justify-between border border-[#001246] h-full w-full">
      {/* Top Left Label */}
      <div className="text-[3.2cqw] font-medium tracking-normal font-sans text-left">
        Full-Stack & AI/ML Devloper.
      </div>

      {/* Giant Display Name */}
      <div className="flex flex-col text-left leading-[1.05] tracking-tighter" style={{ fontSize: '13.5cqw', fontFamily: '"TAN Nimbus", var(--font-founder), serif' }}>
        <span className="font-black">NITYA</span>
        <span className="font-black">MEHTA</span>
      </div>

      {/* Bottom Visual Elements */}
      <div className="flex items-center gap-[3cqw]">
        <div className="bg-[#f7fbfd] shrink-0" style={{ width: '3.2cqw', height: '3.2cqw' }} />
        <div className="w-full bg-[#f7fbfd]" style={{ height: '0.3cqw' }} />
      </div>
    </div>
  );
}

function AaravCardFront() {
  return (
    <div className="absolute inset-0 select-none overflow-hidden rounded-[14px] bg-[#e8e6e1] flex flex-col justify-center items-center h-full w-full">
      {/* Halftone Pattern Background */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-multiply" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, #131211 1.5px, transparent 2px)',
          backgroundSize: '1.5cqw 1.5cqw',
          maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)',
        }}
      />

      {/* Giant Display Name */}
      <div className="flex flex-col w-full text-center leading-[0.8] tracking-tighter relative z-10 font-black mt-[-8cqw]" style={{ fontFamily: 'Impact, Arial Black, system-ui, sans-serif', color: '#ff0000' }}>
        <span style={{ fontSize: '24cqw', transform: 'scaleY(1.15)', transformOrigin: 'bottom' }}>AARAV</span>
        <span style={{ fontSize: '13.8cqw', transform: 'scaleY(1.15)', transformOrigin: 'top' }}>HALVADIYA</span>
      </div>

      {/* Bottom Left Label */}
      <div className="absolute bottom-[4.5cqw] left-[5cqw] text-[3.6cqw] font-medium tracking-tight font-sans text-[#ff0000] z-10">
        Android Developer
      </div>
    </div>
  );
}

function AaravCardBack({ founder }: { founder: Founder }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[14px] bg-[#e8e6e1] p-[5.5cqw] text-[#131211] flex flex-col justify-between border border-border/85 h-full w-full font-sans">
      {/* Top Right Medium */}
      <div className="w-full text-right text-[2.5cqw] font-medium">
        {founder.medium && (
          <a
            href={`https://medium.com/@${founder.medium}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hover:text-[#ff0000] transition-colors pointer-events-auto"
          >
            medium.com/@{founder.medium}
          </a>
        )}
      </div>

      {/* Bottom Left Links */}
      <div className="flex flex-col gap-[3.5cqw] text-[3.2cqw] font-bold mt-auto pointer-events-auto w-fit">
        {/* GitHub */}
        <a
          href={`https://github.com/${founder.github}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-[2.5cqw] hover:text-[#ff0000] transition-colors"
        >
          <span className="flex items-center justify-center shrink-0 text-[#131211]" style={{ width: '4.5cqw', height: '4.5cqw' }}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2A10 10 0 002 12c0 4.4 2.87 8.2 6.84 9.5.5.08.66-.23.66-.5v-1.7c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.1.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 015 0c1.9-1.3 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.2 22 16.4 22 12A10 10 0 0012 2z" />
            </svg>
          </span>
          <span className="font-sans font-medium">{founder.github}</span>
        </a>

        {/* LinkedIn */}
        <a
          href={`https://linkedin.com/in/${founder.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-[2.5cqw] hover:text-[#ff0000] transition-colors"
        >
          <span className="flex items-center justify-center rounded-[0.8cqw] bg-[#131211] text-[#e8e6e1] font-sans font-black select-none shrink-0" style={{ width: '4.5cqw', height: '4.5cqw', fontSize: '3cqw' }}>
            in
          </span>
          <span className="font-sans font-medium">{founder.linkedin}</span>
        </a>

        {/* Email */}
        <a
          href={`mailto:${founder.email}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-[2.5cqw] hover:text-[#ff0000] transition-colors"
        >
          <span className="flex items-center justify-center shrink-0 border-[0.3cqw] border-[#131211] rounded-[0.6cqw] text-[#131211]" style={{ width: '4.5cqw', height: '3.5cqw' }}>
            <svg width="75%" height="75%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </span>
          <span className="font-sans font-medium">{founder.email}</span>
        </a>
      </div>
    </div>
  );
}

function NityaCardBack() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[14px] bg-[#f7fbfd] p-[5.5cqw] text-[#001246] flex border border-border/85 h-full w-full font-mono">
      {/* Left Column */}
      <div className="w-[58%] flex flex-col justify-between h-full text-left">
        <div>
          {/* Top Left Label */}
          <div className="text-[3cqw] font-medium font-sans mb-[5cqw]">
            Full-Stack & AI/ML Developer
          </div>
          {/* Display Name */}
          <div className="flex flex-col leading-[1.0] tracking-tighter select-none" style={{ fontSize: '11.5cqw', fontFamily: '"TAN Nimbus", var(--font-founder), serif' }}>
            <span className="font-black">NITYA</span>
            <span className="font-black">MEHTA</span>
          </div>
        </div>

        {/* Clickable Social Coordinates */}
        <div className="flex gap-[3.5cqw] text-[2.2cqw] font-bold">
          {/* LinkedIn Link */}
          <a
            href="https://linkedin.com/in/nityamehta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-[1.5cqw] hover:text-[#ff5500] transition-colors duration-200"
          >
            <span className="flex items-center justify-center rounded-[0.5cqw] bg-[#001246] text-[#f7fbfd] font-sans font-black select-none shrink-0" style={{ width: '4cqw', height: '4cqw', fontSize: '2.5cqw' }}>
              in
            </span>
            <span>nityamehta</span>
          </a>

          {/* GitHub Link */}
          <a
            href="https://github.com/Nitya-Mehta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-[1.5cqw] hover:text-[#ff5500] transition-colors duration-200"
          >
            <span className="flex items-center justify-center rounded-full bg-[#001246] text-[#f7fbfd] shrink-0 select-none" style={{ width: '4cqw', height: '4cqw' }}>
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="p-[0.5cqw]">
                <path d="M12 2A10 10 0 002 12c0 4.4 2.87 8.2 6.84 9.5.5.08.66-.23.66-.5v-1.7c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.1.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 015 0c1.9-1.3 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.2 22 16.4 22 12A10 10 0 0012 2z" fill="currentColor" />
              </svg>
            </span>
            <span>Nitya-Mehta</span>
          </a>
        </div>
      </div>

      {/* Middle Divider Line */}
      <div className="w-[3px] bg-[#001246] h-full" />

      {/* Right Column */}
      <div className="w-[42%] flex flex-col justify-end items-end h-full text-right">
        <div className="space-y-[3cqw] font-sans font-bold" style={{ fontSize: '2.2cqw' }}>
          {/* Email */}
          <a
            href="mailto:nityachintan@gmail.com"
            onClick={(e) => e.stopPropagation()}
            className="block hover:text-[#ff5500] transition-colors duration-200"
          >
            nityachintan@gmail.com
          </a>

          {/* Medium */}
          <a
            href="https://medium.com/@nityachintan"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="block hover:text-[#ff5500] transition-colors duration-200"
          >
            medium.com/@nityachintan
          </a>
        </div>
      </div>
    </div>
  );
}

export function FounderCard({ 
  founder,
  isFlipped,
  onToggleFlip
}: { 
  founder: Founder;
  isFlipped?: boolean;
  onToggleFlip?: () => void;
}) {
  const [localFlipped, setLocalFlipped] = useState(false);
  const flipped = isFlipped !== undefined ? isFlipped : localFlipped;
  const reduceMotion = useReducedMotion();

  const front = useMemo(() => frontSvg(founder), [founder]);
  const back = useMemo(() => backSvg(founder), [founder]);
  const isNitya = founder.name.includes('Nitya');
  const isAarav = founder.name.includes('Aarav');
  const isDevanshu = founder.name.includes('Devanshu');

  return (
    <button
      type="button"
      onClick={() => {
        if (onToggleFlip) {
          onToggleFlip();
        } else {
          setLocalFlipped((value) => !value);
        }
      }}
      onMouseEnter={() => !reduceMotion && isFlipped === undefined && setLocalFlipped(true)}
      onMouseLeave={() => !reduceMotion && isFlipped === undefined && setLocalFlipped(false)}
      className="block w-full text-left"
      aria-label={`Flip card for ${founder.name}`}
      data-flipped={flipped ? 'true' : 'false'}
    >
      <div
        className="relative aspect-[1.75/1] w-full [perspective:1400px]"
        style={{ containerType: 'size' }}
      >
        {reduceMotion ? (
          <>
            <motion.div
              animate={{ opacity: flipped ? 0 : 1 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {isNitya ? <NityaCardFront /> : isAarav ? <AaravCardFront /> : isDevanshu ? <DevanshuCardFront /> : <CardImage src={front} alt={`${founder.name} front`} hidden={flipped} />}
            </motion.div>
            <motion.div
              animate={{ opacity: flipped ? 1 : 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {isNitya ? (
                <NityaCardBack />
              ) : isAarav ? (
                <AaravCardBack founder={founder} />
              ) : isDevanshu ? (
                <DevanshuCardBack founder={founder} />
              ) : (
                <div className="relative w-full h-full">
                  <CardImage src={back} alt={`${founder.name} back`} hidden={!flipped} />
                  {/* Clickable transparent link overlay for other founders */}
                  <div className="absolute inset-0 z-30" style={{ pointerEvents: flipped ? 'auto' : 'none' }}>
                    {/* LinkedIn Link */}
                    <a
                      href={`https://linkedin.com/in/${founder.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute rounded hover:bg-white/5 transition-colors"
                      style={{ left: '6%', top: '56%', width: '38%', height: '10%' }}
                    />
                    {/* GitHub Link */}
                    <a
                      href={`https://github.com/${founder.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute rounded hover:bg-white/5 transition-colors"
                      style={{ left: '6%', top: '69%', width: '38%', height: '10%' }}
                    />
                    {/* Medium Link */}
                    {founder.medium && (
                      <a
                        href={`https://medium.com/@${founder.medium}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute rounded hover:bg-white/5 transition-colors"
                        style={{ left: '6%', top: '81%', width: '38%', height: '10%' }}
                      />
                    )}
                    {/* Email Link */}
                    <a
                      href={`mailto:${founder.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute rounded hover:bg-white/5 transition-colors"
                      style={{ left: '56%', top: '23%', width: '38%', height: '10%' }}
                    />
                    {/* Portfolio Link */}
                    {founder.portfolio && (
                      <a
                        href={`https://${founder.portfolio}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute rounded hover:bg-white/5 transition-colors"
                        style={{ left: '56%', top: '40%', width: '38%', height: '10%' }}
                      />
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        ) : (
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 [backface-visibility:hidden]">
              {isNitya ? <NityaCardFront /> : isAarav ? <AaravCardFront /> : isDevanshu ? <DevanshuCardFront /> : <CardImage src={front} alt={`${founder.name} front`} />}
            </div>
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              {isNitya ? (
                <NityaCardBack />
              ) : isAarav ? (
                <AaravCardBack founder={founder} />
              ) : isDevanshu ? (
                <DevanshuCardBack founder={founder} />
              ) : (
                <div className="relative w-full h-full">
                  <CardImage src={back} alt={`${founder.name} back`} />
                  {/* Clickable transparent link overlay for other founders */}
                  <div className="absolute inset-0 z-30" style={{ pointerEvents: flipped ? 'auto' : 'none' }}>
                    {/* LinkedIn Link */}
                    <a
                      href={`https://linkedin.com/in/${founder.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute rounded hover:bg-white/5 transition-colors"
                      style={{ left: '6%', top: '56%', width: '38%', height: '10%' }}
                    />
                    {/* GitHub Link */}
                    <a
                      href={`https://github.com/${founder.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute rounded hover:bg-white/5 transition-colors"
                      style={{ left: '6%', top: '69%', width: '38%', height: '10%' }}
                    />
                    {/* Medium Link */}
                    {founder.medium && (
                      <a
                        href={`https://medium.com/@${founder.medium}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute rounded hover:bg-white/5 transition-colors"
                        style={{ left: '6%', top: '81%', width: '38%', height: '10%' }}
                      />
                    )}
                    {/* Email Link */}
                    <a
                      href={`mailto:${founder.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute rounded hover:bg-white/5 transition-colors"
                      style={{ left: '56%', top: '23%', width: '38%', height: '10%' }}
                    />
                    {/* Portfolio Link */}
                    {founder.portfolio && (
                      <a
                        href={`https://${founder.portfolio}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute rounded hover:bg-white/5 transition-colors"
                        style={{ left: '56%', top: '40%', width: '38%', height: '10%' }}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </button>
  );
}
