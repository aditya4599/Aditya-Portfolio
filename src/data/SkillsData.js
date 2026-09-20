// ─────────────────────────────────────────────────────────────
// My Skills page — the two cards are built from this data.
// Each card has a title, an icon ("design" | "develop"), a short
// line, and sections of skills. No percentages on purpose.
// ─────────────────────────────────────────────────────────────

export const SkillCards = [
  {
    id: "ai",
    title: "AI / ML & Systems",
    icon: "design",
    line: "I like building systems that see, learn and sense the world around them.",
    sections: [
      { heading: "AI / ML & Computer Vision", items: ["PyTorch", "YOLO", "OpenCV", "Machine learning fundamentals"] },
      { heading: "Programming", items: ["Python", "Java", "C", "C++"] },
      { heading: "Hardware & Systems", items: ["ESP32", "IoT fundamentals", "Embedded systems experimentation"] },
    ],
  },
  {
    id: "dev",
    title: "Developer",
    icon: "develop",
    line: "I enjoy turning ideas into working software — front to back.",
    sections: [
      { heading: "Web Development", items: ["JavaScript", "React", "Next.js", "Node.js fundamentals", "HTML", "CSS"] },
      { heading: "Databases & Tools", items: ["SQL", "Supabase", "Git", "GitHub"] },
    ],
  },
];
