import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ProjectTimeline } from '@/components/project-timeline';
import { NotionTaskEngine } from '@/components/notion-task-engine';

export default async function ClientProjectWorkspacePage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  // Fetch project with payments (RLS ensures they only see their own)
  const { data: project } = await supabase
    .from('client_projects')
    .select(`
      *,
      payments(*)
    `)
    .eq('id', params.id)
    .single();

  if (!project) notFound();

  // Fetch tasks for the project
  const { data: tasks } = await supabase
    .from('project_tasks')
    .select('*')
    .eq('project_id', project.id)
    .order('created_at', { ascending: true });

  return (
    <div className="space-y-16 pb-24">
      {/* Header Backlink */}
      <div>
        <Link href="/dashboard" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors">
          &larr; Back to Active Scopes
        </Link>
      </div>

      {/* Zone A: Read-Only Metadata & Scope */}
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-display">{project.title}</h1>
            {project.company_name && (
              <p className="mt-2 text-accent font-mono text-xs uppercase tracking-widest">
                {project.company_name}
              </p>
            )}
            <p className="mt-4 text-muted max-w-2xl">{project.description || 'No description provided.'}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 p-6 border border-border bg-card/25 rounded-sm">
          <div>
            <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-1">Start Date</span>
            <span className="font-mono text-sm">{project.start_date || 'TBD'}</span>
          </div>
          <div>
            <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-1">Target Date</span>
            <span className="font-mono text-sm">{project.target_date || 'TBD'}</span>
          </div>
          <div>
            <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-1">Total Budget</span>
            <span className="font-mono text-sm text-green-500">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: project.currency || 'USD', maximumFractionDigits: 0 }).format(project.total_budget || 0)}
            </span>
          </div>
          <div>
            <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-1">Remaining</span>
            <span className="font-mono text-sm text-yellow-500">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: project.currency || 'USD', maximumFractionDigits: 0 }).format(
                Math.max(0, (project.total_budget || 0) - (project.payments?.filter((p: any) => p.status === 'paid').reduce((sum: number, p: any) => sum + p.amount, 0) || 0))
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Zone B: Milestones & Money */}
      <ProjectTimeline project={project} tasks={tasks || []} projectId={project.id} readOnly={true} />

      {/* Zone C: Notion Task Engine (READ ONLY) */}
      <div className="pt-8 border-t border-border">
        <NotionTaskEngine projectId={project.id} tasks={tasks || []} readOnly={true} />
      </div>

      {/* Moved Zone A content (Agreement & Scope) to bottom */}
      <div className="pt-8 border-t border-border space-y-6">
        <div className="p-6 border border-border bg-card/25 rounded-sm flex items-center justify-between">
          <div>
            <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-1">Signed Agreement</span>
            {project.agreement_url ? (
              <a href={project.agreement_url} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-accent hover:underline">
                View Contract &nearr;
              </a>
            ) : (
              <span className="font-mono text-sm text-muted">None linked</span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border border-border bg-card/25 rounded-sm">
            <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent mb-4">[INCLUDED IN SCOPE]</h3>
            <p className="text-sm text-muted whitespace-pre-wrap">{project.scope_included || 'No scope defined.'}</p>
          </div>
          <div className="p-6 border border-border bg-card/25 rounded-sm">
            <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-red-500 mb-4">[OUT OF SCOPE]</h3>
            <p className="text-sm text-muted whitespace-pre-wrap">{project.scope_excluded || 'No exclusions defined.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
