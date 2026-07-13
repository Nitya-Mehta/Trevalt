import { createClient } from '@/utils/supabase/server';


// Quick polyfill-like for date since formatDistanceToNow is from date-fns, let's just use basic Intl or JS date methods
function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  if (diffHours < 24) return `${diffHours} hours ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
}

export default async function AdminRequestsPage() {
  const supabase = createClient();
  
  // Fetch latest requests
  const { data: requests, error } = await supabase
    .from('requests')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-display">Inbound Requests</h1>
        <p className="mt-2 text-muted font-mono text-xs uppercase tracking-widest">
          Telemetry Registry // Incoming scopes
        </p>
      </div>

      <div className="grid gap-6">
        {error && (
          <div className="p-4 border border-red-500 bg-red-500/10 text-red-500 text-sm">
            Failed to load requests.
          </div>
        )}

        {requests?.length === 0 && (
          <div className="p-12 border border-border bg-card/25 text-center text-muted font-mono text-xs uppercase tracking-widest">
            No active requests in queue.
          </div>
        )}

        {requests?.map((req) => (
          <div key={req.id} className="border border-border bg-card/25 p-6 rounded-sm flex flex-col gap-4">
            <div className="flex justify-between items-start border-b border-border/50 pb-4">
              <div>
                <h3 className="font-display text-xl font-bold">{req.name}</h3>
                <a href={`mailto:${req.email}`} className="font-mono text-xs text-accent hover:underline mt-1 block">
                  {req.email}
                </a>
              </div>
              <div className="text-right">
                <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                  [RECEIVED]
                </span>
                <span className="block font-mono text-xs text-ink mt-1">
                  {timeAgo(req.created_at)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                  [TYPE]
                </span>
                <span className="block text-sm text-ink mt-1">{req.project_type}</span>
              </div>
              <div>
                <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                  [BUDGET]
                </span>
                <span className="block text-sm text-ink mt-1">{req.budget_range}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-muted mb-2">
                [PAYLOAD]
              </span>
              <p className="text-sm text-muted whitespace-pre-wrap leading-relaxed">
                {req.message}
              </p>
            </div>
            
            <div className="pt-4 border-t border-border/50 flex justify-end">
              <span className="font-mono text-[0.55rem] uppercase tracking-widest text-muted/50">
                HASH: {req.ip_hash.substring(0, 16)}...
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
