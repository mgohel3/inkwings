import { contact } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function ContactPreview() {
  return (
    <section
      id="contact"
      className="bg-ink px-5 py-[clamp(70px,10vw,140px)] text-paper sm:px-9 lg:px-[72px]"
    >
      <h2 className="m-0 mb-14 font-display text-[clamp(44px,8vw,120px)] font-extrabold leading-[.95] tracking-[-.02em]">
        Let&apos;s print it.
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-10">
        <div className="flex flex-col gap-7 text-xl leading-snug">
          <div>
            <div className="mb-1.5 font-body text-xs font-semibold uppercase tracking-[0.16em] text-orange">
              Phone
            </div>
            <a href={contact.tel} className="text-paper hover:text-orange">
              {contact.phone}
            </a>
          </div>
          <div>
            <div className="mb-1.5 font-body text-xs font-semibold uppercase tracking-[0.16em] text-orange">
              Email
            </div>
            <a href={`mailto:${contact.email}`} className="break-all text-paper hover:text-orange">
              {contact.email}
            </a>
          </div>
          <div>
            <div className="mb-1.5 font-body text-xs font-semibold uppercase tracking-[0.16em] text-orange">
              Website
            </div>
            <span>{contact.website}</span>
          </div>
          <div>
            <div className="mb-1.5 font-body text-xs font-semibold uppercase tracking-[0.16em] text-orange">
              Address
            </div>
            {contact.address.line1}
            <br />
            {contact.address.line2}
            <br />
            {contact.address.line3}
            <br />
            {contact.address.line4}
          </div>
          <Button href="/quote" variant="solid-orange" className="self-start">
            Send a project enquiry &rarr;
          </Button>
        </div>
        <div
          className="flex min-h-[340px] items-center justify-center border-[1.5px] border-dashed border-white/40 p-6 text-center text-paper"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,transparent 0 14px,rgba(255,255,255,0.03) 14px 15px)",
          }}
        >
          Map placeholder
          <br />
          Ashram Road, Ahmedabad
        </div>
      </div>
    </section>
  );
}
