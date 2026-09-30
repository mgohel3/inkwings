import type { Metadata } from "next";
import { categories, shapes, categoryHref } from "@/lib/data";
import { ProductVisual } from "@/components/products/ProductVisual";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Services | InkWings Printing Solution, Ahmedabad",
  description:
    "Printing solutions for corporate branding, marketing, promotion, outdoor advertising, packaging and labels, and merchandise. InkWings, Ahmedabad.",
};

export default function ServicesPage() {
  return (
    <div className="relative overflow-x-clip">
      <header className="px-5 pb-11 pt-[170px] sm:px-9 lg:px-[72px]">
        <SectionLabel className="mb-6">Services</SectionLabel>
        <Reveal>
          <h1 className="m-0 max-w-[12ch] font-display text-[clamp(38px,9vw,140px)] font-extrabold leading-[.94] tracking-[-.025em]">
            Print is the output. The idea comes first.
          </h1>
        </Reveal>
      </header>

      {categories.map((c, i) => {
        const dark = i % 2 === 1;
        return (
          <section
            key={c.slug}
            className="px-5 py-[clamp(60px,9vw,130px)] sm:px-9 lg:px-[72px]"
            style={{
              background: dark ? "var(--color-ink)" : "var(--color-paper)",
              color: dark ? "var(--color-paper)" : "var(--color-ink)",
              borderTop: dark ? undefined : "1.5px solid var(--color-ink)",
            }}
          >
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-10">
              <div>
                <div className="font-display text-[clamp(52px,12vw,180px)] font-extrabold leading-[.8] tracking-[-.03em] text-orange">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <Reveal>
                  <h2 className="mt-2.5 font-display text-[clamp(38px,6vw,92px)] font-extrabold leading-[.98] tracking-[-.02em]">
                    {c.nav}
                  </h2>
                </Reveal>
                <Reveal>
                  <p className="mt-5 max-w-[24em] text-[clamp(18px,1.8vw,24px)] leading-snug">
                    {c.solution}
                  </p>
                </Reveal>
                <p className="my-5 max-w-[34em] leading-relaxed">
                  {c.products.map((p) => p.name).join(" · ")}
                </p>
                <Button
                  href={categoryHref(c.slug)}
                  variant="solid-orange"
                  className={dark ? "" : "bg-ink text-paper hover:bg-orange hover:text-white"}
                >
                  See {c.name} &rarr;
                </Button>
              </div>
              <div
                aria-hidden="true"
                className="relative h-[clamp(280px,36vw,460px)] overflow-hidden"
                style={{ background: dark ? "#1b1b1b" : "var(--color-paper-alt)" }}
              >
                <ProductVisual shapes={shapes[c.slug]} scale={0.8} />
              </div>
            </div>
          </section>
        );
      })}

      <section className="flex flex-wrap items-center justify-between gap-7 bg-orange px-5 py-[clamp(44px,8vw,110px)] sm:px-9 lg:px-[72px]">
        <h2 className="m-0 max-w-[10ch] font-display text-[clamp(40px,7vw,104px)] font-extrabold leading-[.95] tracking-[-.02em] text-ink">
          Tell us what you need.
        </h2>
        <Button href="/quote" variant="solid-ink" className="text-lg">
          Get a Quote &rarr;
        </Button>
      </section>
    </div>
  );
}
