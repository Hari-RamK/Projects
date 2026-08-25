import { business } from "../data/site";

/**
 * Floating WhatsApp enquiry button, fixed to the opposite corner from
 * "back to top" so the two never collide. Opens a chat with City Bakery's
 * number, pre-filled with an enquiry message.
 */
const WhatsAppEnquiry = () => (
  <a
    className="whatsapp-fab"
    href={business.whatsappHref}
    target="_blank"
    rel="noreferrer"
    aria-label={`Chat with ${business.name} on WhatsApp`}
  >
    <span className="whatsapp-fab__ring" aria-hidden="true" />
    <span className="whatsapp-fab__icon" aria-hidden="true">
      <WhatsAppGlyph />
    </span>
    <span className="whatsapp-fab__label">WhatsApp Enquiry</span>
  </a>
);

const WhatsAppGlyph = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
    <path
      d="M6.5 17.4 4 21l3.7-1.5A8.5 8.5 0 1 0 4.4 15Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M9 9.3c0-.7.5-1.3 1.1-1.3.3 0 .5.1.7.4l.7 1.2c.2.3.2.7 0 1l-.5.7c.4.9 1.2 1.7 2.1 2.1l.7-.5c.3-.2.7-.2 1 0l1.2.7c.3.2.4.4.4.7 0 .6-.6 1.1-1.3 1.1-3.1 0-6.1-3-6.1-6.1Z"
      fill="currentColor"
    />
  </svg>
);

export default WhatsAppEnquiry;
