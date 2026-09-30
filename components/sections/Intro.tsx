import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Intro() {
  return (
    <section className="bg-paper px-5 py-[clamp(80px,14vw,180px)] sm:px-9 lg:px-[72px]">
      <SectionLabel className="mb-7">Idea &rarr; Design &rarr; Print &rarr; Product</SectionLabel>
      <Reveal>
        <p className="m-0 max-w-[18em] font-display text-[clamp(30px,5.2vw,76px)] font-semibold leading-[1.08] tracking-[-.025em]">
          Ideas are easy. Making them physical is the{" "}
          <span className="font-hand text-[1.15em] font-semibold text-orange">fun part.</span>
        </p>
      </Reveal>
    </section>
  );
}
