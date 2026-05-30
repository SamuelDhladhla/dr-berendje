export type Lens = 'all' | 'studio' | 'archive' | 'gallery'

export type ProjectStatus = 'ongoing' | 'complete' | 'in-progress'

export type ProjectCategory = 'studio' | 'archive' | 'gallery'

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
}
