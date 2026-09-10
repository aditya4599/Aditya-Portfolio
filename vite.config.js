import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Serves api/contact.js at /api/contact during `bun run dev`, so the
// Say Hi form works locally exactly like it will on Vercel.
// Server-only env vars (RESEND_API_KEY, ...) are read from .env.local
// here and are NOT exposed to the browser (no VITE_ prefix).
function localApi(mode) {
  return {
    name: "local-api",
    configureServer(server) {
      Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
      server.middlewares.use("/api/contact", async (req, res) => {
        const mod = await server.ssrLoadModule("/api/contact.js");
        await mod.default(req, res);
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), localApi(mode)],
  server: {
    port: 3000,
    open: true,
  },
}));
