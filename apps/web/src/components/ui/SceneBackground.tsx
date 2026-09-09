import { useEffect, useRef } from "react";

/**
 * Full-page ambient background: soft, blurred blue "orbs" plus a field of
 * floating particles with a light pointer parallax, giving a sense of depth
 * behind every section.
 *
 * Deliberately cheap: 2D canvas (no WebGL / Three.js), capped DPR, fewer
 * particles + no pointer tracking on touch devices, throttled on mobile,
 * paused when the tab is hidden, and fully static when the visitor prefers
 * reduced motion. It is fixed behind the content and never intercepts input.
 */

type Particle = {
  x: number;
  y: number;
  z: number; // depth 0.25 (far) .. 1 (near)
  r: number;
  vx: number;
  vy: number;
};

type Orb = { x: number; y: number; r: number; hue: "primary" | "light"; drift: number };

const PRIMARY = "59, 130, 246"; // #3B82F6
const LIGHT = "96, 165, 250"; // #60A5FA

export function SceneBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const c = ctx;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 767px)").matches;

    const particleCount = isTouch ? 16 : 46;
    const maxDpr = isTouch ? 1.25 : 1.75;
    const frameGap = isTouch ? 1000 / 30 : 0; // throttle on mobile

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let orbs: Orb[] = [];
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let raf = 0;
    let lastFrame = 0;
    let running = true;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const seed = () => {
      particles = Array.from({ length: particleCount }, () => {
        const z = rand(0.25, 1);
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          r: rand(0.6, 2.2) * z,
          vx: rand(-0.12, 0.12) * z,
          vy: rand(-0.16, -0.03) * z,
        };
      });
      orbs = [
        { x: width * 0.16, y: height * 0.12, r: Math.max(width, height) * 0.32, hue: "primary", drift: 0 },
        { x: width * 0.92, y: height * 0.3, r: Math.max(width, height) * 0.26, hue: "light", drift: 2.1 },
        { x: width * 0.55, y: height * 0.95, r: Math.max(width, height) * 0.3, hue: "primary", drift: 4.3 },
      ];
    };

    const draw = (time: number) => {
      const dark = document.documentElement.classList.contains("dark");
      c.clearRect(0, 0, width, height);

      // Slow-moving ambient orbs
      c.globalCompositeOperation = dark ? "lighten" : "source-over";
      for (const orb of orbs) {
        const wob = reduceMotion ? 0 : Math.sin(time / 6000 + orb.drift) * 18;
        const cx = orb.x + wob + eased.x * 26;
        const cy = orb.y + Math.cos(time / 7000 + orb.drift) * 14 + eased.y * 18;
        const rgb = orb.hue === "primary" ? PRIMARY : LIGHT;
        const alpha = dark ? 0.1 : 0.05;
        const g = c.createRadialGradient(cx, cy, 0, cx, cy, orb.r);
        g.addColorStop(0, `rgba(${rgb}, ${alpha})`);
        g.addColorStop(1, `rgba(${rgb}, 0)`);
        c.fillStyle = g;
        c.beginPath();
        c.arc(cx, cy, orb.r, 0, Math.PI * 2);
        c.fill();
      }

      // Particle field
      const dotAlpha = dark ? 0.16 : 0.07;
      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }
        const px = p.x + eased.x * p.z * 26;
        const py = p.y + eased.y * p.z * 26;
        const rgb = p.z > 0.7 ? LIGHT : PRIMARY;
        const g = c.createRadialGradient(px, py, 0, px, py, p.r * 4);
        g.addColorStop(0, `rgba(${rgb}, ${dotAlpha * p.z})`);
        g.addColorStop(1, `rgba(${rgb}, 0)`);
        c.fillStyle = g;
        c.beginPath();
        c.arc(px, py, p.r * 4, 0, Math.PI * 2);
        c.fill();
      }
      c.globalCompositeOperation = "source-over";
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduceMotion) draw(0);
    };

    const loop = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (frameGap && now - lastFrame < frameGap) return;
      lastFrame = now;
      eased.x += (pointer.x - eased.x) * 0.05;
      eased.y += (pointer.y - eased.y) * 0.05;
      draw(now);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / width - 0.5) * 2;
      pointer.y = (event.clientY / height - 0.5) * 2;
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduceMotion) {
        running = true;
        lastFrame = 0;
        raf = requestAnimationFrame(loop);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    if (!isTouch && !reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }
    if (!reduceMotion) raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_18%_-5%,rgba(59,130,246,0.06),transparent_70%),radial-gradient(45%_40%_at_105%_25%,rgba(96,165,250,0.05),transparent_70%)] dark:bg-[radial-gradient(55%_45%_at_15%_-8%,rgba(59,130,246,0.12),transparent_70%),radial-gradient(45%_40%_at_108%_22%,rgba(37,99,235,0.1),transparent_70%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
