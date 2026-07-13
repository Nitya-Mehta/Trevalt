'use client';

import { SiteShell } from '@/components/site-shell';
import { useFormState, useFormStatus } from 'react-dom';
import { forgotPassword } from '@/app/actions/auth';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full justify-center rounded-xl border border-accent bg-accent py-4 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-paper transition-transform duration-200 ease-smooth hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Sending...' : 'Send Reset Link'}
    </button>
  );
}

export default function ForgotPasswordPage() {
  const [state, formAction] = useFormState(forgotPassword, null);

  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-md px-5 py-24 md:px-8">
        <div className="flex flex-col gap-8">
          
          <div className="text-center">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-accent block mb-4">
              [PASSWORD RECOVERY]
            </span>
            <h1 className="font-display text-4xl font-bold tracking-display md:text-5xl">
              Reset Password
            </h1>
          </div>

          <div className="border border-border bg-card/25 p-6 md:p-8 rounded-sm">
            {state?.success ? (
              <div className="rounded-xl border border-accent/50 bg-accent/10 p-6 text-center text-accent">
                <p className="font-mono text-sm uppercase tracking-widest mb-2">[SUCCESS]</p>
                <p className="text-sm">{state.success}</p>
                <div className="mt-6">
                  <Link href="/login" className="font-mono text-[0.65rem] uppercase tracking-widest hover:underline text-muted">
                    ← Return to Login
                  </Link>
                </div>
              </div>
            ) : (
              <form action={formAction} className="grid gap-6">
                
                {state?.error && (
                  <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-center text-red-500 text-sm">
                    {state.error}
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

                <SubmitButton />

                <div className="text-center mt-2">
                  <Link href="/login" className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted hover:text-accent transition-colors">
                    Cancel and Return
                  </Link>
                </div>
              </form>
            )}
          </div>
          
        </div>
      </section>
    </SiteShell>
  );
}
