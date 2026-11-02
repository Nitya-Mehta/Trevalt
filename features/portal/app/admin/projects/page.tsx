import { createAdminClient } from '@/utils/supabase/admin';
import Link from 'next/link';
import { ProvisionProjectForm } from '@/components/provision-project-form';

export default async function AdminProjectsPage() {
  const adminClient = createAdminClient();
  
  // Fetch all projects along with client profile info
  const { data: projects, error } = await adminClient
    .from('client_projects')
    .select(`
      id, title, status, created_at,
      client:profiles(full_name, email)
    `)
    .order('created_at', { ascending: false });

  // Fetch all clients for the dropdown
  const { data: clients } = await adminClient
    .from('profiles')
    .select('id, full_name, email')
    .eq('role', 'client')
    .order('full_name', { ascending: true });

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-display">Active Projects</h1>
          <p className="mt-2 text-muted font-mono text-xs uppercase tracking-widest">
            All active client workspaces
          </p>
        </div>
      </div>

      <ProvisionProjectForm clients={clients || []} />

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

      <div className="grid gap-2">
        {projects?.map((project) => (
          <Link 
            key={project.id} 
            href={`/admin/projects/${project.id}`}
            className="block border border-border bg-card/25 rounded-sm p-4 hover:bg-card/50 hover:border-accent/50 transition-colors group"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="font-display text-lg font-bold text-ink group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted mt-1">
                  Client: {(project.client as any)?.full_name || 'UNKNOWN'} ({(project.client as any)?.email})
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="font-mono text-[0.65rem] uppercase tracking-widest px-2 py-1 border border-accent/30 bg-accent/10 text-accent rounded-sm">
                  {project.status.replace('_', ' ')}
                </span>
                <span className="font-mono text-xs text-muted group-hover:text-accent transition-colors">
                  Open Workspace &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
