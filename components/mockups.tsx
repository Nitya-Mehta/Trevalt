import Image from 'next/image';

type MockupProps = {
  type: 'phone' | 'laptop';
  label: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function Mockup({ type, label, imageSrc, imageAlt }: MockupProps) {
  if (type === 'phone') {
    return (
      <div className="phone-frame relative mx-auto w-full max-w-[300px] rounded-[2rem] border border-border bg-card p-3">
        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-paper">
          <div className="border-b border-white/10 px-4 py-3 text-[0.7rem] font-mono uppercase tracking-[0.2em] text-muted">{label}</div>
          <div className="relative aspect-[9/16] bg-paper">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt ?? label}
                fill
                sizes="280px"
                className="object-cover object-top"
              />
            ) : (
              <div className="h-full bg-paper p-4 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-muted flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-border/80 pb-1 font-bold text-accent">
                    <span>TRV_MOBILE_OS v4.1</span>
                    <span>ONLINE</span>
                  </div>
                  <div className="space-y-1 text-ink lowercase">
                    <p>&gt; initializing BLE handshake...</p>
                    <p>&gt; loading local DB enclaves...</p>
                    <p>&gt; routing multi-hop mesh: OK</p>
                    <p>&gt; security handshake: ACTIVE</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="border border-border/80 p-2 bg-card/50 rounded-lg">
                    <span className="block text-accent text-[0.5rem]">NETWORK_STATS</span>
                    <div className="mt-1 flex justify-between">
                      <span>HOPS</span>
                      <span className="text-ink">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RTT</span>
                      <span className="text-ink">14ms</span>
                    </div>
                  </div>
                  <div className="h-16 border border-dashed border-border/60 flex items-center justify-center text-[0.5rem]">
                    [WAVEFORM_DENSITY_PLOT]
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="laptop-frame relative mx-auto w-full max-w-[760px] rounded-[1.5rem] border border-border bg-card p-4">
      <div className="overflow-hidden rounded-[1rem] border border-white/10 bg-paper">
        <div className="border-b border-white/10 px-4 py-3 text-[0.7rem] font-mono uppercase tracking-[0.2em] text-muted">{label}</div>
        <div className="relative aspect-[16/9] bg-paper">
          {imageSrc ? (
            <Image src={imageSrc} alt={imageAlt ?? label} fill sizes="760px" className="object-cover object-top" />
          ) : (
            <div className="h-full bg-paper p-5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted grid grid-cols-[140px_1fr] divide-x divide-border">
              <div className="pr-4 space-y-4">
                <div>
                  <span className="text-accent font-bold">DIRECTORY</span>
                  <div className="mt-2 space-y-1 text-ink text-[0.55rem]">
                    <p>├─ app/</p>
                    <p>│  ├─ layout.tsx</p>
                    <p>│  └─ page.tsx</p>
                    <p>├─ components/</p>
                    <p>│  └─ terminal.rs</p>
                    <p>└─ package.json</p>
                  </div>
                </div>
                <div>
                  <span className="text-accent font-bold">STATUS</span>
                  <p className="mt-1 text-ink text-[0.55rem]">BUILD: OK</p>
                  <p className="text-ink text-[0.55rem]">DEPLOY: SHIPPED</p>
                </div>
              </div>
              <div className="pl-5 flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-border/80 pb-1 font-bold text-accent">
                    <span>OPERATIONS_CONSOLE // LIVE_METRICS</span>
                    <span>10.0.12.98</span>
                  </div>
                  <div className="space-y-1 text-ink text-[0.55rem] lowercase leading-relaxed">
                    <p className="text-muted uppercase font-bold tracking-widest text-[0.5rem] mt-2">[sys_logs]</p>
                    <p>&gt; cargo build --release --target wasm32</p>
                    <p className="text-accent">&gt; compiling rust decoders... done</p>
                    <p>&gt; listening on WebRTC data channels</p>
                  </div>
                </div>
                <div className="border border-border/80 bg-card/30 p-2 grid grid-cols-3 gap-2 text-center text-[0.5rem] mt-4">
                  <div>
                    <span className="block text-muted">LATENCY</span>
                    <span className="text-accent text-[0.65rem] font-bold">14.2ms</span>
                  </div>
                  <div>
                    <span className="block text-muted">BUFFER</span>
                    <span className="text-ink text-[0.65rem] font-bold">0.02%</span>
                  </div>
                  <div>
                    <span className="block text-muted">BANDWIDTH</span>
                    <span className="text-ink text-[0.65rem] font-bold">2.4 GB/s</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
