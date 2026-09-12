import { motion } from "motion/react";
import React from "react";
import styled from "styled-components";
import { Github, Instagram, LinkedIn } from "../components/AllSvgs";
import { DarkTheme } from "../components/Themes";
import { profile, isUsableUrl } from "../data/profile";

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  bottom: 0;
  left: 2rem;

  z-index: 3;

  & > *:not(:last-child) {
    margin: 0.5rem 0;
  }

  @media (max-width: 760px) {
    left: 1rem;
  }
`;

const Line = styled(motion.span)`
  width: 2px;
  height: 8rem;
  background-color: ${(props) =>
    props.$color === "dark" ? DarkTheme.text : DarkTheme.body};

  @media (max-width: 760px) {
    height: 4rem !important;
  }
`;

// Only links that are actually set in src/data/profile.js are shown.
const links = [
  { key: "github", label: "GitHub", Icon: Github },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedIn },
  { key: "instagram", label: "Instagram", Icon: Instagram },
].filter(({ key }) => isUsableUrl(profile[key]));

const SocialIcons = (props) => {
  const fill = props.theme === "dark" ? DarkTheme.text : DarkTheme.body;
  return (
    <Icons>
      {links.map(({ key, label, Icon }, i) => (
        <motion.div
          key={key}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 1.5, 1] }}
          transition={{ type: "spring", duration: 1, delay: 1 + i * 0.2 }}
        >
          <a
            style={{ color: "inherit" }}
            target="_blank"
            rel="noopener noreferrer"
            href={profile[key]}
            aria-label={`${label} (opens in a new tab)`}
          >
            <Icon width={25} height={25} fill={fill} />
          </a>
        </motion.div>
      ))}

      <Line
        $color={props.theme}
        initial={{
          height: 0,
        }}
        animate={{
          height: "8rem",
        }}
        transition={{
          type: "spring",
          duration: 1,
          delay: 0.8,
        }}
      />
    </Icons>
  );
};

export default SocialIcons;
