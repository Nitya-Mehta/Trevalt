import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-paper text-ink flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-r border-border bg-card/50 p-6 shrink-0 flex flex-col">
        <div className="mb-10">
          <span className="font-mono text-[0.65rem] tracking-[0.28em] text-accent uppercase">
            [SYS_ADMIN_CORE]
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

        <div className="mt-10 pt-6 border-t border-border">
          <form action="/auth/signout" method="post">
            <button className="font-mono text-xs uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors">
              Terminate Session
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
