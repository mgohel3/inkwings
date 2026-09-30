import { Button } from "@/components/ui/Button";
import { contact } from "@/lib/data";

export function CTA() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center gap-9 overflow-hidden bg-orange px-5 py-[clamp(70px,10vw,140px)] text-ink sm:px-9 lg:px-[72px]">
      <h2 className="m-0 max-w-[9ch] font-display text-[clamp(40px,12vw,190px)] font-extrabold leading-[.9] tracking-[-.025em]">
        Have something in mind?
      </h2>
      <p className="m-0 max-w-[22em] text-[clamp(20px,2.4vw,32px)] leading-tight">
        Tell us what you need. We&apos;ll help bring it to print.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button href="/quote" variant="solid-ink" className="text-lg">
          Start Your Project &rarr;
        </Button>
        <Button href={contact.wa} variant="outline-ink-on-orange" external className="text-lg">
          WhatsApp Us
        </Button>
      </div>
    </section>
  );
}
