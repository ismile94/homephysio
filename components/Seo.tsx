import Head from 'next/head';
import { site } from '@/data/site';
import { faqs } from '@/data/faqs';
import { servicesData } from '@/data/services';

/**
 * SEO for a local service-area business.
 *
 * Three things drive the shape of this markup:
 *
 * 1. Home visits only, no walk-in clinic. So there is no `address` anywhere —
 *    coverage is expressed as an explicit `areaServed` list of the 21 towns
 *    actually served. Inventing a street address to chase the local pack is
 *    what gets listings suspended.
 * 2. Every town name also appears in the visible page copy. Structured data
 *    alone does not rank a page for "physiotherapist Wilmslow"; the crawler
 *    needs the term in the content too.
 * 3. Health content is "your money or your life" territory, so Google leans
 *    hard on author credentials. The Person node carries the HCPC/CSP
 *    memberships, and the page is a MedicalWebPage reviewed by that Person.
 *
 * Deliberately absent: aggregateRating / review markup. Self-declared ratings
 * with no real reviews behind them are a manual-action risk, not a shortcut.
 */

const TITLE = `Home Physiotherapy in ${site.coverage.label}`;

/** Kept under ~155 characters so Google shows it whole rather than truncating. */
const DESCRIPTION =
  'Home physiotherapy across Stockport, Altrincham, Wilmslow, Macclesfield and south ' +
  'Manchester. HCPC registered chartered physiotherapist. No GP referral needed.';

export default function Seo() {
  const ogImage = `${site.url}${site.ogImage}`;
  const practitioner = `${site.practitioner} ${site.postNominals}`;

  const person = {
    '@type': 'Person',
    '@id': `${site.url}/#practitioner`,
    name: site.practitioner,
    honorificSuffix: site.postNominals,
    jobTitle: site.role,
    telephone: site.phoneE164,
    email: site.email,
    url: site.url,
    knowsAbout: [
      'Neurological physiotherapy',
      'Geriatric rehabilitation',
      'Post-operative rehabilitation',
      'Falls prevention',
      'Musculoskeletal physiotherapy',
      'Respiratory physiotherapy',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'BSc (Hons) Physiotherapy',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        name: 'HCPC Registration',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Health and Care Professions Council',
          url: 'https://www.hcpc-uk.org/',
        },
      },
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'Chartered Society of Physiotherapy',
      url: 'https://www.csp.org.uk/',
    },
  };

  // Each covered town as its own City node, nested in its county.
  const areaServed = site.coverage.towns.map((town) => ({
    '@type': 'City',
    name: town.name,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: town.county,
      containedInPlace: { '@type': 'Country', name: 'United Kingdom', identifier: 'GB' },
    },
  }));

  const practice = {
    '@type': ['MedicalBusiness', 'Physiotherapy'],
    '@id': `${site.url}/#practice`,
    name: site.name,
    alternateName: 'Home Physio',
    url: site.url,
    telephone: site.phoneE164,
    email: site.email,
    image: ogImage,
    description: DESCRIPTION,
    medicalSpecialty: 'Physiotherapy',
    priceRange: '££',
    currenciesAccepted: 'GBP',
    paymentAccepted: 'Cash, Bank transfer, Card',
    founder: { '@id': `${site.url}/#practitioner` },
    employee: { '@id': `${site.url}/#practitioner` },
    areaServed,
    availableService: Object.values(servicesData).map((service) => ({
      '@type': 'MedicalTherapy',
      name: service.title,
      description: service.description,
      relevantSpecialty: 'Physiotherapy',
    })),
    makesOffer: [
      {
        '@type': 'Offer',
        name: 'Initial home assessment (60 minutes)',
        price: site.fees.assessment.replace('£', ''),
        priceCurrency: 'GBP',
      },
      {
        '@type': 'Offer',
        name: 'Follow-up home treatment session (45-60 minutes)',
        price: site.fees.session.replace('£', ''),
        priceCurrency: 'GBP',
      },
    ],
  };

  const webPage = {
    '@type': 'MedicalWebPage',
    '@id': `${site.url}/#webpage`,
    url: site.url,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: 'en-GB',
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': `${site.url}/#practice` },
    reviewedBy: { '@id': `${site.url}/#practitioner` },
    lastReviewed: new Date().toISOString().slice(0, 10),
    specialty: 'Physiotherapy',
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: 'en-GB',
    publisher: { '@id': `${site.url}/#practice` },
  };

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${site.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  // One graph rather than five separate blocks, so the @id references resolve.
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [website, webPage, practice, person, faqPage],
  };

  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="author" content={practitioner} />
      <meta name="geo.region" content="GB-ENG" />
      <meta name="geo.placename" content="Manchester" />
      <meta name="theme-color" content="#2563eb" />
      <link rel="canonical" href={site.url} />

      {/* LCP is the hero photograph — fetch it alongside the HTML. */}
      <link rel="preload" as="image" href={site.ogImage} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:url" content={site.url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Home physiotherapy session in a patient's own home" />
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={ogImage} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    </Head>
  );
}
