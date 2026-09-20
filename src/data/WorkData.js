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
    name: "Restricted Zone Monitor",
    description:
      "Computer-vision monitoring of restricted areas in video footage: a polygon region of interest, YOLOv8 object detection on each frame, and CSV logging of entry events.",
    status: "Python project",
    tags: ["python", "yolov8", "pytorch", "opencv"],
    demo: null,
    github: null,
  },
  {
    id: 2,
    name: "ThesisPoint Research",
    description:
      "A publishing platform for company financial research and research documents, with market-data integration.",
    status: "In development",
    tags: ["nextjs", "react", "supabase", "tailwind"],
    demo: "https://thesispointresearch.com",
    github: null,
  },
  {
    id: 3,
    name: "Smart Fish Aquarium",
    description:
      "An IoT experiment in water-quality monitoring: an ESP32 reading temperature, pH and turbidity sensors.",
    status: "Sensing in progress · ML analysis planned",
    tags: ["esp32", "iot", "embedded"],
    demo: null,
    github: null,
  },
  {
    id: 4,
    name: "Hotel Management System",
    description:
      "Rooms, guests and bookings — an exercise in modelling data and the rules around it.",
    status: "Fundamentals project",
    tags: ["database", "app-logic"],
    demo: null,
    github: null,
  },
  {
    id: 5,
    name: "Bank Management System",
    description:
      "Accounts, deposits, withdrawals and balances — practising application logic, validation and persistent records.",
    status: "Fundamentals project",
    tags: ["database", "app-logic"],
    demo: null,
    github: null,
  },
];
