import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: "",
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
