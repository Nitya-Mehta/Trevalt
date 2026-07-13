import { createAdminClient } from '@/utils/supabase/admin';
import { AddMaterialForm } from '@/components/add-material-form';
import Image from 'next/image';

function getDomain(url: string) {
  try {
    return new URL(url).hostname;
  } catch (e) {
    return 'unknown';
  }
}

export default async function AdminMaterialsPage() {
  const adminClient = createAdminClient();

  const { data: materials, error } = await adminClient
    .from('materials')
    .select('*')
    .order('created_at', { ascending: false });

  // Group materials by category
  const grouped = (materials || []).reduce((acc: any, material: any) => {
    const cat = material.category.toUpperCase();
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(material);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort();

  return (
    <div className="space-y-12">
      <AddMaterialForm />

      {error && (
        <div className="p-4 border border-red-500 bg-red-500/10 text-red-500 text-sm">
          Failed to load materials.
        </div>
      )}

      {materials?.length === 0 && (
        <div className="p-12 border border-border bg-card/25 text-center text-muted font-mono text-xs uppercase tracking-widest">
          No resources saved in vault.
        </div>
      )}

      <div className="space-y-12">
        {categories.map((category) => (
          <div key={category} className="space-y-6">
            <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent border-b border-border/50 pb-2">
              [{category}]
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grouped[category].map((item: any) => {
                const domain = getDomain(item.url);
                const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

                return (
                  <a 
                    key={item.id} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group border border-border bg-card/25 hover:bg-card/50 transition-colors rounded-sm overflow-hidden p-6 relative"
                  >
                    <div className="flex items-start gap-4">
                      {/* Favicon */}
                      <div className="w-10 h-10 shrink-0 bg-card rounded-sm border border-border flex items-center justify-center p-1.5 overflow-hidden">
                        {/* We use standard img tag instead of Next Image here because domains are highly dynamic and not configured in next.config.js remotePatterns */}
                        <img 
                          src={faviconUrl} 
                          alt="" 
                          className="w-full h-full object-contain filter group-hover:brightness-110 transition-all"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg font-bold text-ink truncate group-hover:text-accent transition-colors">
                          {item.name}
                        </h3>
                        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted truncate mt-1">
                          {domain}
                        </p>
                      </div>
                    </div>

                    {item.description && (
                      <p className="mt-4 text-sm text-muted line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    
                    {/* Top Right Corner Highlight */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity m-2" />
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
