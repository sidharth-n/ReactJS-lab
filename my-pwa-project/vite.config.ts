import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "My PWA Project",
        short_name: "PWA Project",
        description: "My Progressive Web App",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icon1.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon2.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon2.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
})
