import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { escapeHtml, escapeHtmlMultiline } from '@/lib/escapeHtml';
import { clientIp, rateLimit } from '@/lib/rateLimit';
import { LIMITS, clean, isValidEmail } from '@/lib/validate';
import { site } from '@/data/site';

/**
 * Lazily constructed. `new Resend(undefined)` throws immediately, so building
 * this eagerly at module scope would crash the route before the handler's own
 * "RESEND_API_KEY is not set" check ever runs — the friendly error message
 * would never be reachable.
 */
let resend: Resend | null = null;
function getResend(): Resend {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

/**
 * `onboarding@resend.dev` is Resend's shared test address. Mail sent from it is
 * far more likely to be filtered as spam — which matters most for the
 * confirmation email going out to the enquirer. Set CONTACT_FROM_EMAIL to an
 * address on a domain verified in Resend as soon as one exists.
 */
const FROM = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
const TO = process.env.CONTACT_TO_EMAIL || site.email;

/** Bots submit instantly; a human takes longer than this to fill four fields. */
const MIN_ELAPSED_MS = 2000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res
      .status(500)
      .json({ error: `Email is not configured. Please call ${site.phone} instead.` });
  }

  const limit = rateLimit(clientIp(req));
  if (!limit.ok) {
    res.setHeader('Retry-After', String(limit.retryAfter));
    return res.status(429).json({
      error: `We've already received a few messages from you. Please call ${site.phone} if it's urgent.`,
    });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Accept and discard bot submissions silently — an error would just tell them
  // which check to work around next time.
  const honeypot = clean(body.company, 100);
  const elapsed = typeof body.elapsed === 'number' ? body.elapsed : MIN_ELAPSED_MS;
  if (honeypot || elapsed < MIN_ELAPSED_MS) {
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  }

  const name = clean(body.name, LIMITS.name);
  const phone = clean(body.phone, LIMITS.phone);
  const email = clean(body.email, LIMITS.email);
  const message = clean(body.message, LIMITS.message);

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Name, phone, and message are required' });
  }

  if (email && !isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address, or leave it blank' });
  }

  // Everything below is visitor-controlled. Escape before it touches HTML, or a
  // submitted <a href="..."> renders as a live link in the inbox.
  const safe = {
    name: escapeHtml(name),
    phone: escapeHtml(phone),
    email: escapeHtml(email),
    message: escapeHtmlMultiline(message),
    telHref: phone.replace(/[^\d+]/g, ''),
  };

  try {
    // Send email to you
    const { error } = await getResend().emails.send({
      from: `Home Physio Contact <${FROM}>`,
      to: [TO],
      replyTo: email || undefined,
      subject: `New Consultation Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Consultation Request</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${safe.name}</p>
            <p><strong>Phone:</strong> <a href="tel:${safe.telHref}">${safe.phone}</a></p>
            ${safe.email ? `<p><strong>Email:</strong> ${safe.email}</p>` : ''}
          </div>
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #1e293b; margin-top: 0;">Message:</h3>
            <p style="color: #475569; line-height: 1.6;">${safe.message}</p>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
            <p>This message was sent from the Home Physio website contact form.</p>
            ${safe.email ? `
              <div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #2563eb;">
                <p style="margin: 0; color: #1e40af; font-weight: 600;">💡 To reply to ${safe.name}:</p>
                <p style="margin: 5px 0 0 0; color: #1e40af;">Simply click "Reply" in your email client. Your response will be sent directly to: <strong>${safe.email}</strong></p>
              </div>
            ` : `
              <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e; font-weight: 600;">⚠️ No email provided</p>
                <p style="margin: 5px 0 0 0; color: #92400e;">Please contact ${safe.name} by phone: <strong>${safe.phone}</strong></p>
              </div>
            `}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({ error: 'Failed to send email' });
    }

    // Optionally send confirmation email to the user. A failure here must not
    // fail the enquiry — their message already reached the inbox.
    if (email) {
      try {
        await getResend().emails.send({
          from: `Home Physio <${FROM}>`,
          to: [email],
          replyTo: TO,
          subject: 'Thank you for your consultation request',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Thank you for contacting us!</h2>
              <p>Dear ${safe.name},</p>
              <p>Thank you for reaching out to Home Physio. We have received your consultation request and will get back to you within ${site.responseTime}.</p>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Your Message:</strong></p>
                <p style="color: #475569; line-height: 1.6;">${safe.message}</p>
              </div>
              <p>If you have any urgent questions, please call us at <strong>${escapeHtml(site.phone)}</strong>.</p>
              <p>Best regards,<br>${escapeHtml(site.practitioner)}<br>${escapeHtml(site.role)}</p>
            </div>
          `,
        });
      } catch (confirmationError) {
        console.error('Confirmation email failed:', confirmationError);
      }
    }

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
