# Home Physio Website

Home physiotherapy services website built with Next.js and deployed on Vercel. Home visits
across Greater Manchester and Cheshire — no clinic premises.

## Features

- Responsive design
- Contact form with email notifications, spam protection and input escaping
- Service information and booking
- Professional physiotherapy services showcase
- Local structured data and sitemap for search visibility

## Setup

### Environment Variables

Copy [.env.example](.env.example) to `.env.local` for local development, and set the same
keys in Vercel under **Settings → Environment Variables**.

| Variable | Required | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | From [Resend API Keys](https://resend.com/api-keys) |
| `CONTACT_FROM_EMAIL` | recommended | Sender address. Defaults to `onboarding@resend.dev` — Resend's shared test address, which is prone to spam filtering. Point this at an address on a domain verified in Resend. |
| `CONTACT_TO_EMAIL` | no | Where enquiries land. Defaults to the address in `data/site.ts`. |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical URL. Feeds the canonical tag, Open Graph tags, JSON-LD, `robots.txt` and `sitemap.xml` — **set this in Vercel**, or they all point at the default `vercel.app` host. |

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

## Editing content

Content lives in `data/` — you should not need to open `pages/index.tsx` to change any of it:

| File | What it holds |
| --- | --- |
| [data/site.ts](data/site.ts) | Phone, email, fees, response time, and the list of covered towns |
| [data/services.ts](data/services.ts) | The six specialisms with their condition and treatment lists (drives both the cards and the modals) |
| [data/faqs.ts](data/faqs.ts) | FAQ questions and answers |

Two things fan out from `data/site.ts` automatically:

- **Fees.** Changing `fees.assessment` updates the page copy, the FAQ answer, and the
  `Offer` structured data together.
- **Coverage.** Adding or removing a town in `coverage.towns` updates the "Areas We Cover"
  block, the FAQ answer, and every `areaServed` node in the structured data. Set `note` on
  a town (e.g. `'southern boundary'`) and it renders in brackets everywhere.

## Brand mark

The logo is a gable roof and walls (care delivered at home) enclosing an ascending arc that
ends in a joint dot (range of motion restored). It is drawn on a 32px grid in the same
stroke language as the icon set.

| File | Use |
| --- | --- |
| [components/Logo.tsx](components/Logo.tsx) | `<LogoMark />` — inherits `currentColor`, so it renders white inside the gradient tile in the nav and footer, or blue when used bare |
| [public/favicon.svg](public/favicon.svg) | Modern browsers. Also serves as the Safari pinned-tab mask |
| `public/favicon.ico` | 16/32/48px rasters in one file, for older browsers |
| `public/apple-touch-icon.png` | 180px, full-bleed square — iOS applies its own corner mask, so this one is deliberately not rounded |

All four are declared in [pages/_document.tsx](pages/_document.tsx).

### Regenerating the rasters

The PNGs were produced from `favicon.svg` using the browser's own renderer rather than an
image library, so there is no build-time dependency to maintain. If the mark changes, edit
`components/Logo.tsx` and `public/favicon.svg` together, then re-render: draw the SVG onto a
`<canvas>` at 16/32/48/180px, export with `toDataURL('image/png')`, and pack the three small
sizes into `favicon.ico` (a 6-byte `ICONDIR`, one 16-byte entry per image, then the PNG bytes
appended — every browser still in use accepts PNG payloads inside ICO).

## Deployment

The site is automatically deployed to Vercel when you push to the main branch.

**Live URL:** https://homephysio-pi.vercel.app

## Contact Form

`POST /api/contact` sends a notification to the practice inbox (with `Reply-To` set to the
enquirer) and, when an email address was supplied, a confirmation to the enquirer. A failure
on the confirmation email no longer fails the enquiry.

Protections, all applied before the Resend call:

- **HTML escaping** ([lib/escapeHtml.ts](lib/escapeHtml.ts)) — every visitor-supplied value
  is escaped before entering the email body, so submitted markup cannot render as a live
  link or image in the inbox
- **Rate limiting** ([lib/rateLimit.ts](lib/rateLimit.ts)) — 3 submissions per IP per 10
  minutes. In-memory, so per-instance on serverless; swap the store for Vercel KV or
  Upstash if a hard guarantee is needed
- **Honeypot + timing check** — a hidden `company` field, and submissions faster than 2
  seconds, are accepted and discarded silently so bots get no signal to tune against
- **Validation and length caps** ([lib/validate.ts](lib/validate.ts)) — required fields,
  email format, and per-field maximums

## SEO

The practice is marked up as a **local service-area business**: home visits only, so there
is no `address` anywhere in the markup, and coverage is an explicit `areaServed` list of the
21 towns actually served. Inventing a street address to chase Google's local pack is what
gets listings suspended.

Every town name also appears in the **visible page copy** (the "Areas We Cover" block and
the coverage FAQ), not only in the structured data. Schema alone will not rank a page for
"physiotherapist Wilmslow" — the crawler needs the term in the content too. This is verified
in the browser: all 21 names are present in `document.body.innerText`.

[components/Seo.tsx](components/Seo.tsx) emits a single JSON-LD `@graph` so the `@id`
references resolve:

- `WebSite` and `MedicalWebPage` (typed as medical content, `reviewedBy` the practitioner)
- `MedicalBusiness` + `Physiotherapy` with all six services as `MedicalTherapy`, both fees
  as `Offer`, and each covered town as a `City` nested in its county
- `Person` carrying the BSc, HCPC registration and CSP membership — author credentials
  carry unusual weight for health content
- `FAQPage` built from `data/faqs.ts`, so the markup and the on-page text can never drift
  apart (Google requires them to match)

Also in place: a 54-character title and 159-character meta description (both under Google's
truncation limits), canonical link, Open Graph and Twitter cards, `max-image-preview:large`,
a hero-image preload for LCP, and generated [robots.txt](pages/robots.txt.tsx) and
[sitemap.xml](pages/sitemap.xml.tsx) routes that follow `NEXT_PUBLIC_SITE_URL`.

**Deliberately not included:** `aggregateRating` / `review` markup. Self-declared ratings
with no real reviews behind them are a manual-action risk, not a shortcut.

### Next steps, in order of impact

1. **Google Business Profile.** For a local service-area business this outranks everything
   on this list combined. Register as a service-area business (hide the address, list the
   service areas — GBP allows up to 20, so drop the lowest-value one). This is what puts
   the practice in the map pack for "physiotherapist near me".
2. **Verify a custom domain** and set `NEXT_PUBLIC_SITE_URL`. A `vercel.app` subdomain is a
   hard ceiling on trust for a health service.
3. **Add the HCPC registration number** to the page and to the `Person` credential in
   `components/Seo.tsx`. It is the single strongest verifiable trust signal for a UK
   physiotherapist, and it is currently missing.
4. **Google Search Console** — submit the sitemap, then watch which town queries actually
   surface before writing more content.
5. **Town landing pages** (`/home-physiotherapy/stockport`, `/wilmslow`, …) are the main
   lever left, but only with genuinely distinct content per page: local hospital discharge
   pathways, travel times, real availability. Twenty near-identical templated pages are
   treated as doorway pages and will hurt rather than help. Start with the three or four
   highest-value towns and write them properly.
6. **Real reviews.** Once genuine patient reviews exist on Google, they feed the map pack
   directly — which is why the fabricated-rating shortcut is not worth taking.
