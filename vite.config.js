import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),
    eslint({
      emitWarning: true, // Show warnings but don't fail build
      emitError: false, // Don't emit errors for warnings
      failOnWarning: false, // Don't fail on warnings
      failOnError: false, // Optional: don't fail on errors either (set to true if you want real errors to break)
    }),
  ],
});
