'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createClientAccount } from '@/app/actions/auth';
import { useState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-4 rounded-sm border border-accent bg-accent/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent hover:bg-accent/20 transition-colors disabled:opacity-50"
    >
      {pending ? 'Provisioning...' : 'Provision Client'}
    </button>
  );
}

export function ProvisionClientForm({ requests }: { requests: any[] }) {
  const [state, formAction] = useFormState(createClientAccount, null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  const handleSelectRequest = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      setNameInput('');
      setEmailInput('');
      return;
    }
    const req = requests.find((r) => r.id === selectedId);
    if (req) {
      setNameInput(req.name);
      setEmailInput(req.email);
    }
  };

  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-display">Client Roster</h1>
          <p className="mt-2 text-muted font-mono text-xs uppercase tracking-widest">
            Active Accounts // Provisioning
          </p>
        </div>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="font-mono text-xs uppercase tracking-widest text-ink hover:text-accent transition-colors underline"
        >
          {isFormOpen ? 'Close Form' : '+ New Client'}
        </button>
      </div>

      {isFormOpen && (
        <div className="border border-border bg-card/25 p-6 rounded-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-border/50 pb-4">
            <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent">
              [PROVISION_NEW_CLIENT]
            </span>
            
            <div className="flex items-center gap-2">
              <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">Autofill:</label>
              <select 
                className="bg-card border border-border rounded-sm px-2 py-1 text-xs outline-none focus:border-accent"
                onChange={handleSelectRequest}
                defaultValue=""
              >
                <option value="">-- Select from Requests --</option>
                {requests.map(req => (
                  <option key={req.id} value={req.id}>
                    {req.name} ({req.email})
                  </option>
                ))}
              </select>
            </div>
          </div>

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
                <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[PARAM_NAME]</label>
                <input
                  required
                  name="full_name"
                  placeholder="Client Name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="rounded-sm border border-border bg-card px-4 py-2 text-sm text-ink outline-none focus:border-accent"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[PARAM_EMAIL]</label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="client@enclave.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="rounded-sm border border-border bg-card px-4 py-2 text-sm text-ink outline-none focus:border-accent"
                />
              </div>

              <div className="grid gap-2 md:col-span-2">
                <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[PARAM_TEMP_PASSWORD]</label>
                <input
                  required
                  name="password"
                  type="text"
                  placeholder="Generate a secure temporary password"
                  className="rounded-sm border border-border bg-card px-4 py-2 text-sm text-ink outline-none focus:border-accent font-mono"
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
