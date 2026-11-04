import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ignored = new Set([".git", "node_modules", ".github"]);
const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(full);
  }
}
walk(root);
let errors = 0;
const fail = (message) => { console.error("FAIL:", message); errors++; };
function existsAsFileOrIndex(target) {
  if (!fs.existsSync(target)) return false;
  return fs.statSync(target).isDirectory() ? fs.existsSync(path.join(target, "index.html")) : fs.statSync(target).isFile();
}
for (const file of htmlFiles) {
  const source = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file);
  if (!/^<!doctype html>/i.test(source.trimStart())) fail(`${rel}: missing HTML5 doctype`);
  const ids = [...source.matchAll(/\bid=["\']([^"\']+)["\']/gi)].map((m) => m[1]);
  const seen = new Set();
  for (const id of ids) { if (seen.has(id)) fail(`${rel}: duplicate id "${id}"`); seen.add(id); }
  const refs = [...source.matchAll(/(?:href|src)=["\']([^"\']+)["\']/gi)];
  for (const [, raw] of refs) {
    const value = raw.trim();
    if (!value || /^(?:https?:|mailto:|tel:|data:|javascript:|blob:|\/\/)/i.test(value)) continue;
    const pathname = value.split(/[?#]/, 1)[0];
    if (!pathname) continue;
    let target;
    if (pathname.startsWith("/")) {
      const repoPath = pathname === "/ki-tool" ? "" : pathname.startsWith("/ki-tool/") ? pathname.slice("/ki-tool/".length) : pathname.slice(1);
      target = path.resolve(root, repoPath);
    } else target = path.resolve(path.dirname(file), pathname);
    if (!existsAsFileOrIndex(target)) fail(`${rel}: broken local reference "${value}"`);
  }
}
if (htmlFiles.length === 0) fail("No HTML pages found.");
if (errors) { console.error(`\nQuality check failed: ${errors} issue(s) across ${htmlFiles.length} HTML page(s).`); process.exit(1); }
console.log(`Quality check passed: ${htmlFiles.length} HTML page(s), local references and duplicate IDs checked.`);
