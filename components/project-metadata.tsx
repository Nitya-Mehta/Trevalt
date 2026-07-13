'use client';

import { useState } from 'react';
import { updateProjectMetadata } from '@/app/actions/projects';

export function ProjectMetadata({ project }: { project: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    description: project.description || '',
    company_name: project.company_name || '',
    start_date: project.start_date || '',
    target_date: project.target_date || '',
    total_budget: project.total_budget || 0,
    currency: project.currency || 'USD',
    scope_included: project.scope_included || '',
    scope_excluded: project.scope_excluded || '',
    agreement_url: project.agreement_url || ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const res = await updateProjectMetadata(project.id, formData);
    if (!res.error) {
      setIsEditing(false);
    } else {
      alert(res.error);
    }
    setIsSaving(false);
  };

  if (!isEditing) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-display">{project.title}</h1>
            {formData.company_name && (
              <p className="mt-2 text-accent font-mono text-xs uppercase tracking-widest">
                {formData.company_name}
              </p>
            )}
            <p className="mt-4 text-muted max-w-2xl">{formData.description || 'No description provided.'}</p>
          </div>
          <button 
            onClick={() => setIsEditing(true)}
            className="font-mono text-xs uppercase tracking-widest text-ink hover:text-accent underline transition-colors"
          >
            Edit Info
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 p-6 border border-border bg-card/25 rounded-sm">
          <div>
            <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-1">Start Date</span>
            <span className="font-mono text-sm">{formData.start_date || 'TBD'}</span>
          </div>
          <div>
            <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-1">Target Date</span>
            <span className="font-mono text-sm">{formData.target_date || 'TBD'}</span>
          </div>
          <div>
            <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-1">Total Budget</span>
            <span className="font-mono text-sm text-green-500">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: formData.currency, maximumFractionDigits: 0 }).format(formData.total_budget)}
            </span>
          </div>
          <div>
            <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-1">Remaining</span>
            <span className="font-mono text-sm text-yellow-500">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: formData.currency, maximumFractionDigits: 0 }).format(
                Math.max(0, formData.total_budget - (project.payments?.filter((p: any) => p.status === 'paid').reduce((sum: number, p: any) => sum + p.amount, 0) || 0))
              )}
            </span>
          </div>
        </div>

        <div className="pt-8 space-y-6">
          <div className="p-6 border border-border bg-card/25 rounded-sm flex items-center justify-between">
            <div>
              <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-1">Signed Agreement</span>
              {formData.agreement_url ? (
                <a href={formData.agreement_url} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-accent hover:underline">
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
              <p className="text-sm text-muted whitespace-pre-wrap">{formData.scope_included || 'No scope defined.'}</p>
            </div>
            <div className="p-6 border border-border bg-card/25 rounded-sm">
              <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-red-500 mb-4">[OUT OF SCOPE]</h3>
              <p className="text-sm text-muted whitespace-pre-wrap">{formData.scope_excluded || 'No exclusions defined.'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 border border-accent/50 p-6 rounded-sm bg-card/25">
      <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">Edit Workspace Metadata</span>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsEditing(false)}
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="font-mono text-xs uppercase tracking-widest px-3 py-1 bg-accent text-paper rounded-sm disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <label className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">Company Name</label>
          <input 
            type="text" 
            value={formData.company_name} 
            onChange={e => setFormData({...formData, company_name: e.target.value})}
            className="bg-card border border-border px-3 py-2 text-sm outline-none focus:border-accent rounded-sm"
          />
        </div>
        <div className="grid gap-2">
          <label className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">Total Budget</label>
          <div className="flex gap-2">
            <select 
              value={formData.currency}
              onChange={e => setFormData({...formData, currency: e.target.value})}
              className="bg-card border border-border px-3 py-2 text-sm outline-none focus:border-accent rounded-sm font-mono w-24"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
            <input 
              type="number" 
              value={formData.total_budget} 
              onChange={e => setFormData({...formData, total_budget: Number(e.target.value)})}
              className="bg-card border border-border px-3 py-2 text-sm outline-none focus:border-accent rounded-sm font-mono flex-1"
            />
          </div>
        </div>
        <div className="grid gap-2 md:col-span-2">
          <label className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">Brief Description</label>
          <textarea 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="bg-card border border-border px-3 py-2 text-sm outline-none focus:border-accent rounded-sm min-h-[80px]"
          />
        </div>
        <div className="grid gap-2">
          <label className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">Start Date</label>
          <input 
            type="date" 
            value={formData.start_date} 
            onChange={e => setFormData({...formData, start_date: e.target.value})}
            className="bg-card border border-border px-3 py-2 text-sm outline-none focus:border-accent rounded-sm font-mono"
          />
        </div>
        <div className="grid gap-2">
          <label className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">Target Completion Date</label>
          <input 
            type="date" 
            value={formData.target_date} 
            onChange={e => setFormData({...formData, target_date: e.target.value})}
            className="bg-card border border-border px-3 py-2 text-sm outline-none focus:border-accent rounded-sm font-mono"
          />
        </div>
        <div className="grid gap-2 md:col-span-2">
          <label className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">Agreement URL (Doc/PDF)</label>
          <input 
            type="url" 
            value={formData.agreement_url} 
            onChange={e => setFormData({...formData, agreement_url: e.target.value})}
            className="bg-card border border-border px-3 py-2 text-sm outline-none focus:border-accent rounded-sm"
          />
        </div>
        <div className="grid gap-2 md:col-span-2">
          <label className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">Scope: Included (Plain English)</label>
          <textarea 
            value={formData.scope_included} 
            onChange={e => setFormData({...formData, scope_included: e.target.value})}
            className="bg-card border border-border px-3 py-2 text-sm outline-none focus:border-accent rounded-sm min-h-[120px]"
          />
        </div>
        <div className="grid gap-2 md:col-span-2">
          <label className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">Scope: Excluded (Anti-Creep)</label>
          <textarea 
            value={formData.scope_excluded} 
            onChange={e => setFormData({...formData, scope_excluded: e.target.value})}
            className="bg-card border border-border px-3 py-2 text-sm outline-none focus:border-accent rounded-sm min-h-[120px]"
          />
        </div>
      </div>
    </div>
  );
}
