'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeroAsciiMorph } from '@/components/hero-ascii-morph';
import { projects } from '@/lib/projects';

const featuredProjects = projects.filter((project) => project.tier === 'major');
const draggableProjects = projects.filter((project) => project.tier === 'minor');
const cardPositions = [
  { left: '2%', top: '14%', rotate: -3 },
  { left: '35%', top: '26%', rotate: 2 },
  { left: '68%', top: '10%', rotate: -2 },
];

export function HomepageClient() {
  const cardAreaRef = useRef<HTMLDivElement | null>(null);
  const [compact, setCompact] = useState(true);

  useEffect(() => {
    const update = () => setCompact(window.innerWidth < 1100);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="home-minimal">
      <section className="brand-hero" aria-label="Trevalt">
        <h1 className="sr-only">Trevalt</h1>
        <HeroAsciiMorph />
        <span className="brand-hero-mobile-word" aria-hidden="true">Trevalt</span>
      </section>

      <section className="home-intro w-full px-5 md:px-8" aria-labelledby="home-intro-title">
        <h2 id="home-intro-title" className="sr-only">What we do</h2>
        <div className="home-services">
          <div><span>01</span><strong>Web</strong><small>Websites &amp; software</small></div>
          <div><span>02</span><strong>Android</strong><small>Mobile applications</small></div>
          <div><span>03</span><strong>AI</strong><small>Machine learning systems</small></div>
          <Link href="/contact" className="home-services-contact">Have a project? <b>Contact us ↗</b></Link>
        </div>
      </section>

      <section className="home-work w-full px-5 md:px-8" aria-labelledby="home-work-title">
        <div className="home-section-heading">
          <h2 id="home-work-title">Work</h2>
          <Link href="/projects">All projects <span aria-hidden="true">↗</span></Link>
        </div>

        <div className="home-featured-list">
          {featuredProjects.map((project) => (
            <Link className="home-featured" href={`/projects/${project.slug}`} key={project.slug}>
              <div className="home-featured-image">
                {project.slug === 'geowav' ? (
                  <div className="geowav-preview-grid" aria-label="GeoWav app screens">
                    {project.screenshots?.slice(0, 3).map((src, shotIndex) => (
                      <div className={`geowav-preview-shot geowav-preview-shot-${shotIndex + 1}`} key={src}>
                        <Image src={src} alt={`GeoWav app screen ${shotIndex + 1}`} fill sizes="(max-width: 767px) 30vw, 20vw" className="object-contain" />
                      </div>
                    ))}
                  </div>
                ) : project.screenshots?.[0] && (
                  <Image
                    src={project.screenshots[0]}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-contain"
                  />
                )}
              </div>
              <div className="home-featured-copy">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.tagline}</p>
                <span className="home-project-action">View project <span aria-hidden="true">↗</span></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-more w-full px-5 md:px-8" aria-labelledby="home-more-title">
        <div className="home-section-heading">
          <h2 id="home-more-title">More work</h2>
          <span className="home-drag-hint">Drag to explore</span>
        </div>
        <div ref={cardAreaRef} className="home-card-area">
          {draggableProjects.map((project, index) => {
            const position = cardPositions[index % cardPositions.length];
            return (
              <motion.div
                key={project.slug}
                drag={!compact}
                dragConstraints={cardAreaRef}
                dragElastic={0.1}
                whileDrag={{ scale: 1.02, zIndex: 10 }}
                className="project-card home-draggable-card"
                style={compact ? undefined : { left: position.left, top: position.top, rotate: position.rotate }}
              >
                <span className="project-card-index">0{index + 3} / {project.category}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.tagline}</p>
                </div>
                <Link href={`/projects/${project.slug}`} onPointerDown={(event) => event.stopPropagation()} className="project-card-link">
                  View project <span aria-hidden="true">↗</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
