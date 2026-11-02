'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { completeSetupWithNewPassword, keepTemporaryPassword } from '@/app/actions/auth';
import { SiteShell } from '@/components/site-shell';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-paper shadow-[0_0_15px_-3px_var(--accent)] backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:bg-accent hover:shadow-[0_0_25px_-3px_var(--accent)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-[0_0_15px_-3px_var(--accent)]"
    >
      {pending ? 'Updating...' : 'Update Password'}
    </button>
  );
}

function KeepPasswordButton() {
  return (
    <button
      type="button"
      onClick={() => keepTemporaryPassword()}
      className="mt-4 w-full justify-center rounded-xl border border-border bg-card py-4 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-muted transition-transform duration-200 ease-smooth hover:scale-[1.01] hover:text-ink hover:border-ink"
    >
      Keep Temporary Password
    </button>
  );
}

export default function SetupPage() {
  const [state, formAction] = useFormState(completeSetupWithNewPassword, null);

  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-md px-5 py-24 md:px-8">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-accent">
              [ACCOUNT SETUP]
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-display">
              Welcome to Trevalt.
            </h1>
            <p className="mt-4 text-sm leading-6 text-muted">
              Please set a permanent password for your client dashboard, or choose to keep the temporary one provided to you.
            </p>
          </div>

          <div className="border border-border bg-card/25 p-6 md:p-8 rounded-sm">
            <form action={formAction} className="grid gap-6">
              {state?.error && (
                <div className="p-4 border border-red-500/50 bg-red-500/10 text-red-500 text-sm font-mono tracking-wide">
                  {state.error}
                </div>
              )}

              <div className="grid gap-2">
                <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">New Password</label>
                <input
                  required
                  name="password"
                  type="password"
                  placeholder="Enter a secure password"
                  className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <SubmitButton />
                <KeepPasswordButton />
              </div>
            </form>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
