import { createAdminClient } from '@/utils/supabase/admin';

export default async function AdminProjectsPage() {
  const adminClient = createAdminClient();
  
  // Fetch all projects along with deliverables, payments, and client profile info
  const { data: projects, error } = await adminClient
    .from('client_projects')
    .select(`
      *,
      client:profiles(full_name, email),
      deliverables(*),
      payments(*)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-display">Active Projects</h1>
        <p className="mt-2 text-muted font-mono text-xs uppercase tracking-widest">
          Global Scope Overview // Enclave Management
        </p>
      </div>

      {error && (
        <div className="p-4 border border-red-500 bg-red-500/10 text-red-500 text-sm">
          Failed to load active projects.
        </div>
      )}

      {projects?.length === 0 && (
        <div className="p-12 border border-border bg-card/25 text-center text-muted font-mono text-xs uppercase tracking-widest">
          No active projects in the registry.
        </div>
      )}

      <div className="grid gap-12">
        {projects?.map((project) => (
          <div key={project.id} className="border border-border bg-card/25 rounded-sm overflow-hidden">
            
            {/* Project Header */}
            <div className="p-6 md:p-8 border-b border-border bg-card/50 flex flex-col md:flex-row justify-between gap-6 md:items-center">
              <div>
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-accent block mb-2">
                  [CLIENT: {project.client?.full_name || 'UNKNOWN'}]
                </span>
                <h3 className="font-display text-2xl font-bold text-ink">{project.title}</h3>
                <a href={`mailto:${project.client?.email}`} className="font-mono text-xs text-muted hover:text-accent transition-colors block mt-1">
                  {project.client?.email}
                </a>
              </div>
              <div className="px-3 py-1 border border-accent/30 bg-accent/10 rounded-sm w-max">
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-accent">
                  {project.status}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
              {/* Deliverables Column */}
              <div className="p-6 md:p-8">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted block mb-6">
                  [DELIVERABLES_MATRIX]
                </span>
                
                {project.deliverables?.length === 0 ? (
                  <p className="text-sm text-muted">No deliverables populated.</p>
                ) : (
                  <ul className="space-y-4">
                    {project.deliverables?.map((del: any) => (
                      <li key={del.id} className="flex justify-between items-start gap-4">
                        <div>
                          <p className="text-sm font-medium text-ink">{del.title}</p>
                          {del.due_date && (
                            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted mt-1">
                              TGT: {del.due_date}
                            </p>
                          )}
                        </div>
                        <span className={`font-mono text-[0.6rem] uppercase tracking-widest px-2 py-0.5 border rounded-sm ${
                          del.status === 'done' 
                            ? 'border-green-500/30 text-green-500 bg-green-500/10' 
                            : del.status === 'in_progress'
                            ? 'border-accent/30 text-accent bg-accent/10'
                            : 'border-border text-muted bg-card'
                        }`}>
                          {del.status.replace('_', ' ')}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Payments Column */}
              <div className="p-6 md:p-8">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted block mb-6">
                  [PAYMENT_LEDGER]
                </span>
                
                {project.payments?.length === 0 ? (
                  <p className="text-sm text-muted">No pending transfers.</p>
                ) : (
                  <ul className="space-y-4">
                    {project.payments?.map((pay: any) => (
                      <li key={pay.id} className="flex justify-between items-start gap-4">
                        <div>
                          <p className="text-sm font-medium text-ink">${pay.amount}</p>
                          {pay.due_date && (
                            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted mt-1">
                              DUE: {pay.due_date}
                            </p>
                          )}
                        </div>
                        <span className={`font-mono text-[0.6rem] uppercase tracking-widest px-2 py-0.5 border rounded-sm ${
                          pay.status === 'paid' 
                            ? 'border-green-500/30 text-green-500 bg-green-500/10' 
                            : 'border-red-500/30 text-red-500 bg-red-500/10'
                        }`}>
                          {pay.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
