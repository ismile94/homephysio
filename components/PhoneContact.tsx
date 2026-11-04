import { useEffect, useId, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { site } from '@/data/site';

interface PhoneContactProps {
  triggerClassName?: string;
  placement?: 'up' | 'down';
  align?: 'left' | 'right';
}

export default function PhoneContact({
  triggerClassName = '',
  placement = 'down',
  align = 'left',
}: PhoneContactProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionsId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`phone-contact phone-contact--${placement} phone-contact--${align}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`phone-contact-trigger ${triggerClassName}`}
        aria-expanded={open}
        aria-controls={optionsId}
        aria-label={`${site.phone}: show contact options`}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name="phone" size={17} />
        {site.phone}
      </button>

      <div
        id={optionsId}
        className="phone-contact-options"
        data-open={open}
        role="group"
        aria-label="Contact options"
        aria-hidden={!open}
      >
        <a href={site.phoneHref} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
          <span className="phone-contact-option-icon">
            <Icon name="phone" size={18} />
          </span>
          <span>
            <strong>Call</strong>
            <small>Make a phone call</small>
          </span>
        </a>
        <a href={site.smsHref} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
          <span className="phone-contact-option-icon">
            <Icon name="message" size={18} />
          </span>
          <span>
            <strong>Send SMS</strong>
            <small>Open your messages app</small>
          </span>
        </a>
        <a
          href={site.whatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className="phone-contact-whatsapp"
          aria-label="Send a WhatsApp message (opens in a new tab)"
        >
          <span className="phone-contact-option-icon">
            <Icon name="whatsapp" size={18} />
          </span>
          <span>
            <strong>WhatsApp</strong>
            <small>Send a message</small>
          </span>
        </a>
      </div>
    </div>
  );
}
