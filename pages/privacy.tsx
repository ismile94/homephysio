import Seo, { webPageNode } from '@/components/Seo';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { site } from '@/data/site';

const TITLE = 'Privacy & Cookie Policy | PhysioVisit';
const DESCRIPTION = `How ${site.name} collects, uses and protects your personal information, and how cookies are used on this website.`;
const UPDATED = '5 November 2026';

export default function Privacy() {
  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        path="/privacy"
        nodes={[webPageNode('/privacy', TITLE, DESCRIPTION)]}
      />
      <SiteHeader />

      <main className="section legal">
        <div className="shell legal-body">
          <h1>Privacy &amp; cookie policy</h1>
          <p className="legal-updated">Last updated: {UPDATED}</p>

          <h2>Who I am</h2>
          <p>
            {site.name} (trading as {site.brandName}) is run by {site.practitioner}{' '}
            {site.postNominals}, an HCPC-registered {site.role.toLowerCase()} (registration{' '}
            {site.hcpcNumber}). I am the data controller for the personal information described
            here. You can contact me on {site.phone} or at{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>What I collect</h2>
          <ul>
            <li>
              <strong>Enquiries</strong> &ndash; your name, phone number, email address and the
              message you send by phone, SMS, WhatsApp, email or the website.
            </li>
            <li>
              <strong>Clinical records</strong> &ndash; if you become a patient, the health
              information needed to assess and treat you, as required by the HCPC and the
              Chartered Society of Physiotherapy.
            </li>
            <li>
              <strong>Website usage</strong> &ndash; anonymous visit statistics, and advertising
              measurement cookies only if you accept them (see Cookies below).
            </li>
          </ul>

          <h2>How and why I use it</h2>
          <ul>
            <li>
              To reply to your enquiry and arrange appointments (legitimate interests, or steps
              before entering a contract with you).
            </li>
            <li>
              To provide physiotherapy and keep clinical records (provision of health care, UK GDPR
              Article 9(2)(h)).
            </li>
            <li>To meet legal, insurance and professional obligations.</li>
            <li>To understand whether my adverts work, only with your consent.</li>
          </ul>
          <p>I never sell your information or use it for unrelated marketing.</p>

          <h2>How long I keep it</h2>
          <p>
            Enquiries that do not lead to treatment are deleted within 12 months. Clinical records
            are kept for 8 years after the last treatment for adults, and until age 25 (or 8
            years after the last treatment, whichever is longer) for patients treated as
            children, in line with CSP guidance.
          </p>

          <h2>Who I share it with</h2>
          <p>
            Only where necessary: your GP or other professionals involved in your care (with your
            agreement), my professional insurer, and the providers that run this website and its
            email (Vercel and Resend), who process data on my behalf under contract.
          </p>

          <h2>Cookies</h2>
          <p>
            Visit statistics use Vercel Web Analytics, which does not set cookies or identify you.
            If you click &ldquo;Accept&rdquo; on the cookie banner, the Google Ads tag also stores
            cookies so I can see which adverts led to a call or message. If you click
            &ldquo;Decline&rdquo; those cookies are not set. You can change your mind at any time
            by clearing this site&apos;s data in your browser, which brings the banner back.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask for a copy of your information, ask me to correct or delete it, object to
            or restrict how I use it, or withdraw consent. Contact me using the details above. If
            you are unhappy with how your data is handled you can complain to the Information
            Commissioner&apos;s Office at{' '}
            <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">
              ico.org.uk
            </a>
            .
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
