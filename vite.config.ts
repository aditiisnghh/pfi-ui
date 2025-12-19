import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { screenGraphPlugin } from "@animaapp/vite-plugin-screen-graph";
import tailwind from "tailwindcss";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    ...(mode === "development"
      ? [screenGraphPlugin() as unknown as any]
      : []),
  ],

  // 🔑 IMPORTANT: change this to your GitHub repo name
  // Example repo: portfolio-risk-intelligence
  base: "/portfolio-risk-intelligence/",

  publicDir: "./static",

  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
}));
