"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const words = ["Paper.", "Texture.", "Ink.", "Finished."];

export function Texture() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const ink = useTransform(scrollYProgress, (tp) => Math.max(0, (tp - 0.2) / 0.6) * 150);
  const inkClip = useTransform(ink, (v) => `circle(${v}% at 50% 60%)`);

  useMotionValueEvent(scrollYProgress, "change", (tp) => {
    setStage(tp < 0.25 ? 0 : tp < 0.5 ? 1 : tp < 0.8 ? 2 : 3);
  });

  return (
    <section ref={ref} className="relative h-[350vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-paper text-ink">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent 0 3px,rgba(0,0,0,0.03) 3px 4px),repeating-linear-gradient(90deg,transparent 0 5px,rgba(0,0,0,0.02) 5px 6px)",
          }}
        />
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-orange"
            style={{ clipPath: inkClip }}
          />
        )}
        <div className="absolute inset-0 flex flex-col justify-between px-5 pb-12 pt-[100px] sm:px-9 lg:px-[72px]">
          <p className="m-0 font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-ink">
            Printing is physical
          </p>
          <h2 className="m-0 font-display text-[clamp(52px,18vw,300px)] font-extrabold leading-[.9] tracking-[-.03em]">
            {words[stage]}
          </h2>
          <div className="flex flex-wrap gap-3 font-body text-[15px] font-semibold sm:gap-8">
            {words.map((w, i) => (
              <span
                key={w}
                className="pb-1"
                style={{
                  borderBottom: i === stage ? "3px solid #111" : "3px solid transparent",
                  opacity: i === stage ? 1 : 0.55,
                }}
              >
                {i + 1} {w.replace(".", "")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
