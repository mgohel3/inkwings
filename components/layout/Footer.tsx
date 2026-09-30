import Image from "next/image";
import Link from "next/link";
import { categories, contact, categoryHref } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-ink px-5 pb-7 pt-14 text-paper sm:px-9 md:pt-20 lg:pt-[110px]">
      <Link
        href="/quote"
        className="inline-block font-display text-[clamp(44px,9vw,140px)] font-extrabold leading-[.95] tracking-[-.025em] text-orange hover:text-paper transition-colors"
      >
        Get a Quote &rarr;
      </Link>

      <div className="my-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-10 text-[15px] leading-loose md:my-16">
        <div>
          <Link href="/" aria-label="InkWings home" className="block leading-none">
            <Image
              src="/logo.png"
              alt="InkWings Printing Solution"
              width={1400}
              height={575}
              className="h-auto w-full max-w-[220px]"
            />
          </Link>
        </div>

        <div>
          <div className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.16em] text-orange">
            Products
          </div>
          {categories.map((c) => (
            <Link key={c.slug} href={categoryHref(c.slug)} className="block text-paper hover:text-orange">
              {c.name}
            </Link>
          ))}
          <Link href="/products" className="mt-1.5 block font-semibold text-orange hover:text-paper">
            All products &rarr;
          </Link>
        </div>

        <div>
          <div className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.16em] text-orange">
            Explore
          </div>
          <Link href="/services" className="block text-paper hover:text-orange">Services</Link>
          <Link href="/process" className="block text-paper hover:text-orange">Process</Link>
          <Link href="/work" className="block text-paper hover:text-orange">Work</Link>
          <Link href="/about" className="block text-paper hover:text-orange">About</Link>
          <Link href="/contact" className="block text-paper hover:text-orange">Contact</Link>
        </div>

        <div>
          <div className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.16em] text-orange">
            Contact
          </div>
          <a href={contact.tel} className="block text-paper hover:text-orange">{contact.phone}</a>
          <a href={`mailto:${contact.email}`} className="block break-all text-paper hover:text-orange">
            {contact.email}
          </a>
          <div className="mt-2">
            {contact.address.line1}
            <br />
            {contact.address.line2}
            <br />
            {contact.address.line3}
            <br />
            {contact.address.line4}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-4 border-t border-white/20 pt-5 text-sm">
        <span>{contact.website}</span>
        <span>&copy; InkWings</span>
        <span>Designed and developed by Evolnity</span>
      </div>
    </footer>
  );
}
