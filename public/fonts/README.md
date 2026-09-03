# Fonts

| CSS variable | Family | Source | Weights / style |
|---|---|---|---|
| `--font-display` | Linda | `linda-bold.woff2` — client-licensed Or Type cut, self-hosted | 700 |
| `--font-serif` | Sabon | `sabon-italic.woff2` — client-provided, self-hosted | 400 italic |
| `--font-ui` | Inter | `next/font/google`, self-hosted at build time | 400, 500 |
| `--font-serif-archive` | Cormorant Garamond | `next/font/google`, Open Font License | 300, 400 |

`--font-display` is used only for the `<Wordmark />` component. `--font-serif` is used
for the quoted asides. `--font-ui` is everything else on the homepage.

`--font-serif-archive` is scoped to the archive and project pages — it is declared with
`preload: false`, so the browser only fetches it on pages that actually set it, never on
the homepage.

The `@font-face` rules for the two self-hosted faces live in `src/app/layout.tsx` rather
than `globals.css`, because their `src` URLs have to carry the GitHub Pages basePath
(`/dr-berendje`) which a static CSS file cannot interpolate.

`linda-bold.woff2` and `sabon-italic.woff2` are the only font files in this directory.
Source `.otf`/`.ttf` files are gitignored and must never be committed.
