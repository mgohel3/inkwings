import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { Gallery } from "@/components/sections/Gallery";
import { Texture } from "@/components/sections/Texture";
import { CTA } from "@/components/sections/CTA";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ContactPreview } from "@/components/sections/ContactPreview";

export default function Home() {
  return (
    <div className="relative overflow-x-clip">
      <Hero />
      <Intro />

      <section id="products" className="bg-ink px-5 py-[clamp(70px,10vw,140px)] text-paper sm:px-9 lg:px-[72px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
          <h2 className="m-0 font-display text-[clamp(40px,7vw,104px)] font-extrabold leading-[.95] tracking-[-.02em]">
            What we print
          </h2>
          <Link href="/products" className="border-b-2 border-orange pb-1 font-semibold text-paper">
            Browse all products &rarr;
          </Link>
        </div>
        <ProductExplorer variant="compact" />
      </section>

      <ProcessPreview />
      <Gallery />
      <Texture />
      <CTA />
      <AboutPreview />
      <ContactPreview />
    </div>
  );
}
