"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCategory, getProduct, contact, type Product } from "@/lib/data";
import { quoteCategoryOptions } from "@/lib/content";
import { cx } from "@/lib/utils";

type Fields = {
  product: string;
  qty: string;
  details: string;
  name: string;
  company: string;
  phone: string;
  email: string;
};

const emptyFields: Fields = {
  product: "",
  qty: "",
  details: "",
  name: "",
  company: "",
  phone: "",
  email: "",
};

function productsForCategory(cat: string): Product[] {
  if (!cat || cat === "other") return [];
  if (cat === "labels") {
    return getCategory("packaging")?.products.filter((p) => /label|shrink/i.test(p.name)) ?? [];
  }
  const c = getCategory(cat);
  if (!c) return [];
  return cat === "packaging"
    ? c.products.filter((p) => !/label|shrink/i.test(p.name))
    : c.products;
}

function initialStateFromParams(searchParams: URLSearchParams) {
  const p = getProduct(searchParams.get("p"));
  const c = searchParams.get("c");
  if (p) {
    const isLabel = /label|shrink/i.test(p.name);
    return { cat: isLabel ? "labels" : p.cat.slug, prod: p.name, step: 2 };
  }
  if (c && quoteCategoryOptions.some(([, slug]) => slug === c)) {
    return { cat: c, prod: "", step: 1 };
  }
  return { cat: "", prod: "", step: 0 };
}

export function QuoteForm() {
  const searchParams = useSearchParams();
  // Lazy initializers read the URL InkWings links generate (?c=... / ?p=...)
  // once, on first render, instead of syncing it in via an effect.
  const [initial] = useState(() => initialStateFromParams(searchParams));
  const [step, setStep] = useState(initial.step);
  const [cat, setCat] = useState(initial.cat);
  const [prod, setProd] = useState(initial.prod);
  const [done, setDone] = useState(false);
  const [fields, setFields] = useState<Fields>(emptyFields);

  const catName = quoteCategoryOptions.find(([, slug]) => slug === cat)?.[0] ?? "";
  const products = useMemo(() => productsForCategory(cat), [cat]);
  const isOther = cat === "other";
  const productValue = isOther ? fields.product : prod;

  const ok = [
    !!cat,
    isOther ? !!fields.product : !!prod,
    !!fields.qty.trim(),
    true,
    !!fields.name.trim() && !!(fields.phone.trim() || fields.email.trim()),
  ][step];

  const summary = [
    `Category: ${catName}`,
    `Product: ${productValue}`,
    `Quantity: ${fields.qty}`,
    fields.details && `Details: ${fields.details}`,
    `Name: ${fields.name}${fields.company ? " (" + fields.company + ")" : ""}`,
    fields.phone && `Phone: ${fields.phone}`,
    fields.email && `Email: ${fields.email}`,
  ]
    .filter(Boolean)
    .join("\n");

  const mailHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    "Quote request: " + productValue
  )}&body=${encodeURIComponent(summary)}`;
  const waHref = `${contact.wa}?text=${encodeURIComponent("Quote request\n" + summary)}`;

  function set<K extends keyof Fields>(key: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));
  }

  function next() {
    if (!ok) return;
    if (step === 4) setDone(true);
    else setStep((s) => s + 1);
  }

  function back() {
    if (done) {
      setDone(false);
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  }

  const chipClass = (on: boolean) =>
    cx(
      "cursor-pointer rounded-full border-[1.5px] px-5 py-3 font-body text-[17px] font-medium transition-all",
      on ? "border-orange bg-orange text-ink" : "border-ink bg-transparent text-ink"
    );

  return (
    <div className="flex min-h-[480px] flex-col gap-7 bg-white p-[clamp(22px,3.5vw,52px)] shadow-[0_30px_60px_rgba(0,0,0,0.04)]">
      <div className="grid grid-cols-5 gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1.5 transition-colors"
            style={{ background: done || i <= step ? "#E8560E" : "#11111122" }}
          />
        ))}
      </div>
      <div className="font-body text-[13px] font-semibold uppercase tracking-[0.14em]">
        Step {done ? 5 : step + 1} of 5
      </div>

      {!done && step === 0 && (
        <div>
          <h2 className="mb-[22px] font-display text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-.025em]">
            What are you looking for?
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {quoteCategoryOptions.map(([label, slug]) => (
              <button
                key={slug}
                onClick={() => {
                  setCat(slug);
                  setProd("");
                }}
                aria-pressed={cat === slug}
                className={chipClass(cat === slug)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {!done && step === 1 && (
        <div>
          <h2 className="mb-[22px] font-display text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-.025em]">
            {isOther ? "What do you need?" : "Which product?"}
          </h2>
          {!isOther ? (
            <div className="flex flex-wrap gap-2.5">
              {products.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => setProd(p.name)}
                  aria-pressed={prod === p.name}
                  className={chipClass(prod === p.name)}
                >
                  {p.name}
                </button>
              ))}
            </div>
          ) : (
            <input
              aria-label="Product"
              placeholder="Describe the product"
              value={fields.product}
              onChange={set("product")}
              className="w-full border-0 border-b-2 border-ink bg-transparent py-3.5 font-body text-xl font-medium text-ink outline-offset-4 focus:border-orange"
            />
          )}
        </div>
      )}

      {!done && step === 2 && (
        <div>
          <h2 className="mb-[22px] font-display text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-.025em]">
            How many do you need?
          </h2>
          <input
            aria-label="Quantity"
            placeholder="Quantity or requirement, e.g. 500 pieces"
            value={fields.qty}
            onChange={set("qty")}
            className="w-full border-0 border-b-2 border-ink bg-transparent py-3.5 font-body text-xl font-medium text-ink outline-offset-4 focus:border-orange"
          />
        </div>
      )}

      {!done && step === 3 && (
        <div>
          <h2 className="mb-[22px] font-display text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-.025em]">
            Project details
          </h2>
          <textarea
            aria-label="Requirement"
            rows={5}
            placeholder="Size, material, finish, deadline, anything else"
            value={fields.details}
            onChange={set("details")}
            className="w-full resize-y border-0 border-b-2 border-ink bg-transparent py-3.5 font-body text-xl font-medium text-ink outline-offset-4 focus:border-orange"
          />
        </div>
      )}

      {!done && step === 4 && (
        <div className="flex flex-col gap-1.5">
          <h2 className="mb-4 font-display text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-.025em]">
            Your details
          </h2>
          <input
            aria-label="Name"
            placeholder="Name"
            value={fields.name}
            onChange={set("name")}
            className="w-full border-0 border-b-2 border-ink bg-transparent py-3.5 font-body text-xl font-medium text-ink outline-offset-4 focus:border-orange"
          />
          <input
            aria-label="Company"
            placeholder="Company"
            value={fields.company}
            onChange={set("company")}
            className="w-full border-0 border-b-2 border-ink bg-transparent py-3.5 font-body text-xl font-medium text-ink outline-offset-4 focus:border-orange"
          />
          <input
            aria-label="Phone"
            type="tel"
            placeholder="Phone"
            value={fields.phone}
            onChange={set("phone")}
            className="w-full border-0 border-b-2 border-ink bg-transparent py-3.5 font-body text-xl font-medium text-ink outline-offset-4 focus:border-orange"
          />
          <input
            aria-label="Email"
            type="email"
            placeholder="Email"
            value={fields.email}
            onChange={set("email")}
            className="w-full border-0 border-b-2 border-ink bg-transparent py-3.5 font-body text-xl font-medium text-ink outline-offset-4 focus:border-orange"
          />
        </div>
      )}

      {done && (
        <div>
          <h2 className="mb-3.5 font-display text-[clamp(32px,4vw,56px)] font-extrabold leading-[1.02] tracking-[-.02em]">
            Ready to send.
          </h2>
          <p className="mb-[22px] whitespace-pre-line text-[17px] leading-snug">{summary}</p>
          <div className="flex flex-wrap gap-3">
            <a href={mailHref} className="rounded-full bg-orange px-7 py-4 font-semibold text-ink hover:bg-ink hover:text-paper">
              Send by email &rarr;
            </a>
            <a href={waHref} className="rounded-full border-[1.5px] border-ink px-[26px] py-3.5 font-semibold text-ink hover:bg-ink hover:text-paper">
              Send on WhatsApp
            </a>
          </div>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
        <button
          onClick={back}
          className={cx(
            "cursor-pointer border-0 bg-transparent font-body text-base font-semibold text-ink",
            step === 0 && !done ? "invisible" : "visible"
          )}
        >
          &larr; Back
        </button>
        {!done && (
          <button
            onClick={next}
            disabled={!ok}
            className={cx(
              "rounded-full border-0 px-7 py-4 font-body text-[17px] font-semibold transition-all",
              ok ? "cursor-pointer bg-ink text-paper" : "cursor-not-allowed bg-ink/20 text-ink"
            )}
          >
            {step === 4 ? "Request My Quote" : "Continue →"}
          </button>
        )}
      </div>
    </div>
  );
}
