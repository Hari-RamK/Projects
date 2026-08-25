import { business, logo } from "../data/site";

const Footer = () => (
  <footer className="footer" id="contact">
    <button
      type="button"
      className="footer__to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUpIcon />
    </button>

    <div className="container">
      <div className="footer__grid">
        <div className="footer__brand">
          <img
            className="footer__logo"
            src={logo}
            alt={`${business.name} logo`}
            width="282"
            height="320"
            loading="lazy"
            decoding="async"
          />
          <p className="footer__quote">
            &ldquo;It is our commitment to quality that has brought us where we
            are today. I invite all our guests to experience the same.&rdquo;
          </p>
          <p className="footer__signature">Management</p>

          <ul className="footer__social">
            <li>
              <a
                className="footer__social-link"
                href={business.instagramHref}
                target="_blank"
                rel="noreferrer"
                aria-label={`${business.name} on Instagram`}
              >
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a
                className="footer__social-link footer__social-link--whatsapp"
                href={business.whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label={`Message ${business.name} on WhatsApp`}
              >
                <WhatsAppIcon />
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">Contact</h3>
          <ul className="footer__list">
            <li>
              <a className="footer__link" href={business.phoneHref}>
                {business.phone}
              </a>
            </li>
            <li>
              <a className="footer__link" href={business.emailHref}>
                {business.email}
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                href={business.whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp us
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">Visit us</h3>
          <address className="footer__address">
            {business.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <a
            className="footer__link footer__link--map"
            href={business.mapsHref}
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps
          </a>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">Hours of opening</h3>
          <p className="footer__hours">{business.hours}</p>
        </div>
      </div>

      <div className="footer__bar">
        <p>
          &copy; {new Date().getFullYear()} {business.name} Sulur. All rights
          reserved.
        </p>
        <p>
          Developed by <span className="footer__author">buhoverse</span>
        </p>
      </div>
    </div>
  </footer>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
    <path
      d="M12 19V5m0 0-6 6m6-6 6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
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

export default Footer;
