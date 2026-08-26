/**
 * Deployment verification.
 *
 * Loads every major route from a base URL (local `next start` or a Vercel
 * deployment), captures console/page errors, checks HTTP status, and takes a
 * screenshot per route at desktop and mobile widths.
 *
 * Usage:
 *   BASE_URL=https://<deployment>.vercel.app node scripts/verify-deployment.mjs
 *   BASE_URL=http://localhost:3000 node scripts/verify-deployment.mjs
 */
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { join } from "path";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const OUT = join(process.cwd(), "visual-qa", "deploy");
mkdirSync(OUT, { recursive: true });

const ROUTES = [
  "/",
  "/regal-mieten/",
  "/entdecken/",
  "/so-funktionierts/",
  "/ueber-mima/",
  "/faq/",
  "/mein-mima/",
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const problems = [];
const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    locale: "de-DE",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`);
  });

  for (const route of ROUTES) {
    errors.length = 0;
    const url = `${BASE}${route}`;
    let status = 0;
    try {
      const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      status = resp?.status() ?? 0;
    } catch (e) {
      problems.push({ vp: vp.name, route, issue: `navigation failed: ${e.message}` });
      continue;
    }
    await page.waitForTimeout(700);

    const broken = await page.evaluate(() =>
      [...document.images]
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.src),
    );

    const slug = route === "/" ? "home" : route.replace(/\//g, "");
    await page.screenshot({ path: join(OUT, `${slug}__${vp.name}.png`) });

    if (status !== 200) problems.push({ vp: vp.name, route, issue: `status ${status}` });
    if (broken.length) problems.push({ vp: vp.name, route, issue: `broken images: ${broken.join(", ")}` });
    if (errors.length) problems.push({ vp: vp.name, route, issue: errors.join(" | ") });

    console.log(`${vp.name} ${route} -> ${status} (${errors.length} errors, ${broken.length} broken imgs)`);
  }
  await context.close();
}

await browser.close();
console.log("\n=== PROBLEMS ===");
console.log(problems.length ? JSON.stringify(problems, null, 2) : "none");
process.exit(problems.length ? 1 : 0);
