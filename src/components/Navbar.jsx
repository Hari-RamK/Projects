import { useEffect, useId, useState } from "react";
import { business, logo, navLinks } from "../data/site";

/**
 * Sticky header. Collapses into a hamburger + slide-down panel below 900px,
 * and gains a shadow once the page scrolls away from the top.
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const panelId = useId();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the open mobile panel, and close it on Escape.
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  // A resize past the breakpoint should not leave the panel stranded open.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 900px)");
    const onChange = (event) => {
      if (event.matches) setIsOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <header className={`header ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="header__inner container">
          <a className="brand" href="#top" onClick={() => setIsOpen(false)}>
            <img
              className="brand__mark"
              src={logo}
              alt=""
              width="282"
              height="320"
              fetchPriority="high"
            />
            <span className="brand__text">
              <span className="brand__name">{business.name}</span>
              <span className="brand__tagline">{business.tagline}</span>
            </span>
          </a>

          <nav className="nav" aria-label="Primary">
            <ul className="nav__list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a className="nav__link" href={`#${link.id}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a className="header__phone" href={business.phoneHref}>
            <PhoneIcon />
            <span>{business.phone}</span>
          </a>

          <button
            type="button"
            className={`hamburger ${isOpen ? "is-open" : ""}`}
            aria-expanded={isOpen}
            aria-controls={panelId}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="hamburger__bar" />
            <span className="hamburger__bar" />
            <span className="hamburger__bar" />
          </button>
        </div>

        <div
          id={panelId}
          className={`mobile-panel ${isOpen ? "is-open" : ""}`}
          // Keep the collapsed panel out of the tab order and off screen readers.
          inert={!isOpen}
        >
          <ul className="mobile-panel__list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  className="mobile-panel__link"
                  href={`#${link.id}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            className="btn btn--primary mobile-panel__cta"
            href={business.phoneHref}
            onClick={() => setIsOpen(false)}
          >
            <PhoneIcon />
            <span>{business.phone}</span>
          </a>
        </div>
      </header>

      {/*
        The scrim lives outside <header> on purpose: the header's
        `backdrop-filter` would otherwise become the containing block for this
        fixed element and shrink it to the header's own box.
      */}
      <div
        className={`scrim ${isOpen ? "is-open" : ""}`}
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />
    </>
  );
};

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <path
      d="M6.6 2.5 9 7l-2 1.6a13 13 0 0 0 6.4 6.4L15 13l4.5 2.4a1.6 1.6 0 0 1 .8 1.7l-.4 2A2 2 0 0 1 17.8 21C9.6 20.4 3.6 14.4 3 6.2A2 2 0 0 1 4.9 4l2-.4a1.6 1.6 0 0 1 1.7.9Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

export default Navbar;
