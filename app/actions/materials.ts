'use server';

import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function addMaterial(prevState: any, formData: FormData) {
  const supabase = await createClient();
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

  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const url = formData.get('url') as string;

  if (!name || !category || !url) {
    return { error: 'Name, Category, and URL are required.' };
  }

  let formattedUrl = url;
  if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
    formattedUrl = 'https://' + formattedUrl;
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient
    .from('materials')
    .insert({
      name,
      category,
      description,
      url: formattedUrl
    });

  if (error) {
    console.error('Insert material error:', error);
    return { error: 'Failed to add material. Please try again.' };
  }

  revalidatePath('/admin/materials');
  return { success: 'Material added successfully.' };
}
