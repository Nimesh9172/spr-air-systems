import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  buildEnquiryEmail,
  buildEnquirySubject,
  isValidEmail,
  parseEnquiryFields,
  readStringField,
} from "@/lib/enquiry-email";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const FROM_ADDRESS = "Website Enquiry <enquiry@spr-airsystems.in>";
const GENERIC_ERROR = "Unable to send your enquiry. Please try again.";
const RATE_LIMIT_ERROR =
  "Too many enquiries were submitted. Please wait a few minutes and try again.";
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
const REQUEST_WINDOW_MS = 10 * 60 * 1000;
const SEND_WINDOW_MS = 15 * 60 * 1000;
const ALLOWED_ATTACHMENT_EXTENSIONS = new Set([
  ".pdf",
  ".doc",
  ".docx",
  ".jpg",
  ".jpeg",
]);

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const ipRequestLimit = rateLimit(`enquiry:ip:${ip}`, 8, REQUEST_WINDOW_MS);
  if (!ipRequestLimit.ok) {
    return rateLimitedResponse(ipRequestLimit.retryAfterSeconds);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid enquiry submission." },
      { status: 400 },
    );
  }

  const fullName = readStringField(formData, "fullName");
  const email = readStringField(formData, "email");

  if (!fullName || !email) {
    return NextResponse.json(
      { error: "Please provide your name and email." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const sendIpLimit = rateLimit(`enquiry:send-ip:${ip}`, 5, SEND_WINDOW_MS);
  if (!sendIpLimit.ok) {
    return rateLimitedResponse(sendIpLimit.retryAfterSeconds);
  }

  const sendEmailLimit = rateLimit(
    `enquiry:send-email:${email.toLowerCase()}`,
    3,
    SEND_WINDOW_MS,
  );
  if (!sendEmailLimit.ok) {
    return rateLimitedResponse(sendEmailLimit.retryAfterSeconds);
  }

  const globalLimit = rateLimit("enquiry:global", 40, SEND_WINDOW_MS);
  if (!globalLimit.ok) {
    return rateLimitedResponse(globalLimit.retryAfterSeconds);
  }

  const fields = parseEnquiryFields(formData);
  const source = readStringField(formData, "source");
  const attachment = await readAttachment(formData.get("attachment"));

  if (attachment && "error" in attachment) {
    return NextResponse.json({ error: attachment.error }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const receiverEmail = process.env.ENQUIRY_RECEIVER_EMAIL?.trim();

  if (!apiKey || !receiverEmail) {
    console.error("Missing RESEND_API_KEY or ENQUIRY_RECEIVER_EMAIL.");
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  const { html, text } = buildEnquiryEmail(fields, {
    attachmentName: attachment?.filename,
    source,
    replyTo: email,
  });

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: splitRecipients(receiverEmail),
    replyTo: email,
    subject: buildEnquirySubject(source, fullName),
    html,
    text,
    attachments: attachment
      ? [
          {
            filename: attachment.filename,
            content: attachment.content,
            contentType: attachment.contentType,
          },
        ]
      : undefined,
  });

  if (error) {
    console.error("Resend enquiry email failed:", error);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

function rateLimitedResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    { error: RATE_LIMIT_ERROR },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    },
  );
}

function splitRecipients(value: string): string | string[] {
  const recipients = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (recipients.length === 0) return value;
  return recipients.length === 1 ? recipients[0] : recipients;
}

async function readAttachment(value: FormDataEntryValue | null): Promise<
  | { filename: string; content: Buffer; contentType?: string }
  | { error: string }
  | null
> {
  if (!(value instanceof File) || value.size === 0 || !value.name) {
    return null;
  }

  if (value.size > MAX_ATTACHMENT_BYTES) {
    return { error: "File must be 5MB or smaller." };
  }

  const extension = getFileExtension(value.name);
  if (!ALLOWED_ATTACHMENT_EXTENSIONS.has(extension)) {
    return { error: "Please upload a PDF, DOC, DOCX, or JPG file." };
  }

  const filename =
    value.name.replace(/[/\\]/g, "").slice(0, 120) || "attachment";

  return {
    filename,
    content: Buffer.from(await value.arrayBuffer()),
    contentType: value.type || undefined,
  };
}

function getFileExtension(filename: string): string {
  const index = filename.lastIndexOf(".");
  if (index === -1) return "";
  return filename.slice(index).toLowerCase();
}
