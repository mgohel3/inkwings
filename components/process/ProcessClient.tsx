"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { processSteps, processPieceSets, type ProcessPieceTuple } from "@/lib/content";
import { shapes } from "@/lib/data";
import { useViewport } from "@/lib/hooks";
import { Button } from "@/components/ui/Button";

const step4Pieces: ProcessPieceTuple[] = shapes["corporate-stationery"]
  .slice(0, 3)
  .concat(shapes["packaging"].slice(0, 2))
  .map((q, i) => [
    q.w,
    q.h,
    q.x,
    q.y,
    q.rot,
    i % 2 ? "#F4F0E8" : i === 0 ? "#E8560E" : "#fff",
    q.radius,
    q.label,
    "#111",
  ]);

const allSets = [...processPieceSets, step4Pieces];

function Piece({ tuple, scale }: { tuple: ProcessPieceTuple; scale: number }) {
  const [w, h, x, y, rot, bg, radius, label, textColor] = tuple;
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "46%",
        width: w,
        height: h,
        marginLeft: (-w * scale) / 2,
        marginTop: (-h * scale) / 2,
        transform: `translate(${x * scale}px,${y * scale}px) rotate(${rot}deg) scale(${scale})`,
        background: bg,
        borderRadius: radius,
        color: textColor,
        font: "600 12px 'Instrument Sans'",
        display: "flex",
        alignItems: "flex-end",
        padding: 8,
        boxShadow: "0 24px 40px rgba(0,0,0,0.25)",
      }}
    >
      {label}
    </div>
  );
}

function DesktopProcess() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const { w } = useViewport();
  const k = w < 700 ? 0.6 : 0.9;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const inkClip = useTransform(scrollYProgress, (p) => {
    const st = p * 4;
    const ink = Math.max(0, Math.min(1, (st - 1.5) / 1)) * 150;
    return `circle(${ink}% at 65% 55%)`;
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setStep(Math.min(3, Math.floor(p * 4)));
  });

  return (
    <section ref={ref} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-paper">
        {!reduce && (
          <motion.div aria-hidden="true" className="absolute inset-0 bg-ink" style={{ clipPath: inkClip }} />
        )}
        <div className="absolute left-5 right-5 top-[100px] flex justify-between font-body text-sm font-semibold text-ink sm:left-9 sm:right-9 lg:left-[72px] lg:right-[72px]">
          <span>How it gets made</span>
          <span>{String(step + 1).padStart(2, "0")} / 04</span>
        </div>

        {processSteps.map((s, i) => {
          const active = i === step;
          const fgc = i === 2 ? "#111" : "#111";
          const pieces = allSets[i];
          return (
            <div
              key={s.n}
              className="absolute inset-0 flex items-center px-5 sm:px-9 lg:px-[72px]"
              style={{
                opacity: active ? 1 : 0,
                transform: reduce ? "none" : `translateY(${active ? 0 : 60}px)`,
                pointerEvents: active ? "auto" : "none",
                transition: reduce ? "none" : "opacity .5s, transform .5s",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(220px,46vw,700px)] font-extrabold leading-[.8] tracking-[-.03em] text-orange opacity-[0.18]"
              >
                {s.n}
              </div>
              <div className="relative z-[2] max-w-[560px] flex-1">
                <h2
                  className="m-0 font-display text-[clamp(44px,11vw,168px)] font-extrabold leading-[.92] tracking-[-.025em]"
                  style={{ color: fgc }}
                >
                  {s.t}
                </h2>
                <p
                  className="mt-[18px] max-w-[18em] text-[clamp(18px,2vw,26px)] leading-snug"
                  style={{ color: fgc }}
                >
                  {s.d}
                </p>
              </div>
              {w >= 800 && (
                <div aria-hidden="true" className="relative h-[70%] flex-1">
                  {pieces.map((tuple, pi) => (
                    <Piece key={pi} tuple={tuple} scale={k} />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="absolute bottom-9 left-5 right-5 grid grid-cols-4 gap-2.5 sm:left-9 sm:right-9 lg:left-[72px] lg:right-[72px]">
          {processSteps.map((s, i) => (
            <div
              key={s.n}
              className="h-1"
              style={{ background: i <= step ? "#E8560E" : "#11111122" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileProcess() {
  return (
    <section>
      {processSteps.map((s, i) => {
        const dark = i % 2 === 1;
        const pieces = allSets[i];
        return (
          <div
            key={s.n}
            className="px-5 pb-12 pt-16"
            style={{
              background: dark ? "var(--color-ink)" : "var(--color-paper)",
              color: dark ? "var(--color-paper)" : "var(--color-ink)",
              borderTop: dark ? undefined : "1.5px solid var(--color-ink)",
            }}
          >
            <div className="font-display text-[88px] font-extrabold leading-[.8] tracking-[-.03em] text-orange">
              {s.n}
            </div>
            <h2 className="mt-3 font-display text-[clamp(52px,16vw,88px)] font-extrabold leading-[.95] tracking-[-.025em]">
              {s.t}
            </h2>
            <p className="mt-3.5 text-[19px] leading-snug">{s.d}</p>
            <div
              aria-hidden="true"
              className="relative mt-7 h-[300px] overflow-hidden"
              style={{ background: dark ? "#1b1b1b" : "var(--color-paper-alt)" }}
            >
              {pieces.map((tuple, pi) => (
                <Piece key={pi} tuple={tuple} scale={0.6} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export function ProcessClient() {
  const { w } = useViewport();
  const mobile = w < 800;

  return (
    <div className="relative overflow-x-clip">
      <header className="relative flex min-h-[80vh] flex-col justify-between overflow-hidden px-5 pb-15 pt-[170px] sm:px-9 lg:px-[72px]">
        <div>
          <p className="mb-6 font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-orange">
            Process
          </p>
          <h1 className="m-0 max-w-[11ch] font-display text-[clamp(38px,9.4vw,148px)] font-extrabold leading-[.94] tracking-[-.025em]">
            From idea to something you can hold.
          </h1>
        </div>
        <p className="relative mt-10 font-body text-base font-semibold">Scroll &darr;</p>
      </header>

      {mobile ? <MobileProcess /> : <DesktopProcess />}

      <section className="flex min-h-[60vh] flex-col justify-center gap-8 bg-orange px-5 py-[clamp(44px,8vw,110px)] sm:px-9 lg:px-[72px]">
        <h2 className="m-0 max-w-[9ch] font-display text-[clamp(40px,11vw,170px)] font-extrabold leading-[.92] tracking-[-.025em] text-ink">
          Ready when you are.
        </h2>
        <div>
          <Button href="/quote" variant="solid-ink" className="text-xl">
            Get a Quote &rarr;
          </Button>
        </div>
      </section>
    </div>
  );
}
