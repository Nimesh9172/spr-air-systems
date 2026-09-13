/**
 * Server-side helpers for website enquiry emails.
 * Keep this module out of client bundles.
 */

import { COMPANY, COMPANY_ADDRESS_TEXT } from "@/constants/company";

const MAX_FIELD_LENGTH = 5000;
const SITE_URL = "https://spr-airsystems.in";
const BRAND_NAVY = "#002157";
const BRAND_SURFACE = "#F4F7FB";

const FIELD_LABELS: Record<string, string> = {
  fullName: "Full Name",
  company: "Company",
  email: "Email",
  phone: "Phone",
  requirement: "Requirement",
  interest: "Product / Service Interest",
  location: "Project Location",
  message: "Message",
  source: "Form",
};

const HEADER_SKIP_KEYS = new Set(["source"]);

export type EnquiryField = {
  key: string;
  label: string;
  value: string;
};

export function readStringField(
  formData: FormData,
  key: string,
): string {
  const value = formData.get(key);
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

export function parseEnquiryFields(formData: FormData): EnquiryField[] {
  const fields: EnquiryField[] = [];

  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string") continue;
    const trimmed = value.trim().slice(0, MAX_FIELD_LENGTH);
    if (!trimmed) continue;
    fields.push({
      key,
      label: FIELD_LABELS[key] ?? key,
      value: trimmed,
    });
  }

  return fields;
}

export function buildEnquirySubject(
  source: string,
  fullName: string,
): string {
  const nameSuffix = fullName ? ` from ${fullName}` : "";

  if (source === "Request a Quote") {
    return `New Quote Request${nameSuffix} - SPR Air Systems`;
  }

  return `New Website Enquiry${nameSuffix} - SPR Air Systems`;
}

export function buildEnquiryEmail(
  fields: EnquiryField[],
  options?: {
    source?: string;
    replyTo?: string;
  },
): { html: string; text: string } {
  const rows = fields.filter((field) => !HEADER_SKIP_KEYS.has(field.key));

  const fullName = fieldValue(fields, "fullName");
  const company = fieldValue(fields, "company");
  const title = headingForSource(options?.source);
  const receivedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const summary = [
    fullName || "A visitor",
    company ? `from ${company}` : "",
    "submitted an enquiry on spr-airsystems.in.",
  ]
    .filter(Boolean)
    .join(" ");

  const fieldRows = rows.map((field, index) => renderFieldRow(field, index === rows.length - 1)).join("");

  const replyButton = options?.replyTo
    ? `
      <tr>
        <td style="padding:8px 32px 28px;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="border-radius:10px;background:${BRAND_NAVY};">
                <a href="mailto:${escapeHtml(options.replyTo)}" style="display:inline-block;padding:13px 22px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.01em;">
                  Reply to ${escapeHtml(fullName || "enquirer")}
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:${BRAND_SURFACE};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      ${escapeHtml(summary)}
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND_SURFACE};padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:${BRAND_NAVY};padding:28px 32px 24px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#bfdbfe;">
                  ${escapeHtml(COMPANY.name)}
                </p>
                <h1 style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:26px;line-height:1.25;color:#ffffff;font-weight:700;">
                  ${escapeHtml(title)}
                </h1>
                <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#dbeafe;">
                  ${escapeHtml(options?.source || "Website")} · ${escapeHtml(receivedAt)} IST
                </p>
              </td>
            </tr>
            <tr>
              <td style="height:4px;background:#38bdf8;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#475569;">
                ${escapeHtml(summary)}
              </td>
            </tr>
            <tr>
              <td style="padding:12px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND_SURFACE};border:1px solid #e8eef6;border-radius:12px;">
                  ${fieldRows}
                </table>
              </td>
            </tr>
            ${replyButton}
            <tr>
              <td style="padding:0 32px 28px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#64748b;border-top:1px solid #e8eef6;">
                <p style="margin:20px 0 0;font-weight:700;color:${BRAND_NAVY};">${escapeHtml(COMPANY.name)}</p>
                <p style="margin:4px 0 0;">${escapeHtml(COMPANY_ADDRESS_TEXT)}</p>
                <p style="margin:4px 0 0;">
                  <a href="tel:${escapeHtml(COMPANY.phone.replace(/\s/g, ""))}" style="color:${BRAND_NAVY};text-decoration:none;">${escapeHtml(COMPANY.phone)}</a>
                  &nbsp;·&nbsp;
                  <a href="${SITE_URL}" style="color:${BRAND_NAVY};text-decoration:none;">spr-airsystems.in</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `${title} - ${COMPANY.name}`,
    `${options?.source || "Website"} · ${receivedAt} IST`,
    "",
    summary,
    "",
    ...rows.map((field) => `${field.label}: ${field.value}`),
    "",
    COMPANY.name,
    COMPANY_ADDRESS_TEXT,
    COMPANY.phone,
    SITE_URL,
  ].join("\n");

  return { html, text };
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function headingForSource(source?: string): string {
  if (source === "Request a Quote") return "New quote request";
  if (source === "Contact Page") return "New contact enquiry";
  return "New website enquiry";
}

function fieldValue(fields: EnquiryField[], key: string): string {
  return fields.find((field) => field.key === key)?.value ?? "";
}

function renderFieldRow(field: EnquiryField, isLast: boolean): string {
  const border = isLast ? "none" : "1px solid #e2e8f0";
  const valueHtml = renderFieldValue(field);

  return `
    <tr>
      <td style="padding:16px 20px;border-bottom:${border};">
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;font-weight:700;">
          ${escapeHtml(field.label)}
        </p>
        <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#0f172a;font-weight:600;">
          ${valueHtml}
        </p>
      </td>
    </tr>`;
}

function renderFieldValue(field: EnquiryField): string {
  if (field.key === "email" && isValidEmail(field.value)) {
    return `<a href="mailto:${escapeHtml(field.value)}" style="color:${BRAND_NAVY};text-decoration:none;">${escapeHtml(field.value)}</a>`;
  }

  if (field.key === "phone") {
    const tel = field.value.replace(/[^\d+]/g, "");
    return `<a href="tel:${escapeHtml(tel)}" style="color:${BRAND_NAVY};text-decoration:none;">${escapeHtml(field.value)}</a>`;
  }

  if (field.key === "message") {
    return `<span style="display:block;font-weight:500;white-space:pre-wrap;">${escapeHtml(field.value).replaceAll("\n", "<br>")}</span>`;
  }

  return escapeHtml(field.value).replaceAll("\n", "<br>");
}
