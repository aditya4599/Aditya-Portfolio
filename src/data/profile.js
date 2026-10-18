// ─────────────────────────────────────────────────────────────
// Personal details used across the site. Edit this file to update
// your name, intro, links and portrait.
//
// Links set to null are NOT rendered (no broken links).
// ─────────────────────────────────────────────────────────────

import defaultPortrait from "../assets/Images/profile-img.png";

export const profile = {
  firstName: "Aditya",
  lastName: "Mittal",
  initials: "AM",
  roles: ["Computer Science Student", "AI/ML Developer"],
  intro:
    "Building intelligent systems through code, machine learning, and experimentation.",

  // The illustrated portrait in the hero. To use your own illustration
  // or photo, add it to src/assets/Images/ and import it here instead.
  portrait: defaultPortrait,
  portraitAlt: "Illustrated portrait",

  email: "adityamittal4599@gmail.com",
  github: "https://github.com/aditya4599",
  linkedin: "https://www.linkedin.com/in/aditya-mittal-167726192",
  instagram: "https://www.instagram.com/adityamittal50/",
};

// Hero greeting cycle. `lang` gives screen readers and fonts the
// right language for each phrase.
export const greetings = [
  { text: "Hello World!", lang: "en" },
  { text: "Bonjour le monde!", lang: "fr" },
  { text: "Hola, mundo!", lang: "es" },
  { text: "Ciao, mondo!", lang: "it" },
  { text: "Hallo Welt!", lang: "de" },
  { text: "नमस्ते दुनिया!", lang: "hi" },
];

export const aboutParagraphs = [
  "I'm a computer science student who'd rather build the thing than read about it. Most of what I know came from projects that didn't work the first time, and then did.",
  "Lately: a smart speaker that wakes up and answers through an LLM, a robot named WALL-E that hunts for EVE using probability instead of luck, a camera that catches anything crossing into a zone it shouldn't, and a search engine that reads financial news by meaning, not keywords.",
  "I'm into AI, computer vision, robotics and anywhere software meets hardware, still early in the journey, always up for a good problem. Say hi.",
];

export const isUsableUrl = (url) =>
  typeof url === "string" && /^(https?:\/\/|mailto:)/i.test(url.trim());
