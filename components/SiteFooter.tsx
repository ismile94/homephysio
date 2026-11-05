import { useEffect, useState } from 'react';
import { BrandWordmark } from '@/components/Logo';
import { sectionLinks } from '@/components/SiteHeader';
import { serviceList } from '@/data/services';
import { site } from '@/data/site';

export default function SiteFooter({ onHome = false }: { onHome?: boolean }) {
  const [year, setYear] = useState(0);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href={onHome ? '#home' : '/'} className="logo">
              <BrandWordmark />
            </a>
            <p className="footer-bio">
              {site.practitioner} {site.postNominals} &ndash; {site.role}. Specialist home
              physiotherapy across {site.coverage.label}.
            </p>
          </div>

          <div>
            <h4>Sections</h4>
            <ul className="footer-links">
              {sectionLinks(onHome).map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {serviceList.map((service) => (
                <li key={service.slug}>
                  <a href={`/services/${service.slug}`}>{service.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-legal">
          <span>
            &copy; {year || ''} {site.name}. All rights reserved. &middot;{' '}
            <a href="/privacy">Privacy &amp; cookies</a>
          </span>
          <span>HCPC Registered | Professional Liability Insurance (PLI) | Enhanced DBS</span>
        </div>
      </div>
    </footer>
  );
}
