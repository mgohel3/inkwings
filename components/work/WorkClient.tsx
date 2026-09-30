"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { workItems, workFilterKeys } from "@/lib/content";
import { tile } from "@/lib/data";
import { useViewport, useBodyScrollLock } from "@/lib/hooks";
import { cx } from "@/lib/utils";

export function WorkClient() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState(-1);
  const [openIndex, setOpenIndex] = useState(-1);
  const { w } = useViewport();
  const reduce = useReducedMotion();
  const narrow = w < 700;

  useBodyScrollLock(openIndex >= 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const filtered = workItems
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => filter === "All" || item.category === filter);

  const open = openIndex >= 0 ? workItems[openIndex] : null;

  return (
    <div className="relative overflow-x-clip">
      <header className="px-5 pb-10 pt-[170px] sm:px-9 lg:px-[72px]">
        <p className="mb-6 font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-orange">
          Work
        </p>
        <h1 className="m-0 font-display text-[clamp(40px,12vw,190px)] font-extrabold leading-[.92] tracking-[-.03em]">
          Made to be seen.
        </h1>
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {workFilterKeys.map((k) => {
            const on = filter === k;
            return (
              <button
                key={k}
                onClick={() => {
                  setFilter(k);
                  setHovered(-1);
                }}
                aria-pressed={on}
                className={cx(
                  "cursor-pointer rounded-full border-[1.5px] border-ink px-[18px] py-2.5 text-[15px] font-medium transition-colors",
                  on ? "bg-ink text-paper" : "bg-transparent text-ink"
                )}
              >
                {k}
              </button>
            );
          })}
        </div>
      </header>

      <section className="px-5 pb-[clamp(70px,10vw,130px)] sm:px-9 lg:px-[72px]">
        <div className="grid grid-cols-12 gap-2.5 sm:gap-4">
          {filtered.map(({ item, i }, j) => {
            const on = hovered === i;
            return (
              <button
                key={item.title}
                onClick={() => setOpenIndex(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(-1)}
                aria-label={item.title}
                className="relative flex cursor-pointer items-center justify-center overflow-hidden border-0 p-0"
                style={{
                  gridColumn: narrow ? "span 12" : `span ${item.span}`,
                  aspectRatio: narrow ? "4/3" : item.aspect,
                  background: i % 2 ? "#D9D1BF" : "#E9E3D6",
                }}
              >
                <motion.div
                  animate={{
                    scale: on ? 1.12 : 1,
                    rotate: on ? -4 : (j % 3) * 4 - 4,
                  }}
                  transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                  style={tile(i + 1, 1.3)}
                />
                <div
                  className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 bg-paper p-4"
                  style={{
                    transform: on || narrow ? "none" : "translateY(100%)",
                    transition: reduce ? "none" : "transform .5s cubic-bezier(.2,.8,.2,1)",
                  }}
                >
                  <span className="font-display text-[clamp(18px,2vw,28px)] font-extrabold leading-[1.1] tracking-[-.02em] text-ink">
                    {item.title}
                  </span>
                  <span className="flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-ink">
                    <span className="h-2.5 w-2.5 rounded-full bg-orange" />
                    {item.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        <p className="mt-8 max-w-[40em] text-[15px] leading-snug">
          These tiles are placeholders. Each slot is built for a project photograph.
        </p>
      </section>

      <div
        onClick={() => setOpenIndex(-1)}
        className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/85 p-5"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: reduce ? "none" : "opacity .3s",
        }}
      >
        {open && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Project detail"
            onClick={(e) => e.stopPropagation()}
            className="grid max-h-[90vh] w-[min(1100px,100%)] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] overflow-auto bg-paper"
          >
            <div className="flex min-h-[300px] items-center justify-center bg-paper-alt">
              <div style={{ ...tile(openIndex + 1, 1.5), transform: "rotate(-4deg)" }} />
            </div>
            <div className="flex flex-col justify-between gap-6 p-5 sm:p-8 lg:p-11">
              <div>
                <span className="flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.12em]">
                  <span className="h-2.5 w-2.5 rounded-full bg-orange" />
                  {open.category}
                </span>
                <h2 className="mt-3.5 font-display text-[clamp(34px,4.6vw,64px)] font-extrabold leading-none tracking-[-.02em]">
                  {open.title}
                </h2>
                <p className="mt-4 text-[17px] leading-snug">
                  Project photography and details go here.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`/quote?c=${open.catSlug}`}
                  className="rounded-full bg-orange px-6 py-3.5 font-semibold text-ink"
                >
                  Get something like this &rarr;
                </a>
                <button
                  onClick={() => setOpenIndex(-1)}
                  className="cursor-pointer rounded-full border-[1.5px] border-ink bg-transparent px-6 py-3.5 font-body text-base font-semibold text-ink"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="flex flex-wrap items-center justify-between gap-7 bg-orange px-5 py-[clamp(44px,8vw,110px)] sm:px-9 lg:px-[72px]">
        <h2 className="m-0 max-w-[10ch] font-display text-[clamp(40px,7vw,104px)] font-extrabold leading-[.95] tracking-[-.02em] text-ink">
          Your project next.
        </h2>
        <a
          href="/quote"
          className="rounded-full bg-ink px-8 py-5 text-lg font-semibold text-paper hover:bg-paper hover:text-ink"
        >
          Get a Quote &rarr;
        </a>
      </section>
    </div>
  );
}
