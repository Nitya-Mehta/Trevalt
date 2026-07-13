import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
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

  if (profile?.role !== 'client') {
    if (profile?.role === 'admin') {
      redirect('/admin');
    }
    redirect('/login?error=Invalid+account+configuration.+Contact+support.');
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <header className="border-b border-border bg-card/50 px-6 md:px-12 py-4 flex justify-between items-center">
        <div>
          <span className="font-mono text-[0.65rem] tracking-[0.28em] text-accent uppercase block">
            [CLIENT_ENCLAVE]
          </span>
          <h2 className="font-display text-lg font-bold mt-1 text-ink">
            Trevalt Projects
          </h2>
        </div>
        
        <form action="/auth/signout" method="post">
          <button className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors">
            Disconnect
          </button>
        </form>
      </header>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-w-[var(--page-max)] w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
