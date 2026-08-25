import { business, logo } from "../data/site";

const Footer = () => (
  <footer className="footer" id="contact">
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

export default Footer;
