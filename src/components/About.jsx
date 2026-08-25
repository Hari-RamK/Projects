import { motion } from "framer-motion";
import { aboutParagraphs, aboutSlides, business } from "../data/site";
import useCarousel from "../hooks/useCarousel";

/** Our Story: copy beside a working poster carousel. Stacks below 900px. */
const About = () => {
  const { index, go, next, prev, pause, resume } = useCarousel(
    aboutSlides.length,
    6000
  );

  return (
    <section className="section about" id="about">
      <div className="about__inner container">
        <motion.div
          className="about__copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="eyebrow">Our Story</p>
          <h2 className="about__title">
            A home of authentic sweets and snacks
          </h2>

          {aboutParagraphs.map((text) => (
            <p className="about__text" key={text.slice(0, 32)}>
              {text}
            </p>
          ))}

          <p className="about__signature">
            Est. {business.established} · {business.name}, Sulur
          </p>
        </motion.div>

        <motion.div
          className="about__media"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <div className="carousel">
            <div className="carousel__frame">
              {aboutSlides.map((slide, i) => (
                <img
                  key={slide.src}
                  className={`carousel__img ${i === index ? "is-active" : ""}`}
                  src={slide.src}
                  alt={slide.alt}
                  aria-hidden={i !== index}
                  width="735"
                  height="1040"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>

            <button
              type="button"
              className="carousel__arrow carousel__arrow--prev"
              onClick={prev}
              aria-label="Previous poster"
            >
              <Chevron direction="left" />
            </button>

            <button
              type="button"
              className="carousel__arrow carousel__arrow--next"
              onClick={next}
              aria-label="Next poster"
            >
              <Chevron direction="right" />
            </button>
          </div>

          <div className="carousel__dots" role="group" aria-label="Choose a poster">
            {aboutSlides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                className={`dot ${i === index ? "is-active" : ""}`}
                aria-current={i === index}
                aria-label={`Show poster ${i + 1} of ${aboutSlides.length}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Chevron = ({ direction }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path
      d={direction === "left" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default About;
