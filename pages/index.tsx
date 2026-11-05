import { useState, useEffect, useRef } from 'react';
import Seo, { HOME_DESCRIPTION, HOME_TITLE, faqNode, webPageNode } from '@/components/Seo';
import Icon, { type IconName } from '@/components/Icon';
import Reveal from '@/components/Reveal';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PhysioCard from '@/components/PhysioCard';
import PhoneContact from '@/components/PhoneContact';
import { servicesData, type ServiceData } from '@/data/services';
import { approachCards, processSteps } from '@/data/conditions';
import { faqs } from '@/data/faqs';
import { site, townLabel } from '@/data/site';
import { LIMITS, isValidEmail } from '@/lib/validate';
import { trackConversion } from '@/lib/gtag';

const featurePoints: { icon: IconName; title: string; body: string }[] = [
  { icon: 'home', title: 'Home visits', body: 'Manchester, Stockport & Cheshire' },
  { icon: 'check', title: 'No GP referral', body: 'Book directly with me' },
  { icon: 'clock', title: '60-min assessment', body: 'Unhurried first visit' },
  { icon: 'user', title: '1-to-1 care', body: 'Same physio every visit' },
];
const homeNodes = [webPageNode('/', HOME_TITLE, HOME_DESCRIPTION), faqNode('/', faqs)];

export default function Home() {
  const [activeService, setActiveService] = useState<ServiceData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [processVisible, setProcessVisible] = useState(false);

  // `company` is a honeypot - hidden from people, filled in by form bots.
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '', company: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const formMountedAt = useRef(Date.now());
  const processRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Draws the process timeline rail once the section is in view.
  useEffect(() => {
    const node = processRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setProcessVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setProcessVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Modal: lock scroll, move focus into the dialog, close on Escape.
  useEffect(() => {
    if (!activeService) return;

    const opener = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveService(null);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
  }, [activeService]);

  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.email && !isValidEmail(formData.email)) {
      setFormError('That email address does not look right - please check it, or leave it blank.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, elapsed: Date.now() - formMountedAt.current }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setFormSubmitted(true);
      trackConversion('form');
      setFormData({ name: '', phone: '', email: '', message: '', company: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError(error instanceof Error ? error.message : `An error occurred. Please try again or call ${site.phone}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Seo nodes={homeNodes} preloadImage={site.heroImage} />

      <SiteHeader onHome />

      <main>
        <section id="home" className="hero">
          <div className="hero-main">
            <div className="hero-bg">
              <img
                src={site.heroImage}
                alt="Physiotherapist supporting a patient walking with crutches at home"
                width={1024}
                height={625}
                fetchPriority="high"
              />
            </div>

            <div className="shell hero-inner">
              <h1>Home physiotherapy in Manchester &amp; Cheshire</h1>

              <p className="hero-lede">
                Assessment, rehabilitation and ongoing treatment in your own home, with a
                programme tailored to your needs and goals.
              </p>

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
            </div>
          </div>

          <div className="shell">
            <ul className="feature-strip">
              {featurePoints.map((point) => (
                <li key={point.title}>
                  <Icon name={point.icon} size={22} strokeWidth={1.8} />
                  <strong>{point.title}</strong>
                  <span>{point.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="services" className="section">
          <div className="shell">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">Services</p>
                <h2>Physiotherapy services at home</h2>
                <p>
                  Select a service to see the conditions I treat and the approaches I use.
                </p>
              </div>
            </Reveal>

            <div className="services-grid">
              {Object.entries(servicesData).map(([key, service], i) => (
                <Reveal key={key} delay={i * 70}>
                  <button
                    type="button"
                    className="service-card"
                    onClick={() => setActiveService(service)}
                    aria-haspopup="dialog"
                  >
                    <h3>{service.title}</h3>
                    <p>{service.blurb}</p>
                    <span className="click-hint">
                      View details
                      <Icon name="arrow" size={14} strokeWidth={2} />
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section section--surface section--tight">
          <div className="shell">
            <Reveal>
              <PhysioCard />
            </Reveal>
          </div>
        </section>

        <section id="approach" className="section">
          <div className="shell">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">Your treatment</p>
                <h2>What to expect from your appointments</h2>
                <p>Clear assessment, practical goals and a plan built around your daily life.</p>
              </div>
            </Reveal>

            <div className="approach-grid">
              {approachCards.slice(0, 2).map((card, i) => (
                <Reveal key={card.title} delay={i * 80} from={i % 2 === 0 ? 'left' : 'right'}>
                  <div className="approach-card" data-index={String(i + 1).padStart(2, '0')}>
                    <h3>{card.title}</h3>
                    <p>{card.intro}</p>
                    <ul>
                      {card.points.map((point) => (
                        <li key={point}>
                          <Icon name="check" size={15} strokeWidth={2} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section section--tint">
          <div className="shell">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">How it works</p>
                <h2>Your care, step by step</h2>
                <p>From your first call to your ongoing treatment.</p>
              </div>
            </Reveal>

            <div
              ref={processRef}
              className={`process-wrap ${processVisible ? 'is-visible' : ''}`}
            >
              <div className="process-rail" aria-hidden="true" />
              <div className="process-grid">
                {processSteps.map((step, i) => (
                  <Reveal key={step.title} delay={i * 110}>
                    <div className="process-step">
                      <div className="process-number">{i + 1}</div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="shell">
            <div className="faq-layout">
              <Reveal className="faq-aside" from="left">
                <p className="eyebrow">Frequently asked questions</p>
                <h2>Practical information</h2>
                <p>Fees, appointments, referrals and the areas covered by home visits.</p>
              </Reveal>

              <Reveal delay={100}>
                <div className="faq-list">
                  {faqs.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div className="faq-item" key={faq.question}>
                        <button
                          className="faq-question"
                          onClick={() => toggleFaq(index)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${index}`}
                          id={`faq-button-${index}`}
                        >
                          {faq.question}
                          <span className="faq-sign">
                            <Icon name="chevron" size={16} strokeWidth={2} />
                          </span>
                        </button>
                        <div
                          className="faq-answer"
                          id={`faq-answer-${index}`}
                          role="region"
                          aria-labelledby={`faq-button-${index}`}
                          data-open={isOpen}
                        >
                          <div>
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="contact" className="contact section">
          <div className="shell">
            <div className="contact-grid">
              <Reveal>
                <div className="cta-banner">
                  <span className="cta-icon" aria-hidden="true">
                    <Icon name="home" size={30} strokeWidth={1.4} />
                  </span>
                  <div className="cta-copy">
                    <h2>Arrange a home visit</h2>
                    <p>
                      Tell me what&apos;s happened and what you want to get back to &mdash;
                      we&apos;ll arrange a visit that suits you.
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
                      <span>{site.coverage.label} and surrounding areas</span>
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

                <div className="coverage-area">
                  <h3>
                    <Icon name="pin" size={14} /> Areas We Cover
                  </h3>
                  {/* Inline rather than chips: all 21 names still appear in the copy
                      for local search, in a fraction of the height. */}
                  <p className="coverage-towns">
                    {site.coverage.towns.map(townLabel).join(' · ')}
                  </p>
                  <p className="coverage-note">
                    No clinic to travel to &mdash; every session takes place in your own home. Just
                    outside these areas? Send your postcode and we&apos;ll confirm.
                  </p>
                </div>
              </Reveal>

              <Reveal from="right" delay={100} className="contact-form-panel">
                <form className="contact-form" onSubmit={handleFormSubmit} noValidate>
                  <div className="form-head">
                    <h3>Request a consultation</h3>
                    <p>We typically respond within {site.responseTime}.</p>
                  </div>

                  <div aria-live="polite">
                    {formError && (
                      <div className="form-alert form-alert--err">
                        <Icon name="arrow" size={16} />
                        {formError}
                      </div>
                    )}
                    {formSubmitted && (
                      <div className="form-alert form-alert--ok">
                        <Icon name="check" size={16} strokeWidth={2.4} />
                        Thank you! We&apos;ll get back to you within {site.responseTime}.
                      </div>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Jane Smith"
                      autoComplete="name"
                      maxLength={LIMITS.name}
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="07xxx xxxxxx"
                      autoComplete="tel"
                      maxLength={LIMITS.phone}
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="jane@example.com"
                      autoComplete="email"
                      maxLength={LIMITS.email}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="message">How can we help? *</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your condition and how we can help..."
                      maxLength={LIMITS.message}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Honeypot: hidden from people, irresistible to form bots. */}
                  <div className="decoy" aria-hidden="true">
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Icon name="arrow" size={17} />}
                  </button>

                  <p className="form-note">
                    Your details are used only to reply to this enquiry.
                  </p>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter onHome />

      {activeService && (
        <div className="modal-backdrop" onClick={() => setActiveService(null)}>
          <div
            ref={modalRef}
            tabIndex={-1}
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="modal-title">{activeService.title}</h2>
            <p>
              {activeService.description}{' '}
              <a className="modal-more" href={`/services/${activeService.slug}`}>
                Full details
                <Icon name="arrow" size={13} strokeWidth={2} />
              </a>
            </p>

            <h3>Conditions treated</h3>
            <ul>
              {activeService.conditions.map((item) => (
                <li key={item}>
                  <Icon name="check" size={14} strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>

            <h3>Treatment approaches</h3>
            <ul>
              {activeService.treatments.map((item) => (
                <li key={item}>
                  <Icon name="check" size={14} strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>

            <div className="modal-foot">
              <PhoneContact variant="modal" />
              <button type="button" className="modal-close" onClick={() => setActiveService(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
