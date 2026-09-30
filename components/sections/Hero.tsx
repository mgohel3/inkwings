"use client";

import { useReducedMotion, motion } from "framer-motion";
import { useScrollY, useViewport } from "@/lib/hooks";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const y = useScrollY();
  const { h: vh } = useViewport();
  const reduce = useReducedMotion();
  const hp = reduce ? 0 : Math.min(1, y / Math.max(vh, 1));

  return (
    <header
      id="top"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-5 pb-15 pt-[130px] sm:px-9 lg:px-[72px]"
    >
      <CornerMarks />

      <motion.div
        aria-hidden="true"
        className="absolute rounded-md bg-orange shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
        style={{
          width: "clamp(140px,20vw,280px)",
          aspectRatio: "3/4",
          right: "8%",
          top: "16%",
        }}
        animate={{ y: -hp * 160, rotate: 8 + hp * 10 }}
        transition={{ type: "tween", duration: 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute rounded-md bg-ink shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
        style={{
          width: "clamp(120px,17vw,240px)",
          aspectRatio: "3/4",
          right: "22%",
          top: "34%",
        }}
        animate={{ y: -hp * 300, rotate: -6 - hp * 14 }}
        transition={{ type: "tween", duration: 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute rounded-md bg-white p-[22px] shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
        style={{
          width: "clamp(130px,18vw,250px)",
          aspectRatio: "3/4",
          right: "3%",
          top: "46%",
        }}
        animate={{ y: -hp * 220, rotate: 4 + hp * 8 }}
        transition={{ type: "tween", duration: 0 }}
      >
        <div className="mx-0 my-[22px] mb-2.5 h-0.5 w-1/2 bg-orange" />
        <div className="my-2 h-0.5 w-4/5 bg-ink/15" />
        <div className="my-2 h-0.5 w-[65%] bg-ink/15" />
      </motion.div>

      <motion.div
        className="relative"
        animate={{ opacity: 1 - hp * 0.6, y: hp * -60 }}
        transition={{ type: "tween", duration: 0 }}
      >
        <h1 className="m-0 max-w-[11ch] font-display text-[clamp(38px,9.4vw,148px)] font-extrabold leading-[.94] tracking-[-.02em]">
          Print that makes your brand take <span className="text-orange">flight.</span>
        </h1>
      </motion.div>

      <div className="relative mt-12 flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-wrap gap-3">
          <Button href="/products" variant="solid-ink">
            Explore What We Print &rarr;
          </Button>
          <Button href="/quote" variant="outline-ink">
            Start a Project
          </Button>
        </div>
        <p className="m-0 max-w-[300px] text-base leading-normal">
          One stop solution in print media. Ahmedabad.
        </p>
      </div>
    </header>
  );
}

function CornerMarks() {
  const base = "absolute h-7 w-7 border-ink/40";
  return (
    <>
      <div className={`${base} left-6 top-6 border-l border-t`} />
      <div className={`${base} right-6 top-6 border-r border-t`} />
      <div className={`${base} bottom-6 left-6 border-b border-l`} />
      <div className={`${base} bottom-6 right-6 border-b border-r`} />
    </>
  );
}
