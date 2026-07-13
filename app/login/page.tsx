'use client';

import { SiteShell } from '@/components/site-shell';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/app/actions/auth';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full justify-center rounded-xl border border-accent bg-accent py-4 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-paper transition-transform duration-200 ease-smooth hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Logging in...' : 'Log in'}
    </button>
  );
}

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const [state, formAction] = useFormState(login, null);
  
  // Combine form action errors and URL errors
  const displayError = state?.error || searchParams?.error;

  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-md px-5 py-24 md:px-8">
        <div className="flex flex-col gap-8">
          
          <div className="text-center">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-accent block mb-4">
              [LOGIN]
            </span>
            <h1 className="font-display text-4xl font-bold tracking-display md:text-5xl">
              Admin Portal
            </h1>
          </div>

          <div className="border border-border bg-card/25 p-6 md:p-8 rounded-sm">
            <form action={formAction} className="grid gap-6">
              
              {displayError && (
                <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-center text-red-500 text-sm">
                  {displayError}
                </div>
              )}

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
                <div className="flex justify-between items-center">
                  <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[PASSWORD]</label>
                  <Link href="/forgot-password" className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-accent hover:underline">
                    Forgot Password
                  </Link>
                </div>
                <input
                  required
                  name="password"
                  type="password"
                  placeholder="••••••••••••"
                  className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>

              <SubmitButton />
            </form>
          </div>
          
        </div>
      </section>
    </SiteShell>
  );
}
