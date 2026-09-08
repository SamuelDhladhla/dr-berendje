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
}

/** A labelled block in the left-hand metadata column, e.g. "Producer". */
export interface CreditBlock {
  label: string
  values: string[]
}

/*
  Bibliography / resources. Formatted in the academic order the A4 reference
  uses — author (year) Title, publisher, location — with any entry optionally
  hyperlinked.
*/
export interface BibliographyEntry {
  author?: string
  year?: string
  title: string
  publisher?: string
  location?: string
  url?: string
  note?: string
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
