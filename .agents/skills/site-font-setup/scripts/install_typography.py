from __future__ import annotations

import argparse
import hashlib
import re
import sys
from dataclasses import dataclass
from pathlib import Path


SKILL_ROOT = Path(__file__).resolve().parents[1]
CSS_TEMPLATE = SKILL_ROOT / "assets" / "typography.css"
FONT_BUNDLE = SKILL_ROOT / "assets" / "fonts" / "pretendard-jp"
FONT_BASE_URL = (
    "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/"
    "packages/pretendard-jp/dist/web/static/woff2"
)
LICENSE_URL = "https://raw.githubusercontent.com/orioncactus/pretendard/v1.3.9/LICENSE"
TYPOGRAPHY_IMPORT = "import './typography.css'"
STATIC_CSS_LINK = '<link rel="stylesheet" href="./typography.css">'
EMBED_START = "<!-- casino-typography:start -->"
EMBED_END = "<!-- casino-typography:end -->"
ADOBE_EMBED = """  <!-- casino-typography:start -->
  <script>
    (function(d) {
      var config = { kitId: 'hyf2mwn', scriptTimeout: 3000, async: true },
        h = d.documentElement,
        t = setTimeout(function() { h.className = h.className.replace(/\\bwf-loading\\b/g, '') + ' wf-inactive'; }, config.scriptTimeout),
        tk = d.createElement('script'), f = false, s = d.getElementsByTagName('script')[0], a;
      h.className += ' wf-loading';
      tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
      tk.async = true;
      tk.onload = tk.onreadystatechange = function() {
        a = this.readyState;
        if (f || a && a !== 'complete' && a !== 'loaded') return;
        f = true; clearTimeout(t); try { Typekit.load(config); } catch (e) {}
      };
      s.parentNode.insertBefore(tk, s);
    })(document);
  </script>
  <script>
    (function(d) {
      var config = { kitId: 'gig5kam', scriptTimeout: 3000, async: true },
        h = d.documentElement,
        t = setTimeout(function() { h.className = h.className.replace(/\\bwf-loading\\b/g, '') + ' wf-inactive'; }, config.scriptTimeout),
        tk = d.createElement('script'), f = false, s = d.getElementsByTagName('script')[0], a;
      h.className += ' wf-loading';
      tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
      tk.async = true;
      tk.onload = tk.onreadystatechange = function() {
        a = this.readyState;
        if (f || a && a !== 'complete' && a !== 'loaded') return;
        f = true; clearTimeout(t); try { Typekit.load(config); } catch (e) {}
      };
      s.parentNode.insertBefore(tk, s);
    })(document);
  </script>
  <link rel="stylesheet" href="https://use.typekit.net/aqm4sxy.css" />
  <!-- casino-typography:end -->"""


@dataclass(frozen=True)
class Download:
    name: str
    url: str
    sha256: str


DOWNLOADS = (
    Download(
        "PretendardJP-Regular.woff2",
        f"{FONT_BASE_URL}/PretendardJP-Regular.woff2",
        "ca8abbe573f57f235faa68525e427646532c7aa5ab65d0c267c179e9a0ff76b8",
    ),
    Download(
        "PretendardJP-Medium.woff2",
        f"{FONT_BASE_URL}/PretendardJP-Medium.woff2",
        "6928e2b9476ef12187c2892b986d7b7f86be7a7cc7f92d517cba3b3cece192b4",
    ),
    Download(
        "PretendardJP-Bold.woff2",
        f"{FONT_BASE_URL}/PretendardJP-Bold.woff2",
        "3c926898801c5ef97af081151566f7038ac529de88c77d212ea5f2037309dad2",
    ),
    Download(
        "PretendardJP-ExtraBold.woff2",
        f"{FONT_BASE_URL}/PretendardJP-ExtraBold.woff2",
        "0f28b245cdd874db2e5c29a4ac4a60d5cf3479ed62b15857d61c1ff94d468b3a",
    ),
    Download(
        "PretendardJP-Black.woff2",
        f"{FONT_BASE_URL}/PretendardJP-Black.woff2",
        "71ff28e74ed789d467ed7ffe225990318e9cdbe9f07343633751a9d36d243aae",
    ),
    Download(
        "LICENSE.txt",
        LICENSE_URL,
        "d31ddd9f2bed32fd7e302a205cf2380ba0de6529152d239ef99cfb6f261bfc04",
    ),
)

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Install and verify the bundled typography runtime without downloading fonts.")
    parser.add_argument("--project", required=True, type=Path)
    parser.add_argument("--static", action="store_true", help="Install for a directly served index.html instead of src/main.tsx.")
    parser.add_argument("--entry", type=Path, help="Project-relative JS/TS entry; default: detect src/main.tsx, .jsx, .ts or .js.")
    parser.add_argument("--adobe-kit-mode", choices=("existing", "off"), default="existing",
                        help="existing: retain the owner's three registered kit embeds; off: local fonts only.")
    parser.add_argument("--verify-only", action="store_true")
    return parser.parse_args()


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def bundled_font(download: Download) -> bytes:
    data = (FONT_BUNDLE / download.name).read_bytes()
    actual = digest(data)
    if actual != download.sha256:
        raise ValueError(f"SHA-256 mismatch for {download.name}: {actual}")
    return data


def validate_project(project: Path, static: bool = False, entry: Path | None = None) -> tuple[Path | None, Path]:
    if static and entry is not None:
        raise ValueError("--static and --entry cannot be combined")
    if static:
        main_path = None
    elif entry is not None:
        main_path = (project / entry).resolve()
        main_path.relative_to(project)
    else:
        candidates = [project / 'src' / ('main.' + ext) for ext in ('tsx', 'jsx', 'ts', 'js')]
        found = [p for p in candidates if p.is_file()]
        if len(found) != 1:
            raise ValueError("Specify --entry when a single src/main.tsx, .jsx, .ts or .js cannot be detected; use --static for HTML")
        main_path = found[0]
    index_path = project / "index.html"
    if not index_path.is_file():
        raise ValueError("project must contain index.html")
    if main_path is not None and not main_path.is_file():
        raise ValueError("the selected entry file does not exist")
    return main_path, index_path


def typography_paths(project: Path, main_path: Path | None) -> tuple[Path, Path]:
    if main_path is None:
        return project / "fonts" / "pretendard-jp", project / "typography.css"
    return project / "public" / "fonts" / "pretendard-jp", main_path.parent / "typography.css"


def typography_template(main_path: Path | None) -> bytes:
    template = CSS_TEMPLATE.read_bytes()
    # Keep static sites portable when served from a subdirectory as well as /.
    return template.replace(b'url("/fonts/', b'url("./fonts/') if main_path is None else template


def insert_css_import(text: str) -> str:
    if TYPOGRAPHY_IMPORT in text:
        return text
    lines = text.splitlines()
    css_imports = [index for index, line in enumerate(lines) if re.match(r'\s*import\b', line) and '.css' in line]
    insert_at = css_imports[0] if css_imports else 0
    lines.insert(insert_at, TYPOGRAPHY_IMPORT)
    return "\n".join(lines) + ("\n" if text.endswith("\n") else "")


def insert_adobe_embed(text: str) -> str:
    has_start = EMBED_START in text
    has_end = EMBED_END in text
    if has_start or has_end:
        if not (has_start and has_end and ADOBE_EMBED in text):
            raise ValueError("index.html contains a partial or edited casino typography embed")
        return text
    marker = "</head>"
    if marker not in text:
        raise ValueError("index.html has no </head> marker")
    return text.replace(marker, f"{ADOBE_EMBED}\n{marker}", 1)


def verify(project: Path, main_path: Path | None, index_path: Path, adobe: bool = True) -> None:
    errors: list[str] = []
    font_root, typography_path = typography_paths(project, main_path)
    for download in DOWNLOADS:
        path = font_root / download.name
        if not path.is_file():
            errors.append(f"missing {path.relative_to(project)}")
        elif digest(path.read_bytes()) != download.sha256:
            errors.append(f"hash mismatch {path.relative_to(project)}")
    if not typography_path.is_file():
        errors.append(f"missing {typography_path.relative_to(project)}")
    elif typography_path.read_bytes() != typography_template(main_path):
        errors.append(f"{typography_path.relative_to(project)} differs from the registered template")
    if main_path is not None and TYPOGRAPHY_IMPORT not in main_path.read_text(encoding="utf-8"):
        errors.append("the selected entry does not import ./typography.css")
    index_text = index_path.read_text(encoding="utf-8")
    if main_path is None and STATIC_CSS_LINK not in index_text:
        errors.append("index.html does not link ./typography.css")
    if adobe and ADOBE_EMBED not in index_text:
        errors.append("index.html does not contain the registered Adobe Fonts embeds")
    if not adobe and (EMBED_START in index_text or EMBED_END in index_text):
        errors.append("existing managed Adobe embed conflicts with off mode; preserve it or remove it explicitly first")
    if errors:
        raise ValueError("; ".join(errors))


def install(project: Path, main_path: Path | None, index_path: Path, adobe: bool = True) -> None:
    fetched = {download.name: bundled_font(download) for download in DOWNLOADS}

    font_root, typography_path = typography_paths(project, main_path)
    for path in [index_path, typography_path, *[font_root / d.name for d in DOWNLOADS]] + ([main_path] if main_path else []):
        path.resolve().relative_to(project)
        if path.exists() and not path.is_file():
            raise ValueError(f"file target is not a regular file: {path}")
    for download in DOWNLOADS:
        target = font_root / download.name
        if target.is_file() and digest(target.read_bytes()) != download.sha256:
            raise ValueError(f"refusing to overwrite mismatching {target.relative_to(project)}")
    if typography_path.is_file() and typography_path.read_bytes() != typography_template(main_path):
        raise ValueError(f"refusing to overwrite edited {typography_path.relative_to(project)}")

    main_text = insert_css_import(main_path.read_text(encoding="utf-8")) if main_path is not None else None
    index_text = index_path.read_text(encoding="utf-8")
    if '</head>' not in index_text:
        raise ValueError("index.html has no </head> marker")
    if adobe:
        index_text = insert_adobe_embed(index_text)
    elif EMBED_START in index_text or EMBED_END in index_text:
        raise ValueError("refusing to remove an existing managed Adobe embed in off mode")
    if main_path is None and STATIC_CSS_LINK not in index_text:
        index_text = index_text.replace("</head>", f"  {STATIC_CSS_LINK}\n</head>", 1)

    font_root.mkdir(parents=True, exist_ok=True)
    for name, data in fetched.items():
        (font_root / name).write_bytes(data)
    typography_path.write_bytes(typography_template(main_path))
    if main_path is not None:
        main_path.write_text(main_text, encoding="utf-8")
    index_path.write_text(index_text, encoding="utf-8")


def main() -> int:
    args = parse_args()
    project = args.project.resolve()
    try:
        main_path, index_path = validate_project(project, args.static, args.entry)
        if not args.verify_only:
            install(project, main_path, index_path, args.adobe_kit_mode == "existing")
        verify(project, main_path, index_path, args.adobe_kit_mode == "existing")
    except (OSError, ValueError) as exc:
        print(f"ERROR: typography {'verification' if args.verify_only else 'installation'} failed: {exc}", file=sys.stderr)
        return 2

    action = "verified" if args.verify_only else "installed and verified"
    print(f"OK: casino typography {action} at {project}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
