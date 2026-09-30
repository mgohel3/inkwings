"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import { processSteps } from "@/lib/content";

export function ProcessPreview() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(Math.min(3, Math.floor(v * 4)));
  });

  const current = processSteps[step];

  return (
    <section ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden bg-paper px-5 pb-12 pt-[110px] sm:px-9 lg:px-[72px]">
        <div className="flex flex-wrap items-baseline justify-between gap-5">
          <h2 className="m-0 font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-orange">
            How it gets made
          </h2>
          <Link href="/process" className="border-b-2 border-orange font-semibold text-ink">
            {String(step + 1).padStart(2, "0")} / 04 &middot; Full process &rarr;
          </Link>
        </div>
        <div className="relative flex flex-1 items-center">
          <div
            aria-hidden="true"
            className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[clamp(200px,42vw,640px)] font-extrabold leading-[.8] tracking-[-.03em] text-orange opacity-95"
          >
            {current.n}
          </div>
          <div className="relative max-w-[560px]">
            <h3 className="m-0 font-display text-[clamp(44px,11vw,168px)] font-extrabold leading-[.95] tracking-[-.025em]">
              {current.t}
            </h3>
            <p className="mt-[18px] max-w-[22em] text-[clamp(18px,2vw,26px)] leading-snug">
              {current.d}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {processSteps.map((s, i) => (
            <div key={s.n}>
              <motion.div
                className="h-1"
                animate={{ backgroundColor: i <= step ? "#E8560E" : "#11111122" }}
                transition={{ duration: reduce ? 0 : 0.4 }}
              />
              <div
                className="mt-2 font-body text-sm font-semibold"
                style={{ color: i === step ? "#111" : "#5a5a5a" }}
              >
                {s.n} {s.t}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
