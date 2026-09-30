import type { Metadata } from "next";
import Link from "next/link";
import { categories, categoryHref } from "@/lib/data";
import { aboutWhoWeHelp } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About | InkWings Printing Solution, Ahmedabad",
  description:
    "InkWings is a one-stop solution in print media in Ahmedabad, covering stationery, marketing, packaging, signage, promotional products and apparel.",
};

export default function AboutPage() {
  return (
    <div className="relative overflow-x-clip">
      <header className="relative px-5 pb-11 pt-[170px] sm:px-9 lg:px-[72px]">
        <p className="mb-6 font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-orange">
          About
        </p>
        <Reveal>
          <h1 className="m-0 max-w-[12ch] font-display text-[clamp(38px,9vw,140px)] font-extrabold leading-[.94] tracking-[-.025em]">
            Your one-stop solution in print media.
          </h1>
        </Reveal>
      </header>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-10 border-t-[1.5px] border-ink px-5 py-[clamp(40px,6vw,90px)] sm:px-9 lg:px-[72px]">
        <h2 className="m-0 font-display text-[clamp(32px,4.4vw,64px)] font-extrabold leading-none tracking-[-.02em]">
          What we do
        </h2>
        <Reveal>
          <p className="m-0 max-w-[26em] text-[clamp(19px,2vw,26px)] leading-snug">
            InkWings prints. Documents, packaging, signage, promotional products and apparel, all
            from one place in Ahmedabad. Bring the idea and the requirement. We take it to print.
          </p>
        </Reveal>
      </section>

      <section className="bg-ink px-5 py-[clamp(44px,8vw,110px)] text-paper sm:px-9 lg:px-[72px]">
        <h2 className="mb-9 font-display text-[clamp(32px,4.4vw,64px)] font-extrabold leading-none tracking-[-.02em]">
          What we print
        </h2>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={categoryHref(c.slug)}
            className="flex items-baseline justify-between gap-5 border-t border-white/20 py-[18px] text-paper hover:text-orange"
          >
            <span className="font-display text-[clamp(26px,4vw,56px)] font-extrabold leading-[1.05] tracking-[-.025em]">
              {c.name}
            </span>
            <span className="whitespace-nowrap text-[15px]">{c.products.length} products &rarr;</span>
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-10 px-5 py-[clamp(44px,8vw,110px)] sm:px-9 lg:px-[72px]">
        <h2 className="m-0 font-display text-[clamp(32px,4.4vw,64px)] font-extrabold leading-none tracking-[-.02em]">
          Who we help
        </h2>
        <div className="flex flex-col">
          {aboutWhoWeHelp.map((w) => (
            <Reveal
              key={w.t}
              className="grid grid-cols-[minmax(120px,1fr)_2fr] gap-4 border-t-[1.5px] border-ink py-5"
            >
              <span className="font-display text-[22px] font-extrabold tracking-[-.01em]">
                {w.t}
              </span>
              <span className="text-[17px] leading-snug">{w.d}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-orange px-5 py-[clamp(70px,10vw,140px)] sm:px-9 lg:px-[72px]">
        <h2 className="mb-7 font-display text-[clamp(32px,4.4vw,64px)] font-extrabold leading-none tracking-[-.02em] text-ink">
          Why physical print still matters
        </h2>
        <Reveal>
          <p className="m-0 max-w-[20em] font-display text-[clamp(28px,4.6vw,68px)] font-semibold leading-[1.08] tracking-[-.025em] text-ink">
            A card gets handed over. A box gets opened. A sign gets seen. Some things only work
            when you can hold them.
          </p>
        </Reveal>
        <div className="mt-10">
          <Button href="/quote" variant="solid-ink" className="text-lg">
            Get a Quote &rarr;
          </Button>
        </div>
      </section>
    </div>
  );
}
