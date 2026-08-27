import { defineConfig } from "vitest/config";
import path from "path";

const dirname = import.meta.dirname;

/**
 * Unit tests run in Node. `server-only` is aliased to an empty stub so that
 * server modules (which guard themselves with `import "server-only"`) can be
 * exercised in tests without a React Server Component runtime.
 */
export default defineConfig({
  resolve: {
    alias: {
      "server-only": path.resolve(dirname, "src/test/server-only-stub.ts"),
      "@": path.resolve(dirname, "src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
