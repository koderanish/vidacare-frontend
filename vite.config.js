import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { seoPlugin } from "./vite-seo-plugin.js";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    plugins: [react(), seoPlugin({ adminBase: env.VITE_ADMIN_BASE || "/vc-portal" })],
    server: { port: 5173, allowedHosts: true },
  };
});
