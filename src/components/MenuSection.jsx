import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories } from "../data/site";
import SectionHeading from "./SectionHeading";

/** Board auto-hides after this many ms of no interaction. */
const AUTO_HIDE_DELAY = 8000;

/**
 * Category picker plus the menu board for the active category.
 *
 * The board stays hidden until a category icon is clicked; clicking the same
 * icon again hides it, and so does leaving it open and untouched for
 * `AUTO_HIDE_DELAY` - the countdown pauses while the board is hovered or
 * focused so a customer actually reading it is never interrupted. The four
 * boards do not share an aspect ratio, so the board sits in a fixed 3:4 frame
 * with `object-fit: contain` - nothing is cropped, and showing or switching a
 * board never shifts the page.
 */
const MenuSection = () => {
  const [activeId, setActiveId] = useState(null);
  const [isHeld, setIsHeld] = useState(false);
  const active = categories.find((item) => item.id === activeId) ?? null;
  const boardId = useId();

  const handlePick = (id) => {
    setActiveId((current) => (current === id ? null : id));
  };

  useEffect(() => {
    if (!activeId || isHeld) return undefined;

    const timer = window.setTimeout(() => setActiveId(null), AUTO_HIDE_DELAY);
    return () => window.clearTimeout(timer);
  }, [activeId, isHeld]);

  return (
    <section className="section section--tinted" id="menu">
      <div className="container">
        <SectionHeading
          tag="Our Menu"
          title="Pick a counter to browse"
          lead="Four counters, one kitchen. Tap a category to reveal what is on the board today."
        />

        <ul className="category-grid">
          {categories.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`category ${isActive ? "is-active" : ""}`}
                  aria-pressed={isActive}
                  aria-expanded={isActive}
                  aria-controls={boardId}
                  onClick={() => handlePick(item.id)}
                >
                  <span className="category__ring">
                    <img
                      className="category__img"
                      src={item.icon}
                      alt={item.iconAlt}
                      width="400"
                      height="400"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="category__name">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div
          id={boardId}
          onMouseEnter={() => setIsHeld(true)}
          onMouseLeave={() => setIsHeld(false)}
          onFocus={() => setIsHeld(true)}
          onBlur={() => setIsHeld(false)}
        >
          <AnimatePresence mode="wait">
            {active ? (
              <motion.figure
                className="board"
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <img
                  className="board__img"
                  src={active.board}
                  alt={active.boardAlt}
                  width="600"
                  height="986"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="board__caption">
                  {active.name} menu board
                </figcaption>
              </motion.figure>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
