# Home Physio Website

Professional home physiotherapy services website built with Next.js and deployed on Vercel.

## Features

- Responsive design
- Contact form with email notifications
- Service information and booking
- Professional physiotherapy services showcase

## Setup

### Environment Variables

To enable the contact form email functionality, you need to set up Resend API:

1. Sign up for a free account at [Resend.com](https://resend.com)
2. Get your API key from [Resend API Keys](https://resend.com/api-keys)
3. Add the API key to Vercel:
   - Go to your project on Vercel
   - Navigate to Settings > Environment Variables
   - Add: `RESEND_API_KEY` with your API key value
   - Redeploy your application

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file:
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Deployment

The site is automatically deployed to Vercel when you push to the main branch.

**Live URL:** https://homephysio-pi.vercel.app

## Contact Form

The contact form sends emails using Resend:
- When someone submits the form, you receive an email at `ismailaram94@gmail.com`
- If the user provides an email, they also receive a confirmation email
- All form submissions are logged
