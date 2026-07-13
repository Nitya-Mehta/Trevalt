import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, requires_password_change')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'client') {
    if (profile?.role === 'admin') {
      redirect('/admin');
    }
    redirect('/login?error=Invalid+account+configuration.+Contact+support.');
  }

  if (profile?.requires_password_change) {
    redirect('/setup');
  }

  return (
    <SiteShell>
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-140px)]">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 border-r border-border bg-card/50 shrink-0 flex flex-col">
          <div className="p-6 md:p-8">
            <span className="font-mono text-[0.65rem] tracking-[0.28em] text-accent uppercase block">
              [CLIENT DASHBOARD]
            </span>
            <h2 className="font-display text-xl font-bold mt-2 text-ink">
              Trevalt Projects
            </h2>
          </div>

          <div className="flex-grow p-6 md:p-8 pt-0 space-y-4 font-mono text-xs uppercase tracking-widest text-muted">
            <Link href="/dashboard" className="block hover:text-accent transition-colors">
              Active Scopes
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto">
          {children}
        </main>
      </div>
    </SiteShell>
  );
}
