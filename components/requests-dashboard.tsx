'use client';

import { useState, useMemo } from 'react';
import { updateRequestStatus } from '@/app/actions/requests';

type Request = {
  id: string;
  name: string;
  email: string;
  project_type: string;
  budget_range: string;
  message: string;
  status: string;
  created_at: string;
};

// Helper to convert "$15k - $30k" to a numeric value for sorting
function parseBudget(budgetStr: string) {
  if (!budgetStr) return 0;
  // matches the first instance of a number following a dollar sign
  const match = budgetStr.match(/\$(\d+)/);
  if (match) return parseInt(match[1], 10);
  return 0;
}

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

export function RequestsDashboard({ initialRequests }: { initialRequests: Request[] }) {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('latest'); // latest, oldest, price_high, price_low
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Derive filtered and sorted requests
  const processedRequests = useMemo(() => {
    let result = [...requests];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r => 
        r.name.toLowerCase().includes(q) || 
        r.email.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(r => (r.status || 'pending') === statusFilter);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (sortBy === 'price_high' || sortBy === 'price_low') {
        const valA = parseBudget(a.budget_range);
        const valB = parseBudget(b.budget_range);
        return sortBy === 'price_high' ? valB - valA : valA - valB;
      }
      return 0;
    });

    return result;
  }, [requests, search, statusFilter, sortBy]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistic update
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    const res = await updateRequestStatus(id, newStatus);
    if (res.error) {
      // Revert if error
      alert(res.error);
      setRequests(initialRequests);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'resolved': return 'border-green-500/30 text-green-500 bg-green-500/10';
      case 'in_progress': return 'border-blue-500/30 text-blue-500 bg-blue-500/10';
      case 'pending': return 'border-yellow-500/30 text-yellow-500 bg-yellow-500/10';
      default: return 'border-border text-muted bg-card';
    }
  };

  return (
    <div className="space-y-8">
      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center p-4 border border-border bg-card/25 rounded-sm">
        
        {/* Search */}
        <div className="w-full md:w-64">
          <input 
            type="text" 
            placeholder="Search name or email..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-card border border-border rounded-sm px-3 py-2 text-sm outline-none focus:border-accent transition-colors text-ink"
          />
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <label className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">Status:</label>
            <select 
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-card border border-border rounded-sm px-2 py-1.5 text-xs outline-none focus:border-accent text-ink"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">Sort:</label>
            <select 
              value={sortBy} 
              onChange={e => setSortBy(e.target.value)}
              className="bg-card border border-border rounded-sm px-2 py-1.5 text-xs outline-none focus:border-accent text-ink"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="price_high">Price: High to Low</option>
              <option value="price_low">Price: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="grid gap-2 border-t border-border pt-4">
        {processedRequests.length === 0 ? (
          <div className="p-12 border border-border bg-card/25 text-center text-muted font-mono text-xs uppercase tracking-widest">
            No requests match the criteria.
          </div>
        ) : (
          processedRequests.map((req) => {
            const isExpanded = expandedId === req.id;
            const currentStatus = req.status || 'pending';
            
            return (
              <div 
                key={req.id} 
                className="border border-border bg-card/25 rounded-sm overflow-hidden transition-all duration-200"
              >
                {/* Summary Row (Clickable) */}
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : req.id)}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 hover:bg-card/50 cursor-pointer transition-colors"
                >
                  <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    <div className="min-w-[150px]">
                      <h3 className="font-display font-bold text-ink truncate">{req.name}</h3>
                      <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted truncate mt-0.5">{timeAgo(req.created_at)}</p>
                    </div>
                    <div className="text-sm text-muted truncate">
                      {req.email}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[0.65rem] uppercase tracking-widest text-ink whitespace-nowrap hidden md:inline-block">
                      {req.budget_range}
                    </span>
                    <span className={`font-mono text-[0.6rem] uppercase tracking-widest px-2 py-1 border rounded-sm whitespace-nowrap ${getStatusColor(currentStatus)}`}>
                      {currentStatus.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-4 md:p-6 border-t border-border bg-card/10 grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-muted mb-2">
                          [MESSAGE]
                        </span>
                        <p className="text-sm text-ink whitespace-pre-wrap leading-relaxed">
                          {req.message}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-muted mb-1">
                          Type
                        </span>
                        <p className="text-sm text-ink">{req.project_type}</p>
                      </div>
                      <div className="md:hidden">
                        <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-muted mb-1">
                          Budget
                        </span>
                        <p className="text-sm text-ink">{req.budget_range}</p>
                      </div>
                      
                      {/* Action Controls */}
                      <div className="pt-4 border-t border-border">
                        <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-muted mb-2">
                          Update Status
                        </span>
                        <div className="flex flex-wrap gap-2">
                          <button 
                            onClick={() => handleStatusChange(req.id, 'pending')}
                            className={`font-mono text-[0.6rem] uppercase tracking-widest px-2 py-1 border rounded-sm transition-colors ${currentStatus === 'pending' ? getStatusColor('pending') : 'border-border text-muted hover:text-yellow-500'}`}
                          >
                            Pending
                          </button>
                          <button 
                            onClick={() => handleStatusChange(req.id, 'in_progress')}
                            className={`font-mono text-[0.6rem] uppercase tracking-widest px-2 py-1 border rounded-sm transition-colors ${currentStatus === 'in_progress' ? getStatusColor('in_progress') : 'border-border text-muted hover:text-blue-500'}`}
                          >
                            In Progress
                          </button>
                          <button 
                            onClick={() => handleStatusChange(req.id, 'resolved')}
                            className={`font-mono text-[0.6rem] uppercase tracking-widest px-2 py-1 border rounded-sm transition-colors ${currentStatus === 'resolved' ? getStatusColor('resolved') : 'border-border text-muted hover:text-green-500'}`}
                          >
                            Resolved
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
