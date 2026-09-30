import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allProducts, getCategory, categoryHref, productHref, tile } from "@/lib/data";
import { Button } from "@/components/ui/Button";

const specs = ["Material", "Size", "Printing", "Finishing", "Minimum quantity", "Delivery"];

export function generateStaticParams() {
  return allProducts.map((p) => ({ category: p.cat.slug, product: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}): Promise<Metadata> {
  const { product } = await params;
  const p = allProducts.find((x) => x.slug === product);
  if (!p) return {};
  return {
    title: `${p.name} | InkWings Printing Solution, Ahmedabad`,
    description: `Printing services in Ahmedabad by InkWings. ${p.desc}`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category, product } = await params;
  const p = allProducts.find((x) => x.slug === product);
  if (!p || p.cat.slug !== category) notFound();

  const c = getCategory(p.cat.slug)!;
  const idx = c.products.findIndex((x) => x.slug === p.slug);
  const related = c.products.filter((x) => x.slug !== p.slug).slice(0, 5);

  return (
    <div className="relative overflow-x-clip">
      <header className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-10 px-5 pb-11 pt-[150px] sm:px-9 lg:px-[72px]">
        <div
          aria-hidden="true"
          className="relative flex h-[clamp(320px,44vw,560px)] items-center justify-center overflow-hidden bg-paper-alt"
        >
          <div
            style={{
              ...tile(idx + 5, 1.5),
              transform: "rotate(-5deg)",
              position: "relative",
            }}
          />
          <div
            style={{
              ...tile(idx + 2, 0.8),
              position: "absolute",
              right: "12%",
              bottom: "14%",
              transform: "rotate(9deg)",
            }}
          />
          <span className="absolute bottom-3 left-4 font-body text-xs font-semibold uppercase tracking-[0.14em]">
            Product image placeholder
          </span>
        </div>
        <div>
          <p className="mb-6 font-body text-[13px] font-semibold uppercase tracking-[0.16em]">
            <Link href="/products" className="text-ink">
              Products
            </Link>{" "}
            <span className="text-orange">/</span>{" "}
            <Link href={categoryHref(c.slug)} className="text-ink">
              {c.name}
            </Link>
          </p>
          <h1 className="m-0 font-display text-[clamp(42px,7vw,108px)] font-extrabold leading-[.95] tracking-[-.025em]">
            {p.name}
          </h1>
          <p className="mt-6 max-w-[22em] text-[clamp(19px,2vw,26px)] leading-snug">{p.desc}</p>
          <p className="mb-8 mt-5 font-hand text-[clamp(28px,3vw,40px)] leading-tight text-orange">
            {c.tag}
          </p>
          <Button href={`/quote?p=${p.slug}`} variant="solid-orange" className="text-[17px]">
            Request a Quote &rarr;
          </Button>
        </div>
      </header>

      <section className="bg-ink px-5 py-[clamp(44px,8vw,110px)] text-paper sm:px-9 lg:px-[72px]">
        <h2 className="mb-3 font-display text-[clamp(34px,5vw,72px)] font-extrabold leading-none tracking-[-.02em]">
          Specifications
        </h2>
        <p className="mb-9 max-w-[34em] leading-snug">
          The brochure doesn&apos;t list specifications for this product. Tell us what you need
          and we&apos;ll confirm the details with your quote.
        </p>
        {specs.map((s) => (
          <div
            key={s}
            className="flex justify-between gap-5 border-t border-white/20 py-[18px] text-lg"
          >
            <span className="font-semibold">{s}</span>
            <span className="text-paper">Confirmed on quote</span>
          </div>
        ))}
      </section>

      <section className="px-5 py-[clamp(44px,8vw,110px)] sm:px-9 lg:px-[72px]">
        <h2 className="mb-8 font-display text-[clamp(34px,5vw,72px)] font-extrabold leading-none tracking-[-.02em]">
          More {c.name}
        </h2>
        <div className="flex flex-wrap gap-3">
          {related.map((r, i) => (
            <Link
              key={r.slug}
              href={productHref(c.slug, r.slug)}
              className="block w-[min(100%,220px)] text-ink hover:text-orange"
            >
              <div
                className="flex items-center justify-center overflow-hidden"
                style={{ height: 150, background: i % 2 ? "#D9D1BF" : "#E9E3D6" }}
              >
                <div style={tile(i + 3, 0.6)} />
              </div>
              <div className="mt-2.5 font-display text-xl font-extrabold leading-[1.15]">
                {r.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-7 bg-orange px-5 py-[clamp(44px,8vw,110px)] sm:px-9 lg:px-[72px]">
        <h2 className="m-0 max-w-[11ch] font-display text-[clamp(40px,7vw,104px)] font-extrabold leading-[.95] tracking-[-.02em] text-ink">
          Have a different requirement?
        </h2>
        <Button href={`/quote?p=${p.slug}`} variant="solid-ink" className="text-lg">
          Request a Quote &rarr;
        </Button>
      </section>
    </div>
  );
}
