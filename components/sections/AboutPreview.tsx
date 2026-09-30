import { categories } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LinkReveal } from "@/components/ui/LinkReveal";
import { Reveal } from "@/components/ui/Reveal";

export function AboutPreview() {
  return (
    <section
      id="about"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-14 px-5 py-[clamp(80px,12vw,160px)] sm:px-9 lg:px-[72px]"
    >
      <div>
        <SectionLabel className="mb-6">About InkWings</SectionLabel>
        <h2 className="m-0 font-display text-[clamp(38px,6vw,88px)] font-extrabold leading-none tracking-[-.02em]">
          Your one-stop partner for print media.
        </h2>
      </div>
      <div className="flex flex-col items-start gap-[22px] self-end">
        <Reveal>
          <p className="m-0 max-w-[30em] text-xl leading-snug">
            From business cards and letterheads to product packaging, labels, signage,
            merchandise and apparel, InkWings prints across six categories from one desk in
            Ahmedabad.
          </p>
        </Reveal>
        <LinkReveal href="/about">More about InkWings &rarr;</LinkReveal>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c.slug}
              className="rounded-full border-[1.5px] border-ink px-4 py-2 text-[15px] font-medium"
            >
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
