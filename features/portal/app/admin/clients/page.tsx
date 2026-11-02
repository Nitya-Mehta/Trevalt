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

  // Fetch all provisioned clients
  const { data: clients, error: clientsError } = await adminClient
    .from('profiles')
    .select('*')
    .eq('role', 'client')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-12">
      <ProvisionClientForm requests={requests || []} />

      <div className="space-y-4">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent block mb-2">
          [PROVISIONED CLIENTS]
        </span>

        {clientsError && (
          <div className="p-4 border border-red-500 bg-red-500/10 text-red-500 text-sm">
            Failed to load client roster.
          </div>
        )}

        {clients?.length === 0 ? (
          <div className="p-12 border border-border bg-card/25 text-center text-muted font-mono text-xs uppercase tracking-widest">
            No clients provisioned yet.
          </div>
        ) : (
          <div className="grid gap-2">
            {clients?.map((client) => (
              <div 
                key={client.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-border bg-card/25 rounded-sm"
              >
                <div>
                  <h3 className="font-display font-bold text-ink">{client.full_name}</h3>
                  <div className="text-sm text-muted mt-1">{client.email}</div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`font-mono text-[0.6rem] uppercase tracking-widest px-2 py-1 border rounded-sm whitespace-nowrap ${client.requires_password_change ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/10' : 'border-green-500/30 text-green-500 bg-green-500/10'}`}>
                    {client.requires_password_change ? 'Setup Pending' : 'Active'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
