import Welcome from "@/components/email/Welcome";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, email, company, enquiryType, number, suburb, message, URLpath } =
      body;
    const data = await resend.emails.send({
      from: "No reply <no-reply@cwscales.com.au>",
      to: "Louis <hello@simonbeirouti.com>",
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

    if (data.status === "status") {
      return NextResponse.json({ message: "Email successfully sent!" });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
