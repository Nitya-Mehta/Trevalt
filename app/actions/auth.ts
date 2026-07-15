'use server';

import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const adminClient = createAdminClient();
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  // Check login rate limit: max 5 failed attempts in 24 hours
  const { count, error: countError } = await adminClient
    .from('login_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('email', email)
    .eq('success', false)
    .gte('created_at', twentyFourHoursAgo.toISOString());

  if (countError) {
    console.error('Login rate limit check error:', countError);
    return { error: 'An error occurred during sign in.' };
  }

  if (count !== null && count >= 5) {
    return { error: 'Too many failed login attempts. Please try again later or reset your password.' };
  }

  const supabase = await createClient();
  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const success = !signInError && !!data.user;

  // Log the attempt
  await adminClient.from('login_attempts').insert({ email, success });

  if (!success) {
    return { error: signInError?.message || 'Invalid credentials.' };
  }

  // Fetch role to determine redirect
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();

  if (profile?.role === 'admin') {
    redirect('/admin');
  } else {
    redirect('/dashboard');
  }
}

export async function forgotPassword(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return { error: 'Email is required.' };
  }

  const adminClient = createAdminClient();
  
  // Check profile
  const { data: profile, error: profileError } = await adminClient
    .from('profiles')
    .select('role')
    .eq('email', email)
    .maybeSingle();

  if (!profile) {
    // Return success anyway to avoid email enumeration
    return { success: 'If an account exists, a password reset email has been sent.' };
  }

  if (profile.role === 'admin') {
    return { error: 'Admin accounts cannot be reset via this flow. Contact system operations.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
  });

  if (error) {
    console.error('Reset password error:', error);
    return { error: 'Failed to send password reset email.' };
  }

  return { success: 'If an account exists, a password reset email has been sent.' };
}

export async function createClientAccount(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Unauthorized.' };
  }

  // Verify caller is admin
  const { data: callerProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (callerProfile?.role !== 'admin') {
    return { error: 'Forbidden. Admin access required.' };
  }

  const email = formData.get('email') as string;
  const fullName = formData.get('full_name') as string;
  const password = formData.get('password') as string;

  if (!email || !fullName || !password) {
    return { error: 'Email, full name, and password are required.' };
  }

  const adminClient = createAdminClient();

  // Create user with admin API (bypasses signup restrictions and auto-confirms)
  const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createError || !newUser.user) {
    console.error('Error creating user:', createError);
    return { error: createError?.message || 'Failed to create user account.' };
  }

  // Insert profile
  const { error: profileError } = await adminClient
    .from('profiles')
    .insert({
      id: newUser.user.id,
      email,
      full_name: fullName,
      role: 'client',
      requires_password_change: true
    });

  if (profileError) {
    console.error('Error creating profile:', profileError);
    // Cleanup auth user if profile fails
    await adminClient.auth.admin.deleteUser(newUser.user.id);
    return { error: 'Failed to create client profile.' };
  }

  revalidatePath('/admin');
  return { success: `Client account created for ${email}.` };
}

export async function completeSetupWithNewPassword(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Unauthorized.' };
  }

  const password = formData.get('password') as string;
  if (!password || password.length < 6) {
    return { error: 'Password must be at least 6 characters long.' };
  }

  // Update auth password
  const { error: updateError } = await supabase.auth.updateUser({ password });
  if (updateError) {
    console.error('Error updating password:', updateError);
    return { error: updateError.message };
  }

  // Remove requires_password_change flag
  const adminClient = createAdminClient();
  const { error: profileError } = await adminClient
    .from('profiles')
    .update({ requires_password_change: false })
    .eq('id', user.id);

  if (profileError) {
    console.error('Error updating profile:', profileError);
    return { error: 'Password updated, but failed to complete setup flag.' };
  }

  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}

export async function keepTemporaryPassword() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Unauthorized.' };
  }

  // Remove requires_password_change flag
  const adminClient = createAdminClient();
  const { error: profileError } = await adminClient
    .from('profiles')
    .update({ requires_password_change: false })
    .eq('id', user.id);

  if (profileError) {
    console.error('Error updating profile:', profileError);
    return { error: 'Failed to complete setup.' };
  }

  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}
