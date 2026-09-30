import type { Metadata } from "next";
import Image from "next/image";
import { contact } from "@/lib/data";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact | InkWings Printing Solution, Ahmedabad",
  description: "Contact InkWings, Ashram Road, Ahmedabad. Phone +91 81416 40756, inkwingsprint@gmail.com.",
};

export default function ContactPage() {
  return (
    <div className="relative overflow-x-clip">
      <header className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-8 px-5 pb-10 pt-[104px] sm:px-9 sm:pt-32 lg:px-[72px] lg:pt-[170px]">
        <div className="min-w-0">
          <p className="mb-[22px] font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-orange">
            Contact InkWings
          </p>
          <Reveal>
            <h1 className="m-0 font-display text-[clamp(42px,8.4vw,132px)] font-extrabold leading-[.95] tracking-[-.025em]">
              Let&apos;s make something real.
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-[26px] max-w-[28em] text-[clamp(17px,1.8vw,22px)] leading-snug">
              Have a print requirement, a custom idea, or simply know what you need? Tell us about
              it.
            </p>
          </Reveal>
        </div>
        <div className="relative min-w-0" style={{ height: "clamp(280px,42vw,520px)" }} aria-hidden="true">
          <div
            className="absolute left-[8%] top-[10%] aspect-[3/4] w-[54%] bg-orange shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
            style={{ transform: "rotate(-8deg)" }}
          />
          <div
            className="absolute right-[6%] top-[4%] aspect-[3/4] w-[44%] bg-ink shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
            style={{ transform: "rotate(7deg)" }}
          />
          <div
            className="absolute bottom-[8%] left-[14%] right-[8%] flex aspect-[1.75/1] items-center justify-center bg-white p-[6%] shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
            style={{ transform: "rotate(-3deg)" }}
          >
            <Image src="/logo.png" alt="" width={1400} height={575} className="h-auto max-h-full w-full object-contain" />
          </div>
          <div
            className="absolute bottom-0 right-[2%] aspect-square w-[16%] rounded-full bg-green shadow-[0_16px_30px_rgba(0,0,0,0.12)]"
          />
        </div>
      </header>

      <section className="px-5 pb-14 sm:px-9 sm:pb-20 lg:px-[72px] lg:pb-[110px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-x-10 border-t-[1.5px] border-ink">
          <div className="min-w-0 py-7">
            <div className="mb-2.5 font-body text-xs font-semibold uppercase tracking-[0.16em] text-orange">
              Phone
            </div>
            <a
              href={contact.tel}
              className="whitespace-nowrap font-display text-[clamp(28px,3.4vw,48px)] font-extrabold leading-[1.05] tracking-[-.025em] text-ink hover:text-orange"
            >
              {contact.phone}
            </a>
          </div>
          <div className="min-w-0 py-7">
            <div className="mb-2.5 font-body text-xs font-semibold uppercase tracking-[0.16em] text-orange">
              Email
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="break-words font-display text-[clamp(20px,2.4vw,34px)] font-extrabold leading-[1.15] tracking-[-.02em] text-ink hover:text-orange"
            >
              {contact.email}
            </a>
          </div>
          <div className="min-w-0 py-7">
            <div className="mb-2.5 font-body text-xs font-semibold uppercase tracking-[0.16em] text-orange">
              Address
            </div>
            <p className="m-0 text-[clamp(18px,1.7vw,22px)] leading-snug">
              {contact.address.line1}
              <br />
              {contact.address.line2}
              <br />
              {contact.address.line3}
              <br />
              {contact.address.line4}
            </p>
          </div>
          <div className="min-w-0 py-7">
            <div className="mb-2.5 font-body text-xs font-semibold uppercase tracking-[0.16em] text-orange">
              Website
            </div>
            <span className="font-display text-[clamp(28px,3.4vw,48px)] font-extrabold leading-[1.05] tracking-[-.025em]">
              {contact.website}
            </span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-x-16 gap-y-10 bg-paper-alt-2 px-5 py-14 sm:px-9 sm:py-20 lg:px-[72px] lg:py-[110px]">
        <ContactForm />
        <div className="flex min-w-0 flex-col gap-8">
          <div>
            <p className="mb-3.5 font-hand text-[clamp(30px,3.4vw,46px)] leading-tight text-orange">
              Prefer WhatsApp?
            </p>
            <a
              href={contact.wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border-2 border-ink px-7 py-4 font-semibold text-ink hover:bg-ink hover:text-paper"
            >
              WhatsApp Us &rarr;
            </a>
          </div>
          <div
            aria-label="Map placeholder"
            className="relative overflow-hidden border-[1.5px] border-dashed border-ink"
            style={{
              height: "clamp(220px,26vw,320px)",
              backgroundImage:
                "repeating-linear-gradient(45deg,transparent 0 14px,rgba(0,0,0,0.035) 14px 15px)",
            }}
          >
            <div className="absolute left-1/2 top-[44%] h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange shadow-[0_0_0_8px_rgba(232,86,14,0.2)]" />
            <div className="absolute bottom-3.5 left-4 font-display text-xl font-extrabold leading-tight">
              Ahmedabad
              <br />
              <span className="font-body text-xs font-semibold uppercase tracking-[0.14em]">
                River Front / Ashram Road
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-7 bg-orange px-5 py-14 sm:px-9 sm:py-24 lg:px-[72px] lg:py-[120px]">
        <Reveal>
          <h2 className="m-0 max-w-[10ch] font-display text-[clamp(40px,10vw,160px)] font-extrabold leading-[.92] tracking-[-.025em] text-ink">
            Have something in mind?
          </h2>
        </Reveal>
        <p className="m-0 text-[clamp(19px,2.2vw,28px)] leading-tight text-ink">
          Let&apos;s turn it into something you can hold.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/quote" variant="solid-ink" className="text-lg">
            Get a Quote &rarr;
          </Button>
          <Button href={contact.wa} variant="outline-ink-on-orange" external className="text-lg">
            WhatsApp Us
          </Button>
        </div>
      </section>
    </div>
  );
}
