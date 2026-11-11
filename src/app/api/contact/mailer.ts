import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

let transporter: Transporter | null = null;

/** True when every SMTP setting the mailer needs is present. */
export function isMailerConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USERNAME && process.env.SMTP_PASSWORD);
}

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 587);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      // 465 is implicit TLS; 587 upgrades with STARTTLS.
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Delivers a contact form submission to the portfolio owner; replying goes straight to the visitor. */
export async function sendContactEmail({ name, email, message }: ContactMessage) {
  const to = process.env.CONTACT_TO || process.env.SMTP_USERNAME;
  const from = process.env.SMTP_FROM || process.env.SMTP_USERNAME;

  await getTransporter().sendMail({
    from,
    to,
    replyTo: { name, address: email },
    subject: `New Portfolio Inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;color:#0B1220">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#556176">Portfolio contact form</p>
        <h2 style="margin:0 0 16px;font-size:20px">New message from ${escapeHtml(name)}</h2>
        <p style="margin:0 0 16px;font-size:14px">
          <strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color:#2447D6">${escapeHtml(email)}</a>
        </p>
        <div style="padding:16px;border:1px solid #DCE3EE;border-radius:12px;background:#F5F7FB;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</div>
        <p style="margin:16px 0 0;font-size:12px;color:#556176">Reply to this email to answer ${escapeHtml(name)} directly.</p>
      </div>`,
  });
}
