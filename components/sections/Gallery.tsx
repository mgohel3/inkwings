"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { homeGallery } from "@/lib/content";
import { useViewport } from "@/lib/hooks";

export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { w, h: vh } = useViewport();
  const narrow = w < 700;

  const cardW = Math.min(420, w * 0.78);
  const gap = Math.min(72, w * 0.05);
  const trackW = homeGallery.length * (cardW + 32) + 2 * gap;
  const shift = Math.max(0, trackW - w);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -shift]);

  if (narrow) {
    return (
      <section className="flex flex-col gap-7 bg-paper-alt py-[72px]">
        <h2 className="m-0 px-5 font-display text-[clamp(38px,9vw,140px)] font-extrabold leading-[.95] tracking-[-.02em] sm:px-9">
          Made to be held.
        </h2>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 [scroll-padding-left:20px]">
          {homeGallery.map((piece) => (
            <GalleryCard key={piece.name} piece={piece} cardW={cardW} vh={vh} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative" style={{ height: `calc(100vh + ${shift}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-9 overflow-hidden bg-paper-alt">
        <h2 className="m-0 px-5 font-display text-[clamp(38px,9vw,140px)] font-extrabold leading-[.95] tracking-[-.02em] sm:px-9 lg:px-[72px]">
          Made to be held.
        </h2>
        <motion.div
          className="flex w-max gap-8 will-change-transform"
          style={{ padding: `0 ${gap}px`, x: reduce ? 0 : x }}
        >
          {homeGallery.map((piece) => (
            <GalleryCard key={piece.name} piece={piece} cardW={cardW} vh={vh} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function GalleryCard({
  piece,
  cardW,
  vh,
}: {
  piece: (typeof homeGallery)[number];
  cardW: number;
  vh: number;
}) {
  const scale = cardW / 420 > 0.8 ? 1 : 0.75;
  return (
    <article className="w-[var(--card-w)] flex-none snap-start" style={{ ["--card-w" as string]: `${cardW}px` }}>
      <div
        className="flex items-center justify-center overflow-hidden bg-paper"
        style={{ height: Math.min(360, vh * 0.42) }}
      >
        <div
          style={{
            width: piece.w * scale,
            height: piece.h * scale,
            background: piece.bg,
            borderRadius: piece.rot === 90 ? 90 : 6,
            boxShadow: "0 24px 40px rgba(0,0,0,0.2)",
            transform: `rotate(${piece.rot}deg)`,
          }}
        />
      </div>
      <div className="mt-3.5 flex items-baseline justify-between gap-3">
        <h3 className="m-0 font-display text-2xl font-extrabold tracking-[-.02em]">{piece.name}</h3>
        <span className="whitespace-nowrap text-right font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7A3A12]">
          {piece.cat}
        </span>
      </div>
      <p className="mt-1.5 text-[15px] leading-snug">{piece.desc}</p>
    </article>
  );
}
