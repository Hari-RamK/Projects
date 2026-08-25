import { motion } from "framer-motion";

/** Shared, centred section header: small tag, title, optional lead line. */
const SectionHeading = ({ tag, title, lead, tone = "default" }) => (
  <motion.header
    className={`section-heading section-heading--${tone}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {tag ? <p className="eyebrow">{tag}</p> : null}
    <h2 className="section-heading__title">{title}</h2>
    {lead ? <p className="section-heading__lead">{lead}</p> : null}
  </motion.header>
);

export default SectionHeading;
