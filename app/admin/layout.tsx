import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    if (profile?.role === 'client') {
      redirect('/dashboard');
    }
    // If they have no role (e.g. no profile row exists), redirect to login
    redirect('/login?error=Invalid+account+configuration.+Contact+support.');
  }

  return (
    <SiteShell>
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-140px)]">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 border-r border-border bg-card/50 p-6 shrink-0 flex flex-col">
          <div className="mb-10">
            <span className="font-mono text-[0.65rem] tracking-[0.28em] text-accent uppercase">
              [ADMIN DASHBOARD]
            </span>
            <h2 className="font-display text-xl font-bold mt-2 text-ink">
              Trevalt Ops
            </h2>
          </div>

          <nav className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest text-muted flex-grow">
            <Link href="/admin" className="hover:text-accent transition-colors">
              Requests Log
            </Link>
            <Link href="/admin/clients" className="hover:text-accent transition-colors">
              Client Roster
            </Link>
            <Link href="/admin/projects" className="hover:text-accent transition-colors">
              Active Projects
            </Link>
            <Link href="/admin/materials" className="hover:text-accent transition-colors">
              Materials Vault
            </Link>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto">
          {children}
        </main>
      </div>
    </SiteShell>
  );
}
