# Fonts

| CSS variable | Family | Source | Cuts |
|---|---|---|---|
| `--font-display` | Linda | `linda-bold.woff2` — client-licensed Or Type cut | 700 |
| `--font-body` | Sabon | `sabon-regular.woff2`, `sabon-bold.woff2`, `sabon-italic.woff2` — client-provided | 400, 700, 400 italic |
| `--font-inter` | Inter | `next/font/google` | 400, 500 |
| `--font-serif-archive` | Cormorant Garamond | `next/font/google`, Open Font License | 300, 400 |

`--font-display` is used **only** by the `<Wordmark />` component — the DOC.B mark and
nowhere else.

`--font-body` is the homepage's primary face: nav row, Play/Pause control, every text
element bar the wordmark. All three Sabon cuts are genuine — real 400, real 700 and a
real italic drawn at −12° — so the browser never synthesises a faux bold or a slanted
roman.

`--font-inter` is a bare family handle, not a role. On the homepage it is only a
fallback inside the `--font-body` stack. It is still the body face on the archive and
project pages, which this direction did not change.

`--font-serif-archive` is scoped to the archive and project pages, declared with
`preload: false` so it is never fetched on the homepage.

The `@font-face` rules for the self-hosted faces (Linda, Sabon) live in
`src/app/layout.tsx` rather than `globals.css`, because their `src` URLs have to carry
the GitHub Pages basePath (`/dr-berendje`), which a static CSS file cannot interpolate.

Source `.otf`/`.ttf` files are gitignored and must never be committed. A Sabon Bold
Italic cut also exists upstream but is not converted, as nothing uses it.
