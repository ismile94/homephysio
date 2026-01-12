import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, message } = req.body;

  // Validation
  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Name, phone, and message are required' });
  }

  try {
    // Send email to you
    const { data, error } = await resend.emails.send({
      from: 'Home Physio Contact <onboarding@resend.dev>', // Change this to your verified domain email
      to: ['ismailaram94@gmail.com'], // Your email address
      replyTo: email || 'noreply@example.com',
      subject: `New Consultation Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Consultation Request</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
          </div>
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #1e293b; margin-top: 0;">Message:</h3>
            <p style="color: #475569; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
            <p>This message was sent from the Home Physio website contact form.</p>
            ${email ? `<p>You can reply directly to this email to respond to ${name}.</p>` : ''}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    // Optionally send confirmation email to the user
    if (email) {
      await resend.emails.send({
        from: 'Home Physio <onboarding@resend.dev>', // Change this to your verified domain email
        to: [email],
        subject: 'Thank you for your consultation request',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Thank you for contacting us!</h2>
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to Home Physio. We have received your consultation request and will get back to you within 24 hours.</p>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Your Message:</strong></p>
              <p style="color: #475569; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            <p>If you have any urgent questions, please call us at <strong>07466 012234</strong>.</p>
            <p>Best regards,<br>Ismail Aram<br>Chartered Physiotherapist</p>
          </div>
        `,
      });
    }

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
