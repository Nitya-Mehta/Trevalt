'use client';

import { useEffect, useRef } from 'react';

const word = 'TREVALT';
const ramp = " .'`^,:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

type Cell = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  density: number;
  target: number;
  seed: number;
};

export function HeroAsciiMorph({ disabled = false }: { disabled?: boolean }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (disabled) return;

    const canvas = canvasRef.current;
    const wrapEl = wrapRef.current;
    if (!canvas || !wrapEl) return;
    const canvasNode = canvas;
    const wrapNode = wrapEl as HTMLDivElement;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const context = ctx;

    const pointer = { x: -9999, y: -9999, down: false };
    const reducedMotion = Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const ink = [243, 243, 242] as const;
    const accent = [255, 85, 0] as const;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let fontSize = 15;
    let gap = 16.5;
    let cols = 0;
    let rows = 0;
    let cells: Cell[] = [];
    let lastTime = performance.now();
    let visible = true;
    let frame = 0;
    let timeoutId = 0;
    let observer: ResizeObserver | null = null;

    const mix = (a: readonly number[], b: readonly number[], amount: number) =>
      a.map((value, index) => Math.round(value + (b[index] - value) * amount)) as [number, number, number];

    const setCanvasSize = () => {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    function updateWordMap() {
      if (!cols || !rows || !cells.length) return;

      const offscreen = document.createElement('canvas');
      offscreen.width = cols;
      offscreen.height = rows;
      const off = offscreen.getContext('2d', { willReadFrequently: true });
      if (!off) return;

      off.clearRect(0, 0, cols, rows);
      off.fillStyle = '#ffffff';
      off.textAlign = 'center';
      off.textBaseline = 'middle';
      const maxByWidth = (cols / Math.max(word.length, 1)) * 1.72;
      const maxByHeight = rows * 0.62;
      const size = Math.max(8, Math.min(maxByWidth, maxByHeight));
      off.font = `800 ${size}px "Space Grotesk", "Inter", Arial, sans-serif`;
      off.fillText(word, cols / 2, rows / 2 + size * 0.045);
      const pixels = off.getImageData(0, 0, cols, rows).data;

      for (let i = 0; i < cells.length; i += 1) {
        const alpha = pixels[i * 4 + 3] / 255;
        cells[i].target = alpha > 0.2 ? alpha : 0;
      }
    }

    function resize() {
      const rect = wrapNode.getBoundingClientRect();
      width = Math.max(320, rect.width || 800);
      height = Math.max(320, rect.height || 520);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      fontSize = width < 560 ? 13 : width < 900 ? 14 : 15;
      gap = fontSize * 1.05;
      cols = Math.ceil(width / gap) + 2;
      rows = Math.ceil(height / gap) + 2;
      cells = [];

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const ox = x * gap;
          const oy = y * gap;
          cells.push({
            ox,
            oy,
            x: ox,
            y: oy,
            vx: 0,
            vy: 0,
            density: 0,
            target: 0,
            seed: Math.random() * 1000,
          });
        }
      }

      setCanvasSize();
      updateWordMap();
    }

    function draw(now = performance.now()) {
      frame = 0;
      if (!visible) return;

      const dt = Math.min(32, now - lastTime || 16) / 16.67;
      lastTime = now;

      context.clearRect(0, 0, width, height);
      context.font = `${fontSize}px "Space Grotesk", "Inter", Arial, sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      const t = now * 0.001;
      const pointerRadius = pointer.down ? 210 : 155;
      const pressBoost = pointer.down ? 1.75 : 1;

      for (const cell of cells) {
        if (cell.target <= 0) continue;

        const dx = cell.x - pointer.x;
        const dy = cell.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        let tx = cell.ox;
        let ty = cell.oy;
        let interaction = 0;

        if (dist < pointerRadius) {
          interaction = (1 - dist / pointerRadius) * pressBoost;
          const angle = Math.atan2(dy, dx);
          const bend = 46 * interaction;
          tx += Math.cos(angle) * bend;
          ty += Math.sin(angle) * bend;
          cell.density += interaction * 0.07;
        }

        if (!reducedMotion) {
          tx += Math.sin(t * 0.85 + cell.seed + cell.oy * 0.015) * 0.38;
          ty += Math.cos(t * 0.72 + cell.seed + cell.ox * 0.012) * 0.38;
        }

        cell.vx += (tx - cell.x) * 0.12 * dt;
        cell.vy += (ty - cell.y) * 0.12 * dt;
        cell.vx *= Math.pow(0.78, dt);
        cell.vy *= Math.pow(0.78, dt);
        cell.x += cell.vx * dt;
        cell.y += cell.vy * dt;
        cell.density += (cell.target - cell.density) * (reducedMotion ? 0.04 : 0.075) * dt;

        const shimmer = Math.sin(t * 1.8 + cell.seed) * 0.045;

        const density = Math.max(0, Math.min(1, cell.density + shimmer + interaction * 0.18));
        if (density < 0.045) continue;

        const index = Math.min(ramp.length - 1, Math.floor(density * (ramp.length - 1)));
        const char = ramp[index];
        const heat = Math.max(0, Math.min(1, (interaction - 0.45) / 0.55));
        const rgb = heat > 0 ? mix(ink, accent, heat * 0.45) : ink;
        const alpha = Math.max(0.08, Math.min(0.96, 0.1 + density * 0.9));
        context.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
        context.fillText(char, cell.x, cell.y);
      }

      frame = window.requestAnimationFrame(draw);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvasNode.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    }

    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.down = false;
    }

    function onPointerDown() {
      pointer.down = true;
    }

    function onPointerUp() {
      pointer.down = false;
    }

    resize();
    updateWordMap();
    draw();

    canvasNode.addEventListener('pointermove', onPointerMove, { passive: true });
    canvasNode.addEventListener('pointerleave', onPointerLeave, { passive: true });
    canvasNode.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    const onResize = () => {
      resize();
      updateWordMap();
    };

    window.addEventListener('resize', onResize, { passive: true });
    if ('ResizeObserver' in window) {
      observer = new ResizeObserver(() => {
        resize();
        updateWordMap();
      });
      observer.observe(wrapNode);
    }

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !frame) {
        lastTime = performance.now();
        draw();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    timeoutId = window.setTimeout(() => {
      resize();
      updateWordMap();
    }, 250);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeoutId);
      canvasNode.removeEventListener('pointermove', onPointerMove);
      canvasNode.removeEventListener('pointerleave', onPointerLeave);
      canvasNode.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      observer?.disconnect();
    };
  }, [disabled]);

  return (
    <div ref={wrapRef} className="relative h-full w-full overflow-hidden">
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
