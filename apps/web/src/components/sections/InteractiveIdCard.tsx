import type { KeyboardEvent, PointerEvent, TransitionEvent } from "react";
import { useEffect, useRef, useState } from "react";

export interface InteractiveIdCardProps {
  name: string;
  title: string;
  specialty: string;
  location: string;
  experience: string;
  status: string;
  badgeId: string;
  /** Accent used for the lanyard + card header. Defaults to the brand blue. */
  accentColor?: string;
  /** Length of the hanging strap in pixels. */
  ropeLength?: number;
  className?: string;
}

/* Spring-pendulum tuning (all values in degree units) */
const STIFFNESS = 60; // pull back to centre (higher = snaps back faster)
const DAMPING = 6.5; // friction (higher = settles in fewer swings)
const MAX_ANGLE = 55; // clamp so the card never flips
const FLING_CAP = 260; // max release speed (deg/s)
const IMPULSE = 150; // push given on tap / keyboard
const REST_EPS = 0.2;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function InteractiveIdCard({
  name,
  title,
  specialty,
  location,
  experience,
  status,
  badgeId,
  accentColor = "#3B82F6",
  ropeLength = 150,
  className = "",
}: InteractiveIdCardProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef(0);
  const dirRef = useRef(1);
  const dragRef = useRef<{
    pointerId: number;
    lastAngle: number;
    lastTs: number;
    moved: boolean;
  } | null>(null);

  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dropped, setDropped] = useState(false);
  const settledRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  function stopLoop() {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    lastTsRef.current = 0;
  }

  function tick(ts: number) {
    const last = lastTsRef.current || ts;
    let dt = (ts - last) / 1000;
    lastTsRef.current = ts;
    if (dt > 0.05) dt = 0.05;

    if (!dragRef.current) {
      const accel = -STIFFNESS * angleRef.current - DAMPING * velRef.current;
      velRef.current += accel * dt;
      angleRef.current += velRef.current * dt;

      if (
        Math.abs(angleRef.current) < REST_EPS &&
        Math.abs(velRef.current) < REST_EPS * 6
      ) {
        angleRef.current = 0;
        velRef.current = 0;
        setAngle(0);
        stopLoop();
        return;
      }
    }

    angleRef.current = Math.max(
      -MAX_ANGLE,
      Math.min(MAX_ANGLE, angleRef.current),
    );
    setAngle(angleRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }

  function startLoop() {
    if (reducedMotion) {
      angleRef.current = 0;
      velRef.current = 0;
      setAngle(0);
      return;
    }
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Drop the card in from above on first load.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      settledRef.current = true;
    }
    const id = requestAnimationFrame(() => setDropped(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleDropEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "transform" || settledRef.current) return;
    settledRef.current = true;
    velRef.current = 40; // gentle nudge so it swings a little, then settles
    startLoop();
  };

  const angleFromPointer = (clientX: number, clientY: number) => {
    const el = anchorRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const dx = clientX - (r.left + r.width / 2);
    const dy = Math.max(clientY - r.top, 1);
    const deg = (Math.atan2(dx, dy) * 180) / Math.PI;
    return Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, deg));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const a = angleFromPointer(event.clientX, event.clientY);
    dragRef.current = {
      pointerId: event.pointerId,
      lastAngle: a,
      lastTs: performance.now(),
      moved: false,
    };
    angleRef.current = a;
    velRef.current = 0;
    setDragging(true);
    setAngle(a);
    stopLoop();
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    const a = angleFromPointer(event.clientX, event.clientY);
    const now = performance.now();
    const dt = Math.max((now - drag.lastTs) / 1000, 0.001);
    velRef.current = (a - drag.lastAngle) / dt;
    if (Math.abs(a - drag.lastAngle) > 0.4) drag.moved = true;
    drag.lastAngle = a;
    drag.lastTs = now;
    angleRef.current = a;
    setAngle(a);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    dragRef.current = null;
    setDragging(false);

    if (!drag.moved) {
      velRef.current = IMPULSE * dirRef.current;
      dirRef.current *= -1;
    } else {
      velRef.current = Math.max(
        -FLING_CAP,
        Math.min(FLING_CAP, velRef.current),
      );
    }
    startLoop();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    velRef.current += IMPULSE * 1.4 * dirRef.current;
    dirRef.current *= -1;
    startLoop();
  };

  const header = `linear-gradient(135deg, color-mix(in srgb, ${accentColor}, #ffffff 24%), ${accentColor} 58%, color-mix(in srgb, ${accentColor}, #000000 14%))`;
  // Satin lanyard ribbon: a soft edge-to-edge sheen over a vertical shade of the site blue.
  const strap =
    `linear-gradient(90deg, rgba(0,0,0,0.30), rgba(255,255,255,0.18) 44%, rgba(255,255,255,0.02) 62%, rgba(0,0,0,0.32)), ` +
    `linear-gradient(180deg, ${accentColor}, color-mix(in srgb, ${accentColor}, #000000 34%))`;

  return (
    <div
      className={`flex select-none flex-col items-center ${className}`.trim()}
    >
      <div ref={anchorRef} className="relative">
        <div
          className="relative"
          style={{
            transform: dropped ? "translateY(0)" : "translateY(-190px)",
            opacity: dropped ? 1 : 0,
            transition: reducedMotion
              ? undefined
              : "transform 0.9s cubic-bezier(0.34, 1.26, 0.64, 1), opacity 0.35s ease",
          }}
          onTransitionEnd={handleDropEnd}
        >
          <div
            className="flex flex-col items-center will-change-transform"
            style={{
              transform: `rotate(${angle.toFixed(3)}deg)`,
              transformOrigin: "top center",
              transition:
                reducedMotion && !dragging ? "transform 0.45s ease" : undefined,
            }}
          >
            {/* Continuous gentle left/right sway, like a real hanging badge */}
            <div
              className={`flex flex-col items-center ${
                reducedMotion ? "" : "animate-idle-sway"
              }`}
              style={{
                transformOrigin: "top center",
                animationPlayState: dragging ? "paused" : undefined,
              }}
            >
              {/* Folded lanyard top */}
              <div
                className="relative z-1 h-5 w-5 rounded-t-[7px]"
                style={{ background: strap }}
                aria-hidden="true"
              >
                <span className="absolute inset-x-0 bottom-0 h-2 rounded-b-xs bg-black/25" />
              </div>

              {/* Lanyard ribbon */}
              <div
                className="relative -mt-1 w-4.5 rounded-b-[3px] shadow-[0_1px_3px_rgba(15,23,42,0.22)]"
                style={{ height: ropeLength, background: strap }}
                aria-hidden="true"
              >
                <span className="absolute inset-y-2 left-0.75 w-px bg-white/20" />
                <span className="absolute inset-y-2 right-0.75 w-px bg-white/20" />
              </div>

              {/* Metal grommet (punched hole) */}
              <div
                className="-mt-1 grid size-5 place-items-center rounded-full shadow-sm ring-1 ring-black/15"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #fbfcfe, #cbd5e1 42%, #94a3b8 72%, #64748b)",
                }}
                aria-hidden="true"
              >
                <span className="size-2.5 rounded-full bg-navy shadow-[inset_0_1px_2px_rgba(0,0,0,0.65)]" />
              </div>

              {/* Metal badge clip */}
              <div
                className="-mt-1 h-4 w-10 rounded-t-md rounded-b-[3px] shadow-sm ring-1 ring-black/10"
                style={{
                  background:
                    "linear-gradient(180deg,#f2f5f9,#c2cad6 45%,#8b95a3)",
                }}
                aria-hidden="true"
              >
                <span className="mx-auto mt-1.5 block h-1 w-6 rounded-full bg-slate-600/45" />
              </div>

              <div
                role="button"
                tabIndex={0}
                aria-label={`${name} ID card — drag or flick to swing`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onKeyDown={handleKeyDown}
                style={{ pointerEvents: dropped ? undefined : "none" }}
                className="relative -mt-1 w-85 max-w-[82vw] cursor-grab touch-none overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-xl shadow-navy/10 transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:cursor-grabbing"
              >
                {/* Header band */}
                <div
                  className="relative z-0 h-28 rounded-t-[1.75rem]"
                  style={{ background: header }}
                >
                  <div className="absolute inset-0 rounded-t-[1.75rem] bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.4),transparent_55%)]" />
                </div>

                {/* Profile image area */}
                <div className="relative z-10 -mt-15 flex justify-center">
                  <div className="size-28 overflow-hidden rounded-full border-4 border-surface bg-primary-soft shadow-md">
                    <svg
                      viewBox="0 0 128 128"
                      className="size-full"
                      role="img"
                      aria-label="Profile photo placeholder"
                    >
                      <defs>
                        <linearGradient
                          id="idcard-portrait"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0" stopColor="#dbe7ff" />
                          <stop offset="1" stopColor="#eef4ff" />
                        </linearGradient>
                      </defs>
                      <rect
                        width="128"
                        height="128"
                        fill="url(#idcard-portrait)"
                      />
                      <circle
                        cx="64"
                        cy="50"
                        r="22"
                        fill="#172554"
                        opacity="0.82"
                      />
                      <path
                        d="M24 122c0-24 18-40 40-40s40 16 40 40Z"
                        fill="#172554"
                        opacity="0.82"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative z-10 px-7 pb-6 pt-3 text-center">
                  <p className="text-xl font-bold tracking-tight text-text">
                    {name}
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary">
                    {title}
                  </span>

                  <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-border pt-5 text-left">
                    {[
                      { label: "Specialty", value: specialty },
                      { label: "Location", value: location },
                      { label: "Experience", value: experience },
                      { label: "Status", value: status, accent: true },
                    ].map((detail) => (
                      <div key={detail.label}>
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
                          {detail.label}
                        </dt>
                        <dd
                          className={`mt-1 text-sm font-semibold ${
                            detail.accent ? "text-emerald-500" : "text-text"
                          }`}
                        >
                          {detail.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
                    <div
                      className="flex h-10 items-end gap-0.5"
                      aria-hidden="true"
                    >
                      {[
                        3, 7, 2, 9, 4, 6, 3, 8, 2, 5, 9, 3, 6, 4, 8, 2, 7, 3, 9,
                        5, 4, 8, 3, 6,
                      ].map((h, i) => (
                        <span
                          key={i}
                          className="w-0.5 bg-text"
                          style={{ height: `${h * 3 + 10}px` }}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] tracking-wider text-text-secondary">
                      {badgeId}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
