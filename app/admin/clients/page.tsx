import { createAdminClient } from '@/utils/supabase/admin';
import { ProvisionClientForm } from '@/components/provision-client-form';

export default async function AdminClientsPage() {
  const adminClient = createAdminClient();

  // Fetch recent requests to populate the autofill dropdown
  const { data: requests } = await adminClient
    .from('requests')
    .select('id, name, email')
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="space-y-12">
      <ProvisionClientForm requests={requests || []} />

      <div className="p-12 border border-border bg-card/25 text-center text-muted font-mono text-xs uppercase tracking-widest">
        Client list read-out disabled in this view.
      </div>
    </div>
  );
}
