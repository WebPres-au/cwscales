import Welcome from "@/components/email/Welcome";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateEmail, validatePhoneNumber } from "@/lib/functions";

const sendError =
  "Your message could not be sent. Please try again or contact us directly.";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid enquiry." }, { status: 400 });
  }

  const requiredFields = [
    "firstName", "email", "company", "enquiryType", "number", "message",
  ];
  if (
    !body ||
    requiredFields.some((field) => typeof body[field] !== "string" || !body[field].trim()) ||
    !validateEmail(body.email) ||
    !validatePhoneNumber(body.number) ||
    ["suburb", "URLpath"].some((field) => body[field] != null && typeof body[field] !== "string")
  ) {
    return NextResponse.json({ error: "Please check your enquiry details." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Contact email is unavailable: RESEND_API_KEY is not configured.");
    return NextResponse.json({ error: sendError }, { status: 503 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const {
      firstName, email, company, enquiryType, number, suburb = "", message, URLpath = "",
    } = body;
    const { data, error } = await resend.emails.send({
      from: "No reply <no-reply@cwscales.com.au>",
      to: "Louis <louis@cwscales.com.au>",
      subject: `New ${enquiryType} enquiry from ${firstName}`,
      react: Welcome({
        firstName,
        email,
        company,
        enquiryType,
        number,
        suburb,
        message,
        URLpath
      }),
    });

    if (error || typeof data?.id !== "string" || !data.id) {
      // Keep credentials, enquiry contents and SDK response headers out of logs/responses.
      console.error("Resend did not accept the contact email.", {
        name: error?.name,
        statusCode: error?.statusCode,
      });
      return NextResponse.json({ error: sendError }, { status: 502 });
    }
    return NextResponse.json({ id: data.id });
  } catch {
    console.error("Contact email failed while rendering or sending.");
    return NextResponse.json({ error: sendError }, { status: 500 });
  }
}
