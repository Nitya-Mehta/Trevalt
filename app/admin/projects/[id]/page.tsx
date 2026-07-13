import { createAdminClient } from '@/utils/supabase/admin';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ProjectMetadata } from '@/components/project-metadata';
import { ProjectTimeline } from '@/components/project-timeline';
import { NotionTaskEngine } from '@/components/notion-task-engine';

export default async function ProjectWorkspacePage({ params }: { params: { id: string } }) {
  const adminClient = createAdminClient();

  // Fetch project with payments
  const { data: project } = await adminClient
    .from('client_projects')
    .select(`
      *,
      client:profiles!client_projects_client_id_fkey(full_name, email),
      payments(*)
    `)
    .eq('id', params.id)
    .single();

  if (!project) notFound();

  // Fetch tasks for the project
  const { data: tasks } = await adminClient
    .from('project_tasks')
    .select('*')
    .eq('project_id', project.id)
    .order('created_at', { ascending: true });

  return (
    <div className="space-y-16 pb-24">
      {/* Header Backlink */}
      <div>
        <Link href="/admin/projects" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors">
          &larr; Back to Directory
        </Link>
      </div>

      {/* Zone A: Metadata & Scope */}
      <ProjectMetadata project={project} />

      {/* Zone B: Milestones & Money */}
      <ProjectTimeline project={project} tasks={tasks || []} projectId={project.id} />

      {/* Zone C: Notion Task Engine */}
      <div className="pt-8 border-t border-border">
        <NotionTaskEngine projectId={project.id} tasks={tasks || []} />
      </div>
    </div>
  );
}
