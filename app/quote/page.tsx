import type { Metadata } from "next";
import { Suspense } from "react";
import { contact } from "@/lib/data";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Get a Quote | InkWings Printing Solution, Ahmedabad",
  description:
    "Request a printing quote from InkWings, Ahmedabad: stationery, marketing materials, packaging, labels, signage and apparel.",
};

export default function QuotePage() {
  return (
    <div className="relative overflow-x-clip">
      <header className="px-5 pb-9 pt-[170px] sm:px-9 lg:px-[72px]">
        <p className="mb-6 font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-orange">
          Get a Quote
        </p>
        <h1 className="m-0 max-w-[11ch] font-display text-[clamp(38px,9vw,140px)] font-extrabold leading-[.94] tracking-[-.025em]">
          Tell us what you want to print.
        </h1>
      </header>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-12 px-5 py-5 sm:px-9 lg:px-[72px] lg:py-[clamp(70px,10vw,130px)]">
        <Suspense fallback={<div className="min-h-[480px] bg-white" />}>
          <QuoteForm />
        </Suspense>
        <div className="flex flex-col gap-5">
          <p className="m-0 font-hand text-[clamp(30px,3.4vw,46px)] leading-tight text-orange">
            Prefer WhatsApp?
          </p>
          <MagneticButton
            href={contact.wa}
            external
            className="self-start rounded-full bg-ink px-7 py-[18px] font-semibold text-paper"
          >
            WhatsApp Us &rarr;
          </MagneticButton>
          <p className="mt-3 text-[17px] leading-relaxed">
            Or call{" "}
            <a href={contact.tel} className="border-b-2 border-orange text-ink">
              {contact.phone}
            </a>
            <br />
            {contact.email}
          </p>
        </div>
      </section>
    </div>
  );
}
