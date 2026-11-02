import { createAdminClient } from '@/utils/supabase/admin';
import { RequestsDashboard } from '@/components/requests-dashboard';

export default async function AdminRequestsPage() {
  const adminClient = createAdminClient();

  // Fetch all requests
  const { data: requests, error } = await adminClient
    .from('requests')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-display">Inbound Requests</h1>
        <p className="mt-2 text-muted font-mono text-xs uppercase tracking-widest">
          Incoming project requests
        </p>
      </div>

      {error && (
        <div className="p-4 border border-red-500 bg-red-500/10 text-red-500 text-sm">
          Failed to load requests.
        </div>
      )}

      {requests && <RequestsDashboard initialRequests={requests} />}
    </div>
  );
}
