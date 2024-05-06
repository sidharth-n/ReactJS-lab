import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { loadEnv } from "vite"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    define: {
      "process.env": env,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor"
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000, // Set your desired limit in kilobytes
    },
  }
})
