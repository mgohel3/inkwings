import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategory, shapes, productHref, categoryHref, tile, type Product } from "@/lib/data";
import { ProductVisual } from "@/components/products/ProductVisual";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: `${c.name} | InkWings Printing Solution, Ahmedabad`,
    description: `Printing services in Ahmedabad by InkWings. ${c.solution}`,
  };
}

function ProductRow({
  catSlug,
  p,
  index,
}: {
  catSlug: string;
  p: Product;
  index: number;
}) {
  return (
    <Reveal className="relative grid grid-cols-1 items-center gap-x-14 gap-y-3 border-t-[1.5px] border-ink py-7 md:grid-cols-[auto_minmax(140px,280px)_1fr]">
      <span className="font-body text-sm font-medium text-orange">
        {String(index + 1).padStart(2, "0")}
      </span>
      <Link
        href={productHref(catSlug, p.slug)}
        aria-label={p.name}
        className="flex h-[190px] items-center justify-center overflow-hidden"
        style={{ background: index % 2 ? "#D9D1BF" : "#E9E3D6" }}
      >
        <div style={tile(index + catSlug.length, 0.8)} />
      </Link>
      <div>
        <h2 className="m-0">
          <Link
            href={productHref(catSlug, p.slug)}
            className="font-display text-[clamp(26px,3.6vw,48px)] font-extrabold leading-[1.05] tracking-[-.02em] text-ink hover:text-orange"
          >
            {p.name}
          </Link>
        </h2>
        <p className="mt-2 max-w-[26em] text-lg leading-snug">{p.desc}</p>
        <div className="mt-3.5 flex gap-6">
          <Link
            href={productHref(catSlug, p.slug)}
            className="border-b-2 border-orange font-semibold text-ink"
          >
            View product
          </Link>
          <Link href={`/quote?p=${p.slug}`} className="font-semibold text-orange">
            Enquire &rarr;
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();

  const others = categories.filter((x) => x.slug !== c.slug);

  return (
    <div className="relative overflow-x-clip">
      <header className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-8 px-5 pb-14 pt-[150px] sm:px-9 lg:px-[72px]">
        <div>
          <p className="mb-6 font-body text-[13px] font-semibold uppercase tracking-[0.16em]">
            <Link href="/products" className="text-ink">
              Products
            </Link>{" "}
            <span className="text-orange">/</span>{" "}
            {String(categories.indexOf(c) + 1).padStart(2, "0")}
          </p>
          <h1 className="m-0 font-display text-[clamp(44px,8vw,124px)] font-extrabold leading-[.93] tracking-[-.025em]">
            {c.name}
          </h1>
          <p className="mt-6 font-hand text-[clamp(28px,3vw,40px)] leading-tight text-orange">
            {c.line}
          </p>
        </div>
        <div
          aria-hidden="true"
          className="relative h-[clamp(300px,40vw,520px)] overflow-hidden bg-paper-alt"
        >
          <ProductVisual shapes={shapes[c.slug]} scale={0.85} />
        </div>
      </header>

      <section className="px-5 pb-[clamp(70px,10vw,130px)] sm:px-9 lg:px-[72px]">
        {c.products.map((p, i) => (
          <ProductRow key={p.slug} catSlug={c.slug} p={p} index={i} />
        ))}
      </section>

      <section className="bg-ink px-5 py-[clamp(44px,8vw,100px)] text-paper sm:px-9 lg:px-[72px]">
        <p className="mb-[22px] font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-orange">
          More categories
        </p>
        <div className="flex flex-wrap gap-x-7 gap-y-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={categoryHref(o.slug)}
              className="font-display text-[clamp(24px,3.4vw,44px)] font-extrabold leading-[1.2] tracking-[-.02em] text-paper hover:text-orange"
            >
              {o.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-7 bg-orange px-5 py-[clamp(44px,8vw,110px)] sm:px-9 lg:px-[72px]">
        <h2 className="m-0 max-w-[10ch] font-display text-[clamp(40px,7vw,104px)] font-extrabold leading-[.95] tracking-[-.02em] text-ink">
          Need something custom?
        </h2>
        <Button href={`/quote?c=${c.slug}`} variant="solid-ink" className="text-lg">
          Get a Quote &rarr;
        </Button>
      </section>
    </div>
  );
}
