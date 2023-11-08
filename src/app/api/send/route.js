import Welcome from "@/components/email/Welcome";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, email, company, enquiryType, number, suburb, message } =
      body;
    const data = await resend.emails.send({
      from: "No reply <no-reply@cwscales.com.au>",
      to: `Louis <${process.env.CONTACT_EMAIL}>`,
      subject: `New ${enquiryType} enquiry from ${firstName}`,
      react: Welcome({
        firstName,
        email,
        company,
        enquiryType,
        number,
        suburb,
        message,
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
