import { useState, useEffect, useRef } from 'react';
import Seo from '@/components/Seo';
import Icon from '@/components/Icon';
import { BrandLogo } from '@/components/Logo';
import Reveal from '@/components/Reveal';
import Counter from '@/components/Counter';
import { servicesData, type ServiceData } from '@/data/services';
import { conditionGroups, approachCards, processSteps, trustPoints } from '@/data/conditions';
import { faqs } from '@/data/faqs';
import { site, townLabel } from '@/data/site';
import { LIMITS, isValidEmail } from '@/lib/validate';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#conditions', label: 'Conditions' },
  { href: '#approach', label: 'Our Approach' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ' },
];

/** Only figures that are literally true of the practice — nothing invented. */
const stats = [
  { value: Object.keys(servicesData).length, suffix: '', label: 'Specialist service areas' },
  { value: site.coverage.towns.length, suffix: '', label: 'Towns covered by home visit' },
  { value: 60, suffix: ' min', label: 'Initial home assessment' },
  { value: 0, suffix: '', label: 'GP referrals needed' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<ServiceData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [year, setYear] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processVisible, setProcessVisible] = useState(false);

  // `company` is a honeypot - hidden from people, filled in by form bots.
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '', company: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const formMountedAt = useRef(Date.now());
  const processRef = useRef<HTMLDivElement>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 24);
      setProgress(height > 0 ? Math.min(scrollTop / height, 1) : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  // Modal: lock scroll, focus the close button, close on Escape.
  useEffect(() => {
    if (!activeService) return;

    const opener = document.activeElement as HTMLElement | null;
    modalCloseRef.current?.focus();
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
      <Seo />

      <header className="nav" data-scrolled={scrolled}>
        <div className="nav-inner">
          <a href="#home" className="logo" aria-label={`${site.brandName} - back to top`}>
            <BrandLogo />
            {site.brandName}
          </a>

          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
          </button>

          <nav id="nav-links" className="nav-links" data-open={menuOpen}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
              Book Consultation
            </a>
          </nav>
        </div>
        <div className="nav-progress" style={{ transform: `scaleX(${progress})`, width: '100%' }} />
      </header>

      <main>
        <section id="home" className="hero">
          <div className="aurora" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="shell hero-grid">
            <div>
              <h1 className="rise" style={{ animationDelay: '0.15s' }}>
                <span className="highlight">Home Physiotherapy</span> in Manchester &amp; Cheshire
              </h1>

              {/* Credentials live in the trust strip directly below — repeating them
                  here only crowded the hero, badly so once they wrapped on mobile. */}
              <p className="hero-lede rise" style={{ animationDelay: '0.28s' }}>
                Delivering specialist, evidence-based physiotherapy care in the comfort and safety of
                your own home, across Stockport, Altrincham, Wilmslow, Macclesfield and south
                Manchester. Comprehensive rehabilitation programmes tailored to your individual needs
                and goals.
              </p>

              <div className="hero-actions rise" style={{ animationDelay: '0.4s' }}>
                <a href="#contact" className="btn btn--primary">
                  <Icon name="calendar" size={18} />
                  Book Your Consultation
                </a>
                <a href={site.phoneHref} className="btn btn--ghost">
                  <Icon name="phone" size={17} />
                  {site.phone}
                </a>
              </div>
            </div>

            <div className="hero-figure">
              <div className="hero-image">
                <img
                  src="/evhastasi.jpg"
                  alt="Physiotherapist supporting a patient through a mobility exercise at home"
                  width={880}
                  height={1000}
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="hero-badge">
                <span className="hero-badge-icon">
                  <Icon name="home" size={20} />
                </span>
                <div>
                  <strong>No clinic to travel to</strong>
                  <span>Every session in your own home</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--surface" style={{ paddingBlock: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <div className="shell">
            <div className="trust-grid">
              {trustPoints.map((point, i) => (
                <Reveal key={point.title} delay={i * 90}>
                  <div className="trust-card">
                    <span className="trust-icon">
                      <Icon name={point.icon} size={24} />
                    </span>
                    <div>
                      <strong>{point.title}</strong>
                      <p>{point.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="shell">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">Specialist Services</p>
                <h2>
                  Six areas of practice, <em>one clinician</em>
                </h2>
                <p>
                  Comprehensive physiotherapy care across a wide range of conditions, delivered with
                  expertise and compassion in your home environment.
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
                  >
                    <span className="service-icon">
                      <Icon name={service.icon} size={26} />
                    </span>
                    <h3>{service.title}</h3>
                    <p>{service.blurb}</p>
                    <span className="click-hint">
                      View conditions &amp; treatments
                      <Icon name="arrow" size={15} />
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section stats-section">
          <div className="shell">
            <Reveal from="scale">
              <div className="stats">
                {stats.map((stat) => (
                  <div className="stat" key={stat.label}>
                    <div className="stat-value">
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="conditions" className="section section--surface">
          <div className="shell">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">Conditions We Treat</p>
                <h2>
                  Expert care across <em>every stage of recovery</em>
                </h2>
                <p>Expert physiotherapy for a comprehensive range of medical conditions.</p>
              </div>
            </Reveal>

            <div className="conditions-grid">
              {conditionGroups.map((group, i) => (
                <Reveal key={group.title} delay={i * 60}>
                  <div className="condition-card">
                    <h3>
                      <Icon name={group.icon} size={20} />
                      {group.title}
                    </h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="section">
          <div className="shell">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">Our Treatment Approach</p>
                <h2>
                  Clinical rigour, <em>delivered with care</em>
                </h2>
                <p>
                  Evidence-based physiotherapy combining clinical expertise with compassionate,
                  patient-centered care.
                </p>
              </div>
            </Reveal>

            <div className="approach-grid">
              {approachCards.map((card, i) => (
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
                <p className="eyebrow">How It Works</p>
                <h2>
                  Four steps, <em>no waiting list</em>
                </h2>
                <p>A simple, straightforward process from initial contact to ongoing care.</p>
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
                <p className="eyebrow">Frequently Asked Questions</p>
                <h2>
                  Everything you need <em>to know first</em>
                </h2>
                <p>
                  Fees, coverage, session length and paperwork &mdash; the things worth knowing
                  before you commit to anything.
                </p>
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
              <Reveal from="left">
                <p className="eyebrow">Get in Touch</p>
                <h2>
                  Start your recovery <em>at home</em>
                </h2>
                <p className="contact-lede">
                  Tell me what&apos;s happened and what you want to get back to. I&apos;ll answer any
                  questions and we&apos;ll arrange a visit that suits you.
                </p>

                <div className="contact-lines">
                  <a href={site.phoneHref} className="contact-item">
                    <Icon name="phone" size={19} />
                    {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`} className="contact-item">
                    <Icon name="mail" size={19} />
                    {site.email}
                  </a>
                </div>

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

              <Reveal from="right" delay={100}>
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

      <footer className="footer">
        <div className="shell">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#home" className="logo">
                <BrandLogo />
                {site.brandName}
              </a>
              <p className="footer-bio">
                {site.practitioner} {site.postNominals} &ndash; {site.role}. Specialist home
                physiotherapy across {site.coverage.label}.
              </p>
            </div>

            <div>
              <h4>Sections</h4>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href={site.phoneHref}>{site.phone}</a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>Home visits by appointment</li>
              </ul>
            </div>
          </div>

          {/* Closing brand lockup — the last thing on the page */}
          <div className="footer-signoff">
            <img className="signoff-logo" src={`/logo-${site.brandLogo}.png`} alt="" width={256} height={256} />
            <span className="signoff-name">{site.brandName}</span>
            <span className="signoff-tag">{site.role} &middot; {site.coverage.label}</span>
          </div>

          <div className="footer-legal">
            <span>
              &copy; {year} {site.name}. All rights reserved.
            </span>
            <span>
              HCPC Registered | Professional Liability Insurance (PLI) | Enhanced DBS
            </span>
          </div>
        </div>
      </footer>

      {activeService && (
        <div className="modal-backdrop" onClick={() => setActiveService(null)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <div>
                <span className="modal-head-icon">
                  <Icon name={activeService.icon} size={22} />
                </span>
                <h2 id="modal-title">{activeService.title}</h2>
              </div>
              <button
                ref={modalCloseRef}
                className="close-btn"
                onClick={() => setActiveService(null)}
                aria-label="Close"
              >
                &#10005;
              </button>
            </div>

            <p>{activeService.description}</p>

            <h3>Conditions Treated</h3>
            <ul>
              {activeService.conditions.map((item) => (
                <li key={item}>
                  <Icon name="check" size={15} strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>

            <h3>Treatment Approaches</h3>
            <ul>
              {activeService.treatments.map((item) => (
                <li key={item}>
                  <Icon name="check" size={15} strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>

            <div className="modal-foot">
              <a href="#contact" className="btn btn--primary" onClick={() => setActiveService(null)}>
                Book a consultation
                <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
