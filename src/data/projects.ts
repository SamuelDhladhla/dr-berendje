import { Project } from '@/types'

/*
  CONTENT PROVENANCE — audited against the client's own documents
  (Work Flow Doc_dr Berendje, Content/Portfolio Linda Valkeman.pdf).

  The work-flow doc supplies project NAMES, dates, locations and sub-item
  structure, but contains running prose for only one project: the Moving
  Material Museum. Every other `description` previously on this site was written
  to fill the template, not supplied by the client.

  Those paragraphs have been removed rather than reworded — `contentStatus:
  'placeholder'` makes the gap render a visible on-page marker. Do not write
  replacement prose here. The removed text remains recoverable in git history
  (commit 643cff8) if any of it turns out to be wanted.

  The portfolio PDF is image-only (43 pages, no extractable text), so it could
  not be machine-checked; if it contains written project copy, that copy still
  needs transcribing into this file.
*/

export const projects: Project[] = [
  {
    slug: 'in-no-particular-order',
    title: 'In No Particular Order',
    subtitle: 'Visual Essays & Film',
    year: '2008 —',
    location: 'Global',
    status: 'ongoing',
    category: 'studio',
    tags: ['visual essay', 'film', 'archive', 'photography'],
    excerpt: '',
    description: '',
    contentStatus: 'placeholder',
    images: ['/images/ecologies/1.jpg', '/images/ecologies/2.jpg'],
    coverImage: '/images/ecologies/1.jpg',
    fieldSize: 'large',
  },
  {
    slug: 'tsht-tales',
    title: 'TSHT Tales',
    subtitle: 'T-Shirt Tales',
    year: '2025 —',
    location: 'Global',
    status: 'in-progress',
    category: 'studio',
    tags: ['t-shirt', 'archive', 'textile trade', 'video essay', 'exhibition'],
    excerpt: '',
    description: '',
    contentStatus: 'placeholder',
    // Client doc lists sub-parts: Academic Paper #1, Travelling Exhibition,
    // Video Collage / Film, T-Shirt Tales Library. Structure only, no prose.
    titleFont: { family: '"Helvetica Neue", Helvetica, Arial, sans-serif', weight: 700 },
    images: ['/images/dwmc/1.jpg', '/images/dwmc/2.jpg'],
    coverImage: '/images/dwmc/1.jpg',
    fieldSize: 'medium',
  },
  {
    slug: 'the-ecologies-of-repair',
    title: 'The Ecologies of Repair',
    year: '2024 —',
    location: 'Netherlands / Ghana',
    status: 'ongoing',
    category: 'studio',
    tags: ['repair', 'ecology', 'material healing', 'spatial'],
    excerpt: '',
    description: '',
    contentStatus: 'placeholder',
    titleFont: { family: 'var(--font-body)', style: 'italic', weight: 400 },
    images: [
      '/images/ecologies/1.jpg',
      '/images/ecologies/2.jpg',
      '/images/ecologies/3.jpg',
    ],
    coverImage: '/images/ecologies/1.jpg',
    fieldSize: 'large',
  },
  {
    slug: 'dead-white-mans-clothes',
    title: 'Dead White Man\'s Clothes',
    subtitle: 'Obroni Wa Wu',
    year: '2011 — 2025',
    location: 'Ghana / Global',
    status: 'ongoing',
    category: 'archive',
    tags: ['waste colonialism', 'fashion', 'Ghana', 'secondhand', 'textile trade'],
    excerpt: '',
    description: '',
    contentStatus: 'placeholder',
    images: [
      '/images/dwmc/1.jpg',
      '/images/dwmc/2.jpg',
      '/images/dwmc/3.jpg',
    ],
    coverImage: '/images/dwmc/1.jpg',
    fieldSize: 'medium',
  },
  {
    slug: 'black-botanicals',
    title: 'Black Botanicals',
    subtitle: 'Politics of Plants',
    year: '2017 —',
    location: 'India / Netherlands / South Africa',
    status: 'ongoing',
    category: 'studio',
    tags: ['botany', 'colonialism', 'plant dyeing', 'textiles', 'India', 'Netherlands'],
    excerpt: '',
    description: '',
    contentStatus: 'placeholder',
    // Client doc: Chapter 1 India—Netherlands 2017/18 (Paper/Riso series, X-ray
    // series, Textiles); Chapter 2 Cash Crops — The Cape 2025. Structure only.
    images: [
      '/images/botanicals/1.jpg',
      '/images/botanicals/2.jpg',
      '/images/botanicals/3.jpg',
      '/images/botanicals/4.jpg',
    ],
    coverImage: '/images/botanicals/1.jpg',
    fieldSize: 'medium',
  },
  {
    slug: 'blueprint',
    title: 'Blueprint',
    year: '2014',
    location: 'China',
    status: 'complete',
    category: 'archive',
    tags: ['Delftware', 'China', 'ceramics', 'textile', 'copying', 'cross-cultural'],
    excerpt: '',
    description: '',
    contentStatus: 'placeholder',
    images: [
      '/images/blueprint/1.jpg',
      '/images/blueprint/2.jpg',
    ],
    coverImage: '/images/blueprint/1.jpg',
    fieldSize: 'small',
  },
  {
    slug: 'post-fossils',
    title: 'Post Fossils',
    year: '2015',
    location: 'Netherlands',
    status: 'complete',
    category: 'archive',
    tags: ['fossils', 'materials', 'future', 'objects', 'speculative'],
    excerpt: '',
    description: '',
    contentStatus: 'placeholder',
    titleFont: { family: 'var(--font-inter)', weight: 300 },
    images: [
      '/images/postfossils/1.jpg',
      '/images/postfossils/2.jpg',
    ],
    coverImage: '/images/postfossils/1.jpg',
    fieldSize: 'small',
  },
  {
    slug: 'the-fine-art-of-fakery',
    title: 'The New Fake is Real',
    subtitle: 'Ceramic Material Research · China 2015',
    year: '2015',
    location: 'Jingdezhen, China',
    status: 'complete',
    category: 'archive',
    tags: ['ceramics', 'authenticity', 'China', 'copy', 'porcelain', 'fakery'],
    excerpt: '',
    description: '',
    contentStatus: 'placeholder',
    titleFont: { family: 'var(--font-jost)', weight: 500 },
    images: [
      '/images/fakery/1.jpg',
      '/images/fakery/2.jpg',
    ],
    coverImage: '/images/fakery/1.jpg',
    fieldSize: 'medium',
  },
  {
    slug: 'moving-material-museum',
    title: 'Moving Material Museum',
    subtitle: 'MMM',
    year: '2015',
    location: 'Global / Nomadic',
    status: 'complete',
    category: 'archive',
    tags: ['nomadic', 'museum', 'material culture', 'globalisation', 'migration', 'MMM'],
    // CLIENT-SOURCED. Traces directly to the work-flow doc's MMM paragraphs and
    // its "From examining globalisation / To being responsible within its
    // consequences" and "curatorial observation toward participatory
    // intervention" lines. The only project prose the client supplied.
    excerpt: 'A nomadic, research-driven platform exploring the cultural dimensions of globalisation — tracing how the meaning of objects, styles, and materials shifts across time and place.',
    description: `The Moving Material Museum (MMM) was an open, nomadic, travelling platform that explored the cultural dimensions of globalisation, with a focus on the mobility of material culture, global interconnectivity, and the power dynamics that shape them.

MMM operated as frame, format, and content for new object and material generation — combining design thinking and anthropological research to invite audiences not only to view, but to relate to and work with materials and their stories.

The MMM laid the conceptual foundation for doc. Berendje's current practice — the move from examining globalisation to being responsible within its consequences. From curatorial observation toward participatory intervention.`,
    contentStatus: 'client',
    images: [
      '/images/mmm/1.jpg',
      '/images/mmm/2.jpg',
    ],
    coverImage: '/images/mmm/1.jpg',
    fieldSize: 'medium',
  },
  {
    slug: 'textile-trade-book',
    title: 'Textile Trade Book',
    subtitle: 'Ghana 2013',
    year: '2013',
    location: 'Ghana / Netherlands',
    status: 'complete',
    category: 'archive',
    tags: ['textile', 'Ghana', 'trade', 'photography', 'book'],
    excerpt: '',
    description: '',
    contentStatus: 'placeholder',
    // TODO: client wants Zapfino for this title. No licensed free equivalent has
    // been agreed — confirm with client before implementing. Default Sabon until then.
    images: ['/images/blueprint/1.jpg', '/images/blueprint/2.jpg'],
    coverImage: '/images/blueprint/1.jpg',
    fieldSize: 'medium',
  },
  {
    slug: 'waste-colonialism',
    title: 'Waste Colonialism',
    subtitle: 'Stop Waste Colonialism Campaign',
    year: '2020 —',
    location: 'Ghana / Netherlands / Global',
    status: 'ongoing',
    category: 'studio',
    tags: ['waste', 'colonialism', 'policy', 'fashion', 'Ghana', 'campaign'],
    excerpt: '',
    description: '',
    contentStatus: 'placeholder',
    // Client doc files this under Sender–Receiver Residence as "Stop Waste
    // Colonialism Campaign / Policy Design", with Kantamanto Social Club and
    // Utopian Resurgence as its sub-items.
    images: [
      '/images/waste/1.jpg',
      '/images/waste/2.jpg',
      '/images/waste/3.jpg',
    ],
    coverImage: '/images/waste/1.jpg',
    fieldSize: 'large',
  },
  {
    slug: 'sender-receiver-residence',
    title: 'Sender — Receiver',
    subtitle: 'Residency Programme',
    year: '2023 —',
    location: 'Netherlands / Ghana / Global',
    status: 'in-progress',
    category: 'studio',
    tags: ['residency', 'curriculum', 'pedagogy', 'clothing passport', 'repair'],
    excerpt: '',
    description: '',
    contentStatus: 'placeholder',
    images: [
      '/images/sender/1.jpg',
      '/images/sender/2.jpg',
      '/images/sender/3.jpg',
    ],
    coverImage: '/images/sender/1.jpg',
    fieldSize: 'medium',
  },
  {
    slug: 'secondhand-speculation',
    title: 'Secondhand Speculation',
    subtitle: 'Oracle Deck Methodology',
    year: '2019 —',
    location: 'Berlin / Arnhem / Accra / Johannesburg',
    status: 'ongoing',
    category: 'gallery',
    tags: ['pedagogy', 'oracle', 'speculative', 'secondhand', 'methodology'],
    excerpt: '',
    description: '',
    contentStatus: 'placeholder',
    images: [
      '/images/speculation/1.jpg',
    ],
    coverImage: '/images/speculation/1.jpg',
    fieldSize: 'small',
  },
  {
    slug: 'paper-making',
    title: 'Paper Making',
    year: '2018 —',
    location: 'Netherlands',
    status: 'ongoing',
    category: 'gallery',
    tags: ['paper', 'process', 'material', 'handmade'],
    excerpt: '',
    description: '',
    contentStatus: 'placeholder',
    images: [
      '/images/paper/1.jpg',
      '/images/paper/2.jpg',
    ],
    coverImage: '/images/paper/1.jpg',
    fieldSize: 'small',
  },
]

/** Category and date shown on List / Grid. Sourced from the client's structure. */
export const PROJECT_META: Record<string, { category: string }> = {
  'in-no-particular-order': { category: 'Visual Essays & Film' },
  'tsht-tales': { category: 'Publication & Exhibition' },
  'the-ecologies-of-repair': { category: 'Research' },
  'dead-white-mans-clothes': { category: 'Fashion Research' },
  'black-botanicals': { category: 'Publication' },
  'blueprint': { category: 'Textile Research' },
  'post-fossils': { category: 'Speculative' },
  'the-fine-art-of-fakery': { category: 'Ceramic Research' },
  'moving-material-museum': { category: 'Platform' },
  'textile-trade-book': { category: 'Photography' },
  'waste-colonialism': { category: 'Policy Design' },
  'sender-receiver-residence': { category: 'Residency' },
  'secondhand-speculation': { category: 'Pedagogy' },
  'paper-making': { category: 'Material' },
}

/** Display order on List and Grid — follows the client's Practice Pathway. */
export const PROJECT_ORDER = [
  'the-ecologies-of-repair',
  'dead-white-mans-clothes',
  'textile-trade-book',
  'sender-receiver-residence',
  'waste-colonialism',
  'tsht-tales',
  'black-botanicals',
  'the-fine-art-of-fakery',
  'blueprint',
  'post-fossils',
  'secondhand-speculation',
  'moving-material-museum',
  'paper-making',
  'in-no-particular-order',
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getOrderedProjects(): Project[] {
  return PROJECT_ORDER
    .map(slug => projects.find(p => p.slug === slug))
    .filter((p): p is Project => Boolean(p))
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'all') return projects
  return projects.filter((p) => p.category === category)
}
