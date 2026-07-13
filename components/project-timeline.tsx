'use client';

import { useState } from 'react';
import { createPayment, updatePayment, deletePayment } from '@/app/actions/projects';

export function ProjectTimeline({ project, tasks, projectId, readOnly = false }: { project: any, tasks: any[], projectId: string, readOnly?: boolean }) {
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [newPaymentAmount, setNewPaymentAmount] = useState<number | ''>('');
  const [newPaymentDate, setNewPaymentDate] = useState('');

  const handleCreatePayment = async () => {
    if (!newPaymentAmount) return;
    await createPayment(projectId, { amount: Number(newPaymentAmount), due_date: newPaymentDate || null });
    setIsAddingPayment(false);
    setNewPaymentAmount('');
    setNewPaymentDate('');
  };

  // 1. Calculate Budget Progress
  const totalBudget = project.total_budget || 0;
  const totalPaid = project.payments?.filter((p: any) => p.status === 'paid').reduce((sum: number, p: any) => sum + p.amount, 0) || 0;
  const progressPercent = totalBudget > 0 ? Math.min(100, Math.round((totalPaid / totalBudget) * 100)) : 0;

  // 2. Chronological timeline generation
  // We want to extract every unique date from Tasks and Payments, then group items by date.
  const dateMap = new Map<string, { payments: any[], tasks: any[] }>();

  // Add payments
  project.payments?.forEach((p: any) => {
    if (!p.due_date) return;
    if (!dateMap.has(p.due_date)) dateMap.set(p.due_date, { payments: [], tasks: [] });
    dateMap.get(p.due_date)!.payments.push(p);
  });

  // Add tasks (only those with a target_date)
  tasks.forEach(t => {
    if (!t.target_date) return;
    if (!dateMap.has(t.target_date)) dateMap.set(t.target_date, { payments: [], tasks: [] });
    dateMap.get(t.target_date)!.tasks.push(t);
  });

  // Sort dates chronologically
  const sortedDates = Array.from(dateMap.keys()).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  return (
    <div className="space-y-8 p-6 border border-border bg-card/25 rounded-sm">
      
      {/* Top Ledger summary */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">Milestone Timeline</h2>
          <div className="flex items-center gap-4 mt-1">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">Chronological ledger of tasks and payments</p>
            {!readOnly && (
              <button 
                onClick={() => setIsAddingPayment(true)}
                className="font-mono text-[0.65rem] uppercase tracking-widest text-ink hover:text-accent transition-colors underline"
              >
                + Add Payment
              </button>
            )}
          </div>
        </div>

        <div className="text-right">
          <div className="font-mono text-xs text-muted uppercase tracking-widest mb-2">
            <span className="text-green-500">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: project.currency || 'USD', maximumFractionDigits: 0 }).format(totalPaid)}
            </span> Paid // {new Intl.NumberFormat('en-US', { style: 'currency', currency: project.currency || 'USD', maximumFractionDigits: 0 }).format(totalBudget)} Total
          </div>
          <div className="w-full md:w-48 h-1 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {isAddingPayment && (
        <div className="flex flex-col md:flex-row gap-4 p-4 border border-accent/50 bg-accent/5 rounded-sm mb-8">
          <div className="flex-1 flex gap-2">
            <span className="text-muted self-center">{project.currency || 'USD'}</span>
            <input 
              type="number" 
              placeholder="Amount"
              value={newPaymentAmount}
              onChange={e => setNewPaymentAmount(Number(e.target.value))}
              className="bg-transparent border-none text-sm outline-none font-mono"
              autoFocus
            />
          </div>
          <input 
            type="date"
            value={newPaymentDate}
            onChange={e => setNewPaymentDate(e.target.value)}
            className="bg-transparent border-none text-sm font-mono outline-none text-muted"
          />
          <div className="flex gap-4">
            <button onClick={handleCreatePayment} className="font-mono text-xs uppercase text-accent">Save Payment</button>
            <button onClick={() => setIsAddingPayment(false)} className="font-mono text-xs uppercase text-muted">Cancel</button>
          </div>
        </div>
      )}

      {sortedDates.length === 0 ? (
        <div className="p-8 border border-border border-dashed bg-card/10 text-center text-muted font-mono text-xs uppercase tracking-widest rounded-sm">
          No dated milestones or tasks available.
        </div>
      ) : (
        <div className="relative border-l border-border/50 ml-2 space-y-8 py-4">
          {sortedDates.map(date => {
            const group = dateMap.get(date)!;
            
            return (
              <div key={date} className="relative pl-6">
                {/* Node marker */}
                <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-accent" />
                
                <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink mb-4">
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </h3>

                <div className="grid gap-3">
                  {/* Render Payments for this date */}
                  {group.payments.map((p: any) => (
                    <div key={p.id} className="flex justify-between items-center p-3 border border-green-500/30 bg-green-500/5 rounded-sm">
                      <span className="text-sm font-medium text-ink flex items-center gap-2">
                        <span className="font-mono text-xs text-green-500">[PAYMENT]</span>
                        Milestone Due
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm text-green-500">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: project.currency || 'USD', maximumFractionDigits: 0 }).format(p.amount)}
                        </span>
                        {!readOnly && p.status === 'pending' ? (
                          <div className="flex gap-2">
                            <button 
                              onClick={async () => await updatePayment(p.id, projectId, { status: 'paid' })}
                              className="font-mono text-[0.6rem] uppercase tracking-widest px-2 py-1 border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 rounded-sm transition-colors"
                            >
                              Mark Paid
                            </button>
                            <button 
                              onClick={async () => {
                                if (confirm('Are you sure you want to delete this payment milestone?')) {
                                  await deletePayment(p.id, projectId);
                                }
                              }}
                              className="font-mono text-[0.6rem] uppercase tracking-widest px-2 py-1 border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-sm transition-colors"
                            >
                              Del
                            </button>
                          </div>
                        ) : (
                          <span className={`font-mono text-[0.6rem] uppercase tracking-widest px-2 py-1 border rounded-sm ${p.status === 'paid' ? 'border-green-500/30 text-green-500' : 'border-yellow-500/30 text-yellow-500'}`}>
                            {p.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Render Tasks for this date */}
                  {group.tasks.map((t: any) => (
                    <div key={t.id} className="flex justify-between items-center p-3 border border-border bg-card/50 rounded-sm">
                      <span className={`text-sm ${t.is_completed ? 'line-through text-muted' : 'text-ink'}`}>
                        {t.title}
                      </span>
                      <span className={`font-mono text-[0.6rem] uppercase tracking-widest px-2 py-1 border rounded-sm ${t.is_completed ? 'border-border text-muted' : 'border-accent/30 text-accent bg-accent/10'}`}>
                        {t.is_completed ? 'Completed' : 'Pending Task'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
