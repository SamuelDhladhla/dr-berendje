export type Lens = 'all' | 'studio' | 'archive' | 'gallery'

export type ProjectStatus = 'ongoing' | 'complete' | 'in-progress'

export type ProjectCategory = 'studio' | 'archive' | 'gallery'

/** Optional per-project override for the TITLE only. Body copy stays Sabon. */
export interface TitleFont {
  family: string
  weight?: number
  style?: 'normal' | 'italic'
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
