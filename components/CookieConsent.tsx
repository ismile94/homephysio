import { useEffect, useState } from 'react';
import { GOOGLE_ADS_ID, readConsent, saveConsent } from '@/lib/gtag';

/** Only rendered when the Google Ads tag is configured - otherwise the site sets no cookies. */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (GOOGLE_ADS_ID && readConsent() === null) setOpen(true);
  }, []);

  if (!open) return null;

  const choose = (granted: boolean) => {
    saveConsent(granted);
    setOpen(false);
  };

  return (
    <div className="cookie-banner" role="region" aria-label="Cookie consent">
      <p>
        I use cookies to see which adverts bring people to this site. No cookies are set unless
        you accept. <a href="/privacy">Privacy &amp; cookies</a>
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn" onClick={() => choose(false)}>
          Decline
        </button>
        <button type="button" className="cookie-btn cookie-btn--accept" onClick={() => choose(true)}>
          Accept
        </button>
      </div>
    </div>
  );
}
