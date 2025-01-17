import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import visualizer from "rollup-plugin-visualizer";
import excludeDependenciesFromBundle from "rollup-plugin-peer-deps-external";

export default defineConfig(({ mode }) => {
  const isExample = mode === "development";

  return {
    root: isExample ? "src/example" : ".", // Use `example` as root only in dev
    plugins: [
      react(),
      visualizer({ open: true }),
      excludeDependenciesFromBundle(), // Plugin to exclude peer dependencies
    ],
    build: {
      target: "esnext",
      minify: "terser",
      lib: {
        entry: path.resolve(__dirname, "src/index.js"), // Framework entry
        name: "Koala",
        fileName: (format) => `koala.${format}.js`,
        formats: ["es"],
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          // Exclude more files or directories here
        ],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
          entryFileNames: `@koalajs/[name].js`, // Output with @koala-js scope
          chunkFileNames: `@koalajs/[name].js`,
        },
      },
    },
    server: {
      open: true,
      port: 3000,
      historyApiFallback: true, // Support SPA routing in dev mode
    },
  };
});
