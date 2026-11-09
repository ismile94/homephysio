import type { GetStaticPaths, GetStaticProps } from 'next';
import Seo, { breadcrumbNode, faqNode, jsonLdIds, webPageNode } from '@/components/Seo';
import Icon from '@/components/Icon';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PhysioCard from '@/components/PhysioCard';
import { serviceBySlug, serviceList } from '@/data/services';
import { processSteps } from '@/data/conditions';
import { faqs, serviceFaqs } from '@/data/faqs';
import { site, townLabel } from '@/data/site';

const PAGE_FAQS = [
  'Do I need a GP referral?',
  'How long are treatment sessions?',
  'What are your fees?',
  'Which areas do you cover?',
];

interface Props {
  slug: string;
}

export default function ServicePage({ slug }: Props) {
  const service = serviceBySlug(slug);
  if (!service) return null;

  const path = `/services/${service.slug}`;
  const title = service.seoTitle;
  const others = serviceList.filter((s) => s.slug !== service.slug);
  // Service-specific questions first, then the shared fee/referral/coverage ones.
  const pageFaqs = [
    ...(serviceFaqs[service.slug] ?? []),
    ...faqs.filter((f) => PAGE_FAQS.includes(f.question)),
  ];

  const nodes = [
    webPageNode(path, title, service.metaDescription),
    breadcrumbNode(path, [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/#services' },
      { name: service.title, path },
    ]),
    {
      '@type': 'MedicalTherapy',
      '@id': `${site.url}${path}#service`,
      name: service.title,
      description: service.description,
      url: `${site.url}${path}`,
      relevantSpecialty: 'Physiotherapy',
      provider: { '@id': jsonLdIds.practice },
      mainEntityOfPage: { '@id': `${site.url}${path}#webpage` },
    },
    // Mirrors the visible FAQ list below exactly.
    faqNode(path, pageFaqs),
  ];

  return (
    <>
      <Seo title={title} description={service.metaDescription} path={path} nodes={nodes} />
      <SiteHeader />

      <main>
        <section className="page-hero">
          <div className="shell">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span aria-hidden="true">/</span>
              <a href="/#services">Services</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{service.title}</span>
            </nav>

            <h1>
              {service.headline} in Manchester, Stockport &amp; Cheshire
            </h1>
            <p className="page-hero-lede">{service.blurb}</p>

            <div className="hero-actions">
              <a
                className="btn btn--whatsapp"
                href={site.whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp (opens in a new tab)"
              >
                <Icon name="whatsapp" size={20} />
                Chat on WhatsApp
                <Icon name="arrow" size={15} strokeWidth={2} />
              </a>
              <a className="btn btn--call" href={site.phoneHref} aria-label={`Call ${site.phone}`}>
                <Icon name="phone" size={19} />
                <span className="btn-stack">
                  <strong>Call Now</strong>
                  <small>{site.phone}</small>
                </span>
              </a>
            </div>

            <p className="page-hero-meta">
              <Icon name="check" size={15} strokeWidth={2.2} />
              {site.practitioner} {site.postNominals} &middot; HCPC {site.hcpcNumber} &middot; No
              GP referral needed
            </p>
          </div>
        </section>

        <section className="section section--tight">
          <div className="shell service-detail">
            <div className="service-detail-intro">
              <h2>Why have {service.title.toLowerCase()} at home?</h2>
              <p>{service.whyHome}</p>
              <p>{service.description}</p>
            </div>

            <div className="service-detail-lists">
              <div className="detail-card">
                <h3>Conditions I treat</h3>
                <ul>
                  {service.conditions.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={15} strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detail-card">
                <h3>How I treat it</h3>
                <ul>
                  {service.treatments.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={15} strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--surface section--tight">
          <div className="shell">
            <PhysioCard ctaHref="#book" />
          </div>
        </section>

        <section className="section section--tight">
          <div className="shell">
            <div className="section-head">
              <h2>How home visits work</h2>
            </div>
            <ol className="process-grid">
              {processSteps.map((step, i) => (
                <li key={step.title} className="process-step">
                  <div className="process-number">{i + 1}</div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section--surface section--tight">
          <div className="shell faq-layout">
            <div className="faq-aside">
              <h2>Common questions</h2>
              <p>
                About {service.title.toLowerCase()} at home, plus fees, referrals and the areas
                covered.
              </p>
            </div>
            <div className="faq-list">
              {pageFaqs.map((faq) => (
                <details className="faq-item faq-details" key={faq.question}>
                  <summary className="faq-question">
                    {faq.question}
                    <span className="faq-sign">
                      <Icon name="chevron" size={16} strokeWidth={2} />
                    </span>
                  </summary>
                  <p className="faq-details-answer">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--tight">
          <div className="shell">
            <div className="section-head">
              <h2>Other home physiotherapy services</h2>
            </div>
            <div className="services-grid">
              {others.map((other) => (
                <a key={other.slug} className="service-card" href={`/services/${other.slug}`}>
                  <h3>{other.title}</h3>
                  <p>{other.blurb}</p>
                  <span className="click-hint">
                    View service
                    <Icon name="arrow" size={14} strokeWidth={2} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="book" className="contact section">
          <div className="shell">
            <div className="cta-banner">
              <span className="cta-icon" aria-hidden="true">
                <Icon name="home" size={30} strokeWidth={1.4} />
              </span>
              <div className="cta-copy">
                <h2>Book a home visit</h2>
                <p>
                  Tell me what&apos;s happened and what you want to get back to &mdash; we&apos;ll
                  arrange a visit that suits you.
                </p>
              </div>
              <a
                className="btn btn--whatsapp"
                href={site.whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message on WhatsApp (opens in a new tab)"
              >
                <Icon name="whatsapp" size={20} />
                Message on WhatsApp
                <Icon name="arrow" size={15} strokeWidth={2} />
              </a>
            </div>

            <ul className="contact-info">
              <li>
                <Icon name="pin" size={22} />
                <div>
                  <strong>Serving {site.coverage.towns.length} towns</strong>
                  <span>{site.coverage.towns.map(townLabel).join(', ')}</span>
                </div>
              </li>
              <li>
                <a href={site.phoneHref}>
                  <Icon name="phone" size={22} />
                  <div>
                    <strong>{site.phone}</strong>
                    <span>Call for advice or to book</span>
                  </div>
                </a>
              </li>
              <li>
                <a href={site.smsHref}>
                  <Icon name="message" size={22} />
                  <div>
                    <strong>Send a message</strong>
                    <span>I reply within {site.responseTime}</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: serviceList.map((service) => ({ params: { slug: service.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => ({
  props: { slug: String(params?.slug) },
});
