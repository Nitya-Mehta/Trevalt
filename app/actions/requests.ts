'use server';

import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function updateRequestStatus(id: string, status: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized.' };

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return { error: 'Forbidden. Admin access required.' };
  }

  if (!['pending', 'in_progress', 'resolved'].includes(status)) {
    return { error: 'Invalid status.' };
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient
    .from('requests')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Update request status error:', error);
    return { error: 'Failed to update request status.' };
  }

  revalidatePath('/admin');
  return { success: true };
}
