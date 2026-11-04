import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const errors = [];
const htmlFiles = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules" || entry.name === ".github") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(full);
  }
}

function localTarget(fromFile, raw) {
  const value = raw.trim();
  if (!value || value.startsWith("#") || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(value)) return null;
  let pathname;
  try { pathname = decodeURIComponent(new URL(value, "https://local.invalid").pathname); }
  catch { errors.push(`Invalid URL in ${path.relative(root, fromFile)}: ${value}`); return null; }
  let target;
  if (pathname.startsWith("/ki-tool/")) target = path.join(root, pathname.slice("/ki-tool/".length));
  else if (pathname === "/ki-tool" || pathname === "/ki-tool/") target = path.join(root, "index.html");
  else if (pathname.startsWith("/")) target = path.join(root, pathname.slice(1));
  else target = path.resolve(path.dirname(fromFile), pathname);
  return target;
}

await walk(root);
if (htmlFiles.length === 0) errors.push("No HTML pages found.");

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const rel = path.relative(root, file);
  if (!/<meta\s+charset=/i.test(html)) errors.push(`${rel}: missing charset declaration`);
  if (!/<meta\s+name=["']viewport["']/i.test(html)) errors.push(`${rel}: missing viewport declaration`);

  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const target = localTarget(file, match[1]);
    if (!target) continue;
    let exists = false;
    try {
      const info = await stat(target);
      exists = info.isFile() || info.isDirectory();
      if (info.isDirectory()) exists = (await stat(path.join(target, "index.html"))).isFile();
    } catch {}
    if (!exists) errors.push(`${rel}: broken local reference ${match[1]}`);
  }
}

if (errors.length) {
  console.error("Site validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Site validation passed: ${htmlFiles.length} HTML pages, local references resolved.`);
}
