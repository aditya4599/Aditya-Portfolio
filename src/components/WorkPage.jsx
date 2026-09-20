import React, { useLayoutEffect, useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { DarkTheme } from "./Themes";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

import LogoComponent from "../subComponents/LogoComponent";
import SocialIcons from "../subComponents/SocialIcons";
import PowerButton from "../subComponents/PowerButton";

import { Work } from "../data/WorkData";
import Card from "../subComponents/Card";
import { YinYang } from "./AllSvgs";
import BigTitlte from "../subComponents/BigTitlte";
import BackHomeLink from "../subComponents/BackHomeLink";

const Box = styled.div`
  background-color: ${(props) => props.theme.body};

  /* Height is set from the real width of the card track (see below),
     so vertical scrolling ends exactly when the last card arrives. */
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
`;

const Main = styled(motion.ul)`
  position: fixed;
  top: 12rem;
  left: calc(10rem + 15vw);
  display: flex;
  align-items: stretch;
  list-style: none;
  margin: 0;
  padding: 0 4rem 0 0;
  will-change: transform;

  color: white;

  @media (max-width: 760px) {
    top: 8rem;
    left: 4rem;
    padding-right: 1.5rem;
  }
`;
const Rotate = styled(motion.span)`
  display: block;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 80px;
  height: 80px;
  z-index: 1;

  @media (max-width: 760px) {
    width: 56px;
    height: 56px;
    svg { width: 56px; height: 56px; }
  }
`;

const Hint = styled(motion.p)`
  position: fixed;
  left: 50%;
  bottom: 4rem;
  transform: translateX(-50%);
  color: ${(props) => `rgba(${props.theme.textRgba},0.6)`};
  font-family: "Ubuntu Mono", monospace;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  z-index: 1;
  pointer-events: none;
`;

// The page scrolls a fixed card track, so the link is fixed too.
const HomeLink = styled(BackHomeLink)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 1.5rem;
  z-index: 2;
  display: flex;
  justify-content: center;
  pointer-events: none;

  a { pointer-events: auto; }
`;

// Framer-motion Configuration
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,

    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.5,
      duration: 0.5,
    },
  },
};

const WorkPage = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);

  // Measure how far the track has to travel to show its last card.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      const left = el.offsetLeft;
      setDistance(Math.max(0, Math.ceil(el.scrollWidth + left - window.innerWidth)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Scroll-linked motion values (batched per frame by Motion — no raw
  // scroll listener writing styles on every event).
  const { scrollY } = useScroll();
  const rawX = useTransform(scrollY, (v) => -Math.min(v, distance));
  const smoothX = useSpring(rawX, { stiffness: 140, damping: 30, mass: 0.35 });
  const x = reduce ? rawX : smoothX;
  const rotate = useTransform(scrollY, (v) => -v);
  const titleX = useTransform(scrollY, [0, Math.max(distance, 1)], [0, -160]);
  const hintOpacity = useTransform(scrollY, [0, 160], [1, 0]);

  // Keyboard users: tabbing to a card scrolls it into view.
  const onFocus = (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    window.scrollTo({ top: Math.max(0, li.offsetLeft - 40), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <ThemeProvider theme={DarkTheme}>
      <Box style={{ height: `calc(100vh + ${distance}px)` }}>
        <LogoComponent theme="dark" />
        <SocialIcons theme="dark" />
        <PowerButton />

        <Main
          ref={ref}
          style={{ x }}
          variants={container}
          initial="hidden"
          animate="show"
          onFocus={onFocus}
          aria-label="Projects"
        >
          {Work.map((d, i) => (
            <Card key={d.id} data={d} index={i} />
          ))}
        </Main>
        <Rotate style={{ rotate }} aria-hidden="true">
          <YinYang width={80} height={80} fill={DarkTheme.text} />
        </Rotate>

        <Hint style={{ opacity: hintOpacity }} aria-hidden="true">
          scroll ↓
        </Hint>

        <BigTitlte text="PROJECTS" top="10%" right="12%" style={{ x: titleX }} />
        <HomeLink delay={1.2} />
      </Box>
    </ThemeProvider>
  );
};

export default WorkPage;
