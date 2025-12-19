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

  // GitHub Pages base path
  base: "/pfi-ui/",

  publicDir: "./static",

  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
}));
