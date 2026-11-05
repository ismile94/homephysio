import Icon from '@/components/Icon';
import { site } from '@/data/site';

/** "Meet your physiotherapist" card with registration and insurance on its edge. */
export default function PhysioCard({ ctaHref = '#contact' }: { ctaHref?: string }) {
  return (
    <article className="physio-card">
      <div className="physio-body">
        <h2>Meet your physiotherapist</h2>
        <p>
          I&apos;m <strong>{site.practitioner}</strong>, a {site.role} ({site.postNominals})
          treating adults of all ages and conditions in their own homes.
        </p>
        <p>
          My goal is evidence-based, personalised care &mdash; with unhurried appointments and
          the same physio at every visit.
        </p>
      </div>

      <ul className="physio-points">
        <li>
          <strong>60 min</strong>
          <span>First assessment</span>
        </li>
        <li>
          <strong>45&ndash;60 min</strong>
          <span>Every session</span>
        </li>
        <li>
          <strong>1-to-1</strong>
          <span>Same physio</span>
        </li>
      </ul>

      <a href={ctaHref} className="btn btn--navy physio-cta">
        Arrange a home visit
        <Icon name="arrow" size={15} strokeWidth={2} />
      </a>

      <ul className="physio-creds" aria-label="Registration and insurance">
        <li>
          <a
            href={site.hcpcRegisterUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`HCPC registered, number ${site.hcpcNumber} - verify on the register (opens in a new tab)`}
          >
            <span className="cred-mark cred-mark--hcpc">
              hcpc
              <small>registered</small>
            </span>
            <span className="cred-note">No. {site.hcpcNumber}</span>
          </a>
        </li>
        <li>
          <img
            className="cred-logo"
            src="/csp-logo.svg"
            alt="The Chartered Society of Physiotherapy"
            width={146}
            height={74}
            loading="lazy"
          />
          <span className="cred-note">Member (MCSP)</span>
        </li>
        <li>
          <span className="cred-mark cred-mark--ins">
            <Icon name="shield" size={22} strokeWidth={1.8} />
          </span>
          <span className="cred-note">Fully insured &amp; Enhanced DBS checked</span>
        </li>
      </ul>
    </article>
  );
}
