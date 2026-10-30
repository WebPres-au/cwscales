export const ENQUIRY_SEND_ERROR =
  "Your message could not be sent. Please try again or contact us directly.";

export async function sendEnquiry(data) {
  const response = await fetch("/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  // An HTTP 200 alone is insufficient: Resend must have accepted the email.
  if (!response.ok || result?.error || typeof result?.id !== "string" || !result.id) {
    throw new Error(ENQUIRY_SEND_ERROR);
  }

  return result.id;
}
