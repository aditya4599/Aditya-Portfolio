import { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const HOLD_MS = 2600; // time each greeting stays on screen
const EASE = [0.76, 0, 0.24, 1];

/**
 * Multilingual greeting that cycles through `items`.
 *
 * - Outgoing phrase slides up out of a clipped mask while the next one
 *   rises in from below.
 * - Every phrase is also rendered invisibly in the same grid cell, so
 *   the box is always sized to the longest phrase: no layout jump.
 * - Screen readers hear one stable greeting; the animated layer is
 *   aria-hidden with aria-live="off".
 * - Reduced motion: shows the first greeting, no cycling.
 */
const Greeting = ({ items, startDelay = 0, className }) => {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || items.length < 2) return undefined;
    let interval;
    const advance = () => {
      if (document.visibilityState === "visible") {
        setIndex((i) => (i + 1) % items.length);
      }
    };
    const start = setTimeout(() => {
      advance();
      interval = setInterval(advance, HOLD_MS);
    }, startDelay * 1000 + HOLD_MS);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [reduce, items.length, startDelay]);

  const current = items[index];

  return (
    <Wrap className={className}>
      <span className="sr-only" lang={items[0].lang}>
        {items[0].text}
      </span>
      <span className="stack" aria-hidden="true" aria-live="off">
        {items.map((g) => (
          <span className="sizer" lang={g.lang} key={g.text}>
            {g.text}
          </span>
        ))}
        <AnimatePresence initial={false}>
          <motion.span
            key={current.text}
            lang={current.lang}
            className="phrase"
            initial={{ y: "135%", rotate: 4 }}
            animate={{ y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE, delay: 0.15 } }}
            exit={{ y: "-135%", rotate: -3, transition: { duration: 0.7, ease: EASE } }}
          >
            {current.text}
          </motion.span>
        </AnimatePresence>
      </span>
    </Wrap>
  );
};

const Wrap = styled.span`
  display: block;

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  .stack {
    display: inline-grid;
    justify-items: start;
    align-items: end;
    overflow: hidden;
    /* breathing room inside the mask for Devanagari marks and descenders */
    padding: 0.18em 0.08em 0.14em 0;
    margin: -0.18em 0 -0.14em;
    white-space: nowrap;
  }

  .sizer,
  .phrase {
    grid-area: 1 / 1;
    display: block;
    line-height: 1.15;
  }
  .sizer { visibility: hidden; }
  .phrase { transform-origin: left bottom; will-change: transform; }

  [lang="hi"] {
    font-family: "Noto Sans Devanagari", "Karla", sans-serif;
    font-weight: 600;
    font-size: 0.9em;
  }
`;

export default Greeting;
