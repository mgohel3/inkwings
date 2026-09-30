"use client";

import { useState } from "react";
import { contact } from "@/lib/data";
import { quoteNeeds } from "@/lib/content";
import { enquirySchema } from "@/lib/validation";

type FieldKey = "name" | "company" | "phone" | "email";

const fieldDefs: { key: FieldKey; label: string; type: string; autoComplete: string }[] = [
  { key: "name", label: "Name", type: "text", autoComplete: "name" },
  { key: "company", label: "Company", type: "text", autoComplete: "organization" },
  { key: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { key: "email", label: "Email", type: "email", autoComplete: "email" },
];

export function ContactForm() {
  const [values, setValues] = useState<Record<FieldKey, string>>({
    name: "",
    company: "",
    phone: "",
    email: "",
  });
  const [need, setNeed] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [badField, setBadField] = useState<FieldKey | "">("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const summary = [
    `Name: ${values.name}`,
    values.company && `Company: ${values.company}`,
    values.phone && `Phone: ${values.phone}`,
    values.email && `Email: ${values.email}`,
    need && `Need: ${need}`,
    message && `Message: ${message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const mailHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    "Enquiry from " + values.name
  )}&body=${encodeURIComponent(summary)}`;
  const waHref = `${contact.wa}?text=${encodeURIComponent("Enquiry\n" + summary)}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = enquirySchema.safeParse({ ...values, need, message });
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      setError(issue.message);
      setBadField((issue.path[0] as FieldKey) ?? "name");
      return;
    }
    setError("");
    setBadField("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setSent(true); // No backend yet — fall back to email/WhatsApp below regardless.
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
        <div className="mb-2.5 font-display text-[28px] font-extrabold leading-[1.1] tracking-[-.02em]">
          Ready to send.
        </div>
        <p className="mb-[18px] whitespace-pre-line leading-snug">{summary}</p>
        <div className="flex flex-wrap gap-3">
          <a href={mailHref} className="rounded-full bg-orange px-6 py-3.5 font-semibold text-ink hover:bg-ink hover:text-paper">
            Send by email &rarr;
          </a>
          <a href={waHref} className="rounded-full border-[1.5px] border-ink px-[22px] py-3 font-semibold text-ink hover:bg-ink hover:text-paper">
            Send on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex min-w-0 flex-col gap-[22px]">
      <h2 className="m-0 mb-2.5 font-display text-[clamp(32px,4.4vw,64px)] font-extrabold leading-none tracking-[-.02em]">
        Tell us what you&apos;re printing.
      </h2>

      {fieldDefs.map((f) => (
        <label
          key={f.key}
          className="flex flex-col gap-0.5 font-body text-xs font-semibold uppercase tracking-[0.14em]"
        >
          {f.label}
          <input
            type={f.type}
            name={f.key}
            autoComplete={f.autoComplete}
            value={values[f.key]}
            onChange={(e) => {
              setValues((v) => ({ ...v, [f.key]: e.target.value }));
              setError("");
              setBadField("");
            }}
            aria-invalid={badField === f.key}
            className="w-full border-0 border-b-2 bg-transparent py-3.5 font-body text-xl font-medium normal-case tracking-normal text-ink transition-colors focus:border-orange focus:pl-2 focus:outline-none"
            style={{ borderBottomColor: badField === f.key ? "#B3360A" : "#111" }}
          />
        </label>
      ))}

      <label className="flex flex-col gap-0.5 font-body text-xs font-semibold uppercase tracking-[0.14em]">
        What do you need?
        <select
          name="need"
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          className="w-full rounded-none border-0 border-b-2 border-ink bg-transparent py-3.5 font-body text-xl font-medium normal-case tracking-normal text-ink transition-colors focus:border-orange focus:outline-none"
        >
          <option value="">Select a category</option>
          {quoteNeeds.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-0.5 font-body text-xs font-semibold uppercase tracking-[0.14em]">
        Message
        <textarea
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y rounded-none border-0 border-b-2 border-ink bg-transparent py-3.5 font-body text-xl font-medium normal-case tracking-normal text-ink transition-colors focus:border-orange focus:pl-2 focus:outline-none"
        />
      </label>

      <p role="alert" aria-live="polite" className="m-0 min-h-[22px] text-[15px] font-semibold text-[#B3360A]">
        {error}
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="cursor-pointer self-start rounded-full border-0 bg-ink px-8 py-[18px] font-body text-lg font-semibold text-paper hover:bg-orange hover:text-ink disabled:opacity-60"
      >
        Send Enquiry &rarr;
      </button>
    </form>
  );
}
