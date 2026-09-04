import type { HoverListItem } from '@/components/HoverList'

/*
  Writing / Education / Consultancy / Playtime.

  Item names and hierarchy come from the client's Work Flow Doc. No descriptive
  prose is invented here: where the client has not supplied a description, the
  item carries descriptionMissing and renders a visible placeholder marker.

  Where an item names a project that already has an /archive page, it links there
  rather than duplicating the page.
*/

export const INSTAGRAM_URL = 'https://www.instagram.com/drberendje'

// ── WRITING ──────────────────────────────────────────────────────────────────
export const WRITING: HoverListItem[] = [
  {
    key: 'stop-waste-colonialism',
    title: 'Stop Waste Colonialism',
    category: 'Campaign / Policy Design',
    href: '/archive/waste-colonialism',
    descriptionMissing: true,
  },
  {
    key: 'kantabeast',
    title: 'Kantabeast',
    category: 'Video Essay',
    href: '#', // TODO: no route yet — client to confirm destination
    hrefTodo: true,
    descriptionMissing: true,
  },
  {
    key: 'utopian-resurgence',
    title: 'Utopian Resurgence',
    href: '#', // TODO: no route yet — client to confirm destination
    hrefTodo: true,
    descriptionMissing: true,
  },
  {
    key: 'kantamanto-social-club',
    title: 'Kantamanto Social Club',
    href: '#', // TODO: no route yet — client to confirm destination
    hrefTodo: true,
    descriptionMissing: true,
  },
  {
    key: 'clothing-passports',
    title: 'Clothing Passports',
    category: 'Paper + Passport Photo Shoot',
    href: '#', // TODO: no route yet — client to confirm destination
    hrefTodo: true,
    descriptionMissing: true,
  },
]

// ── EDUCATION ────────────────────────────────────────────────────────────────
export const EDUCATION: HoverListItem[] = [
  {
    key: 'sender-receiver',
    title: 'Sender – Receiver Residence',
    href: '/archive/sender-receiver-residence',
    descriptionMissing: true,
    subItems: [
      'Curriculum',
      'How did we end up here?',
      'The Good Ancestor To Do List',
      'One Message becomes a Clothing Tag',
      'Closet Audit',
    ],
  },
  {
    key: 'secondhand-speculation',
    title: 'Secondhand Speculation',
    href: '/archive/secondhand-speculation',
    descriptionMissing: true,
    subItems: ['Oracle Deck', 'Berlin Reader', 'Arnhem', 'Accra', 'Ihambane', 'Johannesburg'],
  },
  {
    key: 'craft-of-upcycling',
    title: 'The Craft of Upcycling',
    category: 'Inkube Program',
    href: '#', // TODO: no route yet — client to confirm destination
    hrefTodo: true,
    descriptionMissing: true,
    subItems: [
      'Paper (+ Case Study)',
      'Curriculum',
      'Printemps (Paris) Exhibition 2024',
      'Lookbook',
    ],
  },
  {
    key: 'owo-school',
    title: 'OWO School',
    href: '#', // TODO: no route yet — client to confirm destination
    hrefTodo: true,
    descriptionMissing: true,
    subItems: [
      'Curriculum (Vital Materialism)',
      'Case Study',
      'Lookbook',
      'OWO Festival Exhibition 2025',
    ],
  },
]

// ── CONSULTANCY ──────────────────────────────────────────────────────────────
// NOTE: the client gave no layout reference for this section. The hover-list
// pattern here is extrapolated from Writing/Education for consistency.
// See the report — several items below are filed under PLAYTIME in her document.
export const CONSULTANCY: HoverListItem[] = [
  {
    key: 'julius-holland',
    title: 'Julius Holland',
    category: 'Brand Identity & Strategy',
    href: '#', // TODO: no route yet
    hrefTodo: true,
    descriptionMissing: true,
    subItems: ['Brand Identity & Strategy for a luxury African wax print'],
  },
  {
    key: 'speculative-futures',
    title: 'Speculative Futures',
    category: 'Julius Holland — video LABOOMZ',
    href: '#', // TODO: no route yet
    hrefTodo: true,
    descriptionMissing: true,
    subItems: ['The Style Hack', '(Cross Cultural) Productions'],
  },
  {
    key: 'lagos',
    title: 'Lagos',
    href: '#', // TODO: no route yet
    hrefTodo: true,
    descriptionMissing: true,
    subItems: ['Slay Mamma', 'Yoye', 'Every Day Lagos is Couture', 'Series of Interviews'],
  },
  {
    key: 'kano',
    title: 'Kano',
    href: '#', // TODO: no route yet
    hrefTodo: true,
    descriptionMissing: true,
    subItems: ['Victoire Magic x Wamball', 'Julius', 'Ali Jita'],
  },
  {
    key: 'abuja',
    title: 'Abuja',
    href: '#', // TODO: no route yet
    hrefTodo: true,
    descriptionMissing: true,
    subItems: ['Soul in Motion'],
  },
  {
    key: 'accra',
    title: 'Accra',
    href: '#', // TODO: no route yet
    hrefTodo: true,
    descriptionMissing: true,
    subItems: ['Victoire Magic Princess', 'Soul in Motion'],
  },
]

// ── PLAYTIME ─────────────────────────────────────────────────────────────────
// NOTE: also no layout reference from the client. Same extrapolated pattern.
export const PLAYTIME: HoverListItem[] = [
  {
    key: 'a-striped-family',
    title: 'A Striped Family',
    category: 'Print & Textile Design',
    href: '#', // TODO: client has not supplied a destination for this item
    hrefTodo: true,
    descriptionMissing: true,
  },
  {
    key: 'florals',
    title: 'Florals',
    category: 'Print & Textile Design',
    href: '#', // TODO: client has not supplied a destination for this item
    hrefTodo: true,
    descriptionMissing: true,
  },
  {
    key: 'tie-dye-and-ink',
    title: 'Tie Dye & Ink',
    category: 'Print & Textile Design',
    href: '#', // TODO: client has not supplied a destination for this item
    hrefTodo: true,
    descriptionMissing: true,
  },
]
