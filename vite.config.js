import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import prism from "vite-plugin-prismjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prism({
      languages: [
        "javascript",
        "css",
        "html",
        "typescript",
        "markup",
        "php",
        "ruby",
        "python",
        "java",
        "c",
        "csharp",
        "cpp",
      ],
      plugins: ["line-numbers"],
      theme: "tomorrow",
      css: true,
    }),
  ],
});
