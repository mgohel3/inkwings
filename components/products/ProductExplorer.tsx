"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { categories, shapes, categoryHref } from "@/lib/data";
import { padStep, cx } from "@/lib/utils";
import { useViewport } from "@/lib/hooks";

export function ProductExplorer({
  variant = "compact",
}: {
  variant?: "compact" | "full";
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const { w } = useViewport();
  const k = w < 600 ? 0.7 : 1;
  const activeCategory = categories[active];

  const headingSize =
    variant === "full"
      ? "text-[clamp(26px,4vw,52px)]"
      : "text-[clamp(24px,3.6vw,44px)]";

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-10">
      <div role="list">
        {categories.map((c, i) => {
          const on = active === i;
          return (
            <div key={c.slug} role="listitem" className="border-t border-white/20">
              <button
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="flex w-full cursor-pointer items-baseline gap-3 border-0 bg-transparent py-[18px] text-left"
                style={{ color: on ? "var(--color-orange)" : "var(--color-paper)" }}
              >
                <span className="w-7 font-body text-sm font-medium text-orange">
                  {padStep(i + 1)}
                </span>
                <span
                  className={cx(
                    "flex-1 font-display font-extrabold leading-[1.1] tracking-[-.02em]",
                    headingSize
                  )}
                >
                  {c.name}
                </span>
                <span
                  className="text-[28px] transition-all duration-300"
                  style={{
                    transform: on ? "translateX(0)" : "translateX(-12px)",
                    opacity: on ? 1 : 0,
                  }}
                >
                  &rarr;
                </span>
              </button>
              <div
                className="grid overflow-hidden transition-[grid-template-rows] duration-[450ms] ease-out"
                style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  {variant === "full" ? (
                    <>
                      <p className="mb-2.5 ml-7 text-lg leading-snug text-paper">{c.line}</p>
                      <p className="mb-3.5 ml-7 text-[15px] leading-relaxed text-paper">
                        {c.products.map((p) => p.name).join(" · ")}
                      </p>
                      <Link
                        href={categoryHref(c.slug)}
                        className="mb-[22px] ml-7 inline-block rounded-full bg-orange px-[22px] py-3 font-semibold text-ink hover:bg-paper"
                      >
                        View {c.name} &rarr;
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="mb-3 ml-7 text-base leading-loose text-paper">
                        {c.products.map((p) => p.name).join(" · ")}
                      </p>
                      <Link
                        href={categoryHref(c.slug)}
                        className="mb-5 ml-7 inline-block font-semibold text-orange"
                      >
                        View category &rarr;
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {variant === "compact" && (
          <div className="border-t border-white/20 pt-[18px] text-sm leading-relaxed text-paper">
            Also: wedding planner stationery, boards, foamsheet cutouts, canvas and fabric print
            with framing, PVC airballoon branding, and more.
          </div>
        )}
      </div>

      <div className="relative h-[clamp(340px,44vw,560px)] min-w-0 overflow-hidden border border-white/20 bg-[#1b1b1b]">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(232,86,14,0.2), transparent 65%)",
          }}
        />
        {shapes[activeCategory.slug].map((p, i) => (
          <motion.div
            key={`${activeCategory.slug}-${i}`}
            initial={false}
            animate={{ x: p.x * k, y: p.y, rotate: p.rot, scale: k }}
            transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute flex items-end p-2 font-body text-xs font-semibold"
            style={{
              left: "50%",
              top: "46%",
              width: p.w,
              height: p.h,
              marginLeft: -p.w / 2,
              marginTop: -p.h / 2,
              background: p.bg,
              borderRadius: p.radius,
              color: p.textColor,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            {p.label}
          </motion.div>
        ))}
        <div className="absolute bottom-4 left-5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-paper">
          {activeCategory.name} &mdash; placeholder mockups
        </div>
      </div>
    </div>
  );
}
