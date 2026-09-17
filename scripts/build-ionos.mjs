/**
 * IONOS Deploy Now only hosts static files (no Node runtime).
 * Hide server-only routes for the duration of `next build`, then restore them.
 */
import { spawn } from "node:child_process";
import { access, rename } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skips = [
  ["src/app/api", "src/app/_ionos_skip_api"],
  ["src/app/intern", "src/app/_ionos_skip_intern"],
];

async function exists(target) {
  try {
    await access(path.join(root, target));
    return true;
  } catch {
    return false;
  }
}

async function restore() {
  for (const [original, hidden] of skips) {
    if (await exists(hidden)) {
      await rename(path.join(root, hidden), path.join(root, original));
    }
  }
}

async function hideServerRoutes() {
  await restore();
  for (const [original, hidden] of skips) {
    if (await exists(original)) {
      await rename(path.join(root, original), path.join(root, hidden));
    }
  }
}

function runBuild() {
  return new Promise((resolve, reject) => {
    const child = spawn(path.join(root, "node_modules/.bin/next"), ["build"], {
      cwd: root,
      stdio: "inherit",
      env: { ...process.env, IONOS_STATIC: "1" },
    });
    child.on("error", reject);
    child.on("close", (code) => resolve(code ?? 1));
  });
}

await hideServerRoutes();
try {
  const code = await runBuild();
  if (code !== 0) process.exit(code);
} finally {
  await restore();
}
