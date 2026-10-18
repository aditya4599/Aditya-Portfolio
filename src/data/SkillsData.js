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
    line: "Models that see and search, agents that reason under uncertainty, and hardware that listens.",
    sections: [
      { heading: "AI / ML & Computer Vision", items: ["PyTorch", "Hugging Face Transformers", "Sentence-Transformers", "FAISS", "YOLOv8", "OpenCV", "LLM APIs"] },
      { heading: "Algorithms & Data", items: ["A* / Dijkstra", "Bayesian inference", "NumPy", "pandas", "scikit-learn"] },
      { heading: "Hardware & Embedded", items: ["ESP32-S3", "ESPHome", "Embedded C++", "IoT sensors"] },
    ],
  },
  {
    id: "dev",
    title: "Developer",
    icon: "develop",
    line: "From the API to the interface, tested and shipped.",
    sections: [
      { heading: "Languages", items: ["Python", "TypeScript", "JavaScript", "C++", "Java", "C"] },
      { heading: "Backend & Web", items: ["FastAPI", "WebSockets", "REST APIs", "Next.js", "React", "Tailwind CSS"] },
      { heading: "Data & Tools", items: ["Supabase (PostgreSQL)", "SQL", "Docker", "pytest", "Git & GitHub"] },
    ],
  },
];
