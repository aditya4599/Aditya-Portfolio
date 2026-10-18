// ─────────────────────────────────────────────────────────────
// Projects shown on the Projects page (/projects). Add, remove or reorder entries —
// the page renders whatever is in this array.
//
//   name         project title
//   description  one or two sentences
//   status       short, honest status line (shown on the card)
//   tags         technologies
//   demo         live URL or null  → "Visit" button only if set
//   github       repo URL or null  → GitHub icon only if set
//
// ⚠ Check every status line before publishing — they describe what
//   is built vs. planned, and should match reality.
// ─────────────────────────────────────────────────────────────

export const Work = [
  {
    id: 1,
    name: "WALL-E and EVE's Signal",
    description:
      "An autonomous agent that searches a partially observed grid world for a hidden target, using A* pathfinding, a Bayesian belief map and a battery-aware planner.",
    status: "169 tests · 100-seed experiments",
    tags: ["python", "a-star", "bayesian", "numpy"],
    demo: null,
    github: "https://github.com/aditya4599/walle",
  },
  {
    id: 2,
    name: "ADI Voice Assistant",
    description:
      "A self-hosted smart speaker: an ESP32-S3 with an on-device wake word streams speech to a FastAPI backend that replies using an LLM and tools like Spotify, weather and web search.",
    status: "Firmware builds · on-device testing next",
    tags: ["esp32", "fastapi", "python", "llm"],
    demo: null,
    github: "https://github.com/aditya4599/homeassistant",
  },
  {
    id: 3,
    name: "FinSearch",
    description:
      "Semantic search for financial news: headlines embedded with SBERT or FinBERT and indexed in FAISS, so queries match by meaning, with optional fine-tuning and live Finnhub news.",
    status: "Retrieval metrics built in",
    tags: ["python", "pytorch", "faiss", "nlp"],
    demo: null,
    github: "https://github.com/aditya4599/finhub",
  },
  {
    id: 4,
    name: "Restricted Zone Monitor",
    description:
      "Live webcam monitoring with YOLOv8: click four points to draw a restricted zone, see breach alerts on screen, and log entry, exit and time in the zone to CSV.",
    status: "Python project",
    tags: ["python", "yolov8", "opencv", "pytorch"],
    demo: null,
    github: "https://github.com/aditya4599/restricted-zone-monitor",
  },
  {
    id: 5,
    name: "ThesisPoint Research",
    description:
      "A publishing platform for company financial research and research documents, with market-data integration.",
    status: "In development",
    tags: ["nextjs", "react", "supabase", "tailwind"],
    demo: "https://thesispointresearch.com",
    github: null,
  },
  {
    id: 6,
    name: "Smart Fish Aquarium",
    description:
      "An IoT experiment in water-quality monitoring: an ESP32 reading temperature, pH and turbidity sensors.",
    status: "Sensing in progress · ML analysis planned",
    tags: ["esp32", "iot", "embedded"],
    demo: null,
    github: null,
  },
];