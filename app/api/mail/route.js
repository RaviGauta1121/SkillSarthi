import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);
    console.log({ name, email, subject, message });
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email
    await transporter.sendMail({
      from: email, // Email from the user
      to: process.env.COMPANY_EMAIL, // Your company's email address
      subject: `Secret: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1 style="color: #007BFF;">Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: #f8f9fa; padding: 10px; border-radius: 4px;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
