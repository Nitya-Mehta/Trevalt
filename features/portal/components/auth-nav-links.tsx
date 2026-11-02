'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export function AuthNavLinks() {
  const [role, setRole] = useState<'admin' | 'client' | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile) {
        setRole(profile.role);
      }
    };

    fetchRole();
  }, []);

  if (!role) return null;

  return (
    <div className="flex items-center ml-2 pl-4 border-l border-border/50 gap-4">
      <Link 
        href={role === 'admin' ? '/admin' : '/dashboard'} 
        className="text-accent transition-colors duration-200 ease-smooth hover:text-ink"
      >
        {role === 'admin' ? 'Admin Dashboard' : 'Client Dashboard'}
      </Link>
      <form action="/auth/signout" method="post" className="m-0">
        <button className="text-red-500 hover:text-red-400 transition-colors uppercase tracking-[0.18em]">
          Sign Out
        </button>
      </form>
    </div>
  );
}
