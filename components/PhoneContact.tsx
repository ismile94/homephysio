import Icon from '@/components/Icon';
import { site } from '@/data/site';

interface PhoneContactProps {
  variant?: 'hero' | 'contact' | 'footer' | 'modal';
}

export default function PhoneContact({ variant = 'hero' }: PhoneContactProps) {
  return (
    <div className={`phone-contact phone-contact--${variant}`}>
      <span className="phone-contact-number">{site.phone}</span>
      <div className="phone-contact-actions" role="group" aria-label="Call, send SMS or use WhatsApp">
        <a
          className="phone-contact-action"
          href={site.phoneHref}
          aria-label={`Call ${site.phone}`}
          title="Call"
        >
          <Icon name="phone" size={19} />
        </a>
        <a
          className="phone-contact-action"
          href={site.smsHref}
          aria-label={`Send SMS to ${site.phone}`}
          title="Send SMS"
        >
          <Icon name="message" size={19} />
        </a>
        <a
          className="phone-contact-action phone-contact-action--whatsapp"
          href={site.whatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Send a WhatsApp message (opens in a new tab)"
          title="WhatsApp"
        >
          <Icon name="whatsapp" size={19} />
        </a>
      </div>
    </div>
  );
}
