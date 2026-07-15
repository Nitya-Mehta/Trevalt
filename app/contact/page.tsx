'use client';

import { useEffect, useState, useActionState } from 'react';
import Image from 'next/image';
import { SiteShell } from '@/components/site-shell';
import { useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/actions/contact';
import { motion } from 'framer-motion';

const projectTypes = ['Brand site', 'Product website', 'Case study refresh', 'Android app', 'Other'];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-paper shadow-[0_0_15px_-3px_var(--accent)] backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:bg-accent hover:shadow-[0_0_25px_-3px_var(--accent)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-[0_0_15px_-3px_var(--accent)]"
    >
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useActionState(submitContactForm, null);
  const [budgetRanges, setBudgetRanges] = useState([
    'Under $1.5k',
    '$1.5k - $10k',
    '$10k - $30k',
    '$30k+'
  ]);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data.currency === 'INR') {
          setBudgetRanges(['Under ₹30,000', '₹30,000 - ₹1 Lakh', '₹1 Lakh - ₹5 Lakhs', '₹5 Lakhs+']);
        } else if (data.currency === 'EUR') {
          setBudgetRanges(['Under €500', '€500 - €3,000', '€3,000 - €10,000', '€10,000+']);
        } else if (data.currency === 'GBP') {
          setBudgetRanges(['Under £500', '£500 - £3,000', '£3,000 - £10,000', '£10,000+']);
        } else if (data.currency === 'AUD') {
          setBudgetRanges(['Under A$1.5k', 'A$1.5k - A$10k', 'A$10k - A$30k', 'A$30k+']);
        } else if (data.currency === 'CAD') {
          setBudgetRanges(['Under C$2k', 'C$2k - C$10k', 'C$10k - C$35k', 'C$35k+']);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-[var(--page-max)] px-5 py-12 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          
          {/* Left Column - System Briefing Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col justify-between gap-10"
            >
              <div>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-accent">
                  [START A PROJECT]
                </span>
                <h1 className="mt-3 font-display text-4xl font-bold tracking-display md:text-5xl lg:text-7xl">
                  Tell us what you&apos;re building.
                </h1>
                <p className="mt-6 text-base leading-7 text-muted md:text-lg">
                  Let us know what you are building. Once submitted, we will review the details and set up a private Slack channel within 24 hours to kick off the project.
                </p>
                <p className="mt-4 text-sm leading-6 text-muted">
                  For general support or to contact us for anything else, email us directly at <a href="mailto:trevalt.tech@gmail.com" className="text-ink hover:text-accent transition-colors font-mono">trevalt.tech@gmail.com</a>.
                </p>
              </div>

            <div className="space-y-8 border-t border-border pt-8 font-mono text-[0.7rem] uppercase tracking-[0.18em]">
              <div>
                <span className="text-accent">[RESPONSE TIMES]</span>
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
            </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="rounded-2xl border border-border bg-card p-6 md:p-10"
          >
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-accent uppercase block mb-6">
              [PROJECT DETAILS]
            </span>
            
            {state?.success ? (
              <div className="rounded-xl border border-accent/50 bg-accent/10 p-6 text-center text-accent">
                <p className="font-mono text-sm uppercase tracking-widest mb-2">[SUCCESS]</p>
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
                  <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[YOUR NAME]</label>
                  <input
                    required
                    name="name"
                    placeholder="Potential client's name"
                    className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[EMAIL ADDRESS]</label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="hello@example.com"
                    className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[PROJECT TYPE]</label>
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
                  <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[BUDGET RANGE]</label>
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
                  <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[PROJECT DESCRIPTION]</label>
                  <textarea
                    required
                    name="message"
                    placeholder="Tell us all the details about the project you want us to build..."
                    rows={5}
                    className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent resize-none"
                  />
                </div>

                <SubmitButton />
              </form>
            )}
          </motion.div>
          
        </div>
      </section>
    </SiteShell>
  );
}
