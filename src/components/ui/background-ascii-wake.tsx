"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// WakeGlyph — a full-bleed monospace character-comet field. A sparse, static
// ambient scatter sits at rest; the pointer stamps a "heat" value into the
// cells it passes over, and each stamped cell decays back toward the ambient
// floor at a rate fixed at stamp time — a fast pass stamps many cells at a
// low, quick-decaying heat (a long, thin, short-lived wake), a slow pass
// stamps fewer cells at high heat with a slow decay rate (a fat, lingering
// blob). Direct-DOM rAF over a persistent Float32Array grid, glyph density
// mapped from an ASCII ramp, theme-aware ink read via getComputedStyle.
// ---------------------------------------------------------------------------

const RAMP = " .:-=+*#%@";

export type WakeGlyphPointerTarget = "canvas" | "window";

export interface WakeGlyphProps {
  /** grid cell size in px */
  cellSize?: number;
  /** extra classes merged onto the rendered root element */
  className?: string;
  /**
   * where pointer movement is read from: the canvas itself, or the whole
   * window (for a background layer that sits underneath other content)
   */
  pointerTarget?: WakeGlyphPointerTarget;
}

// deterministic PRNG so the ambient scatter is stable within a session
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pointerEventTarget(
  target: WakeGlyphPointerTarget,
  canvas: HTMLCanvasElement,
): HTMLElement | Window {
  switch (target) {
    case "canvas":
      return canvas;
    case "window":
      return window;
    default: {
      const unreachable: never = target;
      return unreachable;
    }
  }
}

function readMonoFont(): string {
  const root = getComputedStyle(document.documentElement);
  return (
    root.getPropertyValue("--font-mono").trim() ||
    root.getPropertyValue("--oz-font-mono").trim() ||
    "ui-monospace, monospace"
  );
}

export function WakeGlyph({
  cellSize = 12,
  className = "",
  pointerTarget = "canvas",
}: WakeGlyphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const eventTarget = pointerEventTarget(pointerTarget, canvas);
    let fg = getComputedStyle(canvas).color;
    const monoFont = readMonoFont();

    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let heat: Float32Array = new Float32Array(0);
    let rate: Float32Array = new Float32Array(0);
    let ambient: Float32Array = new Float32Array(0);
    let raf = 0;
    let last = 0;
    let dirty = true;
    const pointer = { x: -1, y: -1, t: 0, has: false };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${cellSize * 0.85}px ${monoFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      cols = Math.max(1, Math.ceil(width / cellSize));
      rows = Math.max(1, Math.ceil(height / cellSize));
      const n = cols * rows;
      heat = new Float32Array(n);
      rate = new Float32Array(n).fill(1.4);
      ambient = new Float32Array(n);

      // sparse, near-silent ground state: a static seeded scatter of faint cells
      const rand = mulberry32(0xa53f9c1 ^ (cols * 71 + rows));
      for (let i = 0; i < n; i++) {
        if (rand() < 0.035) ambient[i] = 0.08 + rand() * 0.14;
      }
      dirty = true;
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = fg;
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const idx = gy * cols + gx;
          const lum = Math.max(ambient[idx]!, heat[idx]!);
          if (lum <= 0.03) continue;
          const ch =
            RAMP[
              Math.min(RAMP.length - 1, Math.floor(lum * (RAMP.length - 1)))
            ];
          if (ch === " ") continue;
          ctx.globalAlpha = Math.min(1, 0.15 + lum * 0.85);
          ctx.fillText(
            ch,
            gx * cellSize + cellSize / 2,
            gy * cellSize + cellSize / 2,
          );
        }
      }
      ctx.globalAlpha = 1;
    };

    // stamp a soft circular blot of heat around a grid cell, recording the
    // decay rate (higher = faster fade) that this pass's speed implies.
    const stamp = (
      px: number,
      py: number,
      radiusCells: number,
      decayRate: number,
    ) => {
      const cx = px / cellSize;
      const cy = py / cellSize;
      const r = Math.max(0.6, radiusCells);
      const minGx = Math.max(0, Math.floor(cx - r));
      const maxGx = Math.min(cols - 1, Math.ceil(cx + r));
      const minGy = Math.max(0, Math.floor(cy - r));
      const maxGy = Math.min(rows - 1, Math.ceil(cy + r));
      for (let gy = minGy; gy <= maxGy; gy++) {
        for (let gx = minGx; gx <= maxGx; gx++) {
          const d = Math.hypot(gx + 0.5 - cx, gy + 0.5 - cy);
          if (d > r) continue;
          const falloff = 1 - d / r;
          const idx = gy * cols + gx;
          if (falloff > heat[idx]!) {
            heat[idx] = falloff;
            rate[idx] = decayRate;
          }
        }
      }
      dirty = true;
    };

    const onPointerMove = (event: Event) => {
      const e = event as PointerEvent;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      if (pointer.has) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const dist = Math.hypot(dx, dy);
        const dt = Math.max(1, now - pointer.t);
        const speed = dist / dt; // px/ms

        // velocity-dependent stamp: fast = thin+quick-fading, slow = fat+lingering
        const radiusCells = Math.max(
          0.6,
          Math.min(2.6, 2.4 / (1 + speed * 1.6)),
        );
        const decayRate = Math.max(0.8, Math.min(4.5, 1.0 + speed * 3.2));

        // sample along the path so a fast pass doesn't leave gaps between frames
        const steps = Math.max(1, Math.ceil(dist / (cellSize * 0.5)));
        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          stamp(pointer.x + dx * t, pointer.y + dy * t, radiusCells, decayRate);
        }
      } else {
        stamp(x, y, 1.4, 1.4);
      }
      pointer.x = x;
      pointer.y = y;
      pointer.t = now;
      pointer.has = true;
    };

    const onPointerLeave = () => {
      pointer.has = false;
    };

    const loop = (now: number) => {
      const dt = last ? Math.min(64, now - last) / 1000 : 1 / 60;
      last = now;
      let active = false;
      for (let i = 0; i < heat.length; i++) {
        if (heat[i]! > 0) {
          heat[i]! -= rate[i]! * dt;
          if (heat[i]! < 0) heat[i] = 0;
          active = true;
        }
      }
      if (active || dirty) {
        draw();
        dirty = active;
      }
      raf = requestAnimationFrame(loop);
    };

    const leaveTarget =
      eventTarget === window ? document.documentElement : eventTarget;

    resize();
    if (reduced) {
      draw(); // ambient-only static frame; pointer wake is skipped entirely
    } else {
      eventTarget.addEventListener("pointermove", onPointerMove, { passive: true });
      leaveTarget.addEventListener("pointerleave", onPointerLeave);
      raf = requestAnimationFrame(loop);
    }

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeTimer = null;
        resize();
        if (reduced) draw();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    // themes can switch live through a `.dark` class, a `data-theme`
    // attribute, or the OS color scheme, with no remount
    const refreshInk = () => {
      fg = getComputedStyle(canvas).color;
      dirty = true;
      if (reduced) draw();
    };
    const themeObserver = new MutationObserver(refreshInk);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    colorScheme.addEventListener("change", refreshInk);

    return () => {
      cancelAnimationFrame(raf);
      if (resizeTimer) clearTimeout(resizeTimer);
      themeObserver.disconnect();
      colorScheme.removeEventListener("change", refreshInk);
      window.removeEventListener("resize", onResize);
      eventTarget.removeEventListener("pointermove", onPointerMove);
      leaveTarget.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [cellSize, pointerTarget]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`block h-full w-full text-foreground ${className}`}
    />
  );
}

export default WakeGlyph;
