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
  const [passwordInput, setPasswordInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredRequests = requests.filter(req => 
    req.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    req.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectRequest = (req: any) => {
    setNameInput(req.name);
    setEmailInput(req.email);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let tempPassword = '';
    for (let i = 0; i < 12; i++) {
      tempPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPasswordInput(tempPassword);
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
              [CREATE NEW CLIENT ACCOUNT]
            </span>
            
            <div className="flex items-center gap-2 relative">
              <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted whitespace-nowrap">Autofill:</label>
              <div className="relative w-48 md:w-64">
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  className="w-full bg-card border border-border rounded-sm px-2 py-1 text-xs outline-none focus:border-accent text-ink"
                />
                {showDropdown && searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-sm max-h-48 overflow-y-auto z-10 shadow-xl">
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map(req => (
                        <div
                          key={req.id}
                          className="px-3 py-2 text-xs border-b border-border/50 hover:bg-border/30 cursor-pointer last:border-0"
                          onClick={() => handleSelectRequest(req)}
                        >
                          <div className="font-bold truncate text-ink">{req.name}</div>
                          <div className="text-muted truncate">{req.email}</div>
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-xs text-muted">No matches found</div>
                    )}
                  </div>
                )}
              </div>
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
                <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[CLIENT NAME]</label>
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
                <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[EMAIL ADDRESS]</label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="client@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="rounded-sm border border-border bg-card px-4 py-2 text-sm text-ink outline-none focus:border-accent"
                />
              </div>

              <div className="grid gap-2 md:col-span-2">
                <label className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">[TEMPORARY PASSWORD]</label>
                <div className="flex gap-2">
                  <input
                    required
                    name="password"
                    type="text"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Generate a secure temporary password"
                    className="flex-1 rounded-sm border border-border bg-card px-4 py-2 text-sm text-ink outline-none focus:border-accent font-mono"
                  />
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="rounded-sm border border-border bg-card/50 px-4 py-2 text-xs font-mono uppercase tracking-widest text-muted hover:text-accent hover:border-accent transition-colors"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>

            <SubmitButton />
          </form>
        </div>
      )}
    </>
  );
}
