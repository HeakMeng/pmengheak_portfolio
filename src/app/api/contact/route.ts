import { NextResponse } from 'next/server';
import { isMailerConfigured, sendContactEmail } from './mailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, hp_company } = body;

    // 1. Honeypot check - if a bot filled the hidden company field, reject silently
    if (hp_company) {
      return NextResponse.json(
        { success: true, message: 'Message dispatched successfully.' },
        { status: 200 }
      );
    }

    // 2. Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please provide a valid name (at least 2 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please provide a message with at least 5 characters.' },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: 'Your message is too long. Please shorten it and try again.' }, { status: 400 });
    }

    // 3. Deliver by email over SMTP (configured in .env.local)
    if (isMailerConfigured()) {
      try {
        await sendContactEmail({
          // Keep the name on one line: it is used in the subject header.
          name: name.trim().replace(/[\r\n]+/g, ' '),
          email: email.trim(),
          message: message.trim(),
        });
      } catch (err) {
        console.error('SMTP delivery failed:', err);
        return NextResponse.json(
          { error: 'Sorry, your message could not be delivered right now. Please email pmengheak168@gmail.com directly.' },
          { status: 502 }
        );
      }
    }

    // 4. Optional extra forwarder: Formspree endpoint or webhook configured in environment
    const formspreeUrl = process.env.FORMSPREE_ENDPOINT;
    if (formspreeUrl) {
      try {
        const response = await fetch(formspreeUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            _subject: `New Portfolio Inquiry from ${name.trim()}`,
          }),
        });

        if (!response.ok) {
          console.error('Formspree forward failed with status', response.status);
        }
      } catch (err) {
        console.error('Error forwarding to Formspree:', err);
      }
    }

    // Nothing delivered the message: say so instead of reporting a false success.
    if (!isMailerConfigured() && !formspreeUrl) {
      console.error('Contact form: no SMTP settings or FORMSPREE_ENDPOINT configured.');
      return NextResponse.json(
        { error: 'The contact form is not set up yet. Please email pmengheak168@gmail.com directly.' },
        { status: 503 }
      );
    }

    // Always log clean audit entry in server runtime
    console.log(`[Contact Dispatch] From: ${name.trim()} <${email.trim()}>: ${message.trim().slice(0, 100)}...`);

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been dispatched successfully! I will respond within 24 hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return NextResponse.json(
      { error: 'Internal server error processing your message. Please try again or reach out via email directly.' },
      { status: 500 }
    );
  }
}
