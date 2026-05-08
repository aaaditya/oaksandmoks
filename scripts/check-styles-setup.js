const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const need = ["tailwind.config.js", "app/globals.css", "app/brand-fallback.css"];

const missing = need.filter((f) => !fs.existsSync(path.join(root, f)));
if (missing.length) {
  console.error(
    "\n[oaks-moks] Missing required style setup files:\n",
    missing.map((m) => `  - ${m}`).join("\n"),
    "\n\nRestore them from the repo, then run:\n  rm -rf .next && npm run dev\n"
  );
  process.exit(1);
}

const postcssPath = ["postcss.config.js", "postcss.config.cjs"].find((f) =>
  fs.existsSync(path.join(root, f))
);
if (!postcssPath) {
  console.error(
    "\n[oaks-moks] Add postcss.config.js (or .cjs) with tailwindcss + autoprefixer.\n"
  );
  process.exit(1);
}

const postcssSrc = fs.readFileSync(path.join(root, postcssPath), "utf8");
if (!postcssSrc.includes("tailwindcss")) {
  console.error(
    `\n[oaks-moks] ${postcssPath} must include the tailwindcss plugin.\n`
  );
  process.exit(1);
}

console.log("[oaks-moks] Style toolchain files OK.");
