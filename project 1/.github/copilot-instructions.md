## Copilot / AI Agent Quick Instructions for this repo

This is a small static website (HTML + CSS) in the repository root. Use these notes to be immediately productive and avoid unsafe/incorrect edits.

Primary layout
- Root files: `index.html` (site entry).
- Page content: `pages/` contains sub-pages (`menu.html`, `aboutus.html`).
- Styling: `css/` contains one CSS file per page (e.g. `index.css`, `menu.css`, `aboutus.css`). Pages under `pages/` typically reference their stylesheet with a relative path like `../css/<name>.css`.
- Images: `images/` holds local images; some pages include external image URLs.

Key patterns and conventions (discoverable in the codebase)
- Navigation: Edit the nav in `index.html` to add/remove top-level pages. Links to pages are relative (e.g. `pages/menu.html`). When adding a new page, create `pages/<page>.html` and, if needed, a stylesheet `css/<page>.css` and reference it from the page using `../css/<page>.css`.
- CSS-per-page: The project uses a simple one-file-per-page approach instead of a global stylesheet. Follow the existing naming (`index.css`, `menu.css`, `aboutus.css`) unless there's a clear reason to consolidate.
- Menu items: The menu layout uses repeating blocks with classes like `menu-section`, `menu-item`, and `menu-image`. Keep these class names consistent when adding new items.
- Relative paths: Pages in `pages/` use `..` to reach `css/` and `images/`. Be careful when editing paths — confirm links by opening the page in a browser.

Small but important HTML quirks to preserve or fix cautiously
- There are examples of non-ideal heading nesting in `index.html` (e.g., `h1` tags nested inside `<p>`). If you correct markup for accessibility/semantics, do it in a minimal way and run a quick visual check. Don't rewrite whole sections without confirmation.

How to run / test locally
- No build system. This is a static site; to preview locally either open `index.html` in a browser or serve the folder with a tiny HTTP server. Example (from repo root):

```powershell
# from D:/project 1
python -m http.server 8000
# then open http://localhost:8000/index.html
```

Editing guidelines for AI agents
- Make minimal edits: change or add small sections (navigation, a menu item, or a CSS rule). When adding pages, include the page HTML, the matching CSS file, and update `index.html` nav.
- Preserve class names and structure used by existing CSS (`menu-item`, `item-content`, `menu-image`, `hero-image`, etc.) so styles continue to apply.
- Avoid bulk automated refactors. This repo is small and hand-edited; large-scale renames may break relative paths.

Integration / external dependencies
- No npm/pyproject/build tool detected — this is a plain static site. External dependencies are mainly remote images referenced by absolute URLs.

Where to look for examples
- `index.html` — top-level navigation, hero section, and sample menu items.
- `pages/menu.html`, `pages/aboutus.html` — patterns for page structure and relative linking (create similar layout for new pages).
- `css/` files — follow existing selectors and naming conventions.

If a `.github/copilot-instructions.md` or other agent guidance already exists elsewhere, merge gently: preserve any repo-specific constraints and do not overwrite maintainers' notes.

When in doubt
- Ask a human maintainer before making sweeping changes (big edits to navigation, global CSS consolidation, or path restructuring).

Feedback
- If any section below is unclear or you need more examples (e.g., a concrete page scaffold), request the specific example and I will add it.
