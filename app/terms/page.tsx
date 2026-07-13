import { SiteShell } from '@/components/site-shell';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Trevalt',
  description: 'Terms of service, payment terms, and working agreements for Trevalt software engineering projects.',
  alternates: {
    canonical: 'https://trevalt.vercel.app/terms',
  }
};

const serviceSections = [
  {
    title: 'Scope of work',
    body: [
      'Each project is governed by a written agreement that defines the deliverables, features, responsibilities, and acceptance criteria.',
      'Work not included in the agreed scope is not part of the original engagement.',
    ],
  },
  {
    title: 'Change requests and scope creep',
    body: [
      'Features, pages, or functionality requested beyond the agreed scope will be treated as a Change Request, quoted separately, and added only after written approval.',
      'Trevalt may pause work while a Change Request is being reviewed or awaiting payment.',
    ],
  },
  {
    title: 'Payment terms',
    body: [
      'The payment schedule, currency, payment method, and responsibility for transaction fees will be stated in the project agreement.',
      'Work may be paused if an agreed payment becomes overdue. Continued non-payment may result in termination of the engagement.',
    ],
  },
  {
    title: 'Timeline and client delays',
    body: [
      'Quoted timelines depend on timely feedback and the provision of necessary content, credentials, and approvals. Delays caused by missing client input extend the delivery timeline proportionally.',
    ],
  },
  {
    title: 'Right to terminate',
    body: [
      'Either party may terminate a project with the written notice period stated in the agreement.',
      'If an engagement ends because of non-payment, prolonged lack of feedback, or abusive conduct, Trevalt may retain fees for work already completed and time already committed.',
      'If a client ends an engagement without cause, completed work remains non-refundable. Any treatment of undelivered work will follow the signed agreement.',
    ],
  },
  {
    title: 'Limitation of liability',
    body: [
      'Trevalt\'s total liability under a project agreement will not exceed the total amount paid for that engagement.',
      'Trevalt is not liable for indirect, incidental, or consequential damages, including loss of profits, loss of data, or business interruption arising from use of the delivered product.',
      'We are strictly not liable for any data loss incurred by the client or their end-users under any circumstances. Furthermore, we do not sell or expose client data; any portfolio demonstrations are explicitly scrubbed, data-free clones approved by the client.',
    ],
  },
  {
    title: 'No guarantee of business outcomes',
    body: [
      'Trevalt delivers software according to the agreed specification. Results such as revenue, user growth, or business performance depend on factors outside the delivered software and are not guaranteed.',
    ],
  },
  {
    title: 'Intellectual property and portfolio rights',
    body: [
      'Upon full payment, ownership of custom code developed specifically for the client transfers to the client. Trevalt retains ownership of pre-existing tools, frameworks, libraries, and reusable components used in delivery.',
      'Trevalt may display completed work in its portfolio unless the client requests confidentiality in writing before the project begins. Any portfolio display will strictly be a structural clone showing only the website\'s UI/UX without any of your actual personal or proprietary project data. We will request your explicit permission every time before featuring a project.',
    ],
  },
  {
    title: 'Confidentiality',
    body: [
      'Clients who require confidentiality can request a confidentiality or NDA-style clause in writing before the project begins.',
    ],
  },
  {
    title: 'Warranty and bug-fix window',
    body: [
      'Trevalt will fix bugs in delivered functionality during the support period stated in the project agreement, provided the issue relates to functionality included in scope.',
      'New features, third-party service changes, and client-made code modifications are outside that support period.',
    ],
  },
  {
    title: 'Force majeure',
    body: [
      'Neither party is liable for delays or failures caused by events outside reasonable control, including internet outages, platform or API provider outages, and natural disasters.',
    ],
  },
  {
    title: 'Governing law and dispute resolution',
    body: [
      'The applicable jurisdiction and dispute process will be stated in the signed project agreement. Trevalt encourages good-faith negotiation and, where appropriate, mediation before formal action.',
    ],
  },
];

export default function TermsPage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-[var(--page-max)] px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-20">
          <aside className="h-fit lg:sticky lg:top-8">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">Legal / 01</p>
            <nav className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted lg:flex-col lg:gap-3">
              <a href="#service-agreement" className="transition-colors hover:text-ink">Service Agreement</a>
              <a href="#website-terms" className="transition-colors hover:text-ink">Website Terms</a>
              <a href="#privacy" className="transition-colors hover:text-ink">Privacy</a>
            </nav>
          </aside>

          <div className="max-w-[54rem]">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">Trevalt / Terms of Service</p>
            <h1 className="mt-4 max-w-[48rem] font-display text-5xl font-bold leading-[0.95] tracking-display md:text-7xl">
              Clear terms for working together.
            </h1>
            <div className="mt-7 border-l-2 border-accent bg-card px-5 py-4 text-sm leading-6 text-muted">
              These public terms explain how Trevalt works and how this website may be used. Each project is governed by a separate written agreement.
            </div>

            <div id="service-agreement" className="scroll-mt-8 pt-16">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">01 / Project terms</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-display md:text-4xl">Working with Trevalt</h2>
              <p className="mt-4 max-w-[44rem] text-muted">
                Before work begins, Trevalt and the client agree on the scope, schedule, payment terms, and responsibilities for the project.
              </p>
              <div className="mt-8 space-y-8">
                {serviceSections.map((section, index) => (
                  <article key={section.title} className="border-t border-border pt-5">
                    <div className="flex gap-4">
                      <span className="font-mono text-[0.7rem] tracking-[0.16em] text-accent">{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <h3 className="font-display text-xl font-bold tracking-display">{section.title}</h3>
                        <div className="mt-3 space-y-3 text-sm leading-6 text-muted md:text-base">
                          {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div id="website-terms" className="scroll-mt-8 border-t border-border pt-16">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">02 / Public site</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-display md:text-4xl">Website Terms</h2>
              <div className="mt-5 space-y-4 text-muted md:text-base md:leading-7">
                <p>Nothing on this website constitutes a binding offer. All engagements are governed exclusively by a signed Service Agreement.</p>
                <p>This website is provided &quot;as is&quot; without warranty of uninterrupted availability. Trevalt is not liable for temporary downtime, content errors, or third-party service disruptions affecting this site.</p>
                <p>Contact form submissions are used to respond to inquiries and are not shared with third parties except service providers used to operate this site. See the Privacy section below for the current summary.</p>
                <p>All content on this site, including project case studies, images, and written material, belongs to Trevalt unless otherwise noted.</p>
              </div>
            </div>

            <div id="privacy" className="scroll-mt-8 border-t border-border pt-16">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">Privacy</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-display md:text-4xl">Privacy summary</h2>
              <p className="mt-5 text-muted md:text-base md:leading-7">
                Trevalt uses contact form submissions only to respond to inquiries and operates the site with the service providers required for hosting and form handling. We strictly do not sell, rent, or display any of your personal or project data to third parties. If a project is featured on our portfolio, it will be a data-free clone showing only the design structure, and we will request your explicit permission every time beforehand. For questions about data handling, email <a className="text-ink underline decoration-accent underline-offset-4" href="mailto:nityachintan@gmail.com">nityachintan@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
