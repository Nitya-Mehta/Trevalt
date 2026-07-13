'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { addMaterial } from '@/app/actions/materials';
import { useState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-4 rounded-sm border border-accent bg-accent/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent hover:bg-accent/20 transition-colors disabled:opacity-50"
    >
      {pending ? 'Saving...' : 'Save Material'}
    </button>
  );
}

export function AddMaterialForm() {
  const [state, formAction] = useFormState(addMaterial, null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-display">Materials Vault</h1>
          <p className="mt-2 text-muted font-mono text-xs uppercase tracking-widest">
            Resources // Documentation // Bookmarks
          </p>
        </div>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="font-mono text-xs uppercase tracking-widest text-ink hover:text-accent transition-colors underline"
        >
          {isFormOpen ? 'Close Form' : '+ New Bookmark'}
        </button>
      </div>

      {isFormOpen && (
        <div className="border border-border bg-card/25 p-6 rounded-sm mb-8">
          <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent mb-6">
            [ADD NEW RESOURCE]
          </span>
          <form action={formAction} className="grid gap-6">
            {state?.success && (
              <div className="p-3 border border-green-500/50 bg-green-500/10 text-green-500 text-sm font-mono uppercase tracking-widest">
                {state.success}
              </div>
            )}
            {state?.error && (
              <div className="p-3 border border-red-500/50 bg-red-500/10 text-red-500 text-sm">
                {state.error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[NAME]</label>
                <input
                  required
                  name="name"
                  placeholder="e.g. Supabase Docs"
                  className="rounded-sm border border-border bg-card px-4 py-2 text-sm text-ink outline-none focus:border-accent"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[CATEGORY]</label>
                <input
                  required
                  name="category"
                  placeholder="e.g. Backend, Inspiration, Tooling"
                  className="rounded-sm border border-border bg-card px-4 py-2 text-sm text-ink outline-none focus:border-accent"
                />
              </div>

              <div className="grid gap-2 md:col-span-2">
                <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[URL]</label>
                <input
                  required
                  name="url"
                  type="url"
                  placeholder="https://supabase.com/docs"
                  className="rounded-sm border border-border bg-card px-4 py-2 text-sm text-ink outline-none focus:border-accent"
                />
              </div>

              <div className="grid gap-2 md:col-span-2">
                <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[OPTIONAL DESCRIPTION]</label>
                <textarea
                  name="description"
                  placeholder="Optional brief description about what this is for..."
                  rows={2}
                  className="rounded-sm border border-border bg-card px-4 py-2 text-sm text-ink outline-none focus:border-accent resize-none"
                />
              </div>
            </div>

            <SubmitButton />
          </form>
        </div>
      )}
    </>
  );
}
