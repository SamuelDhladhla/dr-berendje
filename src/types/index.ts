export type Lens = 'all' | 'studio' | 'archive' | 'gallery'

export type ProjectStatus = 'ongoing' | 'complete' | 'in-progress'

export type ProjectCategory = 'studio' | 'archive' | 'gallery'

/** Optional per-project override for the TITLE only. Body copy stays Sabon. */
export interface TitleFont {
  family: string
  weight?: number
  style?: 'normal' | 'italic'
}

/*
  A run of images laid out as one unit across the page width.

  The archive holds portrait, landscape and mixed dimensions, so the layout
  responds to the material rather than forcing a single format: one image can run
  large on its own, or two or three can sit side by side and fill the width as a
  group. Images are contained, never cropped, so each keeps its own proportions.
*/
export interface ImageGroup {
  images: string[]
  /** Credit line printed under the group. */
  credit?: string
  /**
   * 'split' renders exactly two images 50/50 of the content width with an 8px
   * gap, top-aligned. Anything else flows as the normal single/pair/triple run.
   */
  kind?: 'split'
  /** Per-image captions. When both are absent, `credit` captions the pair once. */
  captions?: (string | undefined)[]
}

/*
  Which image treatment a project page uses. Header, title, metadata column,
  bibliography and external links are shared by all three; only the image area
  differs.

    'research'  A4 Arts: hero, metadata left / reading right, flexible groups
    'split'     amiedicke.com: side-by-side pairs mixed with singles and triples
    'series'    zohraopoku.com: one centred image per row, optional companion
*/
export type ProjectLayout = 'research' | 'split' | 'series'

/*
  A row in a 'series' layout: one main image, an optional smaller companion
  offset to the right, and structured caption fields.
*/
export interface SeriesRow {
  image: string
  companion?: string
  /** Line 1, rendered uppercase as "TITLE | YEAR". */
  title?: string
  year?: string
  medium?: string
  variation?: string
  dimensions?: string
}

/** A labelled block in the left-hand metadata column, e.g. "Producer". */
export interface CreditBlock {
  label: string
  values: string[]
}

/*
  Bibliography. One Harvard-style line per entry, written as a single string so
  the client can punctuate a citation however the source demands rather than
  being forced into fixed fields. Wrap a work title in *asterisks* to italicise
  it. An entry with a `url` renders as a link.
*/
export interface BibliographyEntry {
  text: string
  url?: string
}

/** A plain labelled link in the Resources list beneath the bibliography. */
export interface ResourceLink {
  label: string
  url: string
}

export interface Project {
  slug: string
  title: string
  subtitle?: string
  year: string
  location: string
  status: ProjectStatus
  category: ProjectCategory
  tags: string[]
  excerpt: string
  description: string
  images: string[]
  coverImage: string
  /** Credit for the hero image, printed directly beneath it. */
  coverCredit?: string
  /** Explicit image grouping. When absent, groups are derived from `images`. */
  imageGroups?: ImageGroup[]
  /** Extra labelled rows for the left metadata column. */
  credits?: CreditBlock[]
  bibliography?: BibliographyEntry[]
  resources?: ResourceLink[]
  /** Image treatment. Defaults to 'research' when absent. */
  layout?: ProjectLayout
  /** Rows for a 'series' layout. Ignored by the other two. */
  series?: SeriesRow[]
  /** Named sub-parts of the project, listed plainly under the metadata. */
  parts?: string[]
  /** Public links only. Rendered in the left column, underlined, new tab. */
  externalLinks?: ResourceLink[]
  // Field positioning — seeded per project so consistent across renders
  fieldSize?: 'small' | 'medium' | 'large'
  /** Overrides var(--font-body) for this project's title on List, Grid and page. */
  titleFont?: TitleFont
  /**
   * 'client'      — prose verified against the client's own documents
   * 'placeholder' — no client copy exists yet; render the marker, never invent text
   */
  contentStatus?: 'client' | 'placeholder'
}
