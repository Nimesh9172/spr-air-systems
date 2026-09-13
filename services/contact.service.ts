/**
 * Contact form API service layer.
 * Posts enquiry payloads to the server-side Resend route.
 */

export type EnquirySource =
  | "Homepage Enquiry"
  | "Contact Page"
  | "Request a Quote";

const FALLBACK_ERROR = "Unable to send your enquiry. Please try again.";

export async function submitContact(
  formData: FormData,
  source: EnquirySource,
): Promise<void> {
  formData.set("source", source);

  const response = await fetch("/api/enquiry", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }
}

export function getEnquiryErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return FALLBACK_ERROR;
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as { error?: string };
    if (payload.error) return payload.error;
  } catch {
    // Keep the fallback when the body is not JSON.
  }
  return FALLBACK_ERROR;
}
