import { SiteShell } from '@/components/site-shell';
import { founders } from '@/lib/founders';

const studioEmail = 'trevalt.tech@gmail.com';

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="contact-directory w-full px-5 md:px-8">
        <header className="contact-directory-heading">
          <h1>Contact</h1>
          <p>Reach the studio or contact a founder directly.</p>
        </header>

        <ul className="contact-directory-list">
          <li>
            <span className="contact-directory-label">Trevalt Studio</span>
            <a href={`mailto:${studioEmail}`}>{studioEmail}<span aria-hidden="true">↗</span></a>
          </li>
          {founders.map((founder, index) => (
            <li key={founder.email}>
              <span className="contact-directory-label">0{index + 1} / {founder.name}</span>
              <a href={`mailto:${founder.email}`}>{founder.email}<span aria-hidden="true">↗</span></a>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
