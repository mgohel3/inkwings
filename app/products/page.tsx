import type { Metadata } from "next";
import Link from "next/link";
import { categories, extras, categoryHref, productHref } from "@/lib/data";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Products | InkWings Printing Solution, Ahmedabad",
  description:
    "Corporate stationery, marketing materials, promotional products, signage, packaging and label printing, and apparel from InkWings in Ahmedabad.",
};

export default function ProductsPage() {
  return (
    <div className="relative overflow-x-clip">
      <header className="px-5 pb-11 pt-[170px] sm:px-9 lg:px-[72px]">
        <SectionLabel className="mb-6">Products</SectionLabel>
        <Reveal>
          <h1 className="m-0 max-w-[11ch] font-display text-[clamp(38px,9.6vw,150px)] font-extrabold leading-[.93] tracking-[-.025em]">
            Everything you can put your brand on.
          </h1>
        </Reveal>
        <p className="mt-8 max-w-[30em] text-[clamp(18px,2vw,24px)] leading-snug">
          From everyday stationery to packaging, signage and promotional products — explore what
          we print.
        </p>
      </header>

      <section className="bg-ink px-5 py-[clamp(44px,8vw,110px)] text-paper sm:px-9 lg:px-[72px]">
        <ProductExplorer variant="full" />
      </section>

      <section className="px-5 py-[clamp(70px,10vw,140px)] sm:px-9 lg:px-[72px]">
        <h2 className="mb-12 font-display text-[clamp(36px,6vw,88px)] font-extrabold leading-none tracking-[-.02em]">
          The full index
        </h2>
        {categories.map((c) => (
          <div
            key={c.slug}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-10 gap-y-[18px] border-t-[1.5px] border-ink py-[22px]"
          >
            <Link
              href={categoryHref(c.slug)}
              className="font-display text-[clamp(26px,3.2vw,42px)] leading-[1.05] font-extrabold tracking-[-.02em] text-ink hover:text-orange"
            >
              {c.name}
            </Link>
            <div className="flex flex-wrap gap-x-[18px] gap-y-1.5 text-[17px] leading-relaxed">
              {c.products.map((p) => (
                <Link key={p.slug} href={productHref(c.slug, p.slug)} className="underline-reveal text-ink">
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-10 gap-y-[18px] border-t-[1.5px] border-ink pt-[22px]">
          <div className="font-display text-[clamp(26px,3.2vw,42px)] leading-[1.05] font-extrabold tracking-[-.02em]">
            Also from the brochure
          </div>
          <div className="flex flex-wrap gap-2">
            {extras.map((e) => (
              <Link
                key={e}
                href="/quote"
                className="rounded-full border-[1.5px] border-ink px-4 py-2 text-[15px] font-medium text-ink hover:bg-ink hover:text-paper"
              >
                {e}
              </Link>
            ))}
            <span className="px-1 py-2 text-[15px]">and more</span>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-7 bg-orange px-5 py-[clamp(44px,8vw,100px)] sm:px-9 lg:px-[72px]">
        <h2 className="m-0 max-w-[12ch] font-display text-[clamp(36px,6vw,84px)] font-extrabold leading-[.98] tracking-[-.02em] text-ink">
          Don&apos;t see it? Ask.
        </h2>
        <Button href="/quote" variant="solid-ink" className="text-lg">
          Get a Quote &rarr;
        </Button>
      </section>
    </div>
  );
}
