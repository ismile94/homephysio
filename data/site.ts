export interface CoverageTown {
  name: string;
  /** Ceremonial county / metropolitan county — used for schema.org containedInPlace. */
  county: string;
  /** Shown in brackets on the page where coverage is partial. */
  note?: string;
}

/**
 * Single source of truth for the details that change most often — fees, contact
 * details, coverage. Edit here rather than hunting through pages/index.tsx.
 */
export const site = {
  name: 'Ismail Aram Physiotherapy',
  /** Trading name shown in the nav, footer and outgoing email. */
  brandName: 'PhysioVisit',
  practitioner: 'Ismail Aram',
  postNominals: 'BSc (Hons) MCSP',
  role: 'Chartered Physiotherapist',

  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://homephysio-pi.vercel.app',
  ogImage: '/evhastasi.jpg',

  phone: '07466 012234',
  phoneHref: 'tel:+447466012234',
  phoneE164: '+447466012234',
  email: 'contact@physiovisit.co.uk',

  /**
   * Which brand mark the nav and footer render.
   *   'mark' - the drawn SVG mark in components/Logo.tsx (gradient tile)
   *   'a'    - public/logo-a.png (teal & copper figure)
   *   'b'    - public/logo-b.png (blue & green figure)
   * Change this one value to swap the logo everywhere.
   */
  brandLogo: 'a' as 'mark' | 'a' | 'b',

  fees: {
    assessment: '£100',
    session: '£90',
  },
  responseTime: '24 hours',

  /**
   * Service-area business: home visits only, no walk-in clinic, so there is no
   * postal address anywhere in the markup. Coverage is expressed as an explicit
   * list of towns instead — precise and verifiable, which is exactly what
   * Google wants from a service-area business, and what lets each town name
   * appear in both the page copy and the areaServed structured data.
   */
  coverage: {
    /** Short human label used in the title tag, headline and meta description. */
    label: 'Manchester, Stockport & Cheshire',
    counties: ['Greater Manchester', 'Cheshire', 'Staffordshire'],
    towns: [
      { name: 'Altrincham', county: 'Greater Manchester' },
      { name: 'Biddulph', county: 'Staffordshire', note: 'southern boundary' },
      { name: 'Bollington', county: 'Cheshire' },
      { name: 'Cheadle', county: 'Greater Manchester' },
      { name: 'Cheadle Hulme', county: 'Greater Manchester' },
      { name: 'Congleton', county: 'Cheshire', note: 'southern boundary' },
      { name: 'Denton', county: 'Greater Manchester' },
      { name: 'Eccles', county: 'Greater Manchester' },
      { name: 'Knutsford', county: 'Cheshire' },
      { name: 'Macclesfield', county: 'Cheshire' },
      { name: 'Manchester', county: 'Greater Manchester', note: 'south and central areas' },
      { name: 'Middlewich', county: 'Cheshire' },
      { name: 'Northwich', county: 'Cheshire' },
      { name: 'Partington', county: 'Greater Manchester' },
      { name: 'Poynton', county: 'Cheshire' },
      { name: 'Sale', county: 'Greater Manchester' },
      { name: 'Sandbach', county: 'Cheshire', note: 'southern boundary' },
      { name: 'Stockport', county: 'Greater Manchester' },
      { name: 'Stretford', county: 'Greater Manchester' },
      { name: 'Wilmslow', county: 'Cheshire' },
      { name: 'Worsley', county: 'Greater Manchester' },
    ] as CoverageTown[],
  },
} as const;

/** "Biddulph (southern boundary)" — for display in page copy. */
export function townLabel(town: CoverageTown): string {
  return town.note ? `${town.name} (${town.note})` : town.name;
}

/** Plain, comma-separated list of every covered town, with qualifiers. */
export function coverageSentence(): string {
  return site.coverage.towns.map(townLabel).join(', ');
}
