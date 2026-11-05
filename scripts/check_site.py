#!/usr/bin/env python3
"""Check local HTML references and PWA assets without third-party packages."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import json
import posixpath
import sys

ROOT = Path(__file__).resolve().parents[1]
BASE = "/ki-tool/"


class RefParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ("href", "src"):
            value = attrs.get(key, "")
            if value:
                self.refs.append(value)


def resolve_ref(page, raw):
    parsed = urlsplit(raw.strip())
    if parsed.scheme or parsed.netloc or raw.startswith(("#", "data:", "mailto:", "tel:", "javascript:")):
        return None
    path = parsed.path
    if not path:
        return None
    if path.startswith(BASE):
        path = path[len(BASE):]
    elif path.startswith("/"):
        path = path.lstrip("/")
    else:
        path = posixpath.join(page.parent.as_posix(), path)
    path = posixpath.normpath(path)
    if path in ("", "."):
        path = "index.html"
    candidate = ROOT / path
    if candidate.is_dir():
        candidate = candidate / "index.html"
    return candidate


def main():
    errors = []
    for page in sorted(ROOT.rglob("*.html")):
        parser = RefParser()
        parser.feed(page.read_text(encoding="utf-8"))
        for ref in parser.refs:
            target = resolve_ref(page.relative_to(ROOT), ref)
            if target is not None and not target.is_file():
                errors.append(f"{page.relative_to(ROOT)}: missing local target {ref}")
    manifest = json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
    for icon in manifest.get("icons", []):
        target = resolve_ref(Path("manifest.json"), icon["src"])
        if target is not None and not target.is_file():
            errors.append(f"manifest.json: missing icon {icon['src']}")
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print("Local HTML references and PWA icons are present.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
