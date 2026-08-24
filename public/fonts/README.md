# Fonts

Nothing outstanding. The type system is complete.

| CSS variable | Family | Source | Weights |
|---|---|---|---|
| `--font-display` | Linda | `linda-bold.woff2` — client-licensed Or Type cut, self-hosted | 700 |
| `--font-ui` | Inter | `next/font/google`, self-hosted at build time | 400, 500 |
| `--font-serif-d` | Cormorant Garamond | `next/font/google`, Open Font License | 300, 400 |

`--font-display` is used **only** for the "DOC. B" wordmark. Everything else uses
`--font-ui`. `--font-serif-d` is scoped to landing-page Variant D and is not applied
globally — it is declared with `preload: false` so the browser only fetches it when
Variant D actually renders.

`linda-bold.woff2` is the only font file in this directory. Source `.otf` files are
gitignored and must never be committed.
