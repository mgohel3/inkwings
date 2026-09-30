"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navLinks } from "@/lib/content";
import { useScrollY, useViewport, useBodyScrollLock } from "@/lib/hooks";
import { cx } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const y = useScrollY();
  const { w } = useViewport();
  const reduce = useReducedMotion();
  const [menuOpenState, setMenuOpenState] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const wide = w > 900;
  const compact = y > 80;
  const activeKey = navLinks.find((l) => pathname.startsWith(l.href))?.key ?? "";
  // Derived rather than synced via effect: the toggle button that sets menuOpen
  // only exists below 900px, and every mobile-menu link closes it on click.
  const menuOpen = menuOpenState && !wide;

  useBodyScrollLock(menuOpen);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpenState(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) firstLinkRef.current?.focus();
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const container = overlayRef.current;
    if (!container) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <nav
        aria-label="Primary"
        className={cx(
          "fixed z-[60] flex items-center transition-all duration-350",
          wide
            ? "left-1/2 top-3.5 -translate-x-1/2 rounded-full bg-paper/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)] w-max max-w-[calc(100vw-24px)]"
            : "left-0 right-0 top-0 justify-between",
          wide ? (compact ? "gap-6 py-1.5 pl-[22px] pr-2.5" : "gap-9 py-3 pl-7 pr-3.5") : "px-2.5 py-1.5"
        )}
        style={
          !wide
            ? {
                background: menuOpen ? "var(--color-paper)" : "rgba(244,240,232,0.96)",
                boxShadow: compact && !menuOpen ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
              }
            : undefined
        }
      >
        <Link href="/" aria-label="InkWings home" className="block leading-none">
          <Image
            src="/logo.png"
            alt="InkWings Printing Solution"
            width={1400}
            height={575}
            priority
            className={cx(
              "h-auto transition-[width] duration-[350ms]",
              wide ? (compact ? "w-[116px]" : "w-[140px]") : w < 480 ? "w-[112px]" : "w-[128px]"
            )}
          />
        </Link>

        {wide && (
          <div className="flex gap-[26px]">
            {navLinks.map((l) => (
              <Link
                key={l.key}
                href={l.href}
                className={cx(
                  "underline-reveal text-[15px] font-medium text-ink pb-[3px]",
                  activeKey === l.key && "[background-size:100%_2px]"
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}

        {wide && (
          <Link
            href="/quote"
            className="rounded-full bg-orange px-[18px] py-2.5 text-sm font-semibold text-ink whitespace-nowrap hover:bg-ink hover:text-paper transition-colors"
          >
            Get a Quote
          </Link>
        )}

        {!wide && (
          <button
            onClick={() => setMenuOpenState((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-transparent cursor-pointer"
          >
            <span
              className={cx(
                "block h-0.5 w-[18px] bg-ink transition-transform duration-300",
                menuOpen ? "rotate-45 shadow-none" : "-translate-y-[3px] shadow-[0_6px_0_#111]"
              )}
            />
          </button>
        )}
      </nav>

      {!wide && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[55] flex flex-col justify-center overflow-y-auto bg-paper px-5 pb-10 pt-24 sm:px-9"
          style={{
            opacity: menuOpen ? 1 : 0,
            visibility: menuOpen ? "visible" : "hidden",
            transition: reduce ? "none" : "opacity .35s, visibility .35s",
          }}
        >
          {navLinks.map((l, i) => (
            <Link
              key={l.key}
              href={l.href}
              ref={i === 0 ? firstLinkRef : undefined}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpenState(false)}
              className="font-display text-[clamp(36px,12vw,84px)] leading-[1.05] font-extrabold tracking-[-.02em]"
              style={{
                color: activeKey === l.key ? "var(--color-orange)" : "var(--color-ink)",
                transform: menuOpen ? "none" : "translateY(40px)",
                opacity: menuOpen ? 1 : 0,
                transition: reduce
                  ? "none"
                  : `all .5s ${menuOpen ? 0.08 * i + 0.1 : 0}s cubic-bezier(.2,.8,.2,1)`,
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/quote"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpenState(false)}
            className="mt-7 self-start rounded-full bg-orange px-8 py-[18px] text-xl font-semibold text-ink"
          >
            Get a Quote &rarr;
          </Link>
          <p className="mt-6 text-[15px] leading-relaxed text-ink">
            +91 81416 40756
            <br />
            inkwingsprint@gmail.com
          </p>
        </div>
      )}

      <PageWipe pathname={pathname} reduce={reduce} />
    </>
  );
}

function PageWipe({ pathname, reduce }: { pathname: string; reduce: boolean | null }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        aria-hidden="true"
        initial={reduce ? false : { y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: reduce ? 0 : 0.5, ease: [0.7, 0, 0.2, 1] }}
        className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-paper"
      >
        <div className="absolute left-0 right-0 top-[-18px] h-[18px] bg-orange" />
        <Image
          src="/logo.png"
          alt=""
          width={1400}
          height={575}
          className="h-auto w-[clamp(170px,30vw,320px)]"
        />
      </motion.div>
    </AnimatePresence>
  );
}
