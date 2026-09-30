import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid enquiry." },
      { status: 422 }
    );
  }

  // TODO: connect enquiry submission to email/CRM provider.
  // For now this endpoint validates the payload only; the client falls back
  // to mailto: and WhatsApp links so no enquiry is silently lost.
  console.log("[enquiry]", parsed.data);

  return NextResponse.json({ ok: true });
}
