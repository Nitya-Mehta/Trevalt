import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function ClientDashboardPage() {
  const supabase = createClient();
  
  // RLS ensures the user only sees their own projects
  const { data: projects, error: projectsError } = await supabase
    .from('client_projects')
    .select('id, title, status, created_at')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-display">Active Scopes</h1>
        <p className="mt-2 text-muted font-mono text-xs uppercase tracking-widest">
          Project Tracker // Secure channel
        </p>
      </div>

      {projectsError && (
        <div className="p-4 border border-red-500 bg-red-500/10 text-red-500 text-sm">
          Failed to load projects.
        </div>
      )}

      {projects?.length === 0 && (
        <div className="p-12 border border-border bg-card/25 text-center text-muted font-mono text-xs uppercase tracking-widest">
          No active projects found.
        </div>
      )}

      <div className="grid gap-2">
        {projects?.map((project) => (
          <Link 
            key={project.id} 
            href={`/dashboard/projects/${project.id}`}
            className="block border border-border bg-card/25 rounded-sm p-4 hover:bg-card/50 hover:border-accent/50 transition-colors group"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="font-display text-lg font-bold text-ink group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted block mt-1">
                  [ID: {project.id.split('-')[0]}]
                </span>
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
