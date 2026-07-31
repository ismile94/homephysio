const ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escape untrusted text before it goes into an HTML email body.
 *
 * Without this, anything a visitor types into the contact form — links, images,
 * styled blocks — renders as live markup in the inbox. Mail clients won't run
 * scripts, but a clickable "click here to confirm your appointment" link
 * planted by a stranger is a ready-made phishing surface.
 */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ENTITIES[char]);
}

/** Escape, then convert newlines to <br> so multi-line messages keep their shape. */
export function escapeHtmlMultiline(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, '<br>');
}
