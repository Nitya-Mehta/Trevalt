'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createProject } from '@/app/actions/projects';
import { useState, useEffect } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-sm border border-accent bg-accent/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent hover:bg-accent/20 transition-colors disabled:opacity-50"
    >
      {pending ? 'Creating...' : 'Create Project'}
    </button>
  );
}

export function ProvisionProjectForm({ clients }: { clients: { id: string, full_name: string, email: string }[] }) {
  const [state, formAction] = useFormState(createProject, null);
  const [isOpen, setIsOpen] = useState(false);

  // If successful, redirect or close form
  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
      // Wait for revalidation, you could also redirect to /admin/projects/[id] here
      window.location.href = `/admin/projects/${state.projectId}`;
    }
  }, [state]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="font-mono text-xs uppercase tracking-widest text-ink hover:text-accent transition-colors underline mb-8 block"
      >
        {isOpen ? 'Close Form' : '+ New Project Workspace'}
      </button>

      {isOpen && (
        <div className="border border-border bg-card/25 p-6 rounded-sm mb-12">
          <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent mb-6 border-b border-border/50 pb-4">
            [INITIALIZE NEW PROJECT]
          </span>

          <form action={formAction} className="grid gap-6">
            {state?.error && (
              <div className="p-3 border border-red-500/50 bg-red-500/10 text-red-500 text-sm">
                {state.error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">Project Title</label>
                <input
                  required
                  name="title"
                  type="text"
                  placeholder="e.g. Acme Corp Redesign"
                  className="rounded-sm border border-border bg-card px-4 py-2 text-sm text-ink outline-none focus:border-accent"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">Assign to Client</label>
                <select
                  required
                  name="client_id"
                  defaultValue=""
                  className="rounded-sm border border-border bg-card px-4 py-2 text-sm text-ink outline-none focus:border-accent"
                >
                  <option value="" disabled>-- Select a provisioned client --</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.full_name} ({c.email})</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <SubmitButton />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
