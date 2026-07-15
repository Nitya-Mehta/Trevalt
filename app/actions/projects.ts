'use server';

import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

// Middleware logic for server actions to ensure caller is admin
async function verifyAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') throw new Error('Forbidden');
  return user;
}

export async function createProject(prevState: any, formData: FormData) {
  try {
    await verifyAdmin();
    const title = formData.get('title') as string;
    const client_id = formData.get('client_id') as string;

    if (!title || !client_id) {
      return { error: 'Project title and assigned client are required.' };
    }

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('client_projects')
      .insert({ title, client_id, status: 'active' })
      .select()
      .single();

    if (error) return { error: error.message };

    revalidatePath('/admin/projects');
    return { success: 'Project created successfully!', projectId: data.id };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function updateProjectMetadata(
  projectId: string, 
  data: {
    description?: string;
    company_name?: string;
    start_date?: string;
    target_date?: string;
    total_budget?: number;
    currency?: string;
    scope_included?: string;
    scope_excluded?: string;
    agreement_url?: string;
  }
) {
  try {
    await verifyAdmin();
    const adminClient = createAdminClient();
    const { error } = await adminClient
      .from('client_projects')
      .update(data)
      .eq('id', projectId);

    if (error) return { error: error.message };
    revalidatePath(`/admin/projects/${projectId}`);
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function createTask(
  projectId: string,
  data: {
    title: string;
    description?: string;
    parent_id?: string | null;
    target_date?: string | null;
  }
) {
  try {
    await verifyAdmin();
    const adminClient = createAdminClient();
    const { data: task, error } = await adminClient
      .from('project_tasks')
      .insert({
        project_id: projectId,
        title: data.title,
        description: data.description,
        parent_id: data.parent_id,
        target_date: data.target_date
      })
      .select()
      .single();

    if (error) return { error: error.message };
    revalidatePath(`/admin/projects/${projectId}`);
    return { success: true, task };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function updateTask(
  taskId: string,
  projectId: string,
  data: {
    title?: string;
    description?: string;
    target_date?: string | null;
    is_completed?: boolean;
    tags?: string[];
  }
) {
  try {
    await verifyAdmin();
    const adminClient = createAdminClient();
    const { error } = await adminClient
      .from('project_tasks')
      .update(data)
      .eq('id', taskId);

    if (error) return { error: error.message };
    revalidatePath(`/admin/projects/${projectId}`);
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function deleteTask(taskId: string, projectId: string) {
  try {
    await verifyAdmin();
    const adminClient = createAdminClient();
    const { error } = await adminClient
      .from('project_tasks')
      .delete()
      .eq('id', taskId);

    if (error) return { error: error.message };
    revalidatePath(`/admin/projects/${projectId}`);
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function createPayment(
  projectId: string,
  data: {
    amount: number;
    due_date?: string | null;
  }
) {
  try {
    await verifyAdmin();
    const adminClient = createAdminClient();
    const { error } = await adminClient
      .from('payments')
      .insert({
        project_id: projectId,
        amount: data.amount,
        due_date: data.due_date
      });

    if (error) return { error: error.message };
    revalidatePath(`/admin/projects/${projectId}`);
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function updatePayment(
  paymentId: string,
  projectId: string,
  data: {
    status?: string;
  }
) {
  try {
    await verifyAdmin();
    const adminClient = createAdminClient();
    const { error } = await adminClient
      .from('payments')
      .update({
        ...data,
        paid_at: data.status === 'paid' ? new Date().toISOString() : null
      })
      .eq('id', paymentId);

    if (error) return { error: error.message };
    revalidatePath(`/admin/projects/${projectId}`);
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function deletePayment(paymentId: string, projectId: string) {
  try {
    await verifyAdmin();
    const adminClient = createAdminClient();
    const { error } = await adminClient
      .from('payments')
      .delete()
      .eq('id', paymentId);

    if (error) return { error: error.message };
    revalidatePath(`/admin/projects/${projectId}`);
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}
