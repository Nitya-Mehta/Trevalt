import { SiteShell } from '@/components/site-shell';
import Image from 'next/image';
import { FounderCard } from '@/components/founder-card';
import { founders } from '@/lib/founders';

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="about-page mx-auto w-full max-w-[var(--page-max)] px-5 md:px-8">
        <div className="border-b border-border pb-12">
          <h1>About</h1>
          <p className="mt-6 max-w-[38rem] text-base leading-7 text-muted md:text-lg">
            Three engineers working directly with the people behind each project.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {founders.map((founder, index) => (
            <div key={founder.name}>
              <div className="founder-profile">
                <span className="founder-profile-number">0{index + 1}</span>
                <div className="founder-profile-photo">
                  <Image src={`/images/${founder.name.startsWith('Nitya') ? 'nitya' : founder.name.startsWith('Aarav') ? 'aarav' : 'devanshu'}.jpg`} alt={founder.name} fill sizes="72px" className="object-cover" />
                </div>
                <div><h2>{founder.name}</h2><p>{founder.role.replace(/\.$/, '')}</p></div>
              </div>
              <FounderCard founder={founder} />
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
