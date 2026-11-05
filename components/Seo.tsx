import Head from 'next/head';
import { site } from '@/data/site';
import { serviceList } from '@/data/services';
import type { Faq } from '@/data/faqs';

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
 *    memberships, and every page is a MedicalWebPage reviewed by that Person.
 *
 * Deliberately absent: aggregateRating / review markup. Self-declared ratings
 * with no real reviews behind them are a manual-action risk, not a shortcut.
 */

export const HOME_TITLE = 'Home Physiotherapy Manchester, Stockport & Cheshire | PhysioVisit';

/** Kept under ~155 characters so Google shows it whole rather than truncating. */
export const HOME_DESCRIPTION =
  'Chartered physiotherapist visiting you at home across Manchester, Stockport & Cheshire. ' +
  'HCPC registered. No GP referral. Call or WhatsApp to book.';

const ID = {
  website: `${site.url}/#website`,
  practice: `${site.url}/#practice`,
  practitioner: `${site.url}/#practitioner`,
};

type JsonLdNode = Record<string, unknown>;

function sharedNodes(): JsonLdNode[] {
  const person = {
    '@type': 'Person',
    '@id': ID.practitioner,
    name: site.practitioner,
    honorificSuffix: site.postNominals,
    jobTitle: site.role,
    telephone: site.phoneE164,
    email: site.email,
    url: site.url,
    // The public HCPC register entry is the strongest identity signal available.
    sameAs: [site.hcpcRegisterUrl],
    knowsAbout: serviceList.map((service) => service.title),
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'BSc (Hons) Physiotherapy',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        name: `HCPC Registration ${site.hcpcNumber}`,
        url: site.hcpcRegisterUrl,
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
    '@id': ID.practice,
    name: site.name,
    alternateName: site.brandName,
    url: site.url,
    logo: `${site.url}/logo-${site.brandLogo === 'mark' ? 'b' : site.brandLogo}.png`,
    image: `${site.url}${site.ogImage}`,
    telephone: site.phoneE164,
    email: site.email,
    description: HOME_DESCRIPTION,
    medicalSpecialty: 'Physiotherapy',
    isAcceptingNewPatients: true,
    priceRange: '££',
    currenciesAccepted: 'GBP',
    paymentAccepted: 'Cash, Bank transfer, Card',
    founder: { '@id': ID.practitioner },
    employee: { '@id': ID.practitioner },
    areaServed,
    availableService: serviceList.map((service) => ({
      '@type': 'MedicalTherapy',
      name: service.title,
      description: service.description,
      url: `${site.url}/services/${service.slug}`,
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

  const website = {
    '@type': 'WebSite',
    '@id': ID.website,
    url: site.url,
    name: site.brandName,
    alternateName: site.name,
    inLanguage: 'en-GB',
    publisher: { '@id': ID.practice },
  };

  return [website, practice, person];
}

/** MedicalWebPage node for any page, reviewed by the practitioner. */
export function webPageNode(path: string, title: string, description: string): JsonLdNode {
  const url = `${site.url}${path}`;
  return {
    '@type': 'MedicalWebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'en-GB',
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.practice },
    reviewedBy: { '@id': ID.practitioner },
    lastReviewed: new Date().toISOString().slice(0, 10),
    specialty: 'Physiotherapy',
  };
}

export function faqNode(path: string, items: Faq[]): JsonLdNode {
  return {
    '@type': 'FAQPage',
    '@id': `${site.url}${path}#faq`,
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function breadcrumbNode(path: string, trail: { name: string; path: string }[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${site.url}${path}#breadcrumb`,
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}

export { ID as jsonLdIds };

interface SeoProps {
  title?: string;
  description?: string;
  /** Path of this page, e.g. '/services/neurological-physiotherapy'. */
  path?: string;
  /** Page-specific JSON-LD nodes; the site, practice and practitioner nodes are always added. */
  nodes?: JsonLdNode[];
  /** Image to preload as the LCP element. */
  preloadImage?: string;
  noindex?: boolean;
}

export default function Seo({
  title = HOME_TITLE,
  description = HOME_DESCRIPTION,
  path = '/',
  nodes = [],
  preloadImage,
  noindex = false,
}: SeoProps) {
  const url = `${site.url}${path}`;
  const ogImage = `${site.url}${site.ogImage}`;
  const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  // One graph rather than separate blocks, so the @id references resolve.
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [...sharedNodes(), ...nodes],
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="robots"
        content={
          noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'
        }
      />
      <meta name="author" content={`${site.practitioner} ${site.postNominals}`} />
      <meta name="geo.region" content="GB-ENG" />
      <meta name="geo.placename" content="Manchester" />
      <meta name="theme-color" content="#0b2a5b" />
      <meta name="format-detection" content="telephone=yes" />
      {verification && <meta name="google-site-verification" content={verification} />}
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en-GB" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {preloadImage && <link rel="preload" as="image" href={preloadImage} fetchPriority="high" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.brandName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="PhysioVisit - home physiotherapy in Manchester & Cheshire" />
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    </Head>
  );
}
