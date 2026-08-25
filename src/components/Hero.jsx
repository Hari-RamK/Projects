import { motion } from "framer-motion";
import { business, heroSlides, heroStats } from "../data/site";
import useCarousel from "../hooks/useCarousel";

/**
 * Split hero: copy on one side, a portrait photo card on the other.
 *
 * The source photography is portrait and only ~700px wide, so it is framed in a
 * fixed 4:5 card rather than stretched behind the text - it stays sharp on a
 * phone and on a desktop display alike.
 */
const Hero = () => {
  const { index, go, pause, resume } = useCarousel(heroSlides.length, 5000);

  return (
    <section className="hero" id="top">
      <div className="hero__inner container">
        <motion.div
          className="hero__copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="eyebrow">Serving Sulur since {business.established}</p>

          <h1 className="hero__title">
            Celebrate every occasion with our{" "}
            <span className="hero__title-accent">delightful sweets</span>
          </h1>

          <p className="hero__lead">
            Traditional sweets, crisp savouries and fresh bakes - handmade every
            single day with time-tested recipes and the finest ingredients.
          </p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#menu">
              Explore the menu
            </a>
            <a className="btn btn--ghost" href={business.phoneHref}>
              Call {business.phone}
            </a>
          </div>

          <dl className="hero__stats">
            {heroStats.map((stat) => (
              <div className="hero__stat" key={stat.label}>
                <dt className="hero__stat-value">{stat.value}</dt>
                <dd className="hero__stat-label">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="hero__media"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <div className="hero__frame">
            {heroSlides.map((slide, i) => (
              <img
                key={slide.src}
                className={`hero__image ${i === index ? "is-active" : ""}`}
                src={slide.src}
                alt={slide.alt}
                // Only the visible slide should be announced.
                aria-hidden={i !== index}
                width="736"
                height="920"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding="async"
              />
            ))}
          </div>

          <div className="hero__dots" role="group" aria-label="Choose a photo">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                className={`dot ${i === index ? "is-active" : ""}`}
                aria-current={i === index}
                aria-label={`Show photo ${i + 1} of ${heroSlides.length}`}
                onClick={() => go(i)}
              />
            ))}
          </div>

          <div className="hero__badge" aria-hidden="true">
            <span className="hero__badge-value">Fresh</span>
            <span className="hero__badge-label">every day</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
