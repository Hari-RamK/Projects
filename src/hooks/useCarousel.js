import { useCallback, useEffect, useState } from "react";

/**
 * Index state for a looping slideshow.
 *
 * Auto-advances every `delay` ms, pauses while the tab is hidden or the user
 * prefers reduced motion, and restarts the timer whenever the slide is changed
 * by hand so a manual pick is not cut short.
 */
export const useCarousel = (length, delay = 5000) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const go = useCallback(
    (next) => setIndex(((next % length) + length) % length),
    [length]
  );

  const next = useCallback(() => setIndex((i) => (i + 1) % length), [length]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + length) % length),
    [length]
  );

  useEffect(() => {
    if (length < 2 || isPaused || !delay) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return undefined;

    const timer = window.setInterval(next, delay);
    return () => window.clearInterval(timer);
    // `index` is a dependency on purpose: changing slides resets the countdown.
  }, [length, delay, isPaused, next, index]);

  // Do not keep cycling in a background tab.
  useEffect(() => {
    const onVisibility = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return {
    index,
    go,
    next,
    prev,
    pause: () => setIsPaused(true),
    resume: () => setIsPaused(false),
  };
};

export default useCarousel;
