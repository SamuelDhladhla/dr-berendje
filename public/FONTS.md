# dr Berendje — Font System

## Fonts Used

### 1. Instrument Serif (Primary — Headings)
- **Source:** Google Fonts
- **Used for:** All titles, headings, wordmark, pull quotes, excerpt text
- **Weights:** 400 (regular), italic
- **Sizes:**
  - Landing wordmark "dr.B": `clamp(72px, 14vw, 140px)`
  - Landing statement: `clamp(18px, 2.5vw, 28px)` italic
  - Project title (list view): `clamp(2rem, 5.5vw, 5.5rem)` italic
  - Project page h1: varies by layout, `clamp(1.8rem, 4vw, 5.5rem)` italic
  - Wordmark on inner pages: `18px`
  - Excerpt / pull quotes: `1.05rem` – `1.1rem` italic
  - Prev/Next project titles: `1rem` italic
- **Letter-spacing:** `-0.02em` to `-0.03em` on large sizes
- **Line-height:** `1.0` – `1.05` on titles, `1.5` – `1.8` on excerpts

### 2. Inter (Secondary — Body / UI)
- **Source:** Google Fonts
- **Used for:** Navigation, body text, metadata, captions, buttons, footer
- **Weights:** 300 (light), 400 (regular), 500 (medium), 600 (semibold)
- **Sizes:**
  - Navigation items: `13px` weight 400–500
  - Body text (project descriptions): `14px` weight 400
  - Metadata (category, year, status): `11px` weight 300–500
  - Captions (figure labels): `10px` weight 300
  - Tags: `10px` weight 300
  - Footer: `11px` weight 400
  - View toggle (List/Grid): `12px`
  - Entry link ("Enter Archive →"): `13px` weight 500
  - Repair mark stitch: `9px`–`10px`
- **Letter-spacing:** `0.04em` – `0.08em` on small sizes
- **Line-height:** `1.6` (base), `1.9` (body text), `2.2` (metadata)

## Color
- All text: `#000000` (black) — no grey, no colored text
- Accent mark only: `#C8553D` (terracotta) — used for:
  - The dot in "dr.B" wordmark
  - Repair mark stitch `— — —`
  - Custom cursor dot (at 60% opacity)

## Hierarchy (by visual weight)
1. **Title** — Instrument Serif, italic, large (2–9rem), weight 400
2. **Subtitle** — Inter, 11px, weight 500, uppercase, letter-spaced
3. **Excerpt** — Instrument Serif, ~1.05rem, italic
4. **Body** — Inter, 14px, weight 400
5. **Metadata** — Inter, 11px, weight 300–500
6. **Caption** — Inter, 10px, weight 300

## Notes for Linda
- Only 2 fonts loaded (was 12+ previously) — faster page load
- No per-project font/color variations — unified identity
- Hierarchy established through size + weight, not color
- Instrument Serif chosen for its clean, refined quality at display sizes
- Inter chosen for its precision and readability at small sizes
- Both fonts can be swapped if you prefer alternatives — just let us know
