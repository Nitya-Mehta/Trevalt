'use client';

import Image from 'next/image';
import { SiteShell } from '@/components/site-shell';
import { useFormState, useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/actions/contact';

const projectTypes = ['Brand site', 'Product website', 'Case study refresh', 'Android app', 'Other'];
const budgetRanges = ['Under $5k', '$5k-$15k', '$15k-$30k', '$30k+'];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full justify-center rounded-xl border border-accent bg-accent py-4 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-paper transition-transform duration-200 ease-smooth hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Transmitting...' : 'Transmit brief'}
    </button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useFormState(submitContactForm, null);

  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-[var(--page-max)] px-5 py-12 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          
          {/* Left Column - System Briefing Details */}
          <div className="flex flex-col justify-between gap-10">
            <div>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-accent">
                [SYSTEM_HANDSHAKE // INTAKE]
              </span>
              <h1 className="mt-3 font-display text-5xl font-bold tracking-display md:text-7xl">
                Initialize the briefing.
              </h1>
              <p className="mt-6 text-base leading-7 text-muted md:text-lg">
                Let us know what you are building. Once submitted, we will review the parameters and configure a private Slack enclave within 24 hours to kick off scope mapping.
              </p>
            </div>

            {/* Mascot Selfie Banner */}
            <div className="relative w-full aspect-[2/1] rounded-[6px] overflow-hidden border border-border bg-card flex items-center justify-center p-4 group">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,85,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,85,0,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              <div className="relative w-[130px] h-[130px] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/mascot/selfie.png"
                  alt="Trevalt Selfie Mascot"
                  fill
                  sizes="130px"
                  className="object-contain"
                />
              </div>
              <div className="absolute top-2.5 left-2.5 bg-[#080706]/85 backdrop-blur-sm px-2 py-0.5 rounded font-mono text-[0.55rem] tracking-wider text-accent border border-border/50 uppercase">
                [SYS_INTAKE // MASCOT_SELFIE]
              </div>
              {/* Blueprint Corner Crosshairs */}
              <div className="absolute inset-2 border border-accent/15 pointer-events-none rounded-[4px]">
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-accent/50" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-accent/50" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-accent/50" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-accent/50" />
              </div>
            </div>

            <div className="space-y-8 border-t border-border pt-8 font-mono text-[0.7rem] uppercase tracking-[0.18em]">
              <div>
                <span className="text-accent">[SYS_INTAKE_SLA]</span>
                <div className="mt-4 space-y-2 text-ink">
                  <div className="flex justify-between border-b border-border/40 pb-1">
                    <span>RESPONSE LATENCY</span>
                    <span className="text-accent">&lt; 24 HOURS</span>
                  </div>
                  <div className="flex justify-between border-b border-border/40 pb-1">
                    <span>KICKOFF WINDOW</span>
                    <span className="text-accent">3 BUSINESS DAYS</span>
                  </div>
                  <div className="flex justify-between border-b border-border/40 pb-1">
                    <span>CHANNELS</span>
                    <span className="text-accent">DIRECT DEV SLACK</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-accent">[PRE_REQ_CHECKLIST]</span>
                <ul className="mt-4 space-y-2 text-muted">
                  <li className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 bg-accent" />
                    <span>Clear project specifications</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 bg-accent" />
                    <span>API documentation (if integrating)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 bg-accent" />
                    <span>Established branding assets</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Intake Form */}
          <div className="border border-border bg-card/25 p-6 md:p-8">
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-accent uppercase block mb-6">
              [INTAKE_PARAMS_FORM]
            </span>
            
            {state?.success ? (
              <div className="rounded-xl border border-accent/50 bg-accent/10 p-6 text-center text-accent">
                <p className="font-mono text-sm uppercase tracking-widest mb-2">[TRANSMISSION_SUCCESS]</p>
                <p className="text-sm">Your brief has been received. We will initiate contact within 24 hours.</p>
              </div>
            ) : (
              <form
                className="grid gap-6"
                action={formAction}
              >
                {state?.error && (
                  <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-center text-red-500 text-sm">
                    {state.error}
                  </div>
                )}
                <div className="grid gap-2">
                  <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[PARAM_CLIENT_NAME]</label>
                  <input
                    required
                    name="name"
                    placeholder="Nitya Mehta"
                    className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[PARAM_CLIENT_EMAIL]</label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="client@enclave.com"
                    className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[PARAM_PROJECT_TYPE]</label>
                  <select
                    required
                    name="project_type"
                    className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select payload target
                    </option>
                    {projectTypes.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-2">
                  <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[PARAM_BUDGET_RANGE]</label>
                  <select
                    required
                    name="budget_range"
                    className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select allocate scope
                    </option>
                    {budgetRanges.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-2">
                  <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[PARAM_BRIEF_PAYLOAD]</label>
                  <textarea
                    required
                    name="message"
                    placeholder="Provide scope parameters, API targets, and engineering constraints..."
                    rows={5}
                    className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent resize-none"
                  />
                </div>

                <SubmitButton />
              </form>
            )}
          </div>
          
        </div>
      </section>
    </SiteShell>
  );
}
