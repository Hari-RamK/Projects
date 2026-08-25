import { motion } from "framer-motion";
import { bestSellers } from "../data/site";
import SectionHeading from "./SectionHeading";

/**
 * Best sellers as an even card grid.
 *
 * The previous single rotating panel put the name and the photo in separate
 * columns that drifted apart on narrow screens; a grid keeps every card aligned
 * at any width and shows all three products at once.
 */
const BestSellers = () => (
  <section className="section section--mint" id="best-sellers">
    <div className="container">
      <SectionHeading
        tag="Best Sellers"
        title="What City Bakery Sulur keeps coming back for"
        lead="We are known for our unique take on traditional sweets and savouries."
      />

      <ul className="card-grid">
        {bestSellers.map((product, i) => (
          <motion.li
            className="product"
            key={product.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
          >
            <div className="product__media">
              <img
                className="product__img"
                src={product.img}
                alt={product.alt}
                width="736"
                height="920"
                loading="lazy"
                decoding="async"
              />
              {product.badge ? (
                <span className="product__badge">{product.badge}</span>
              ) : null}
            </div>

            <div className="product__body">
              <h3 className="product__name">{product.name}</h3>
              <p className="product__desc">{product.desc}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

export default BestSellers;
