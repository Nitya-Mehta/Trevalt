'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { headers } from 'next/headers';
import crypto from 'crypto';

function hashIp(ip: string) {
  const secret = process.env.IP_HASH_SECRET || 'default-trevalt-secret';
  return crypto.createHmac('sha256', secret).update(ip).digest('hex');
}

export async function submitContactForm(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const project_type = formData.get('project_type') as string;
  const budget_range = formData.get('budget_range') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { error: 'Name, email, and message are required.' };
  }

  // Get IP address safely in Next.js App Router
  const forwardedFor = headers().get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';
  
  const ip_hash = hashIp(ip);
  const adminClient = createAdminClient();

  // Rate Limiting Logic: Max 3 requests per 7 days per IP hash or Email
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { count, error: countError } = await adminClient
    .from('requests')
    .select('*', { count: 'exact', head: true })
    .or(`ip_hash.eq.${ip_hash},email.eq.${email}`)
    .gte('created_at', sevenDaysAgo.toISOString());

  if (countError) {
    console.error('Rate limit check error:', countError);
    return { error: 'Failed to process request. Please try again later.' };
  }

  if (count !== null && count >= 3) {
    return { error: "You've reached the limit of 3 requests this week. We'll be in touch on your existing submissions soon." };
  }

  // Insert the request
  const { error: insertError } = await adminClient
    .from('requests')
    .insert({
      name,
      email,
      project_type,
      budget_range,
      message,
      ip_hash
    });

  if (insertError) {
    console.error('Insert request error:', insertError);
    return { error: 'Failed to submit request. Please try again later.' };
  }

  return { success: true };
}
