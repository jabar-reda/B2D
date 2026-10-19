# AGENTS.md

## What this is

B2D is a static, zero-dependency binary &harr; decimal converter: plain HTML + CSS + vanilla JS, **no build step, no package manager, no tests, no linter, no CI**. Do not add a bundler, framework, or `package.json` unless explicitly asked — "no dependencies, no build step" is the project's core selling point (see `README.md`).

## Running / verifying

- Run by opening `index.html` directly in a browser (`file://` works). There is no dev server.
- The site is published via GitHub Pages from `main`: <https://jabar-reda.github.io/B2D/>. After pushing to `main`, the live site updates automatically — no deploy step.
- There is no automated verification. The check is: open `index.html`, type in both modes, and exercise the keyboard shortcuts (below).

## Structure

- `index.html` — markup only, including the tutorial `<dialog>` content.
- `assets/css/style.css` — all styling (dark theme).
- `assets/js/script.js` — all logic: conversion, mode toggle, copy, tutorial modal.
- `assets/icons/` — favicon SVG source + PNG fallbacks.

Keep these three concerns separated; don't inline JS/CSS back into `index.html`.

## Non-obvious conventions (match the existing code)

- **Arbitrary precision**: all conversion goes through `BigInt` — never `Number`/`parseInt`, which silently lose precision on large values.
- **User text goes into the DOM via `textContent`** in most places, but the `hint` element uses `innerHTML` with the hardcoded HTML entities in `modeArrow` (`&rarr;`, `&middot;`). Keep that map the single source of arrow labels; don't duplicate the strings.
- **Animation restart pattern**: to replay a CSS animation, remove the class, force reflow with `void element.offsetWidth`, re-add the class (see `setOut`, `setMode`). Don't replace this with `animation` events.
- **Keyboard shortcuts** (`B`/`D` to switch mode, `?`/`H` opens the tutorial, `Enter` copies) are global but intentionally suppressed while typing in the input, while the dialog is open, and for any Ctrl/Meta/Alt chord — preserve those guards when touching `keydown` handling.
- **Copy uses `navigator.clipboard` only in a secure context**, with an `out.select()` fallback for `file://`. Don't drop the fallback — it's what makes copy work when opened locally.
- **Accessibility is deliberate**: the mode badge is a real `<button type="button">` with `aria-pressed` (never revert it to a `<span role="button">`), the output is `role="status"` / `aria-live="polite"`, and the tutorial relies on native `<dialog>` for the focus trap. Keep these when editing.
- **`prefers-reduced-motion`** is respected in CSS; keep new animations behind it.
- **No network fonts** — system font stacks only; adding a webfont would break the offline/no-dependency promise.
- The `#tutorial` hash deep-link and the live-updating `document.title` are intentional "hidden details" (documented in README) — don't delete them as cruft.

## Editing the README

`README.md` documents features precisely (including the hidden details). If you add or remove user-visible behavior, update it in the same change.
