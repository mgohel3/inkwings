"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Shape } from "@/lib/data";

/**
 * Renders the prototype's CSS placeholder product-mockup pieces for a category.
 * Once real photography is available, pass `image` to render it instead of the shapes.
 */
export function ProductVisual({
  shapes,
  scale = 1,
  image,
  alt,
  className,
}: {
  shapes: Shape[];
  scale?: number;
  image?: string;
  alt?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (image) {
    return (
      <div className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image src={image} alt={alt ?? ""} fill className="object-contain" />
      </div>
    );
  }

  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
      {shapes.map((p, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{
            x: p.x * scale,
            y: p.y * scale,
            rotate: p.rot,
            scale,
          }}
          transition={reduce ? { duration: 0 } : { type: "tween", duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            position: "absolute",
            left: "50%",
            top: "46%",
            width: p.w,
            height: p.h,
            marginLeft: -p.w / 2,
            marginTop: -p.h / 2,
            background: p.bg,
            borderRadius: p.radius,
            color: p.textColor,
            font: "600 12px 'Instrument Sans'",
            display: "flex",
            alignItems: "flex-end",
            padding: 8,
            boxShadow: "0 20px 40px rgba(0,0,0,.4)",
          }}
        >
          {p.label}
        </motion.div>
      ))}
    </div>
  );
}

export function ProductTile({
  index,
  scale = 1,
  className,
  rotate = 0,
}: {
  index: number;
  scale?: number;
  className?: string;
  rotate?: number;
}) {
  const palette = ["#E8560E", "#F4F0E8", "#63813A", "#111", "#fff"];
  const variants: [number, number, number][] = [
    [200, 120, 6],
    [140, 190, 4],
    [160, 160, 10],
    [120, 120, 60],
    [220, 90, 4],
  ];
  const v = variants[(index * 3 + 1) % 5];
  return (
    <div
      className={className}
      style={{
        width: v[0] * scale,
        height: v[1] * scale,
        background: palette[index % 5],
        borderRadius: v[2],
        boxShadow: "0 20px 36px rgba(0,0,0,.2)",
        transform: `rotate(${rotate}deg)`,
      }}
    />
  );
}
